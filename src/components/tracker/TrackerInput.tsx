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
                // Compress to 80% quality JPEG
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

    // Image state
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [amountText, setAmountText] = useState('');

    useEffect(() => {
        // Setup Speech Recognition
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
            // Komprimiere das Bild, um "Payload too large" Fehler bei Handy-Fotos zu vermeiden
            const compressedBase64 = await compressImage(file);
            setCapturedImage(compressedBase64);
        } catch (error) {
            console.error("Error compressing image:", error);
            // Fallback auf originales Bild
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
                // Parse Image
                const base64Data = capturedImage.split(',')[1];
                const mimeType = capturedImage.split(';')[0].split(':')[1];

                const result = await parseNutritionImage(base64Data, mimeType, amountText);
                entries = Array.isArray(result) ? result : [result];
            } else {
                // Parse Text
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
        <div className="fixed bottom-6 left-0 right-0 px-4 md:px-0 flex justify-center z-50">
            <div className="w-full max-w-lg bg-white/80 backdrop-blur-2xl rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-white p-2">

                {capturedImage ? (
                    <div className="p-4 flex flex-col gap-4">
                        <div className="flex gap-4 items-center">
                            <img src={capturedImage} alt="Captured" className="w-16 h-16 object-cover rounded-2xl border border-gray-100 shadow-sm" />
                            <div className="flex-1 flex flex-col gap-2">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Menge eingeben</span>
                                <input
                                    type="text"
                                    value={amountText}
                                    onChange={(e) => setAmountText(e.target.value)}
                                    placeholder="z.B. 150g, 1 Packung"
                                    className="w-full bg-gray-100/50 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black transition-all"
                                    disabled={isLoading}
                                />
                            </div>
                            <button
                                onClick={() => setCapturedImage(null)}
                                className="p-3 text-red-500 bg-red-50 hover:bg-red-100 rounded-2xl transition-all"
                                disabled={isLoading}
                            >
                                <CameraOff size={20} />
                            </button>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading || !amountText.trim()}
                            className="bg-black text-white w-full rounded-2xl py-3.5 font-medium flex justify-center items-center gap-2 hover:bg-gray-800 transition-all disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Eintrag speichern"}
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 relative">
                        <button
                            onClick={handleCameraClick}
                            disabled={isLoading}
                            className="p-3.5 text-gray-400 hover:text-black hover:bg-gray-100/50 rounded-full transition-all"
                        >
                            <Camera size={22} />
                        </button>

                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                        />

                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                            placeholder="Eintrag eingeben..."
                            disabled={isLoading}
                            className="flex-1 bg-transparent px-2 text-[15px] outline-none placeholder-gray-400 text-gray-800"
                        />

                        {text.trim() ? (
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="p-3.5 bg-black text-white rounded-full hover:scale-105 active:scale-95 transition-all disabled:bg-gray-300"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} className="ml-0.5" />}
                            </button>
                        ) : (
                            <button
                                onClick={toggleRecording}
                                disabled={isLoading || !recognitionRef.current}
                                className={`p-3.5 text-gray-400 hover:text-black hover:bg-gray-100/50 rounded-full transition-all ${isRecording ? 'text-red-500 animate-pulse bg-red-50' : ''}`}
                            >
                                <Mic size={22} />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
