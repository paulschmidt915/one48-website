"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, Camera, CameraOff, Loader2 } from 'lucide-react';
import { parseNutritionText, parseNutritionImage } from '@/services/geminiNutrition';
import { addNutritionEntries, NutritionEntry } from '@/services/nutritionService';

const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 1200;
                const MAX_HEIGHT = 1200;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height = Math.round((height * MAX_WIDTH) / width);
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width = Math.round((width * MAX_HEIGHT) / height);
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error("Failed to get canvas context"));
                    return;
                }
                ctx.drawImage(img, 0, 0, width, height);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                resolve(dataUrl);
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
    });
};

const PLACEHOLDERS = [
    '> Add entry...',
    '> 2 Eier, Spiegelei...',
    '> 150g Hähnchen...',
    '> Haferflocken mit Milch...',
    '> Protein Shake 30g...',
];
const TYPING_SPEED = 38;
const PAUSE_DURATION = 2800;

interface TrackerInputProps {
    onEntriesAdded: () => void;
    selectedDate: string;
}

export default function TrackerInput({ onEntriesAdded, selectedDate }: TrackerInputProps) {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [amountText, setAmountText] = useState('');

    const [isActive, setIsActive] = useState(false);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');

    const hasText = text.trim().length > 0;
    const isExpanded = isActive || hasText;

    // Placeholder typing animation — only when collapsed and inactive
    useEffect(() => {
        if (isExpanded || capturedImage) {
            setDisplayedPlaceholder('');
            return;
        }

        const target = PLACEHOLDERS[placeholderIndex];
        let charIndex = 0;
        let typingTimer: ReturnType<typeof setTimeout>;
        let pauseTimer: ReturnType<typeof setTimeout>;

        const typeChar = () => {
            if (charIndex <= target.length) {
                setDisplayedPlaceholder(target.slice(0, charIndex));
                charIndex++;
                typingTimer = setTimeout(typeChar, TYPING_SPEED);
            } else {
                pauseTimer = setTimeout(() => {
                    setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
                }, PAUSE_DURATION);
            }
        };

        typingTimer = setTimeout(typeChar, charIndex === 0 ? 400 : 0);

        return () => {
            clearTimeout(typingTimer);
            clearTimeout(pauseTimer);
        };
    }, [placeholderIndex, isExpanded, capturedImage]);

    // Click outside collapses only when text is empty
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                if (!hasText) {
                    setIsActive(false);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [hasText]);

    // Auto-reset textarea height when empty
    useEffect(() => {
        if (!text && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    }, [text]);

    const toggleRecording = async () => {
        if (isRecording) {
            mediaRecorderRef.current?.stop();
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const types = ['audio/mp4', 'audio/webm', 'audio/ogg', 'audio/wav'];
            const mimeType = types.find(t => MediaRecorder.isTypeSupported(t)) || '';
            const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
            audioChunksRef.current = [];
            mediaRecorderRef.current = recorder;

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };

            recorder.onstop = async () => {
                stream.getTracks().forEach(t => t.stop());
                const blob = new Blob(audioChunksRef.current, { type: mimeType || 'audio/mp4' });
                const base64 = await new Promise<string>((res, rej) => {
                    const reader = new FileReader();
                    reader.onloadend = () => res(reader.result as string);
                    reader.onerror = rej;
                    reader.readAsDataURL(blob);
                });

                setIsLoading(true);
                try {
                    const audioData = { inlineData: { data: base64.split(',')[1], mimeType: mimeType || 'audio/mp4' } };
                    const result = await parseNutritionText('', audioData);
                    const entries = Array.isArray(result) ? result : [result];
                    if (entries.length > 0) {
                        await addNutritionEntries(entries, selectedDate);
                        onEntriesAdded();
                    }
                } catch (err) {
                    console.error("Audio submission error:", err);
                    alert("Fehler beim Verarbeiten der Spracheingabe. Bitte versuche es noch einmal.");
                } finally {
                    setIsLoading(false);
                }
            };

            recorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Microphone error:", err);
        }
    };

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const compressedBase64 = await compressImage(file);
            setCapturedImage(compressedBase64);
        } catch (error) {
            console.error("Error compressing image:", error);
            const reader = new FileReader();
            reader.onloadend = () => { setCapturedImage(reader.result as string); };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!text.trim() && !capturedImage) return;
        setIsLoading(true);
        try {
            let entries: NutritionEntry[] = [];
            if (capturedImage) {
                const base64Data = capturedImage.split(',')[1];
                const mimeType = capturedImage.split(';')[0].split(':')[1];
                const result = await parseNutritionImage(base64Data, mimeType, amountText);
                entries = Array.isArray(result) ? result : [result];
            } else {
                const result = await parseNutritionText(text);
                entries = Array.isArray(result) ? result : [result];
            }
            if (entries.length > 0) {
                await addNutritionEntries(entries, selectedDate);
                setText('');
                setCapturedImage(null);
                setAmountText('');
                setIsActive(false);
                onEntriesAdded();
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Fehler beim Verarbeiten. Bitte versuche es noch einmal.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="fixed bottom-0 left-0 right-0 bg-[#f0efed] z-50"
            ref={containerRef}
        >
            <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={fileInputRef}
                aria-label="Bild hochladen"
                className="hidden"
                onChange={handleFileChange}
            />

            <div className="tracker-input-bar px-4">
                {capturedImage ? (
                    /* Image mode */
                    <div className="border border-[#cbd5e1] rounded-2xl px-4 py-3 flex flex-col gap-3">
                        <div className="flex gap-3 items-center">
                            <img
                                src={capturedImage}
                                alt="Captured food"
                                className="w-10 h-10 object-cover shrink-0 rounded-lg"
                            />
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={amountText}
                                    onChange={(e) => setAmountText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                    placeholder="Menge eingeben, z.B. 150g"
                                    className="w-full bg-transparent [font-family:var(--font-ibm-plex-mono)] text-[14px] text-[#111] placeholder-[#94a3b8] outline-none"
                                    disabled={isLoading}
                                    autoFocus
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => setCapturedImage(null)}
                                aria-label="Bild entfernen"
                                disabled={isLoading}
                                className="text-[#94a3b8] hover:text-[#475569] transition-colors flex items-center justify-center min-h-[44px] min-w-[44px]"
                            >
                                <CameraOff size={16} strokeWidth={1.5} />
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isLoading || !amountText.trim()}
                            className="[font-family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[1.1px] text-[#111] disabled:text-[#94a3b8] transition-colors flex items-center gap-2"
                        >
                            {isLoading
                                ? <><Loader2 className="animate-spin" size={14} /> Verarbeite...</>
                                : '> Eintrag speichern'
                            }
                        </button>
                    </div>
                ) : (
                    /* Chat input — expands when active or has text */
                    <div
                        className={`border border-[#cbd5e1] overflow-hidden transition-[border-radius] duration-200 ${isExpanded ? 'rounded-[20px]' : 'rounded-full'}`}
                        onClick={() => {
                            setIsActive(true);
                            textareaRef.current?.focus();
                        }}
                    >
                        {/* Input row — items-stretch so circles size dynamically to the pill height */}
                        <div className="flex items-stretch">
                            {/* Camera — aspect-square stretches to pill height, overflow-hidden on pill does the corner clipping */}
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); handleCameraClick(); }}
                                disabled={isLoading}
                                aria-label="Foto aufnehmen"
                                className="w-[53px] flex-none rounded-full bg-[#e4e3e0] hover:bg-[#d9d8d5] text-[#475569] transition-colors flex items-center justify-center"
                            >
                                <Camera size={20} strokeWidth={1.5} />
                            </button>

                            {/* Textarea */}
                            <textarea
                                ref={textareaRef}
                                rows={1}
                                value={text}
                                onChange={(e) => {
                                    setText(e.target.value);
                                    const el = textareaRef.current;
                                    if (el) {
                                        el.style.height = 'auto';
                                        el.style.height = `${el.scrollHeight}px`;
                                    }
                                }}
                                onFocus={() => setIsActive(true)}
                                onBlur={() => {
                                    if (!hasText) {
                                        setTimeout(() => {
                                            if (!containerRef.current?.contains(document.activeElement)) {
                                                setIsActive(false);
                                            }
                                        }, 150);
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit();
                                    }
                                }}
                                placeholder={isExpanded ? '> Add entry...' : displayedPlaceholder}
                                disabled={isLoading}
                                className="flex-1 bg-transparent [font-family:var(--font-ibm-plex-mono)] text-[14px] text-[#111] placeholder-[#94a3b8] outline-none resize-none overflow-hidden leading-[1.5] py-[16px] px-3"
                            />

                            {/* Right slot — same aspect-square logic; mic fills it fully, send is centered */}
                            <div className="w-[53px] flex-none flex items-center justify-center">
                                {hasText ? (
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); handleSubmit(); }}
                                        disabled={isLoading}
                                        aria-label="Absenden"
                                        className="bg-black hover:bg-zinc-700 text-white transition-colors flex items-center justify-center w-[34px] h-[34px] rounded-full"
                                    >
                                        {isLoading
                                            ? <Loader2 className="animate-spin" size={14} strokeWidth={2} />
                                            : <Send size={14} strokeWidth={2} />
                                        }
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); toggleRecording(); }}
                                        disabled={isLoading}
                                        aria-label={isRecording ? 'Aufnahme stoppen' : 'Spracheingabe starten'}
                                        className={`w-full h-full rounded-full transition-colors flex items-center justify-center ${isRecording ? 'bg-[#c4c3c0] text-red-500 animate-pulse' : 'bg-[#c4c3c0] hover:bg-[#b8b7b4] text-[#475569]'}`}
                                    >
                                        {isLoading
                                            ? <Loader2 className="animate-spin" size={20} strokeWidth={1.5} />
                                            : <Mic size={20} strokeWidth={1.5} />
                                        }
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
