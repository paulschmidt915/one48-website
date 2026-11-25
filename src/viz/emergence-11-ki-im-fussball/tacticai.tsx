// TacticAI (Google DeepMind with Liverpool FC): how the corner-kick study was done and what it found.
// Source: Wang et al., Nature Communications (2024), as cited in Folge 11.

import { Flow } from '@/viz/_kit'

export default function TacticAI() {
  return (
    <Flow
      steps={[
        { title: 'Daten', value: '7.176', text: 'echte Eckbälle aus der Premier League, Saison 2020/21' },
        { title: 'Modell', text: 'TacticAI sagt voraus, wer den Ball bekommt, und schlägt neue Laufwege und Zuordnungen vor.' },
        {
          title: 'Prüfung',
          value: '5',
          text: 'Fachleute des FC Liverpool vergleichen KI-Vorschläge mit den echt gespielten Varianten.',
          detail: 'Drei Datenanalysten, ein Video-Analyst, ein Assistent des Trainerteams. Echte und von der KI erzeugte Ecken konnten sie kaum auseinanderhalten.',
        },
        { title: 'Urteil', value: '90 %', text: 'der Fälle zogen sie den Vorschlag der Maschine vor.', highlight: true },
      ]}
    />
  )
}
