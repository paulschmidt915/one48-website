// What studies say about how people hear AI music, as cited in Folge 5 (53:41–56:00, 70:23–72:40).
// Study details checked against the episode research notes. Replaces the paragraphs on blind tests,
// Authorship Bias and the Luminate survey.

import { DataTable } from '@/viz/_kit'

export default function Studien() {
  return (
    <DataTable
      columns={[
        { key: 'studie', label: 'Studie', width: '24%' },
        { key: 'aufbau', label: 'Aufbau' },
        { key: 'ergebnis', label: 'Ergebnis' },
      ]}
      rows={[
        {
          studie: 'Deezer und Ipsos (2025)',
          aufbau: '9.000 Erwachsene in acht Ländern hören drei Tracks, zwei davon KI, und sollen sie zuordnen.',
          ergebnis: '97 % ordnen falsch zu.',
          detail: 'Von Deezer selbst in Auftrag gegeben und methodisch wackelig: nur drei Tracks, und zwei von drei waren KI.',
        },
        {
          studie: '„Echoes of Humanity“ (2025)',
          aufbau: '308 Teilnehmer, je vier Songpaare aus einem KI- und einem menschlichen Song.',
          ergebnis: 'Zufällige Paare: nicht besser als Raten. Ähnliche Paare: 66 % richtig.',
          detail: 'Wer richtig lag, erkannte die KI meist an der Stimme: robotischer Klang, unnatürliche Atempausen, keine Brüche.',
        },
        {
          studie: 'Christopher White (2024)',
          aufbau: 'Zwei Gruppen hören dasselbe Stück. Der einen wird gesagt, es sei KI-generiert.',
          ergebnis: 'Die „KI“-Gruppe findet es deutlich weniger berührend und weniger kreativ.',
          highlight: true,
          detail: 'Forscher nennen das Authorship Bias: Der Glaube, ein Mensch habe etwas gemacht, vertieft die emotionale Bindung.',
        },
        {
          studie: 'Luminate (2026)',
          aufbau: 'Befragung von Konsumenten zu KI-Musik, verglichen mit dem Vorjahr.',
          ergebnis: 'Netto-Stimmung fällt von −13 auf −20 Prozentpunkte, am stärksten bei Gen Z und Gen Alpha.',
        },
      ]}
    />
  )
}
