"use client"

import React, { useMemo, useState } from 'react';
import { NutritionEntry } from '@/services/nutritionService';
import { X, ChevronDown } from 'lucide-react';

interface EntryListProps {
    entries: NutritionEntry[];
    onDelete: (id: string) => void;
}

function formatTime(ts: number): string {
    const d = new Date(ts);
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
}

export default function EntryList({ entries, onDelete }: EntryListProps) {
    const groupedEntries = useMemo(() => {
        const sorted = [...entries].sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0));
        const TEN_MIN_MS = 10 * 60 * 1000;
        const groups: { label: string; entries: NutritionEntry[] }[] = [];

        for (const entry of sorted) {
            const ts = entry.timestamp;
            const lastGroup = groups[groups.length - 1];
            const lastTs = lastGroup?.entries[lastGroup.entries.length - 1]?.timestamp;

            if (!lastGroup || !ts || !lastTs || ts - lastTs > TEN_MIN_MS) {
                groups.push({ label: ts ? formatTime(ts) : '', entries: [entry] });
            } else {
                lastGroup.entries.push(entry);
            }
        }

        return groups;
    }, [entries]);

    const [openGroups, setOpenGroups] = useState<Set<number>>(() => {
        const last = groupedEntries.length - 1;
        return new Set(last >= 0 ? [last] : []);
    });

    // When entries change (new group added), open the newest group
    const prevGroupCount = React.useRef(groupedEntries.length);
    if (groupedEntries.length !== prevGroupCount.current) {
        const last = groupedEntries.length - 1;
        setOpenGroups(prev => {
            const next = new Set(prev);
            next.add(last);
            return next;
        });
        prevGroupCount.current = groupedEntries.length;
    }

    const toggleGroup = (idx: number) => {
        setOpenGroups(prev => {
            const next = new Set(prev);
            if (next.has(idx)) next.delete(idx);
            else next.add(idx);
            return next;
        });
    };

    if (entries.length === 0) return null;

    return (
        <div className="w-full pb-32 px-6 pt-4 flex flex-col gap-10">
            {groupedEntries.map((group, groupIdx) => {
                const isOpen = openGroups.has(groupIdx);
                const totalKcal = group.entries.reduce((s, e) => s + (e.kcal ?? 0), 0);
                const totalProtein = group.entries.reduce((s, e) => s + (e.protein ?? 0), 0);
                const totalCarbs = group.entries.reduce((s, e) => s + (e.carbs ?? 0), 0);
                const totalFat = group.entries.reduce((s, e) => s + (e.fat ?? 0), 0);

                return (
                    <div key={groupIdx} className="flex flex-col gap-5">
                        {/* Section Header */}
                        {group.label && (
                            <button
                                type="button"
                                onClick={() => toggleGroup(groupIdx)}
                                className="flex items-center justify-between w-full text-left"
                            >
                                <div className="flex items-center gap-2">
                                    <ChevronDown
                                        size={14}
                                        strokeWidth={2.5}
                                        className={`text-[#111] transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`}
                                    />
                                    <span className="[font-family:var(--font-ibm-plex-mono)] text-[14px] font-semibold tracking-[1.4px] uppercase text-[#111]">
                                        {group.label}
                                    </span>
                                </div>
                                <span className="[font-family:var(--font-ibm-plex-mono)] text-[11px] text-[#475569]">
                                    {totalKcal} kcal · {totalProtein}g P · {totalCarbs}g C · {totalFat}g F
                                </span>
                            </button>
                        )}

                        {/* Entries */}
                        {isOpen && (
                            <div className="flex flex-col gap-6">
                                {group.entries.map((entry, idx) => (
                                    <SwipeableEntry
                                        key={entry.id || idx}
                                        entry={entry}
                                        onDelete={() => entry.id && onDelete(entry.id)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
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
