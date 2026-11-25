// The episode's readings of the ban: what points to each and what it would mean (Folge 9, 17:10–22:01).

import { DataTable } from '@/viz/_kit'

export default function Lesarten() {
  return (
    <DataTable
      columns={[
        { key: 'lesart', label: 'Lesart', width: '20%' },
        { key: 'indiz', label: 'Was dafür spricht' },
        { key: 'folge', label: 'Was daraus folgen würde' },
      ]}
      rows={[
        {
          lesart: 'Sicherheit',
          indiz: 'Amazons Hinweis, von der NSA als Beweis genug eingestuft',
          folge: 'Modelle sind so stark, dass sie nicht mehr veröffentlicht werden dürfen',
          detail:
            'Dagegen: Anthropic sagt, es gebe keinen Beweis für einen universellen Jailbreak. Und Modelle anderer Anbieter mit ähnlichen Fähigkeiten blieben am Netz.',
        },
        {
          lesart: 'Machtdemonstration',
          indiz: 'Verteidigungsminister Pete Hegseth brüstet sich öffentlich, Anthropic rausgeworfen zu haben',
          folge: 'Die Regierung schaltet ab, wann sie will, egal ob die Firma amerikanisch ist',
        },
        {
          lesart: 'Vergeltung',
          indiz: 'Anthropic verweigerte die Mitarbeit an autonomen Waffensystemen, das Pentagon stufte die Firma als Lieferkettenrisiko ein',
          folge: 'Wer nicht nach den Regeln der Regierung spielt, wird bestraft',
        },
        {
          lesart: 'Muster',
          indiz: 'In Kreisen der Regierung gilt KI nicht als Werkzeug, sondern als Überlebensfrage',
          folge: 'Kein Einzelfall, sondern Tech-Nationalismus',
          highlight: true,
        },
      ]}
    />
  )
}
