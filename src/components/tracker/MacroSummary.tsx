"use client"

import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import Link from 'next/link';

interface MacroSummaryProps {
    dateStr: string;
    kcal: number;
    protein: number;
    fat: number;
    carbs: number;
    onPrevDate: () => void;
    onNextDate: () => void;
}

const MacroBar = ({ label, current, max, unit }: { label: string; current: number; max: number; unit: string }) => {
    const isOver = current > max;
    const progress = Math.min((current / max) * 100, 100);
    const overflowProgress = isOver ? Math.min(((current - max) / max) * 100, 100) : 0;

    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="flex items-end justify-between pb-1">
                <span className={`[font-family:var(--font-ibm-plex-mono)] text-[11px] font-semibold tracking-[1.1px] uppercase ${isOver ? 'text-red-800' : 'text-[#111]'}`}>
                    {label}
                </span>
                <span className={`[font-family:var(--font-ibm-plex-mono)] text-[12px] font-medium ${isOver ? 'text-red-800' : 'text-[#111]'}`}>
                    {current}{unit} / {max}{unit}
                </span>
            </div>
            <div className="bg-[#cbd5e1] h-px w-full relative overflow-hidden">
                {/* Normal fill */}
                <div
                    className="absolute top-0 bottom-0 left-0 bg-black transition-all duration-1000 ease-out"
                    style={{ right: `${100 - progress}%` }}
                />
                {/* Overflow indicator: dark red bar restarting from left */}
                {isOver && (
                    <div
                        className="absolute top-0 bottom-0 left-0 bg-red-900 transition-all duration-1000 ease-out"
                        style={{ right: `${100 - overflowProgress}%` }}
                    />
                )}
            </div>
        </div>
    );
};

export default function MacroSummary({ dateStr, kcal, protein, fat, carbs, onPrevDate, onNextDate }: MacroSummaryProps) {
    let dateFormatted = "";

    const d = new Date(dateStr + 'T00:00:00');
    if (!isNaN(d.getTime())) {
        const day = d.getDate();
        const month = d.toLocaleDateString("en-US", { month: 'long' }).toUpperCase();
        dateFormatted = `${day} ${month}`;
    }

    return (
        <div className="w-full">
            {/* Header */}
            <div className="border-b border-[#cbd5e1] pb-6 pt-10 px-6">
                {/* Status bar spacer */}
                <div className="h-8" />

                {/* Date Navigation */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/tracker/week"
                        className="p-1 text-[#475569] hover:text-[#111] transition-colors"
                    >
                        <Calendar size={18} strokeWidth={1.5} />
                    </Link>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={onPrevDate}
                            aria-label="Vorheriger Tag"
                            className="text-[#475569] hover:text-[#111] transition-colors"
                        >
                            <ChevronLeft size={16} strokeWidth={1.5} />
                        </button>

                        <h2 className="[font-family:var(--font-ibm-plex-mono)] text-[20px] font-medium text-[#111] uppercase tracking-[-0.5px] min-w-[160px] text-center">
                            {dateFormatted}
                        </h2>

                        <button
                            type="button"
                            onClick={onNextDate}
                            aria-label="Nächster Tag"
                            className="text-[#475569] hover:text-[#111] transition-colors"
                        >
                            <ChevronRight size={16} strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* Spacer to balance calendar icon */}
                    <div className="w-[26px]" />
                </div>
            </div>

            {/* Macro Bars */}
            <div className="px-6 pt-8 pb-8 border-b border-dashed border-[#cbd5e1] flex flex-col gap-5">
                <MacroBar label="Kcal" current={kcal} max={2100} unit="" />
                <MacroBar label="Protein" current={protein} max={180} unit="g" />
                <MacroBar label="Carbohydrates" current={carbs} max={210} unit="g" />
                <MacroBar label="Fat" current={fat} max={60} unit="g" />
            </div>
        </div>
    );
}
