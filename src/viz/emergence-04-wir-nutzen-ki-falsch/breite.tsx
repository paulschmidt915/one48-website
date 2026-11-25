// OpenAI, "The State of Enterprise AI" (8 December 2025): frontier workers (95th percentile of
// adoption intensity) vs. the median worker. The episode cites 6x and 17x as "produktiver"; the report
// measures message volume (6x overall, 17x coding) and use of the data-analysis tool among data
// analysts (16x). Replaces the paragraph on the power-user gap.

import { BarChart, fmt } from '@/viz/_kit'

export default function Breite() {
  return (
    <>
      <BarChart
        format={(v) => `${fmt(v)}×`}
        max={20}
        labelWidth="15rem"
        data={[
          { label: 'Nachrichten insgesamt', value: 6 },
          { label: 'Datenanalyse-Tool (unter Datenanalysten)', value: 16 },
          { label: 'Nachrichten zum Coding', value: 17, highlight: true, note: 'Die größte Lücke aller Aufgabenarten.' },
        ]}
      />
      <p className="vk-note">
        Gezählt wird die Nutzung, nicht die Produktivität. Dieselbe Studie verknüpft Nutzungsdaten mit einer Befragung: Wer
        KI für rund sieben Aufgabentypen einsetzt, berichtet von fünfmal so viel gesparter Zeit wie jemand mit etwa vier.
      </p>
    </>
  )
}
