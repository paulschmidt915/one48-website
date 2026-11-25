// The four practices to keep one's picture of AI current (Folge 4, 43:39–46:09).
// Replaces the paragraph that listed them.

import { Flow } from '@/viz/_kit'

export default function Praktiken() {
  return (
    <Flow
      steps={[
        {
          title: 'Kuratierte Quellen',
          value: '15 Min. pro Woche',
          text: 'Drei bis fünf Newsletter oder Podcasts, die Entwicklungen einordnen statt nur melden.',
        },
        {
          title: 'Selbst ausprobieren',
          value: 'fester Rhythmus',
          text: 'Einmal pro Woche oder im Monat bewusst etwas Neues mit KI testen. Kein Artikel ersetzt das.',
          highlight: true,
        },
        {
          title: 'Frame-Check',
          value: 'alle paar Monate',
          text: 'Aufschreiben, was du über KI glaubst („KI kann kein X“), und später prüfen, was davon noch stimmt.',
        },
        {
          title: 'Andere fragen',
          value: 'monatlich',
          text: 'Mit Menschen sprechen, die KI anders nutzen: andere Berufe, andere Anwendungen, anderer Stand.',
        },
      ]}
    />
  )
}
