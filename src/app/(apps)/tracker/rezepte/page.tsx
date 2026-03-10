"use client"

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Bookmark, ChevronLeft, ChevronRight, Loader2, Settings, X } from 'lucide-react';
import RecipeInput from '@/apps/tracker/components/RecipeInput';
import {
    generateRecipeSuggestions,
    generateFullRecipe,
    RecipeSuggestion,
    FullRecipe,
} from '@/apps/tracker/services/geminiRecipes';
import { parseNutritionText } from '@/apps/tracker/services/geminiNutrition';
import {
    addNutritionEntries,
    getLocalDateString,
    NutritionEntry,
    saveRecipe,
    getSavedRecipes,
    deleteRecipe,
    SavedRecipe,
} from '@/apps/tracker/services/nutritionService';

type PageState = 'idle' | 'loading-suggestions' | 'suggestions' | 'loading-recipe' | 'recipe';

function displayAmount(amount: string, measurement: string | undefined, multiplier: number): string {
    if (!measurement) return amount; // old format: amount already includes unit
    if (amount === '-') return '–';
    const num = parseFloat(amount);
    if (isNaN(num)) return `${amount} ${measurement}`.trim();
    const result = num * multiplier;
    const formatted = Number.isInteger(result) ? String(result) : result.toFixed(1);
    return measurement ? `${formatted} ${measurement}` : formatted;
}

