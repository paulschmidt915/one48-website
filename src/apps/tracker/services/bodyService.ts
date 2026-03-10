import { nutritionDb as db } from "@/lib/firebase";
import { ref, push, get, set, serverTimestamp } from "firebase/database";

export interface BodyEntry {
    id?: string;
    weight?: number;       // kg
    bodyFat?: number;      // %
    timestamp?: number;
    dateStr: string;       // YYYY-MM-DD
}

const DEFAULT_USER = "default_user";
const BASE_PATH = `body_entries/${DEFAULT_USER}`;

export async function saveBodyEntry(entry: Omit<BodyEntry, 'id' | 'timestamp'>): Promise<void> {
    const entriesRef = ref(db, BASE_PATH);
    const newRef = push(entriesRef);
    await set(newRef, { ...entry, timestamp: serverTimestamp() });
}

export async function getAllBodyEntries(): Promise<BodyEntry[]> {
    const entriesRef = ref(db, BASE_PATH);
    const snapshot = await get(entriesRef);

    if (!snapshot.exists()) return [];

    const data = snapshot.val() as Record<string, BodyEntry>;
    return Object.keys(data)
        .map(key => ({ id: key, ...data[key] }))
        .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
}

export async function getLatestBodyEntry(): Promise<BodyEntry | null> {
    const all = await getAllBodyEntries();
    return all.length > 0 ? all[all.length - 1] : null;
}
