// Measured effects of working with AI, from the studies the episode cites (Folge 3, 31:29–36:10).
// Colonoscopy: ACCEPT trial (2025). Pronouns: study reported by NBC News (Quellensammlung F3).
// BCG: Dell'Acqua, Mollick et al. ("Jagged Frontier").

import { DataTable } from '@/viz/_kit'

export default function Befunde() {
  return (
    <DataTable
      columns={[
        { key: 'wer', label: 'Wer' },
        { key: 'was', label: 'Gemessen' },
        { key: 'effekt', label: 'Veränderung', format: { unit: ' %', sign: true }, bar: 'diverging', width: '11rem' },
      ]}
      rows={[
        {
          wer: 'Ärztinnen und Ärzte',
          was: 'Erkannte Auffälligkeiten bei der Darmspiegelung, nachdem die KI wieder wegfiel',
          effekt: -20,
          highlight: true,
          detail: 'Studie von 2025: erst mit KI-Unterstützung zur Erkennung, dann ohne. Die Ärzte hatten sich an die Hilfe gewöhnt, derselbe Mechanismus wie beim Navi.',
        },
        {
          wer: 'Texte mit KI-Hilfe',
          was: 'Pronomen, also Bezüge auf Menschen und Erlebtes',
          effekt: -50,
          detail: 'Dazu weniger Anekdoten, und der eigene Wortschatz wird vom Vokabular des Modells überschrieben. KI-gestützte Geschichten werden zwar als kreativer bewertet, ähneln einander aber deutlich mehr.',
        },
        { wer: 'Berater (BCG)', was: 'Qualität der Ergebnisse', effekt: 40 },
        { wer: 'Berater (BCG)', was: 'Tempo', effekt: 25 },
        { wer: 'Schwächste Berater (BCG)', was: 'Qualität der Ergebnisse', effekt: 43, detail: 'Wer vorher am schwächsten war, profitierte am stärksten.' },
      ]}
    />
  )
}