function SwipeableRecipeCard({
    recipe,
    onOpen,
    onDelete,
}: {
    recipe: SavedRecipe;
    onOpen: () => void;
    onDelete: () => void;
}) {
    const innerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const currentOffset = useRef(0);
    const startX = useRef(0);
    const hasMoved = useRef(false);
    const SWIPE_THRESHOLD = -40;
    const MAX_SWIPE = -80;

    const applyTransform = (offset: number, animated: boolean) => {
        if (!innerRef.current) return;
        innerRef.current.style.transition = animated ? 'transform 0.2s ease-out' : 'none';
        innerRef.current.style.transform = `translateX(${offset}px)`;
    };

    const handlePointerStart = (e: React.TouchEvent | React.MouseEvent) => {
        isDragging.current = true;
        hasMoved.current = false;
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        startX.current = clientX;
        applyTransform(currentOffset.current, false);
    };

    const handlePointerMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging.current) return;
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const diff = clientX - startX.current;
        if (Math.abs(diff) > 4) hasMoved.current = true;
        const newOffset = diff < 0
            ? (diff < MAX_SWIPE ? MAX_SWIPE + (diff - MAX_SWIPE) * 0.2 : diff)
            : 0;
        currentOffset.current = newOffset;
        applyTransform(newOffset, false);
    };

    const handlePointerEnd = () => {
        isDragging.current = false;
        const snapped = currentOffset.current < SWIPE_THRESHOLD ? MAX_SWIPE : 0;
        currentOffset.current = snapped;
        applyTransform(snapped, true);
    };

    const handleContentClick = () => {
        if (hasMoved.current) return;
        if (currentOffset.current !== 0) {
            currentOffset.current = 0;
            applyTransform(0, true);
        } else {
            onOpen();
        }
    };

    return (
        <div className="overflow-hidden border border-[#e2e8f0] rounded-xl group">
            <div
                ref={innerRef}
                className="flex w-full select-none"
                onTouchStart={handlePointerStart}
                onTouchMove={handlePointerMove}
                onTouchEnd={handlePointerEnd}
                onMouseDown={handlePointerStart}
                onMouseMove={handlePointerMove}
                onMouseUp={handlePointerEnd}
                onMouseLeave={handlePointerEnd}
            >
                {/* Card content */}
                <div
                    className="flex-1 px-4 py-4 min-w-full cursor-grab active:cursor-grabbing"
                    onClick={handleContentClick}
                >
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col gap-1 flex-1">
                            <span className="[font-family:var(--font-ibm-plex-mono)] text-[14px] font-semibold text-[#111] leading-[1.4]">
                                {recipe.title}
                            </span>
                            <span className="[font-family:var(--font-ibm-plex-mono)] text-[12px] text-[#475569]">
                                {recipe.ingredients.join(' · ')}
                            </span>
                            <span className="[font-family:var(--font-ibm-plex-mono)] text-[11px] text-[#94a3b8] mt-1">
                                {recipe.macros.kcal} kcal, {recipe.macros.carbs}g Carbs, {recipe.macros.protein}g Protein, {recipe.macros.fat}g Fett
                            </span>
                        </div>
                        <ChevronRight size={16} strokeWidth={1.5} className="text-[#e2e8f0] group-hover:text-[#475569] transition-colors shrink-0 mt-[2px]" />
                    </div>
                </div>

                {/* Swipe delete */}
                <div className="w-[80px] shrink-0 flex items-center justify-end pr-4">
                    <button
                        type="button"
                        onClick={onDelete}
                        aria-label="Rezept löschen"
                        className="[font-family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.5px] text-red-500 hover:text-red-700 transition-colors whitespace-nowrap"
                    >
                        Löschen
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function RezeptePage() {
    const [pageState, setPageState] = useState<PageState>('idle');
    const [prompt, setPrompt] = useState('');
    const [suggestions, setSuggestions] = useState<RecipeSuggestion[]>([]);
    const [recipe, setRecipe] = useState<FullRecipe | null>(null);
    const [selectedSuggestion, setSelectedSuggestion] = useState<RecipeSuggestion | null>(null);
    const [isFromSaved, setIsFromSaved] = useState(false);
    const [portions, setPortions] = useState(1);

    const [macroEntries, setMacroEntries] = useState<NutritionEntry[] | null>(null);
    const [isCalculatingMacros, setIsCalculatingMacros] = useState(false);
    const [isAddingToTracker, setIsAddingToTracker] = useState(false);

    const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
    const [isSavedLoading, setIsSavedLoading] = useState(true);

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [currentSavedId, setCurrentSavedId] = useState<string | null>(null);

    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState('');
    const [draftPreferences, setDraftPreferences] = useState('');

    const totalMacros = macroEntries?.reduce(
        (acc, e) => ({
            kcal: acc.kcal + (e.kcal || 0),
            protein: acc.protein + (e.protein || 0),
            carbs: acc.carbs + (e.carbs || 0),
            fat: acc.fat + (e.fat || 0),
        }),
        { kcal: 0, protein: 0, carbs: 0, fat: 0 }
    ) ?? null;

    const isInputLoading =
        pageState === 'loading-suggestions' ||
        pageState === 'loading-recipe' ||
        isCalculatingMacros ||
        isAddingToTracker;

    useEffect(() => {
        getSavedRecipes()
            .then(r => { setSavedRecipes(r); setIsSavedLoading(false); })
            .catch(() => setIsSavedLoading(false));
        const saved = localStorage.getItem('recipe_preferences') ?? '';
        setPreferences(saved);
    }, []);

    const handleOpenSettings = () => {
        setDraftPreferences(preferences);
        setShowSettings(true);
    };

    const handleSaveSettings = () => {
        setPreferences(draftPreferences);
        localStorage.setItem('recipe_preferences', draftPreferences);
        setShowSettings(false);
    };

    const handleSubmit = async (
        text: string,
        audioData?: { inlineData: { data: string; mimeType: string } }
    ) => {
        setPrompt(text);
        setRecipe(null);
        setSuggestions([]);
        setSelectedSuggestion(null);
        setMacroEntries(null);
        setIsFromSaved(false);
        setPortions(1);
        setPageState('loading-suggestions');
        try {
            const result = await generateRecipeSuggestions(text, audioData, preferences);
            setSuggestions(result);
            setPageState('suggestions');
        } catch (err) {
            console.error('Recipe suggestions error:', err);
            setPageState('idle');
            alert('Fehler beim Laden der Vorschläge. Bitte versuche es erneut.');
        }
    };

    const handleSelectSuggestion = async (suggestion: RecipeSuggestion) => {
        setSelectedSuggestion(suggestion);
        setMacroEntries(null);
        setIsFromSaved(false);
        setPortions(1);
        setPageState('loading-recipe');
        try {
            const result = await generateFullRecipe(suggestion.title, prompt, preferences);
            setRecipe(result);
            setPageState('recipe');
        } catch (err) {
            console.error('Full recipe error:', err);
            setPageState('suggestions');
            alert('Fehler beim Laden des Rezepts. Bitte versuche es erneut.');
        }
    };

    const handleOpenSavedRecipe = (r: SavedRecipe) => {
        setRecipe({ title: r.title, ingredients: r.fullIngredients, steps: r.steps });
        setMacroEntries(r.macroEntries as NutritionEntry[]);
        setSelectedSuggestion({ title: r.title, ingredients: r.ingredients });
        setIsFromSaved(true);
        setIsBookmarked(true);
        setCurrentSavedId(r.id ?? null);
        setPortions(1);
        setPageState('recipe');
    };

    const handleBack = () => {
        const wasFromSaved = isFromSaved;
        setRecipe(null);
        setMacroEntries(null);
        setIsFromSaved(false);
        setIsBookmarked(false);
        setCurrentSavedId(null);
        setPortions(1);
        setPageState(wasFromSaved ? 'idle' : 'suggestions');
    };

    const handleToggleBookmark = async () => {
        if (!recipe || !selectedSuggestion) return;
        if (isBookmarked && currentSavedId) {
            try {
                await deleteRecipe(currentSavedId);
                setSavedRecipes(prev => prev.filter(r => r.id !== currentSavedId));
                setIsBookmarked(false);
                setCurrentSavedId(null);
            } catch (err) {
                console.error('Delete recipe error:', err);
            }
        } else {
            try {
                const cleanEntries = (macroEntries ?? []).map(({ id: _id, timestamp: _ts, ...rest }) => rest);
                const newId = await saveRecipe({
                    title: recipe.title,
                    ingredients: selectedSuggestion.ingredients,
                    fullIngredients: recipe.ingredients,
                    steps: recipe.steps,
                    macros: totalMacros ?? { kcal: 0, protein: 0, carbs: 0, fat: 0 },
                    macroEntries: cleanEntries,
                });
                setCurrentSavedId(newId);
                setIsBookmarked(true);
                const updated = await getSavedRecipes();
                setSavedRecipes(updated);
            } catch (err) {
                console.error('Save recipe error:', err);
            }
        }
    };

    const handleCalculateMacros = async () => {
        if (!recipe) return;
        setIsCalculatingMacros(true);
        try {
            const ingredientText = recipe.ingredients
                .map(i => {
                    if (!i.measurement) return `${i.amount} ${i.name}`;
                    if (i.amount === '-') return i.name;
                    return `${i.amount} ${i.measurement} ${i.name}`;
                })
                .join(', ');
            const result = await parseNutritionText(ingredientText);
            setMacroEntries(Array.isArray(result) ? result : [result]);
        } catch (err) {
            console.error('Macro calculation error:', err);
            alert('Fehler bei der Makro-Berechnung. Bitte versuche es erneut.');
        } finally {
            setIsCalculatingMacros(false);
        }
    };

    const handleAddToTracker = async () => {
        if (!macroEntries || !totalMacros || !recipe || !selectedSuggestion) return;
        setIsAddingToTracker(true);
        try {
            const relevantEntries = macroEntries.filter(e => (e.kcal || 0) > 10);
            await addNutritionEntries(relevantEntries, getLocalDateString());

            if (!isFromSaved && !isBookmarked) {
                const cleanEntries = macroEntries.map(({ id: _id, timestamp: _ts, ...rest }) => rest);
                await saveRecipe({
                    title: recipe.title,
                    ingredients: selectedSuggestion.ingredients,
                    fullIngredients: recipe.ingredients,
                    steps: recipe.steps,
                    macros: totalMacros,
                    macroEntries: cleanEntries,
                });
                const updated = await getSavedRecipes();
                setSavedRecipes(updated);
            }

            setPageState('idle');
            setRecipe(null);
            setSelectedSuggestion(null);
            setMacroEntries(null);
            setIsFromSaved(false);
            setPortions(1);
        } catch (err) {
            console.error('Add to tracker error:', err);
            alert('Fehler beim Hinzufügen zum Tracker.');
        } finally {
            setIsAddingToTracker(false);
        }
    };

    const handleDeleteRecipe = async (id: string) => {
        try {
            await deleteRecipe(id);
            setSavedRecipes(prev => prev.filter(r => r.id !== id));
        } catch (err) {
            console.error('Delete recipe error:', err);
            alert('Fehler beim Löschen des Rezepts.');
        }
    };

    return (
        <div className="flex flex-col h-dvh">

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 z-50 bg-[#f0efed] flex flex-col">
                    <div className="tracker-header border-b border-[#cbd5e1] pb-6 px-6">
                        <div className="flex items-center justify-between">
                            <span className="[font-family:var(--font-ibm-plex-mono)] text-[20px] font-medium text-[#111] uppercase tracking-[-0.5px]">
                                Einstellungen
                            </span>
                            <button
                                type="button"
                                onClick={() => setShowSettings(false)}
                                aria-label="Einstellungen schließen"
                                className="p-1 text-[#475569] hover:text-[#111] transition-colors"
                            >
                                <X size={18} strokeWidth={1.5} />
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">
                        <p className="[font-family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[1.1px] text-[#94a3b8]">
                            Rezept-Präferenzen
                        </p>
                        <p className="[font-family:var(--font-ibm-plex-mono)] text-[12px] text-[#475569] leading-[1.6]">
                            Dieser Text wird bei jeder Rezept-Generierung als Kontext mitgeschickt.
                        </p>
                        <textarea
                            value={draftPreferences}
                            onChange={e => setDraftPreferences(e.target.value)}
                            placeholder={`z.B. "Jedes Rezept soll viel Protein, moderate Carbs und wenig ungesunde Fette haben. Ich habe einen Ofen und eine Heißluftfriteuse."`}
                            rows={6}
                            className="[font-family:var(--font-ibm-plex-mono)] text-[13px] text-[#111] bg-white border border-[#cbd5e1] rounded-xl px-4 py-3 resize-none outline-none focus:border-[#111] transition-colors placeholder-[#94a3b8] leading-[1.6]"
                        />
                        <button
                            type="button"
                            onClick={handleSaveSettings}
                            className="[font-family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[1.1px] text-[#111] self-start hover:text-[#475569] transition-colors"
                        >
                            &gt; Speichern
                        </button>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="tracker-header border-b border-[#cbd5e1] pb-6 px-6">
                <div className="flex items-center justify-between">
                    <Link
                        href="/tracker"
                        className="p-1 text-[#475569] hover:text-[#111] transition-colors"
                    >
                        <ChevronLeft size={18} strokeWidth={1.5} />
                    </Link>

                    <h2 className="[font-family:var(--font-ibm-plex-mono)] text-[20px] font-medium text-[#111] uppercase tracking-[-0.5px]">
                        Rezepte
                    </h2>

                    {pageState === 'recipe' ? (
                        <button
                            type="button"
                            onClick={handleToggleBookmark}
                            aria-label={isBookmarked ? 'Lesezeichen entfernen' : 'Rezept speichern'}
                            className="p-1 text-[#475569] hover:text-[#111] transition-colors"
                        >
                            <Bookmark size={18} strokeWidth={1.5} fill={isBookmarked ? 'currentColor' : 'none'} />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleOpenSettings}
                            aria-label="Einstellungen öffnen"
                            className="p-1 text-[#475569] hover:text-[#111] transition-colors"
                        >
                            <Settings size={18} strokeWidth={1.5} />
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">

                {/* Idle: saved recipes */}
                {pageState === 'idle' && (
                    <div className="px-6 py-6 flex flex-col gap-3">
                        {isSavedLoading ? (
                            <div className="flex justify-center py-10">
                                <Loader2 className="animate-spin text-[#94a3b8]" size={20} strokeWidth={1.5} />
                            </div>
                        ) : savedRecipes.length === 0 ? (
                            <div className="py-10">
                                <p className="[font-family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.275px] text-[#94a3b8]">
                                    Noch keine gespeicherten Rezepte.
                                </p>
                                <p className="[font-family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.275px] text-[#94a3b8] mt-1">
                                    Beschreibe dein Wunsch-Rezept unten.
                                </p>
                            </div>
                        ) : (
                            <>
                                <p className="[font-family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[1.1px] text-[#94a3b8] mb-1">
                                    Gespeicherte Rezepte
                                </p>
                                {savedRecipes.map((r, idx) => (
                                    <SwipeableRecipeCard
                                        key={r.id ?? idx}
                                        recipe={r}
                                        onOpen={() => handleOpenSavedRecipe(r)}
                                        onDelete={() => r.id && handleDeleteRecipe(r.id)}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                )}

                {/* Loading */}
                {(pageState === 'loading-suggestions' || pageState === 'loading-recipe') && (
                    <div className="flex justify-center items-center px-6 py-16">
                        <video
                            src="/ChefHat.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-32 h-32 object-contain"
                        />
                    </div>
                )}

                {/* Suggestions */}
                {pageState === 'suggestions' && (
                    <div className="px-6 py-6 flex flex-col gap-3">
                        <p className="[font-family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[1.1px] text-[#94a3b8] mb-1">
                            Wähle ein Rezept
                        </p>
                        {suggestions.map((s, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => handleSelectSuggestion(s)}
                                className="text-left border border-[#cbd5e1] rounded-xl px-4 py-4 hover:border-[#111] transition-colors group"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex flex-col gap-1 flex-1">
                                        <span className="[font-family:var(--font-ibm-plex-mono)] text-[14px] font-semibold text-[#111] leading-[1.4]">
                                            {s.title}
                                        </span>
                                        <span className="[font-family:var(--font-ibm-plex-mono)] text-[12px] text-[#475569] leading-[1.5]">
                                            {s.ingredients.join(' · ')}
                                        </span>
                                    </div>
                                    <ChevronRight size={16} strokeWidth={1.5} className="text-[#cbd5e1] group-hover:text-[#475569] transition-colors shrink-0 mt-[2px]" />
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* Full recipe */}
                {pageState === 'recipe' && recipe && (
                    <div className="px-6 py-6 flex flex-col gap-6">

                        {/* Back */}
                        <button
                            type="button"
                            onClick={handleBack}
                            className="[font-family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[1.1px] text-[#475569] hover:text-[#111] transition-colors self-start flex items-center gap-1"
                        >
                            <ChevronLeft size={12} strokeWidth={2} />
                            {isFromSaved ? 'Gespeicherte Rezepte' : 'Alle Vorschläge'}
                        </button>

                        {/* Title */}
                        <h3 className="[font-family:var(--font-ibm-plex-mono)] text-[18px] font-semibold text-[#111] uppercase tracking-[-0.3px] leading-[1.3]">
                            {recipe.title}
                        </h3>

                        {/* Portions toggle */}
                        <div className="flex items-center gap-3">
                            <span className="[font-family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[1.1px] text-[#94a3b8]">
                                Portionen:
                            </span>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4].map(n => (
                                    <button
                                        key={n}
                                        type="button"
                                        onClick={() => setPortions(n)}
                                        className={`[font-family:var(--font-ibm-plex-mono)] text-[11px] w-[24px] h-[24px] rounded-full flex items-center justify-center transition-colors ${
                                            portions === n
                                                ? 'bg-[#111] text-white'
                                                : 'text-[#475569] hover:text-[#111] border border-[#e2e8f0]'
                                        }`}
                                    >
                                        {n}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div className="flex flex-col gap-3">
                            <span className="[font-family:var(--font-ibm-plex-mono)] text-[11px] font-semibold uppercase tracking-[1.1px] text-[#111]">
                                Zutaten
                            </span>
                            <div className="flex flex-col gap-2">
                                {recipe.ingredients.map((ing, idx) => (
                                    <div key={idx} className="flex items-baseline gap-3">
                                        <span className="[font-family:var(--font-ibm-plex-mono)] text-[12px] text-[#475569] shrink-0 min-w-[64px]">
                                            {displayAmount(ing.amount, ing.measurement, portions)}
                                        </span>
                                        <span className="[font-family:var(--font-ibm-plex-mono)] text-[13px] text-[#111]">
                                            {ing.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Macro section */}
                        <div className="flex flex-col gap-3">
                            {macroEntries === null && !isCalculatingMacros && (
                                <button
                                    type="button"
                                    onClick={handleCalculateMacros}
                                    className="[font-family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[1.1px] text-[#111] self-start hover:text-[#475569] transition-colors"
                                >
                                    &gt; Makros berechnen
                                </button>
                            )}
                            {isCalculatingMacros && (
                                <Loader2 className="animate-spin text-[#94a3b8]" size={18} strokeWidth={1.5} />
                            )}
                            {macroEntries !== null && totalMacros && (
                                <div className="flex flex-col gap-3">
                                    <span className="[font-family:var(--font-ibm-plex-mono)] text-[11px] text-[#94a3b8]">
                                        {totalMacros.kcal} kcal, {totalMacros.carbs}g Carbs, {totalMacros.protein}g Protein, {totalMacros.fat}g Fett
                                    </span>
                                    <button
                                        type="button"
                                        onClick={handleAddToTracker}
                                        disabled={isAddingToTracker}
                                        className="[font-family:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[1.1px] text-[#111] disabled:text-[#94a3b8] transition-colors self-start flex items-center gap-2 hover:text-[#475569]"
                                    >
                                        {isAddingToTracker
                                            ? <><Loader2 className="animate-spin" size={12} /> Wird hinzugefügt...</>
                                            : '> Zum Tracker hinzufügen'
                                        }
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-dashed border-[#cbd5e1]" />

                        {/* Steps */}
                        <div className="flex flex-col gap-3">
                            <span className="[font-family:var(--font-ibm-plex-mono)] text-[11px] font-semibold uppercase tracking-[1.1px] text-[#111]">
                                Zubereitung
                            </span>
                            <div className="flex flex-col gap-4">
                                {recipe.steps.map((step, idx) => (
                                    <div key={idx} className="flex gap-4 items-start">
                                        <span className="[font-family:var(--font-ibm-plex-mono)] text-[11px] font-semibold text-[#94a3b8] shrink-0 mt-[2px]">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <span className="[font-family:var(--font-ibm-plex-mono)] text-[13px] text-[#111] leading-[1.6]">
                                            {step}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="h-4" />
                    </div>
                )}
            </div>

            {/* Input bar — hidden when viewing a recipe */}
            {pageState !== 'recipe' && pageState !== 'loading-recipe' && (
                <RecipeInput onSubmit={handleSubmit} isLoading={isInputLoading} />
            )}
        </div>
    );
}
