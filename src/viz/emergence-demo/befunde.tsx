// Measured effects of working with AI, from the studies the episode cites. Replaces a run of numbers.

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
          was: 'Auffälligkeiten erkannt, nachdem die KI wieder wegfiel',
          effekt: -20,
          highlight: true,
          detail: 'Darmspiegelung, Studie von 2025: erst mit KI-Unterstützung, dann ohne. Die Ärzte hatten sich an die Hilfe gewöhnt.',
        },
        { wer: 'Texte mit KI-Hilfe', was: 'Pronomen, also Bezüge auf Menschen und Erlebtes', effekt: -50 },
        {
          wer: 'Berater (BCG)',
          was: 'Qualität der Ergebnisse',
          effekt: 40,
          detail: 'Feldexperiment mit Beratern der Boston Consulting Group: mit KI 40 % bessere Qualität und 25 % schneller.',
        },
        { wer: 'Berater (BCG)', was: 'Tempo', effekt: 25 },
        { wer: 'Schwächste Berater (BCG)', was: 'Qualität der Ergebnisse', effekt: 43 },
      ]}
    />
  )
}
