// Synthese: die 21 Wetten der drei Thesen nach Art von Thiels Beteiligung. Einordnung nach Skript und
// Recherche-Notizen zu Folge 12 ("indirect" = nur mittelbar über Fonds, laut Recherche-Fact-Check).

import { DataTable } from '@/viz/_kit'

export default function Bauplan() {
  return (
    <DataTable
      columns={[
        { key: 'these', label: 'These', width: '20%' },
        { key: 'selbst', label: 'Thiel selbst' },
        { key: 'fonds', label: 'Über Fonds und Firmen' },
        { key: 'indirekt', label: 'Nur indirekt', width: '16%' },
      ]}
      rows={[
        {
          these: 'Markt: Besitze das Nadelöhr',
          selbst: 'General Matter (Verwaltungsrat), Varda',
          fonds: 'Substrate, Crusoe, Radiant (Reaktoren), Helion (Fusion), Hadrian (Rüstungsfabriken)',
          indirekt: '–',
          detail: 'Varda: Founders Fund und Thiel persönlich. Helion über Thiels Fonds Mithril Capital, die übrigen über Founders Fund.',
        },
        {
          these: 'Mensch: Der Körper ist eine Maschine',
          selbst: 'Enhanced Games',
          fonds: 'EpiBone, NewLimit, Until, Rhea, Neuralink',
          indirekt: '–',
          detail:
            'Enhanced Games: Thiel persönlich, 2024. EpiBone über Breakout Labs, das Förderprogramm der Thiel Foundation. Rhea über Thiel Capital, rund 10 Mio. $. NewLimit, Until und Neuralink über Founders Fund.',
        },
        {
          these: 'Macht: Die Pfeiler werden privat',
          selbst: 'Palantir (Mitgründer), Clearview, Seasteading-Institut, Pronomos (Anker-Investor)',
          fonds: 'Bitcoin und Krypto, Flock',
          indirekt: 'Erebor, Praxis',
        },
      ]}
    />
  )
}
