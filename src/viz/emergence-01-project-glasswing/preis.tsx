// What one zero-day costs: an elite team on the black market vs. Claude Mythos
// (Folge 1, 17:56–19:53 and 31:23–31:53). Replaces the paragraph with the cost and time numbers.

import { DataTable } from '@/viz/_kit'

type R = { merkmal: string; markt: string; mythos: string; highlight?: boolean; detail?: string }

const rows: R[] = [
  { merkmal: 'Kosten je Zero-Day', markt: '100.000 bis 2,5 Mio. $', mythos: 'rund 50 $ Rechenkosten', highlight: true,
    detail: 'Das ist 2.000- bis 50.000-mal billiger.' },
  { merkmal: 'Dauer', markt: 'Monate', mythos: 'Stunden',
    detail: 'Mike Isaac von der New York Times bei NBC: Ein Schwarm von KI-Agenten findet in Stunden gravierende Fehler, für die sehr gute Fachleute Monate brauchen.' },
  { merkmal: 'Voraussetzung', markt: 'Spezialisierte Elite-Teams', mythos: 'Einfaches Prompting, funktionierende Angriffe über Nacht' },
]

export default function Preis() {
  return (
    <DataTable<R>
      columns={[
        { key: 'merkmal', label: 'Ein Zero-Day', width: '26%' },
        { key: 'markt', label: 'Elite-Hacker, Schwarzmarkt' },
        { key: 'mythos', label: 'Mit Mythos-Fähigkeiten' },
      ]}
      rows={rows}
    />
  )
}
