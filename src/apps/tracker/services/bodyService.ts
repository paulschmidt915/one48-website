import { nutritionDb as db } from "@/lib/firebase";
import { ref, push, get, set, serverTimestamp } from "firebase/database";
import { getUid } from "@/lib/authHelper";

export interface BodyEntry {
    id?: string;
    weight?: number;       // kg
    bodyFat?: number;      // %
    timestamp?: number;
    dateStr: string;       // YYYY-MM-DD
}

export async function saveBodyEntry(entry: Omit<BodyEntry, 'id' | 'timestamp'>): Promise<void> {
    const uid = await getUid();
    const entriesRef = ref(db, `body_entries/${uid}`);
    const newRef = push(entriesRef);
    await set(newRef, { ...entry, timestamp: serverTimestamp() });
}

export async function getAllBodyEntries(): Promise<BodyEntry[]> {
    const uid = await getUid();
    const entriesRef = ref(db, `body_entries/${uid}`);
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
