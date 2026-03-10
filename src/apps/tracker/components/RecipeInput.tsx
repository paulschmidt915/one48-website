"use client"

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

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

interface RecipeInputProps {
    onSubmit: (text: string, audioData?: { inlineData: { data: string; mimeType: string } }) => void;
    isLoading: boolean;
}

export default function RecipeInput({ onSubmit, isLoading }: RecipeInputProps) {
    const [text, setText] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    useEffect(() => {
        if (!isLoading) setIsSubmitting(false);
    }, [isLoading]);

    const hasText = text.trim().length > 0;

    useEffect(() => {
        if (!text && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    }, [text]);

    const handleSubmit = () => {
        if (!text.trim() || isLoading) return;
        setIsSubmitting(true);
        onSubmit(text.trim());
        setText('');
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

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
                setIsSubmitting(true);
                const audioData = {
                    inlineData: {
                        data: base64.split(',')[1],
                        mimeType: mimeType || 'audio/mp4',
                    },
                };
                onSubmit('', audioData);
            };

            recorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Microphone error:", err);
            alert("Mikrofon konnte nicht gestartet werden.");
        }
    };

    return (
        <div className="bg-[#f0efed]">
            <div className="tracker-input-bar px-4">
                <div className="border border-[#cbd5e1] rounded-full overflow-hidden">
                    <div className="flex items-stretch">
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
                            placeholder="> Rezept-Idee eingeben..."
                            disabled={isLoading || isRecording}
                            className="flex-1 bg-transparent [font-family:var(--font-ibm-plex-mono)] text-[14px] text-[#111] placeholder-[#94a3b8] outline-none resize-none overflow-hidden leading-[1.5] py-[16px] px-4"
                        />

                        <div className="w-[53px] flex-none flex items-center justify-center">
                            {hasText ? (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    aria-label="Absenden"
                                    className="bg-black hover:bg-zinc-700 text-white transition-colors flex items-center justify-center w-full h-full rounded-full"
                                >
                                    {isSubmitting
                                        ? <Loader2 className="animate-spin" size={14} strokeWidth={2} />
                                        : <Send size={14} strokeWidth={2} />
                                    }
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={toggleRecording}
                                    disabled={isLoading}
                                    aria-label={isRecording ? 'Aufnahme stoppen' : 'Spracheingabe starten'}
                                    className="w-full h-full rounded-full bg-black flex items-center justify-center"
                                >
                                    <AudioBars state={isSubmitting ? 'loading' : isRecording ? 'recording' : 'idle'} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
