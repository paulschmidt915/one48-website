// These 1: Thiels Markt-Wetten als Kette von Engpässen, jede eine Ebene unter der vorigen, der Orbit
// außerhalb. Alle Angaben aus Skript und Recherche-Notizen zu Folge 12 (Stand 2026).

import { Layers } from '@/viz/_kit'

export default function Engpaesse() {
  return (
    <Layers
      layers={[
        {
          title: 'Apps, Plattformen, KI-Modelle',
          aside: 'wo alle hinschauen',
          text: 'Für Thiel weitgehend ausverdient. Hier liegen seine Renditewetten wie Facebook, nicht seine Thesen.',
        },
        {
          title: 'Chip · Substrate',
          aside: 'rund 100 Mio. $',
          text: 'Will Chips mit Röntgenlicht belichten statt auf den Maschinen von ASML, über die fast jeder Hochleistungschip läuft. Serienproduktion für etwa 2028 angepeilt.',
          detail: 'Gründer James Proud hat keinen Uni-Abschluss. Er war Thiel-Stipendiat: Thiel bezahlt junge Leute dafür, nicht zu studieren, sondern zu gründen.',
        },
        {
          title: 'Strom · Crusoe',
          aside: 'baut „Stargate“ in Texas',
          text: 'Baut KI-Rechenzentren dort, wo Energie billig und überschüssig ist: Gas, das sonst abgefackelt würde, Windstrom ohne Leitung. Stargate ist das Rechenzentrum von OpenAI und Oracle.',
          detail: 'Thiel zu dieser Wette: „The biggest risk with AI is that we don’t go big enough.“',
        },
        {
          title: 'Brennstoff · General Matter',
          aside: '900 Mio. $ vom US-Energieministerium',
          text: 'Reichert HALEU an, höher angereichertes Uran für die nächste Generation kleiner Reaktoren, die auch KI-Rechenzentren versorgen sollen. Thiel sitzt selbst im Verwaltungsrat.',
          detail: 'Der Vertrag kam im Januar 2026. Thiels Vater arbeitete früher in einer Uranmine im damaligen Apartheid-Namibia.',
          highlight: true,
        },
        {
          title: 'Weiter draußen: Orbit · Varda',
          aside: 'Kapsel gelandet, Feb. 2024',
          text: 'Unbemannte Fabrik in rund 300 km Höhe, die in Schwerelosigkeit Medikamenten-Kristalle züchtet. Die erste Kapsel landete in der Wüste von Utah, an Bord das HIV-Mittel Ritonavir.',
        },
      ]}
    />
  )
}
