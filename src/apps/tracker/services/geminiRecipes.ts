import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

const SUGGESTIONS_SYSTEM_PROMPT = `
Du bist ein Koch-Assistent. Der Benutzer gibt dir einen Rezept-Wunsch und du erstellst genau 5 passende Rezept-Vorschläge.

ANTWORT-FORMAT:
Antworte AUSSCHLIESSLICH mit einem JSON-Array mit exakt zwei Objekten.
Struktur:
[
  {
    "title": "string (kurzer Rezeptname)",
    "ingredients": ["string", "string", ...]
    }
  }
]

REGELN:
- GIB NUR DAS JSON-ARRAY ZURÜCK! KEIN TEXT, KEIN MARKDOWN (KEIN \`\`\`json).
- Exakt 5 Vorschläge, nicht mehr, nicht weniger.
- "ingredients": 4-6 Hauptzutaten als kurze Strings OHNE Mengenangabe (z.B. "Hähnchenbrust", "Quinoa", "Paprika").
- Titel auf Deutsch.
`;

const FULL_RECIPE_SYSTEM_PROMPT = `
Du bist ein Koch-Assistent. Der Benutzer hat ein Rezept ausgewählt. Erstelle nun das vollständige Rezept mit Zutatenliste und Schritt-für-Schritt-Anleitung für eine Portion.

ANTWORT-FORMAT:
Antworte AUSSCHLIESSLICH mit einem JSON-Objekt.
Struktur:
{
  "title": "string (Rezeptname, identisch mit dem ausgewählten Vorschlag)",
  "ingredients": [
    {
      "amount": "string (nur die Zahl, z.B. '200' oder '2' oder '0.5', ODER '-' wenn keine Mengenangabe sinnvoll ist, z.B. bei Salz, Pfeffer, Gewürzen)",
      "measurement": "string (Einheit, z.B. 'g', 'ml', 'EL', 'TL', 'Stück', 'Prise', ODER '' wenn amount '-')",
      "name": "string (Zutatname)"
    }
  ],
  "steps": [
    "string (vollständig beschriebener Schritt, auf Deutsch)"
  ]
}

REGELN:
- GIB NUR DAS JSON-OBJEKT ZURÜCK! KEIN TEXT, KEIN MARKDOWN (KEIN \`\`\`json).
- amount ist IMMER eine reine Zahl (z.B. '200', '2', '0.5') ODER '-'. NIEMALS Einheit in amount!
- measurement enthält NUR die Einheit (z.B. 'g', 'ml', 'EL'). Bei amount '-' ist measurement ''.
- Zutatenliste vollständig und präzise mit Mengenangaben für eine Portion. Nur notwendige Zutaten.
- Schritte extrem kompakt formuliert: nur das Wesentliche, keine Füllwörter, keine Wiederholungen. Maximal 1-2 kurze Sätze pro Schritt. Imperativ-Stil (z.B. "Zwiebeln würfeln. In Öl 3 Min. anbraten.").
- Berücksichtige den ursprünglichen Nutzerwunsch (Portionsanzahl, Zutaten-Vorgaben, Makro-Ziele).
- Alle Texte auf Deutsch.
`;

export interface RecipeSuggestion {
    title: string;
    ingredients: string[];
}

export interface FullRecipe {
    title: string;
    ingredients: { amount: string; measurement?: string; name: string }[];
    steps: string[];
}

export async function generateRecipeSuggestions(
    prompt: string,
    audioData?: { inlineData: { data: string, mimeType: string } },
    preferences?: string
): Promise<RecipeSuggestion[]> {
    if (!API_KEY) throw new Error("Gemini API Key is missing.");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prefsSection = preferences ? `\nNUTZER-PRÄFERENZEN: ${preferences}` : '';
    const textPart = `SYSTEM_PROMPT: ${SUGGESTIONS_SYSTEM_PROMPT}\n\nNUTZER-WUNSCH: ${prompt || "Siehe Audio-Eingabe"}${prefsSection}\nANTWORT (NUR JSON-ARRAY):`;
    const promptParts: any[] = [textPart];
    if (audioData) promptParts.push(audioData);

    try {
        const result = await model.generateContent(promptParts);
        const text = await result.response.text();
        const jsonString = text.replace(/```json|```/g, "").trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Gemini API Error (Recipe Suggestions):", error);
        throw error;
    }
}

export async function generateFullRecipe(
    title: string,
    originalPrompt: string,
    preferences?: string
): Promise<FullRecipe> {
    if (!API_KEY) throw new Error("Gemini API Key is missing.");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prefsSection = preferences ? `\nNUTZER-PRÄFERENZEN: ${preferences}` : '';
    const fullPrompt = `SYSTEM_PROMPT: ${FULL_RECIPE_SYSTEM_PROMPT}\n\nURSPRÜNGLICHER NUTZERWUNSCH: ${originalPrompt}${prefsSection}\nAUSGEWÄHLTES REZEPT: ${title}\nANTWORT (NUR JSON-OBJEKT):`;

    try {
        const result = await model.generateContent(fullPrompt);
        const text = await result.response.text();
        const jsonString = text.replace(/```json|```/g, "").trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Gemini API Error (Full Recipe):", error);
        throw error;
    }
}
