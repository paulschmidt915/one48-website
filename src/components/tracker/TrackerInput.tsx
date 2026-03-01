"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Send, Camera, CameraOff, Loader2, Plus, Clock, Check, X } from 'lucide-react';
import { parseNutritionText, parseNutritionImage } from '@/services/geminiNutrition';
import { addNutritionEntries, getRecentEntries, NutritionEntry } from '@/services/nutritionService';

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
    '> Eintrag hinzufügen...',
    '> 2 Eier, Vollkornbrot...',
    '> 150g Hähnchen...',
    '> Haferflocken mit Milch...',
    '> Protein Shake 30g...',
];
const TYPING_SPEED = 38;
const PAUSE_DURATION = 2800;

type AudioBarsState = 'idle' | 'recording' | 'loading';

function AudioBars({ state }: { state: AudioBarsState }) {
    const getBarClass = (i: number) => {
        if (state === 'recording') return `trk-bar--rec-${i}`;
        if (state === 'loading') return `trk-bar--load-${i}`;
        return `trk-bar--idle-${i}`;
    };

    return (
        <div className="trk-bars-wrap">
            {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`trk-bar ${getBarClass(i)}`} />
            ))}
        </div>
    );
}

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

    // Special functions menu
    const [showSpecialMenu, setShowSpecialMenu] = useState(false);

    // History panel
    const [showHistory, setShowHistory] = useState(false);
    const [historyEntries, setHistoryEntries] = useState<NutritionEntry[]>([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

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

    // Click outside collapses input and closes special menu
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                if (!hasText) {
                    setIsActive(false);
                }
                setShowSpecialMenu(false);
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

                setIsRecording(false);
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

    const handleHistoryOpen = async () => {
        if (showHistory) {
            setShowHistory(false);
            return;
        }
        setShowHistory(true);
        setHistoryLoading(true);
        setSelectedItems(new Set());
        try {
            const recent = await getRecentEntries(14);
            const seen = new Set<string>();
            const deduped = recent.filter(e => {
                const key = e.foodDesc.toLowerCase().trim();
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            });
            setHistoryEntries(deduped);
        } catch (e) {
            console.error('Failed to load history', e);
            setHistoryEntries([]);
        } finally {
            setHistoryLoading(false);
        }
    };

    const toggleHistoryItem = (foodDesc: string) => {
        setSelectedItems(prev => {
            const next = new Set(prev);
            const key = foodDesc.toLowerCase().trim();
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    };

    const handleAddSelected = async () => {
        const toAdd = historyEntries
            .filter(e => selectedItems.has(e.foodDesc.toLowerCase().trim()))
            .map(({ id: _id, timestamp: _ts, ...rest }) => rest);

        if (toAdd.length === 0) return;

        try {
            await addNutritionEntries(toAdd, selectedDate);
            onEntriesAdded();
        } catch (e) {
            console.error('Failed to add history entries', e);
        }

        setShowHistory(false);
        setSelectedItems(new Set());
    };

    return (
        <div
            className="bg-[#f0efed]"
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
                {/* History panel */}
                {showHistory && (
                    <div className="flex flex-col gap-4 border border-[#e2e8f0] rounded-2xl p-4 mb-3 max-h-64 overflow-y-auto">
                        <div className="flex items-center justify-between">
                            <span className="[font-family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[1.1px] text-[#475569]">
                                Letzte Einträge
                            </span>
                            <button
                                type="button"
                                onClick={() => { setShowHistory(false); setSelectedItems(new Set()); }}
                                aria-label="Verlauf schließen"
                                className="text-[#94a3b8] hover:text-[#475569] transition-colors"
                            >
                                <X size={13} strokeWidth={2} />
                            </button>
                        </div>

                        {historyLoading ? (
                            <p className="[font-family:var(--font-ibm-plex-mono)] text-[11px] text-[#94a3b8] uppercase tracking-[0.5px]">
                                Lade Verlauf...
                            </p>
                        ) : historyEntries.length === 0 ? (
                            <p className="[font-family:var(--font-ibm-plex-mono)] text-[11px] text-[#94a3b8] uppercase tracking-[0.5px]">
                                Keine Einträge in den letzten 14 Tagen.
                            </p>
                        ) : (
                            <>
                                <div className="flex flex-col gap-4">
                                    {historyEntries.map((entry, idx) => {
                                        const key = entry.foodDesc.toLowerCase().trim();
                                        const isSelected = selectedItems.has(key);
                                        return (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => toggleHistoryItem(entry.foodDesc)}
                                                className="flex items-start gap-3 text-left w-full"
                                            >
                                                <div className={`mt-[3px] shrink-0 w-[11px] h-[11px] border flex items-center justify-center transition-colors ${isSelected ? 'border-[#111] bg-[#111]' : 'border-[#94a3b8]'}`}>
                                                    {isSelected && <Check size={7} strokeWidth={3} className="text-white" />}
                                                </div>
                                                <div className="flex flex-col gap-[2px]">
                                                    <span className={`[font-family:var(--font-ibm-plex-mono)] text-[13px] font-semibold leading-[17px] transition-colors ${isSelected ? 'text-[#0f172a]' : 'text-[#475569]'}`}>
                                                        {entry.foodDesc}
                                                    </span>
                                                    <span className="[font-family:var(--font-ibm-plex-mono)] text-[11px] text-[#94a3b8] leading-[16px]">
                                                        {entry.kcal} kcal, {entry.carbs}g Carbs, {entry.protein}g Protein, {entry.fat}g Fett
                                                    </span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {selectedItems.size > 0 && (
                                    <button
                                        type="button"
                                        onClick={handleAddSelected}
                                        className="[font-family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[1.1px] text-[#111] self-start"
                                    >
                                        &gt; {selectedItems.size} Eintrag{selectedItems.size !== 1 ? 'e' : ''} hinzufügen
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                )}

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
                    <div className="relative">
                        {/* Popup buttons — outside overflow-hidden pill so they aren't clipped */}
                        <div className={`absolute bottom-full left-0 mb-2 w-[53px] flex flex-col gap-2 items-center transition-all duration-200 z-10 ${showSpecialMenu ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-1'}`}>
                            {/* History button — top */}
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); handleHistoryOpen(); setShowSpecialMenu(false); }}
                                aria-label="Verlauf anzeigen"
                                className="w-[44px] h-[44px] rounded-full bg-black hover:bg-zinc-700 text-white transition-colors flex items-center justify-center"
                            >
                                <Clock size={18} strokeWidth={1.5} />
                            </button>
                            {/* Camera button — bottom */}
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); handleCameraClick(); setShowSpecialMenu(false); }}
                                aria-label="Foto aufnehmen"
                                className="w-[44px] h-[44px] rounded-full bg-black hover:bg-zinc-700 text-white transition-colors flex items-center justify-center"
                            >
                                <Camera size={18} strokeWidth={1.5} />
                            </button>
                        </div>

                    <div
                        className="border border-[#cbd5e1] overflow-hidden rounded-full"
                        onClick={() => {
                            setIsActive(true);
                            textareaRef.current?.focus();
                        }}
                    >
                        {/* Input row */}
                        <div className="flex items-stretch">
                            {/* Special functions button */}
                            <div className="w-[53px] flex-none self-stretch flex">
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); setShowSpecialMenu(prev => !prev); }}
                                    disabled={isLoading}
                                    aria-label="Sonderfunktionen"
                                    className="w-full h-full rounded-full bg-[#e4e3e0] hover:bg-[#d9d8d5] text-[#475569] transition-colors flex items-center justify-center"
                                >
                                    <Plus
                                        size={20}
                                        strokeWidth={1.5}
                                        className={`transition-transform duration-200 ${showSpecialMenu ? 'rotate-45' : ''}`}
                                    />
                                </button>
                            </div>

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

                            {/* Right slot */}
                            <div className="w-[53px] flex-none flex items-center justify-center">
                                {hasText ? (
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); handleSubmit(); }}
                                        disabled={isLoading}
                                        aria-label="Absenden"
                                        className="bg-black hover:bg-zinc-700 text-white transition-colors flex items-center justify-center w-full h-full rounded-full"
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
                                        className="w-full h-full rounded-full bg-black flex items-center justify-center"
                                    >
                                        <AudioBars state={isLoading ? 'loading' : isRecording ? 'recording' : 'idle'} />
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                    </div>
                )}
            </div>
        </div>
    );
}
