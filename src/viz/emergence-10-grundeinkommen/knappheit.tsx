// What AI makes cheaper and what stays scarce when everybody has more money (Folge 10, 21:10–24:27;
// the split into scalable and constrained sectors follows the ILO research brief the episode cites).
// Replaces the paragraph listing digital goods vs. housing, care, childcare and crafts.

import { DataTable } from '@/viz/_kit'

export default function Knappheit() {
  return (
    <DataTable
      columns={[
        { key: 'bereich', label: 'Bereich', width: '24%' },
        { key: 'grund', label: 'Was KI daran ändert' },
        { key: 'preis', label: 'Preis, wenn alle mehr Geld haben', width: '24%' },
      ]}
      rows={[
        {
          bereich: 'Texte, Bilder, Code, Musik, Übersetzungen, Analysen',
          grund: 'KI drückt die Kosten geistiger Arbeit gegen null',
          preis: 'Fällt, vielleicht bis kostenlos',
        },
        {
          bereich: 'Wohnungen',
          grund: 'KI schafft keinen Quadratmeter Bauland',
          preis: 'Steigt: Vermieter nehmen das zusätzliche Geld mit',
          highlight: true,
        },
        {
          bereich: 'Pflege und Gesundheit',
          grund: 'KI bildet keine Pflegekräfte über Nacht aus, und die meisten wollen von Menschen gepflegt werden',
          preis: 'Steigt',
        },
        { bereich: 'Kinderbetreuung und Handwerk', grund: 'Bleibt physisch begrenzt', preis: 'Steigt' },
      ]}
    />
  )
}
