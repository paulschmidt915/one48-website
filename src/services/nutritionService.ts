import { nutritionDb as db } from "../firebase";
import { ref, push, get, set, remove, serverTimestamp } from "firebase/database";

export interface NutritionEntry {
    id?: string;
    foodDesc: string;
    protein: number;
    fat: number;
    carbs: number;
    kcal: number;
    timestamp?: number;
}

// Minimalist function to get current date as YYYY-MM-DD in local time
export function getLocalDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const DEFAULT_USER = "default_user";

export async function addNutritionEntries(entries: NutritionEntry[], dateStr: string = getLocalDateString()) {
    const entriesRef = ref(db, `nutrition_entries/${DEFAULT_USER}/${dateStr}`);

    const addedEntries: NutritionEntry[] = [];
    for (const entry of entries) {
        const newRef = push(entriesRef);
        const entryData = {
            ...entry,
            timestamp: serverTimestamp() // Uses server time for accurate sorting
        };
        await set(newRef, entryData);
        addedEntries.push({ id: newRef.key || undefined, ...entryData as any });
    }
    return addedEntries;
}

export async function getNutritionEntries(dateStr: string = getLocalDateString()): Promise<NutritionEntry[]> {
    const entriesRef = ref(db, `nutrition_entries/${DEFAULT_USER}/${dateStr}`);
    const snapshot = await get(entriesRef);

    if (snapshot.exists()) {
        const data = snapshot.val() as Record<string, NutritionEntry>;
        return Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        })).sort((a, b) => {
            // Sort by timestamp desc (newest first)
            const timeA = a.timestamp || 0;
            const timeB = b.timestamp || 0;
            return timeB - timeA;
        });
    }
    return [];
}

export async function deleteNutritionEntry(entryId: string, dateStr: string = getLocalDateString()) {
    const entryRef = ref(db, `nutrition_entries/${DEFAULT_USER}/${dateStr}/${entryId}`);
    await remove(entryRef);
}

export async function getRecentEntries(daysBack: number = 14): Promise<NutritionEntry[]> {
    const today = new Date();
    const dateStrings: string[] = [];

    for (let i = 1; i <= daysBack; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        dateStrings.push(`${year}-${month}-${day}`);
    }

    const results = await Promise.all(
        dateStrings.map(dateStr => getNutritionEntries(dateStr).catch(() => [] as NutritionEntry[]))
    );

    const allEntries: NutritionEntry[] = [];
    for (const dayEntries of results) {
        allEntries.push(...dayEntries);
    }

    return allEntries.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
}
