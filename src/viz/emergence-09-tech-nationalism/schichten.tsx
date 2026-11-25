// Europe's digital dependency in five layers, with the numbers the episode gives (Folge 9, 30:23–37:00).
// Models 59/35/2 and venture capital: Handelsblatt (Mai 2026). Infrastructure shares: FAZ (Juni 2026).
// Chip spending 97 bn $ (transcript "fast 100"): Capri's book, per the research notes.
// Global cloud share: transcript "70 %", research notes 68 % (Q1 2026), so "rund 70 %".

import { Layers } from '@/viz/_kit'

export default function Schichten() {
  return (
    <Layers
      layers={[
        {
          title: 'KI-Modelle',
          aside: 'USA 59 · China 35 · Europa 2',
          text: 'Relevante KI-Modelle nach Herkunft. Ein europäisches Frontier-Modell gibt es nicht.',
          detail: 'Aleph Alpha hat den eigenen Modellbau praktisch eingestellt und ist in der kanadischen Firma Cohere aufgegangen. Bleibt Mistral aus Frankreich.',
          highlight: true,
        },
        {
          title: 'Cloud',
          aside: '80 % in US-Hand',
          text: 'Anteil von US-Konzernen an der europäischen Cloud. Weltweit halten Amazon, Microsoft und Google zusammen rund 70 %.',
          detail: 'Dem Internationalen Strafgerichtshof in Den Haag wurde nach US-Sanktionen der Zugang zu seiner Microsoft-Cloud entzogen.',
        },
        {
          title: 'Chips',
          aside: '90 % von TSMC',
          text: 'Fast alle modernsten Chips kommen von einer einzigen Firma in Taiwan. Europa liefert zu: Maschinen von ASML, Spezialchemie von Merck.',
          detail: 'TSMC, Intel und Samsung gaben 2023 zusammen 97 Mrd. Dollar für Chips aus, mehr als doppelt so viel, wie die EU für ein ganzes Jahrzehnt eingeplant hat.',
        },
        {
          title: 'Infrastruktur',
          aside: '70–80 % aus China',
          text: 'So hoch ist der Anteil chinesischer Solarwechselrichter in Deutschland. Bei den großen Hafenkränen sind es 67 %, in Wilhelmshaven 80 %.',
        },
        {
          title: 'Talent und Kapital',
          aside: 'USA 209 · Deutschland < 10 Mrd. $',
          text: 'Wagniskapital 2024, China kam auf 40 Mrd. Dollar. Der Zuzug von Tech-Talenten nach Europa halbierte sich von rund 52.000 (2022) auf 26.000 (2024).',
        },
      ]}
    />
  )
}
