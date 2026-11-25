// The three ways Lisa's agents go wrong in the episode (Folge 8, 17:22–20:15) and the task each creates.
// Replaces the paragraph on drift, blind spots and contradictions.

import { DataTable } from '@/viz/_kit'

export default function Pannen() {
  return (
    <DataTable
      columns={[
        { key: 'panne', label: 'Panne', width: '16%' },
        { key: 'fall', label: 'Was passiert' },
        { key: 'agent', label: 'Betroffen', width: '18%' },
        { key: 'aufgabe', label: 'Lisas neue Aufgabe', width: '24%' },
      ]}
      rows={[
        {
          panne: 'Drift',
          fall: 'Die Firma ändert ihre Preisstrategie, niemand sagt es dem Agenten. Er schreibt weiter perfekt, nur mit den alten Argumenten.',
          agent: 'Erstansprache',
          aufgabe: 'Agenten auf dem Laufenden halten',
          detail: 'Drei Monate lief der Agent hervorragend. Auffallen kann die Abweichung erst im Kundengespräch, wenn der Kunde auf die alte Mail verweist.',
        },
        {
          panne: 'Blinder Fleck',
          fall: 'Ein Kunde wechselte nur, weil ein Kollege ihm beim Abendessen bessere Bedingungen versprach. Das steht in keinem System.',
          agent: 'Angebote',
          aufgabe: 'Kontext liefern, der nirgends steht',
        },
        {
          panne: 'Widerspruch',
          fall: 'Am selben Tag nennt ein Agent einen Großkunden vielversprechend, der andere schwierig, auf Basis anderer Daten.',
          agent: 'Recherche, Konkurrenz',
          aufgabe: 'Entscheiden, welchem Signal sie folgt',
          highlight: true,
        },
      ]}
    />
  )
}
