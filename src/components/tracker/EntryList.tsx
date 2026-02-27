"use client"

import React, { useMemo, useState } from 'react';
import { NutritionEntry, getRecentEntries } from '@/services/nutritionService';
import { X, Clock, Check } from 'lucide-react';

interface EntryListProps {
    entries: NutritionEntry[];
    onDelete: (id: string) => void;
    onAddEntries?: (entries: NutritionEntry[]) => void;
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

export default function EntryList({ entries, onDelete, onAddEntries }: EntryListProps) {
    const [historyCategory, setHistoryCategory] = useState<string | null>(null);
    const [historyEntries, setHistoryEntries] = useState<NutritionEntry[]>([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

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

        return CATEGORY_ORDER
            .map(tag => ({ tag, entries: groups[tag] }))
            .filter(group => group.entries.length > 0);
    }, [entries]);

    const handleHistoryClick = async (category: string) => {
        if (historyCategory === category) {
            setHistoryCategory(null);
            setSelectedItems(new Set());
            return;
        }

        setHistoryCategory(category);
        setSelectedItems(new Set());
        setHistoryLoading(true);

        try {
            const recent = await getRecentEntries(14);
            const filtered = recent.filter(e => getMealTag(e.timestamp) === category);

            const seen = new Set<string>();
            const deduped = filtered.filter(e => {
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

    const toggleItem = (foodDesc: string) => {
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

    const handleAddSelected = () => {
        const toAdd = historyEntries
            .filter(e => selectedItems.has(e.foodDesc.toLowerCase().trim()))
            .map(({ id: _id, timestamp: _ts, ...rest }) => rest);

        if (toAdd.length > 0) {
            onAddEntries?.(toAdd);
        }

        setHistoryCategory(null);
        setSelectedItems(new Set());
    };

    if (entries.length === 0) return null;

    return (
        <div className="w-full pb-32 px-6 pt-4 flex flex-col gap-10">
            {groupedEntries.map((group, groupIdx) => (
                <div key={groupIdx} className="flex flex-col gap-5">
                    {/* Section Header */}
                    <div className="flex items-center justify-between">
                        <div className="[font-family:var(--font-ibm-plex-mono)] text-[14px] font-semibold tracking-[1.4px] uppercase text-[#111]">
                            {group.tag}
                        </div>
                        <button
                            type="button"
                            onClick={() => handleHistoryClick(group.tag)}
                            aria-label={`Verlauf für ${group.tag}`}
                            className={`transition-colors ${historyCategory === group.tag ? 'text-[#111]' : 'text-[#94a3b8] hover:text-[#475569]'}`}
                        >
                            <Clock size={13} strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* History Panel */}
                    {historyCategory === group.tag && (
                        <div className="flex flex-col gap-4 border-l border-[#e2e8f0] pl-4 -mt-1">
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
                                                    onClick={() => toggleItem(entry.foodDesc)}
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
                                                            {entry.kcal} kcal · {entry.carbs}g C · {entry.protein}g P · {entry.fat}g F
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

                    {/* Entries */}
                    <div className="flex flex-col gap-6">
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

function SwipeableEntry({ entry, onDelete }: { entry: NutritionEntry; onDelete: () => void }) {
    const innerRef = React.useRef<HTMLDivElement>(null);
    const isDragging = React.useRef(false);
    const currentOffset = React.useRef(0);
    const startX = React.useRef(0);
    const SWIPE_THRESHOLD = -40;
    const MAX_SWIPE = -72;

    const applyTransform = (offset: number, animated: boolean) => {
        if (!innerRef.current) return;
        innerRef.current.style.transition = animated ? 'transform 0.2s ease-out' : 'none';
        innerRef.current.style.transform = `translateX(${offset}px)`;
    };

    const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
        isDragging.current = true;
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        startX.current = clientX;
        applyTransform(currentOffset.current, false);
    };

    const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging.current) return;
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const diff = clientX - startX.current;
        const newOffset = diff < 0
            ? (diff < MAX_SWIPE ? MAX_SWIPE + (diff - MAX_SWIPE) * 0.2 : diff)
            : 0;
        currentOffset.current = newOffset;
        applyTransform(newOffset, false);
    };

    const handleTouchEnd = () => {
        isDragging.current = false;
        const snapped = currentOffset.current < SWIPE_THRESHOLD ? MAX_SWIPE : 0;
        currentOffset.current = snapped;
        applyTransform(snapped, true);
    };

    return (
        <div className="overflow-hidden group">
            <div
                ref={innerRef}
                className="flex items-start w-full"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleTouchStart}
                onMouseMove={handleTouchMove}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
            >
                {/* Main Content */}
                <div className="flex-1 flex flex-col gap-[3.75px] min-w-full cursor-grab active:cursor-grabbing">
                    <div className="flex items-start justify-between">
                        <span className="[font-family:var(--font-ibm-plex-mono)] text-[14px] font-semibold text-[#0f172a] leading-[17.5px] pr-4">
                            {entry.foodDesc}
                        </span>
                        {/* Desktop hover delete */}
                        <button
                            type="button"
                            onClick={onDelete}
                            aria-label="Eintrag löschen"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-[#94a3b8] hover:text-red-500 shrink-0"
                        >
                            <X size={12} strokeWidth={2} />
                        </button>
                    </div>
                    <span className="[font-family:var(--font-ibm-plex-mono)] text-[11px] font-normal text-[#475569] leading-[16.5px]">
                        {entry.kcal} kcal, {entry.carbs}g Carbs, {entry.protein}g Protein, {entry.fat}g Fett
                    </span>
                </div>

                {/* Swipe Delete Button */}
                <div className="w-[72px] shrink-0 flex items-center justify-end pl-4">
                    <button
                        type="button"
                        onClick={onDelete}
                        aria-label="Eintrag löschen"
                        className="[font-family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.5px] text-red-500 hover:text-red-700 transition-colors whitespace-nowrap"
                    >
                        Löschen
                    </button>
                </div>
            </div>
        </div>
    );
}
