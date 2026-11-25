// Job forecasts the episode cites: new vs. displaced jobs, all drivers and AI alone (WEF, global, to 2030)
// and AI in Germany (IAB). Numbers from WEF Future of Jobs Report 2025 and IAB-Forschungsbericht 23/2025,
// as listed in the episode's source list. Replaces the paragraph with the forecast numbers.

import { compact, DataTable } from '@/viz/_kit'

const saldo = (v: number) => (v === 0 ? 'etwa 0' : compact(v, { sign: true }))

export default function Prognosen() {
  return (
    <DataTable
      columns={[
        { key: 'was', label: 'Schätzung' },
        { key: 'neu', label: 'Neue Stellen', format: (v) => compact(v) },
        { key: 'weg', label: 'Wegfallend', format: (v) => compact(v) },
        { key: 'saldo', label: 'Saldo', format: saldo, bar: true, width: '10rem' },
      ]}
      rows={[
        {
          was: 'Weltweit bis 2030, alle Treiber (WEF)',
          neu: 170e6,
          weg: 92e6,
          saldo: 78e6,
          detail: 'World Economic Forum, Future of Jobs Report 2025. Treiber sind neben KI etwa Demografie, grüner Umbau und Konjunktur.',
        },
        {
          was: 'Weltweit bis 2030, nur KI (WEF)',
          neu: 11e6,
          weg: 9e6,
          saldo: 2e6,
          highlight: true,
          detail: 'KI gehört laut WEF zu den größten einzelnen Treibern neuer Stellen, verdrängt aber fast ebenso viele.',
        },
        {
          was: 'Deutschland, nur KI (IAB)',
          neu: 790e3,
          weg: 790e3,
          saldo: 0,
          detail: 'IAB-Forschungsbericht 23/2025 (Zika et al.): jeweils rund 790.000 neue und wegfallende Arbeitsplätze, zusammen rund 1,6 Mio. betroffene Stellen.',
        },
      ]}
    />
  )
}
