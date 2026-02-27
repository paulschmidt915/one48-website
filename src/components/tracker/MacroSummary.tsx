"use client"

import React from 'react';

interface MacroSummaryProps {
    dateStr: string;
    kcal: number;
    protein: number;
    fat: number;
    carbs: number;
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

export default function MacroSummary({ dateStr, kcal, protein, fat, carbs }: MacroSummaryProps) {
    let weekdayStr = "";
    let dateFormatted = "";

    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
        weekdayStr = d.toLocaleDateString("de-DE", { weekday: 'long' });
        dateFormatted = d.toLocaleDateString("de-DE", { day: '2-digit', month: 'long' });

        // Custom logic for "Heute" if it's today
        const today = new Date().toISOString().split('T')[0];
        if (dateStr === today) {
            weekdayStr = "Heute";
        }
    }

    return (
        <div className="w-full max-w-sm mx-auto pt-2 pb-2 bg-transparent">
            {/* Date Section */}
            <div className="text-center mb-8">
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{weekdayStr}</p>
                <h2 className="text-black text-xl font-bold">{dateFormatted}</h2>
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
