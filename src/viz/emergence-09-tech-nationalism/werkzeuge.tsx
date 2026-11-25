// Alex Capri's three tools of techno-nationalism and where they show today (Folge 9, 24:56–29:00).
// Pax Silica: signed 11 December 2025; members as named in the episode and the research notes.

import { DataTable } from '@/viz/_kit'

export default function Werkzeuge() {
  return (
    <DataTable
      columns={[
        { key: 'werkzeug', label: 'Werkzeug', width: '20%' },
        { key: 'prinzip', label: 'Prinzip' },
        { key: 'beispiel', label: 'Wo es sich zeigt' },
      ]}
      rows={[
        {
          werkzeug: 'Small Yard, High Fence',
          prinzip: 'Spitzentechnologie nur für einen kleinen Kreis Vertrauenswürdiger, mit hohem Zaun drumherum',
          beispiel: 'Das Fable-Verbot: Nutzung nur noch in den USA',
          highlight: true,
        },
        {
          werkzeug: 'Große Bifurkation',
          prinzip: 'Die Welt spaltet sich schrittweise in einen amerikanischen und einen chinesischen Block, Drittstaaten müssen wählen',
          beispiel: 'Pax Silica (11. Dezember 2025): Chip-Bündnis zu US-Bedingungen, ohne Deutschland, Frankreich und die EU',
          detail:
            'Neun Gründungsmitglieder, darunter die USA, Japan, Südkorea, Israel und die Emirate. Später traten Indien und Schweden bei.',
        },
        {
          werkzeug: 'Feedback-Loop',
          prinzip: 'Innovation schafft Wohlstand, Wohlstand schafft Macht, Macht finanziert neue Innovation',
          beispiel: 'USA und China bauen ihren Vorsprung aus, Nachzügler kommen kaum noch hinein',
        },
      ]}
    />
  )
}
