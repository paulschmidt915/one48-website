"use client"

import React, { useEffect, useState } from 'react';
import { ChevronLeft, Loader2, Check } from 'lucide-react';
import Link from 'next/link';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine,
    ResponsiveContainer, Legend
} from 'recharts';
import { getAllBodyEntries, saveBodyEntry, getLatestBodyEntry, BodyEntry } from '@/apps/tracker/services/bodyService';
import { getLocalDateString } from '@/apps/tracker/services/nutritionService';

const GOAL_WEIGHT = 72;
const GOAL_BODYFAT = 14;

interface ChartPoint {
    date: string;
    timestamp: number;
    weight?: number;
    bodyFat?: number;
}

function formatDate(dateStr: string) {
    const d = new Date(dateStr + 'T00:00:00');
    return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const d = new Date(label);
    const dateLabel = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`;
    return (
        <div className="bg-white border border-[#cbd5e1] px-3 py-2">
            <p className="[font-family:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.5px] text-[#94a3b8] mb-1">{dateLabel}</p>
            {payload.map((p: any) => (
                <p key={p.dataKey} className="[font-family:var(--font-ibm-plex-mono)] text-[11px] text-[#111]">
                    {p.name}: <span className="font-medium">{p.value}{p.dataKey === 'weight' ? ' kg' : ' %'}</span>
                </p>
            ))}
        </div>
    );
};

export default function BodyPage() {
    const [entries, setEntries] = useState<BodyEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const [weight, setWeight] = useState('');
    const [bodyFat, setBodyFat] = useState('');

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const all = await getAllBodyEntries();
            setEntries(all);
            if (all.length > 0) {
                const last = all[all.length - 1];
                if (last.weight != null) setWeight(last.weight.toFixed(1));
                if (last.bodyFat != null) setBodyFat(last.bodyFat.toFixed(1));
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async () => {
        const w = weight ? parseFloat(weight) : undefined;
        const bf = bodyFat ? parseFloat(bodyFat) : undefined;
        if (w == null && bf == null) return;

        setIsSaving(true);
        try {
            await saveBodyEntry({
                dateStr: getLocalDateString(),
                weight: w,
                bodyFat: bf,
            });
            setSaved(true);
            await fetchData();
            setTimeout(() => setSaved(false), 2000);
        } finally {
            setIsSaving(false);
        }
    };

    // Build chart data: group by dateStr, keep latest per day
    const chartData: ChartPoint[] = React.useMemo(() => {
        const byDate: Record<string, ChartPoint> = {};
        for (const e of entries) {
            const ts = new Date(e.dateStr + 'T00:00:00').getTime();
            const existing = byDate[e.dateStr] || { date: formatDate(e.dateStr), timestamp: ts };
            if (e.weight != null) existing.weight = e.weight;
            if (e.bodyFat != null) existing.bodyFat = e.bodyFat;
            byDate[e.dateStr] = existing;
        }
        return Object.keys(byDate).sort().map(k => byDate[k]);
    }, [entries]);

    const hasWeight = chartData.some(d => d.weight != null);
    const hasBf = chartData.some(d => d.bodyFat != null);

    return (
        <div className="min-h-screen bg-white">
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
                        Körper
                    </h1>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center px-6 py-16">
                    <Loader2 className="animate-spin text-[#94a3b8]" size={24} strokeWidth={1.5} />
                </div>
            ) : (
                <>
                    {/* Chart */}
                    <div className="px-2 pt-8 pb-6 border-b border-dashed border-[#cbd5e1]">
                        {chartData.length < 2 ? (
                            <div className="px-4 py-8 text-center">
                                <p className="[font-family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.275px] text-[#94a3b8]">
                                    Noch zu wenig Daten für ein Diagramm.
                                </p>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={220}>
                                <LineChart data={chartData} margin={{ top: 8, right: 16, left: -20, bottom: 0 }}>
                                    <XAxis
                                        dataKey="timestamp"
                                        type="number"
                                        scale="time"
                                        domain={['dataMin', 'dataMax']}
                                        tick={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: 10, fill: '#94a3b8' }}
                                        axisLine={{ stroke: '#cbd5e1' }}
                                        tickLine={false}
                                        tickFormatter={(ts: number) => {
                                            const d = new Date(ts);
                                            return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`;
                                        }}
                                    />
                                    <YAxis
                                        yAxisId="weight"
                                        orientation="left"
                                        tick={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: 10, fill: '#94a3b8' }}
                                        axisLine={false}
                                        tickLine={false}
                                        domain={[70, 85]}
                                    />
                                    <YAxis
                                        yAxisId="bf"
                                        orientation="right"
                                        tick={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: 10, fill: '#94a3b8' }}
                                        axisLine={false}
                                        tickLine={false}
                                        domain={[10, 20]}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    {hasWeight && (
                                        <ReferenceLine
                                            yAxisId="weight"
                                            y={GOAL_WEIGHT}
                                            stroke="#111"
                                            strokeDasharray="4 4"
                                            strokeWidth={1}
                                        />
                                    )}
                                    {hasBf && (
                                        <ReferenceLine
                                            yAxisId="bf"
                                            y={GOAL_BODYFAT}
                                            stroke="#475569"
                                            strokeDasharray="4 4"
                                            strokeWidth={1}
                                        />
                                    )}
                                    {hasWeight && (
                                        <Line
                                            yAxisId="weight"
                                            type="monotone"
                                            dataKey="weight"
                                            name="Gewicht"
                                            stroke="#111"
                                            strokeWidth={1.5}
                                            dot={{ r: 3, fill: '#111', strokeWidth: 0 }}
                                            activeDot={{ r: 4 }}
                                            connectNulls
                                        />
                                    )}
                                    {hasBf && (
                                        <Line
                                            yAxisId="bf"
                                            type="monotone"
                                            dataKey="bodyFat"
                                            name="KFA"
                                            stroke="#94a3b8"
                                            strokeWidth={1.5}
                                            dot={{ r: 3, fill: '#94a3b8', strokeWidth: 0 }}
                                            activeDot={{ r: 4 }}
                                            connectNulls
                                        />
                                    )}
                                    <Legend
                                        wrapperStyle={{ fontFamily: 'var(--font-ibm-plex-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.5px', paddingTop: 12 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    {/* Input */}
                    <div className="px-6 pt-8 pb-32 flex flex-col gap-0">
                        {/* Weight */}
                        <div className="py-5 border-b border-dashed border-[#cbd5e1] flex items-center justify-between gap-4">
                            <span className="[font-family:var(--font-ibm-plex-mono)] text-[11px] font-semibold tracking-[1.1px] uppercase text-[#111] w-24">
                                Gewicht
                            </span>
                            <div className="flex items-center gap-2 flex-1">
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    step="0.1"
                                    value={weight}
                                    onChange={e => setWeight(e.target.value)}
                                    onBlur={e => { const v = parseFloat(e.target.value); if (!isNaN(v)) setWeight(v.toFixed(1)); }}
                                    placeholder="—"
                                    className="[font-family:var(--font-ibm-plex-mono)] text-[14px] font-medium text-[#111] bg-transparent border-b border-[#cbd5e1] focus:border-[#111] outline-none w-20 pb-0.5 transition-colors text-right"
                                />
                                <span className="[font-family:var(--font-ibm-plex-mono)] text-[11px] text-[#94a3b8]">kg</span>
                            </div>
                            <span className="[font-family:var(--font-ibm-plex-mono)] text-[11px] text-[#94a3b8] text-right">
                                Ziel: {GOAL_WEIGHT} kg
                            </span>
                        </div>

                        {/* Body Fat */}
                        <div className="py-5 border-b border-dashed border-[#cbd5e1] flex items-center justify-between gap-4">
                            <span className="[font-family:var(--font-ibm-plex-mono)] text-[11px] font-semibold tracking-[1.1px] uppercase text-[#111] w-24">
                                KFA
                            </span>
                            <div className="flex items-center gap-2 flex-1">
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    step="0.1"
                                    value={bodyFat}
                                    onChange={e => setBodyFat(e.target.value)}
                                    onBlur={e => { const v = parseFloat(e.target.value); if (!isNaN(v)) setBodyFat(v.toFixed(1)); }}
                                    placeholder="—"
                                    className="[font-family:var(--font-ibm-plex-mono)] text-[14px] font-medium text-[#111] bg-transparent border-b border-[#cbd5e1] focus:border-[#111] outline-none w-20 pb-0.5 transition-colors text-right"
                                />
                                <span className="[font-family:var(--font-ibm-plex-mono)] text-[11px] text-[#94a3b8]">%</span>
                            </div>
                            <span className="[font-family:var(--font-ibm-plex-mono)] text-[11px] text-[#94a3b8] text-right">
                                Ziel: {GOAL_BODYFAT} %
                            </span>
                        </div>

                        {/* Save Button */}
                        <div className="pt-8">
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={isSaving || (!weight && !bodyFat)}
                                className="w-full flex items-center justify-center gap-2 py-3 border border-[#111] [font-family:var(--font-ibm-plex-mono)] text-[11px] font-semibold tracking-[1.1px] uppercase text-[#111] hover:bg-[#111] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                {isSaving ? (
                                    <Loader2 size={14} className="animate-spin" />
                                ) : saved ? (
                                    <><Check size={14} strokeWidth={2} /> Gespeichert</>
                                ) : (
                                    'Eintragen'
                                )}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
