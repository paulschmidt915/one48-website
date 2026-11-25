// New and restarted reactors US tech companies have signed for, against the extra power US data
// centres need by 2028 (episode research 3.4 and 3.3; Bloom Energy 2026).

import { DataTable } from '@/viz/_kit'

const projects = [
  { projekt: 'Three Mile Island, Neustart', abnehmer: 'Microsoft', mw: 835, start: '2027', detail: '20 Jahre Laufzeit, rund 1,6 Mrd. $, die ganze Leistung des Reaktors für einen Kunden. Das US-Energieministerium gibt 1 Mrd. $ Kredit.' },
  { projekt: 'Helion, Kernfusion', abnehmer: 'Microsoft', mw: 50, start: '2028 (Ziel)', detail: 'Sam Altman hat privat 375 Mio. $ in Helion gesteckt.' },
  { projekt: 'Oklo, Mikroreaktoren', abnehmer: 'Meta', mw: 1200, start: 'ab 2030', detail: 'Bis zu 1.200 MW.' },
  { projekt: 'Kairos Power, kleine Reaktoren', abnehmer: 'Google', mw: 500, start: '2030 bis 2035' },
  { projekt: 'TerraPower, Natrium-Reaktoren', abnehmer: 'Meta', mw: 2760, start: '2032 bis 2035', detail: 'Bis zu 2.760 MW in acht Einheiten.' },
  { projekt: 'Drei kleine Reaktoren', abnehmer: 'Oracle', mw: 1000, start: 'Mitte 2030er', detail: 'Über 1 GW angekündigt, Partner noch nicht benannt.' },
]
const sum = projects.reduce((s, p) => s + p.mw, 0) // 6.345 MW

const rows = [
  ...projects,
  { projekt: 'Alle Projekte zusammen', abnehmer: '', mw: sum, start: 'bis Mitte 2030er', highlight: true },
  {
    projekt: 'Zum Vergleich: zusätzlicher Bedarf der US-Rechenzentren',
    abnehmer: '',
    mw: 70000,
    start: '2025 bis 2028',
    detail: 'Von rund 80 GW (2025) auf rund 150 GW (2028), laut Bloom Energy. Rechenzentrums- und Kraftwerksleistung sind nur grob vergleichbar.',
  },
]

export default function Reaktoren() {
  return (
    <div className="vk">
      <DataTable
        columns={[
          { key: 'projekt', label: 'Projekt', width: '34%' },
          { key: 'abnehmer', label: 'Abnehmer', width: '14%' },
          { key: 'mw', label: 'Leistung, MW', bar: true },
          { key: 'start', label: 'Geplanter Start', width: '18%' },
        ]}
        rows={rows}
      />
      <p className="vk-note">Nur neue oder wiederbelebte Reaktoren, ohne Verträge mit Kraftwerken, die schon laufen.</p>
    </div>
  )
}
