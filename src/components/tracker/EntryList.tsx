"use client"

import React, { useMemo } from 'react';
import { NutritionEntry } from '@/services/nutritionService';
import { Flame, Trash2, Utensils, Coffee, Apple, Pizza, Croissant, Beef, Fish, Carrot, Milk, Egg } from 'lucide-react';

interface EntryListProps {
    entries: NutritionEntry[];
    onDelete: (id: string) => void;
}

function getIconForFood(desc: string) {
    const d = desc.toLowerCase();
    if (d.includes('kaffee') || d.includes('coffee') || d.includes('tee ') || d.includes('tea') || d.includes('getränk') || d.includes('cappuccino') || d.includes('latte')) return <Coffee size={20} className="text-gray-400" strokeWidth={1.5} />;
    if (d.includes('apfel') || d.includes('apple') || d.includes('obst') || d.includes('banane') || d.includes('fruit') || d.includes('beeri') || d.includes('mango')) return <Apple size={20} className="text-gray-400" strokeWidth={1.5} />;
    if (d.includes('pizza') || d.includes('burger')) return <Pizza size={20} className="text-gray-400" strokeWidth={1.5} />;
    if (d.includes('brot') || d.includes('brötchen') || d.includes('croissant') || d.includes('toast')) return <Croissant size={20} className="text-gray-400" strokeWidth={1.5} />;
    if (d.includes('fleisch') || d.includes('beef') || d.includes('steak') || d.includes('chicken') || d.includes('hähnchen') || d.includes('rind')) return <Beef size={20} className="text-gray-400" strokeWidth={1.5} />;
    if (d.includes('fisch') || d.includes('fish') || d.includes('lachs') || d.includes('thunfisch')) return <Fish size={20} className="text-gray-400" strokeWidth={1.5} />;
    if (d.includes('gemüse') || d.includes('veg') || d.includes('salat') || d.includes('salad') || d.includes('karotte') || d.includes('tomate')) return <Carrot size={20} className="text-gray-400" strokeWidth={1.5} />;
    if (d.includes('milch') || d.includes('milk') || d.includes('käse') || d.includes('cheese') || d.includes('quark') || d.includes('joghurt') || d.includes('skyr')) return <Milk size={20} className="text-gray-400" strokeWidth={1.5} />;
    if (d.includes('ei ') || d.includes('eier') || d.includes('egg') || d.includes('rührei')) return <Egg size={20} className="text-gray-400" strokeWidth={1.5} />;

    return <Utensils size={20} className="text-gray-400" strokeWidth={1.5} />;
}



function getMealTag(timestamp: number | undefined): string {
    if (!timestamp) return 'Snack';
    const date = new Date(timestamp);
    const hour = date.getHours();
    if (hour < 11) return 'Frühstück';
    if (hour >= 12 && hour < 15) return 'Lunch';
    if (hour >= 18 && hour < 22) return 'Dinner';
    return 'Snack';
}

const CATEGORY_ORDER = ['Frühstück', 'Lunch', 'Dinner', 'Snack'];

export default function EntryList({ entries, onDelete }: EntryListProps) {
    const groupedEntries = useMemo(() => {
        const groups: Record<string, NutritionEntry[]> = {
            'Frühstück': [],
            'Lunch': [],
            'Dinner': [],
            'Snack': []
        };

        entries.forEach(entry => {
            const tag = getMealTag(entry.timestamp);
            if (groups[tag]) {
                groups[tag].push(entry);
            } else {
                groups['Snack'].push(entry);
            }
        });

        // Return only groups that have entries, sorted according to CATEGORY_ORDER
        return CATEGORY_ORDER
            .map(tag => ({ tag, entries: groups[tag] }))
            .filter(group => group.entries.length > 0);
    }, [entries]);

    if (entries.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="w-16 h-16 bg-gray-100 rounded-3xl mb-4 flex items-center justify-center">
                    <Flame className="text-gray-300" size={24} />
                </div>
                <p className="text-sm">Noch keine Einträge heute.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-lg mx-auto mt-6 pb-32 flex flex-col gap-6">
            {groupedEntries.map((group, groupIdx) => (
                <div key={groupIdx} className="flex flex-col">
                    <div className="mb-2 border-b-2 border-black pb-1 flex items-baseline">
                        <h2 className="text-lg font-bold text-black">{group.tag}</h2>
                    </div>

                    <div className="flex flex-col">
                        {group.entries.map((entry, idx) => (
                            <SwipeableEntry
                                key={entry.id || idx}
                                entry={entry}
                                onDelete={() => entry.id && onDelete(entry.id)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

function SwipeableEntry({ entry, onDelete }: { entry: NutritionEntry, onDelete: () => void }) {
    const [offset, setOffset] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false);
    const startX = React.useRef(0);
    const currentX = React.useRef(0);
    const SWIPE_THRESHOLD = -40;
    const MAX_SWIPE = -80; // Width of the delete button

    const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        startX.current = clientX;
        currentX.current = clientX;
    };

    const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging) return;
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        currentX.current = clientX;
        const diff = currentX.current - startX.current;

        // Only allow swiping left
        if (diff < 0) {
            // Apply resistance if swiping past max
            const newOffset = diff < MAX_SWIPE ? MAX_SWIPE + (diff - MAX_SWIPE) * 0.2 : diff;
            setOffset(newOffset);
        } else {
            setOffset(0);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        if (offset < SWIPE_THRESHOLD) {
            // Keep it open
            setOffset(MAX_SWIPE);
        } else {
            // Snap back
            setOffset(0);
        }
    };

    return (
        <div className="overflow-hidden py-2">
            <div
                className="flex items-center w-full transition-transform"
                style={{
                    transform: `translateX(${offset}px)`,
                    transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleTouchStart}
                onMouseMove={handleTouchMove}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
            >
                {/* Main Content */}
                <div className="flex-1 flex items-start gap-4 min-w-full cursor-grab active:cursor-grabbing pb-1">
                    <div className="pt-0.5">
                        {getIconForFood(entry.foodDesc)}
                    </div>

                    <div className="flex-1">
                        <div className="mb-0.5">
                            <h3 className="font-medium text-gray-800 pr-4">{entry.foodDesc}</h3>
                        </div>

                        <div className="text-[13px] text-gray-500 font-normal tracking-wide">
                            {entry.kcal} kcal, {entry.carbs} Carbs, {entry.protein} Protein, {entry.fat} Fett
                        </div>
                    </div>
                </div>

                {/* Delete Button (Sits right outside the view) */}
                <div className="w-[80px] shrink-0 flex justify-end pl-4">
                    <button
                        onClick={onDelete}
                        className="bg-red-500 text-white p-3 rounded-2xl flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
