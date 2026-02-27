"use client"

import React, { useEffect, useState } from 'react';
import { getNutritionEntries, NutritionEntry } from '@/services/nutritionService';
import { ChevronLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

const formatDateStr = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

interface DaySummary {
    dateStr: string;
    dayName: string;
    shortDate: string;
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
    isToday: boolean;
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
                <div
                    className="absolute top-0 bottom-0 left-0 bg-black transition-all duration-1000 ease-out"
                    style={{ right: `${100 - progress}%` }}
                />
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

const MiniBar = ({ current, max, isOver }: { current: number; max: number; isOver: boolean }) => {
    const progress = Math.min((current / max) * 100, 100);
    const overflowProgress = isOver ? Math.min(((current - max) / max) * 100, 100) : 0;

    return (
        <div className="bg-[#cbd5e1] h-px w-full relative overflow-hidden">
            <div
                className="absolute top-0 bottom-0 left-0 bg-black"
                style={{ right: `${100 - progress}%` }}
            />
            {isOver && (
                <div
                    className="absolute top-0 bottom-0 left-0 bg-red-900"
                    style={{ right: `${100 - overflowProgress}%` }}
                />
            )}
        </div>
    );
};

export default function WeekSummaryPage() {
    const [weekSummary, setWeekSummary] = useState<DaySummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const goalKcal = 2100;
    const goalProtein = 180;
    const goalCarbs = 210;
    const goalFat = 60;

    useEffect(() => {
        const fetchWeekData = async () => {
            setIsLoading(true);
            try {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const dayOfWeek = today.getDay();
                const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
                const monday = new Date(today.setDate(diff));

                const days: DaySummary[] = [];
                const promises = [];

                for (let i = 0; i < 7; i++) {
                    const d = new Date(monday);
                    d.setDate(monday.getDate() + i);
                    const dateStr = formatDateStr(d);
                    const isToday = d.toDateString() === new Date().toDateString();

                    let dayName = d.toLocaleDateString("de-DE", { weekday: 'short' }).toUpperCase();
                    if (isToday) dayName = "HEUTE";

                    const shortDate = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`;

                    days.push({ dateStr, dayName, shortDate, kcal: 0, protein: 0, carbs: 0, fat: 0, isToday });
                    promises.push(getNutritionEntries(dateStr));
                }

                const results = await Promise.all(promises);
                results.forEach((entries: NutritionEntry[], i: number) => {
                    days[i].kcal = entries.reduce((acc, e) => acc + (e.kcal || 0), 0);
                    days[i].protein = entries.reduce((acc, e) => acc + (e.protein || 0), 0);
                    days[i].carbs = entries.reduce((acc, e) => acc + (e.carbs || 0), 0);
                    days[i].fat = entries.reduce((acc, e) => acc + (e.fat || 0), 0);
                });

                setWeekSummary(days);
            } catch (error) {
                console.error("Failed to fetch week entries:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeekData();
    }, []);

    const todayMillis = new Date().setHours(0, 0, 0, 0);
    const daysPassed = weekSummary.filter(d => new Date(d.dateStr + 'T00:00:00').setHours(0, 0, 0, 0) <= todayMillis).length || 1;

    const weekTotalKcal = weekSummary.reduce((sum, d) => sum + d.kcal, 0);
    const weekTotalProtein = weekSummary.reduce((sum, d) => sum + d.protein, 0);
    const weekTotalCarbs = weekSummary.reduce((sum, d) => sum + d.carbs, 0);
    const weekTotalFat = weekSummary.reduce((sum, d) => sum + d.fat, 0);

    const weekGoalKcal = goalKcal * daysPassed;
    const weekGoalProtein = goalProtein * daysPassed;
    const weekGoalCarbs = goalCarbs * daysPassed;
    const weekGoalFat = goalFat * daysPassed;

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="border-b border-[#cbd5e1] pb-6 pt-10 px-6">
                <div className="h-8" />
                <div className="flex items-center gap-3">
                    <Link
                        href="/tracker"
                        className="text-[#475569] hover:text-[#111] transition-colors"
                        aria-label="Zurück"
                    >
                        <ChevronLeft size={16} strokeWidth={1.5} />
                    </Link>
                    <h1 className="[font-family:var(--font-ibm-plex-mono)] text-[20px] font-medium text-[#111] uppercase tracking-[-0.5px]">
                        Diese Woche
                    </h1>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center px-6 py-16">
                    <Loader2 className="animate-spin text-[#94a3b8]" size={24} strokeWidth={1.5} />
                </div>
            ) : (
                <>
                    {/* Weekly Totals */}
                    <div className="px-6 pt-8 pb-8 border-b border-dashed border-[#cbd5e1] flex flex-col gap-5">
                        <MacroBar label="Kcal" current={weekTotalKcal} max={weekGoalKcal} unit="" />
                        <MacroBar label="Protein" current={weekTotalProtein} max={weekGoalProtein} unit="g" />
                        <MacroBar label="Carbohydrates" current={weekTotalCarbs} max={weekGoalCarbs} unit="g" />
                        <MacroBar label="Fat" current={weekTotalFat} max={weekGoalFat} unit="g" />
                    </div>

                    {/* Daily Breakdown */}
                    <div className="px-6 pt-4 pb-32 flex flex-col">
                        {weekSummary.map((day) => {
                            const isFuture = new Date(day.dateStr + 'T00:00:00').setHours(0, 0, 0, 0) > todayMillis;
                            const isEmpty = day.kcal === 0 && !day.isToday;
                            const isDimmed = isFuture || isEmpty;

                            return (
                                <div
                                    key={day.dateStr}
                                    className={`py-5 border-b border-dashed border-[#cbd5e1] flex flex-col gap-4 transition-opacity ${isDimmed ? 'opacity-40' : ''}`}
                                >
                                    {/* Day row */}
                                    <div className="flex items-baseline justify-between">
                                        <div className="flex items-baseline gap-3">
                                            <span className="[font-family:var(--font-ibm-plex-mono)] text-[14px] font-semibold tracking-[1.4px] uppercase text-[#111]">
                                                {day.dayName}
                                            </span>
                                            <span className="[font-family:var(--font-ibm-plex-mono)] text-[11px] text-[#94a3b8]">
                                                {day.shortDate}
                                            </span>
                                        </div>
                                        <span className={`[font-family:var(--font-ibm-plex-mono)] text-[12px] font-medium ${day.kcal > goalKcal ? 'text-red-800' : 'text-[#111]'}`}>
                                            {day.kcal} / {goalKcal}
                                        </span>
                                    </div>

                                    {/* Micro bars */}
                                    <div className="flex gap-6">
                                        <div className="flex-1 flex flex-col gap-1.5">
                                            <div className="flex justify-between [font-family:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.5px] text-[#94a3b8]">
                                                <span>Protein</span>
                                                <span>{day.protein}/{goalProtein}</span>
                                            </div>
                                            <MiniBar current={day.protein} max={goalProtein} isOver={day.protein > goalProtein} />
                                        </div>
                                        <div className="flex-1 flex flex-col gap-1.5">
                                            <div className="flex justify-between [font-family:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.5px] text-[#94a3b8]">
                                                <span>Carbs</span>
                                                <span>{day.carbs}/{goalCarbs}</span>
                                            </div>
                                            <MiniBar current={day.carbs} max={goalCarbs} isOver={day.carbs > goalCarbs} />
                                        </div>
                                        <div className="flex-1 flex flex-col gap-1.5">
                                            <div className="flex justify-between [font-family:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.5px] text-[#94a3b8]">
                                                <span>Fett</span>
                                                <span>{day.fat}/{goalFat}</span>
                                            </div>
                                            <MiniBar current={day.fat} max={goalFat} isOver={day.fat > goalFat} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
