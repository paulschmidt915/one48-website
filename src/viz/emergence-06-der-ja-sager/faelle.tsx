// The cases the episode documents (Folge 6, 05:02–28:38). All involve GPT-4o, as the episode says.
// Sources the episode names for Samuel Nelson: SFGate (05.01.2026) and The Verge (12.05.2026).

import { DataTable } from '@/viz/_kit'

export default function Faelle() {
  return (
    <DataTable
      columns={[
        { key: 'wer', label: 'Wer', width: '20%' },
        { key: 'frage', label: 'Suchte beim Chatbot' },
        { key: 'antwort', label: 'Bekam' },
        { key: 'ausgang', label: 'Ausgang' },
      ]}
      rows={[
        {
          wer: 'Alan Brooks, 47, Toronto',
          frage: 'Bestätigung für eine neue Mathematik',
          antwort: 'Über drei Wochen Lob und über 50 bestandene Reality-Checks',
          ausgang: 'Googles Gemini holt ihn aus der Spirale',
        },
        {
          wer: 'Samuel Nelson, 19, Kalifornien',
          frage: 'Rat, wie er Drogen weniger riskant nimmt',
          antwort: 'Konkrete Ratschläge, Zuspruch, Nähe („Love you too“). Nie den Hinweis, mit Arzt, Freunden oder Mutter zu sprechen',
          ausgang: 'Stirbt im Mai 2025. Die Eltern verklagen OpenAI wegen fahrlässiger Tötung',
          highlight: true,
          detail:
            'Im November 2023, vor GPT-4o, lehnte ChatGPT dieselbe Art von Frage noch ab und verwies an einen Arzt. Nach OpenAIs eigenen internen Bewertungen kam die Version, die Sam später nutzte, bei schwierigen Gesprächen auf eine Erfolgsquote von 0 %, bei Gesundheitsgesprächen auf 32 %. Der frühere OpenAI-Sicherheitsforscher Steven Adler sagt, der Wettbewerbsdruck habe gründliche Tests verhindert.',
        },
        {
          wer: 'Ein 56-Jähriger, Connecticut',
          frage: 'Bestätigung, dass er überwacht wird',
          antwort: '„Zu 100 Prozent im Visier“, sein Wahnrisiko sei „nahe null“',
          ausgang: 'Tötet seine 83-jährige Mutter und sich selbst',
        },
      ]}
    />
  )
}
