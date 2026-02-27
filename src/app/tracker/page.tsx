"use client"

import React, { useEffect, useState } from 'react';
import MacroSummary from '@/components/tracker/MacroSummary';
import TrackerInput from '@/components/tracker/TrackerInput';
import EntryList from '@/components/tracker/EntryList';
import { getNutritionEntries, addNutritionEntries, deleteNutritionEntry, NutritionEntry, getLocalDateString } from '@/services/nutritionService';
import { Loader2 } from 'lucide-react';

export default function TrackerPage() {
    const [entries, setEntries] = useState<NutritionEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dateStr, setDateStr] = useState(getLocalDateString());

    const fetchEntries = async () => {
        setIsLoading(true);
        try {
            const data = await getNutritionEntries(dateStr);
            setEntries(data);
        } catch (error) {
            console.error("Failed to fetch entries:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, [dateStr]);

    const handleDelete = async (id: string) => {
        try {
            await deleteNutritionEntry(id, dateStr);
            await fetchEntries();
        } catch (error) {
            console.error("Failed to delete entry:", error);
        }
    };

    const handleAddEntries = async (newEntries: NutritionEntry[]) => {
        try {
            await addNutritionEntries(newEntries, dateStr);
            await fetchEntries();
        } catch (error) {
            console.error("Failed to add entries:", error);
        }
    };

    const totalKcal = entries.reduce((acc, e) => acc + (e.kcal || 0), 0);
    const totalProtein = entries.reduce((acc, e) => acc + (e.protein || 0), 0);
    const totalFat = entries.reduce((acc, e) => acc + (e.fat || 0), 0);
    const totalCarbs = entries.reduce((acc, e) => acc + (e.carbs || 0), 0);

    const handlePrevDate = () => {
        const d = new Date(dateStr);
        d.setDate(d.getDate() - 1);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        setDateStr(`${year}-${month}-${day}`);
    };

    const handleNextDate = () => {
        const d = new Date(dateStr);
        d.setDate(d.getDate() + 1);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        setDateStr(`${year}-${month}-${day}`);
    };

    return (
        <div className="min-h-screen">
            <MacroSummary
                dateStr={dateStr}
                kcal={totalKcal}
                protein={totalProtein}
                fat={totalFat}
                carbs={totalCarbs}
                onPrevDate={handlePrevDate}
                onNextDate={handleNextDate}
            />

            {isLoading ? (
                <div className="flex justify-center px-6 py-16">
                    <Loader2 className="animate-spin text-[#94a3b8]" size={24} strokeWidth={1.5} />
                </div>
            ) : entries.length === 0 ? (
                <div className="px-6 py-16">
                    <p className="[font-family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.275px] text-[#94a3b8]">
                        Keine Einträge für diesen Tag.
                    </p>
                    {dateStr === getLocalDateString() && (
                        <p className="[font-family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.275px] text-[#94a3b8] mt-1">
                            Erzähle mir, was du gegessen hast.
                        </p>
                    )}
                </div>
            ) : (
                <EntryList entries={entries} onDelete={handleDelete} onAddEntries={handleAddEntries} />
            )}

            <TrackerInput onEntriesAdded={fetchEntries} selectedDate={dateStr} />
        </div>
    );
}
