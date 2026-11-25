// Electricity use of the world's data centres in 2024 and four forecasts for 2030 (episode research 3.3).

import { DataTable, fmt } from '@/viz/_kit'

const BASE = 415 // TWh, 2024, IEA "Energy and AI" (April 2025)

const rows = [
  { quelle: '2024, gemessen (IEA)', twh: BASE, detail: 'Rund 1,5 % des weltweiten Stromverbrauchs.' },
  { quelle: '2030, IEA (Basisszenario)', twh: 945, highlight: true, detail: 'Etwa so viel, wie Japan heute insgesamt verbraucht.' },
  { quelle: '2030, Gartner', twh: 980 },
  { quelle: '2030, Goldman Sachs', twh: 1350 },
  { quelle: '2030, McKinsey', twh: 1400, detail: 'Rund 4 % des weltweiten Strombedarfs.' },
].map((r) => ({ ...r, faktor: r.twh / BASE }))

export default function Stromhunger() {
  return (
    <DataTable
      columns={[
        { key: 'quelle', label: 'Jahr und Quelle', width: '36%' },
        { key: 'twh', label: 'Verbrauch, TWh', bar: true },
        { key: 'faktor', label: 'Vielfaches von 2024', format: (v) => `${fmt(v, { decimals: 1 })}×` },
      ]}
      rows={rows}
    />
  )
}
