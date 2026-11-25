// Shuichi Ito's simulation with Japanese data (2026), realistic variant: the more work AI takes over,
// the higher the basic income the state can pay, and the higher the inflation. Euro values are rounded
// conversions of the yen amounts. The episode cites the 80 % case (rund 3.300 €, knapp 7 %).
// Replaces the paragraph on the Japanese study.

import { DataTable } from '@/viz/_kit'

export default function SzenarienJapan() {
  return (
    <DataTable
      columns={[
        { key: 'szenario', label: 'Szenario', width: '26%' },
        { key: 'ki', label: 'KI ersetzt', format: { unit: ' %' } },
        { key: 'yen', label: 'Grundeinkommen pro Monat', format: { unit: ' Yen' } },
        { key: 'euro', label: 'Umgerechnet', align: 'right' },
        { key: 'inflation', label: 'Inflation', format: { unit: ' %', decimals: 1 }, bar: true },
      ]}
      rows={[
        {
          szenario: 'Heute',
          ki: 5,
          yen: 0,
          euro: '–',
          inflation: 0,
          detail: 'Nicht finanzierbar: Japans Staatshaushalt ist schon heute im Minus.',
        },
        { szenario: 'Moderater Fortschritt', ki: 30, yen: 103_000, euro: 'rund 640 €', inflation: 1.5 },
        { szenario: 'Fortgeschritten', ki: 60, yen: 315_000, euro: 'rund 1.950 €', inflation: 4.1 },
        {
          szenario: 'Maximaler Fortschritt',
          ki: 80,
          yen: 529_000,
          euro: 'rund 3.300 €',
          inflation: 6.8,
          highlight: true,
          detail:
            'Voraussetzung ist neben der KI eine Steuerreform. Das Modell rechnet damit, dass Sozialausgaben sinken, wenn das Grundeinkommen bestehende Leistungen teilweise ersetzt.',
        },
      ]}
    />
  )
}
