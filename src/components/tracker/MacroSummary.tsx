"use client"

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MacroSummaryProps {
    dateStr: string;
    kcal: number;
    protein: number;
    fat: number;
    carbs: number;
    onPrevDate: () => void;
    onNextDate: () => void;
}

const ProgressBar = ({ label, current, max, unit }: { label: string, current: number, max: number, unit: string }) => {
    const progress = Math.min((current / max) * 100, 100);

    return (
        <div className="mb-6 w-full">
            <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">{label}</span>
                <span className="text-sm font-medium text-gray-400">
                    <span className="text-gray-800">{current}</span> {unit ? `/ ${max}${unit}` : `/ ${max}`}
                </span>
            </div>
            <div className="h-[2px] w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gray-600 transition-all duration-1000 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default function MacroSummary({ dateStr, kcal, protein, fat, carbs, onPrevDate, onNextDate }: MacroSummaryProps) {
    let weekdayStr = "";
    let dateFormatted = "";

    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
        weekdayStr = d.toLocaleDateString("de-DE", { weekday: 'long' });
        dateFormatted = d.toLocaleDateString("de-DE", { day: '2-digit', month: 'long' });

        // Custom logic for "Heute" if it's today
        const todayDate = new Date();
        const year = todayDate.getFullYear();
        const month = String(todayDate.getMonth() + 1).padStart(2, '0');
        const day = String(todayDate.getDate()).padStart(2, '0');
        const today = `${year}-${month}-${day}`;
        if (dateStr === today) {
            weekdayStr = "Heute";
        }
    }

    return (
        <div className="w-full max-w-sm mx-auto pt-2 pb-2 bg-transparent">
            {/* Date Section */}
            <div className="flex items-center justify-between mb-8 px-4">
                <button onClick={onPrevDate} className="p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-100">
                    <ChevronLeft size={28} />
                </button>
                <div className="text-center flex-1">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{weekdayStr}</p>
                    <h2 className="text-black text-xl font-bold">{dateFormatted}</h2>
                </div>
                <button onClick={onNextDate} className="p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-100">
                    <ChevronRight size={28} />
                </button>
            </div>

            {/* Macros Section */}
            <div className="flex flex-col w-full px-2">
                <ProgressBar label="Kcal" current={kcal} max={2100} unit="" />
                <ProgressBar label="Protein" current={protein} max={180} unit="" />
                <ProgressBar label="Carbs" current={carbs} max={210} unit="" />
                <ProgressBar label="Fett" current={fat} max={60} unit="" />
            </div>
        </div>
    );
}
