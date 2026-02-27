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

interface TrackerInputProps {
    onEntriesAdded: () => void;
    selectedDate: string;
}

export default function TrackerInput({ onEntriesAdded, selectedDate }: TrackerInputProps) {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [amountText, setAmountText] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!text && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    }, [text]);

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'de-DE';

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setText((prev) => prev ? `${prev} ${transcript}` : transcript);
                setIsRecording(false);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsRecording(false);
            };

            recognitionRef.current.onend = () => {
                setIsRecording(false);
            };
        }
    }, []);

    const toggleRecording = () => {
        if (isRecording) {
            recognitionRef.current?.stop();
            setIsRecording(false);
        } else {
            setText('');
            recognitionRef.current?.start();
            setIsRecording(true);
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
            reader.onloadend = () => {
                setCapturedImage(reader.result as string);
            };
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
        <div className="fixed bottom-0 left-0 right-0 bg-[#f0efed] border-t border-[#cbd5e1] z-50">
            <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={fileInputRef}
                aria-label="Bild hochladen"
                className="hidden"
                onChange={handleFileChange}
            />

            {capturedImage ? (
                /* Image mode */
                <div className="px-6 py-4 flex flex-col gap-3">
                    <div className="flex gap-4 items-center">
                        <img
                            src={capturedImage}
                            alt="Captured food"
                            className="w-12 h-12 object-cover shrink-0"
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
                            className="text-[#94a3b8] hover:text-[#475569] transition-colors"
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
                /* Default text input mode */
                <div className="flex items-end min-h-14 px-6 py-4 gap-4">
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
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                        placeholder="> Add entry..."
                        disabled={isLoading}
                        className="flex-1 bg-transparent [font-family:var(--font-ibm-plex-mono)] text-[14px] text-[#111] placeholder-[#94a3b8] outline-none resize-none overflow-hidden leading-[1.5]"
                    />

                    <div className="flex items-center gap-4 shrink-0">
                        {text.trim() ? (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isLoading}
                                aria-label="Absenden"
                                className="text-[#111] hover:text-[#475569] disabled:text-[#94a3b8] transition-colors"
                            >
                                {isLoading
                                    ? <Loader2 className="animate-spin" size={16} strokeWidth={1.5} />
                                    : <Send size={16} strokeWidth={1.5} />
                                }
                            </button>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={handleCameraClick}
                                    disabled={isLoading}
                                    aria-label="Foto aufnehmen"
                                    className="text-[#94a3b8] hover:text-[#475569] transition-colors"
                                >
                                    <Camera size={16} strokeWidth={1.5} />
                                </button>
                                <button
                                    type="button"
                                    onClick={toggleRecording}
                                    disabled={isLoading || !recognitionRef.current}
                                    aria-label={isRecording ? 'Aufnahme stoppen' : 'Spracheingabe starten'}
                                    className={`transition-colors ${isRecording ? 'text-red-500 animate-pulse' : 'text-[#94a3b8] hover:text-[#475569]'}`}
                                >
                                    <Mic size={16} strokeWidth={1.5} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
