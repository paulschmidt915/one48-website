import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : "") || "";
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPT = `
Du bist ein KI-Assistent für den "One48 Planner". 
Deine Aufgabe ist es, dem Benutzer zu helfen, seine wöchentlichen Termine zu verwalten.

KONTEXT:
1. Aktueller Zeitplan: Eine Liste der bereits geplanten Termine.
2. Benutzeranfrage: Ein Freitext, der beschreibt, was getan werden soll (Hinzufügen, Ändern oder Löschen).

EINSCHRÄNKUNGEN:
- Verfügbare Kategorien: "work", "workout", "todo", "private".
- Tages-Index: 0 für Montag, 1 für Dienstag, 2 für Mittwoch, 3 für Donnerstag, 4 für Freitag, 5 für Samstag, 6 für Sonntag.
- Zeitformat: "HH:MM" (z.B. "09:00", "14:30").
- Dauer: In Minuten (z.B. 30, 60, 90).

ANTWORT-FORMAT:
Du musst AUSSCHLIESSLICH mit einem JSON-Array von Objekten antworten. Jedes Objekt repräsentiert eine Aktion.
Struktur:
{
  "action": "add" | "update" | "delete",
  "id": "string" (erforderlich für update/delete),
  "name": "string" (Titel des Termins),
  "zeit": "HH:MM" (Startzeit),
  "dauer": number (Dauer in Minuten),
  "kategorie": "string" (eine der oben genannten Kategorien),
  "tag": number (0-6)
}

REGELN:
- Wenn ein neuer Termin hinzugefügt wird: action ist "add". Keine ID erforderlich.
- Wenn ein bestehender Termin geändert wird: action ist "update". Die "id" ist ERFORDERLICH. Finde den passenden Termin im aktuellen Zeitplan anhand des Namens oder der Zeit.
- Wenn ein Termin gelöscht wird: action ist "delete". Die "id" ist ERFORDERLICH.
- Du kannst mehrere Aktionen zurückgeben, wenn der Benutzer mehrere Dinge verlangt.
- GIB NUR DAS JSON-ARRAY ZURÜCK. KEIN ZUSÄTZLICHER TEXT, KEINE ERKLÄRUNGEN.

Beispiel-Antwort:
[
  { "action": "add", "name": "Fitness", "zeit": "08:00", "dauer": 60, "kategorie": "workout", "tag": 1 },
  { "action": "delete", "id": "gcal-123" }
]
`;

export async function processAiRequest(
    userPrompt: string,
    currentSchedule: any[],
    weekContext?: any,
    audioData?: { inlineData: { data: string, mimeType: string } }, // Optional Audio
    aiRules: string[] = []
) {
    if (!API_KEY) {
        throw new Error("Gemini API Key is missing.");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const textPart = `
SYSTEM_PROMPT: ${SYSTEM_PROMPT}
AKTUELLER ZEITPLAN: ${JSON.stringify(currentSchedule)}
WOCHEN-KONTEXT: ${weekContext ? JSON.stringify(weekContext) : "Nicht verfügbar"}
AI REGELN (BEACHTE DIESE UNBEDINGT): ${aiRules.length > 0 ? aiRules.join("; ") : "Keine speziellen Regeln"}
BENUTZERANFRAGE: ${userPrompt || "Siehe Audio-Eingabe"}
ANTWORT (NUR JSON):
`;

    // Wir erstellen ein Array aus Parts für Gemini
    const promptParts: any[] = [textPart];

    // Falls Audio vorhanden ist, fügen wir es als Part hinzu
    if (audioData) {
        promptParts.push(audioData);
    }

    try {
        // generateContent akzeptiert ein Array aus Text und Medien
        const result = await model.generateContent(promptParts);
        const response = await result.response;
        const text = response.text();

        const jsonString = text.replace(/```json|```/g, "").trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
}
