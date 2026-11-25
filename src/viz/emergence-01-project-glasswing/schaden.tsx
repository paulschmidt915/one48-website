// The episode's thought experiment (Folge 1, 34:24–35:20): damage of an attack with Mythos-level
// capabilities, next to NotPetya (2017, without AI) and the 2008 financial crisis. In billions of dollars.

import { BarChart, fmt } from '@/viz/_kit'

const money = (v: number) => (v >= 1000 ? `${fmt(v / 1000)} Bio. $` : `${fmt(v)} Mrd. $`)

export default function Schaden() {
  return (
    <BarChart
      max={2000}
      format={money}
      labelWidth="15rem"
      data={[
        { label: 'NotPetya 2017: ein Angriff, ohne KI', value: 10, note: 'CBS News: über 10 Mrd. Dollar Schaden, unter anderem bei der Reederei Maersk' },
        { label: 'Angriff mit Mythos-Fähigkeiten, vorsichtig gerechnet', value: 170, note: 'Ein Tag. Gedankenexperiment, keine Prognose' },
        { label: 'Angriff mit Mythos-Fähigkeiten, oberes Ende', value: 850, highlight: true, note: 'Ein Tag, knapp 1 % der globalen Wirtschaftsleistung' },
        { label: 'Finanzkrise 2008, über mehrere Jahre', value: 2000, note: 'rund 2 Billionen Dollar' },
      ]}
    />
  )
}
