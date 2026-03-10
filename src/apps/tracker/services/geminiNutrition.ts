import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

const NUTRITION_SYSTEM_PROMPT = `
Du bist ein KI-Ernährungsberater, der für eine super simple Ernährungs-Tracker-App arbeitet.
Deine Aufgabe ist es, eine Benutzereingabe (Text oder transkribierte Sprache) zu analysieren und in strukturierte Nahrungs-Einträge umzuwandeln.

FÜR JEDEN ERKANNTEN BESTANDTEIL GIBT ES GENAU EINEN EINTRAG IM JSON-ARRAY.
Schätze die Nährwerte (Kcal, Protein in g, Fett in g, Kohlenhydrate (Carbs) in g) basierend auf deinen internen Datenbanken und der angegebenen Menge.
Wenn keine genaue Menge angegeben ist, nimm eine durchschnittliche Standardportion an (z.B. 1 Apfel = ca. 150g).

ANTWORT-FORMAT:
Antworte AUSSCHLIESSLICH mit einem JSON-Array.
Struktur:
[
  {
    "foodDesc": "string" (Name des Lebensmittels inkl. Menge, z.B. "400g Rinderhack fettreduziert"),
    "protein": number (in Gramm),
    "fat": number (in Gramm),
    "carbs": number (in Gramm),
    "kcal": number 
  }
]

REGELN:
- GIB NUR DAS JSON-ARRAY ZURÜCK! KEIN TEXT, KEIN MARKDOWN (KEIN \`\`\`json).
- Liefere möglichst exakte, realistische Schätzungen für unverarbeitete und bekannte Lebensmittel.
- Alle Zahlen sollten auf ganze Zahlen gerundet sein.
`;

const NUTRITION_IMAGE_PROMPT = `
Du bist ein KI-System, das Nährwerttabellen von Lebensmittelverpackungen ausliest.
Dir wird ein Bild einer Nährwerttabelle und die verzehrte Menge als Text übergeben.

DEINE AUFGABE:
1. Lies die Nährwerte **pro 100g** (oder pro 100ml) aus dem Bild aus: Kcal, Protein, Fett, Kohlenhydrate.
2. Berechne die *tatsächlichen* Nährwerte basierend auf der angegebenen Menge.
   Beispiel: Wenn 100g 100 kcal haben und die Menge '150g' ist, dann kcal: 150.
3. Gib das verzehrte Lebensmittel (ggf. aus dem Kontext, Labels auf dem Bild oder einfach als "Eingescanntes Produkt") in "foodDesc" inkl. der Menge an (z.B. "150g Eingescanntes Produkt").

ANTWORT-FORMAT:
Antworte AUSSCHLIESSLICH mit einem JSON-Array, das exakt EIN Objekt enthält.
Struktur:
[
  {
    "foodDesc": "string",
    "protein": number (berechnet auf die Menge, gerundet),
    "fat": number (berechnet auf die Menge, gerundet),
    "carbs": number (berechnet auf die Menge, gerundet),
    "kcal": number (berechnet auf die Menge, gerundet)
  }
]

REGELN:
- GIB NUR DAS JSON-ARRAY ZURÜCK! KEIN TEXT, KEIN MARKDOWN.
- Wenn keine Menge im Text angegeben wurde, nimm standardmäßig die 100g/ml an oder schätze basierend auf der typischen Portionsgröße.
`;

export async function parseNutritionText(
    userPrompt: string,
    audioData?: { inlineData: { data: string, mimeType: string } }
) {
    if (!API_KEY) throw new Error("Gemini API Key is missing.");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const promptParts: any[] = [`SYSTEM_PROMPT: ${NUTRITION_SYSTEM_PROMPT}\n\nBENUTZEREINGABE: ${userPrompt || "Siehe Audio-Eingabe"}\nANTWORT (NUR JSON-ARRAY):`];

    if (audioData) {
        promptParts.push(audioData);
    }

    try {
        const result = await model.generateContent(promptParts);
        const text = await result.response.text();
        const jsonString = text.replace(/```json|```/g, "").trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Gemini API Error (Nutrition Text):", error);
        throw error;
    }
}

export async function parseNutritionImage(
    imageBase64: string,
    mimeType: string,
    amountText: string
) {
    if (!API_KEY) throw new Error("Gemini API Key is missing.");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const imagePart = {
        inlineData: {
            data: imageBase64,
            mimeType: mimeType
        }
    };

    const textPart = `SYSTEM_PROMPT: ${NUTRITION_IMAGE_PROMPT}\n\nVERZEHRTE MENGE: ${amountText || "100g (Standard)"}\nANTWORT (NUR JSON-ARRAY):`;

    try {
        const result = await model.generateContent([textPart, imagePart]);
        const text = await result.response.text();
        const jsonString = text.replace(/```json|```/g, "").trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Gemini API Error (Nutrition Image):", error);
        throw error;
    }
}
