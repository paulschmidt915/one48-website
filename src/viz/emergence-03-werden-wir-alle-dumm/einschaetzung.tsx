// METR (2025): what experienced developers expected, what they felt afterwards, what was measured
// (Folge 3, 30:20–30:53; METR, arXiv:2507.09089).

import { DotPlot } from '@/viz/_kit'

export default function Einschaetzung() {
  return (
    <DotPlot
      unit=" %"
      sign
      min={-30}
      max={30}
      labelWidth="13rem"
      reference={{ value: 0, label: 'so schnell wie ohne KI' }}
      rows={[
        { label: 'Erwartung vor dem Versuch', value: 24 },
        { label: 'Eigene Einschätzung danach', value: 20 },
        {
          label: 'Gemessen',
          value: -19,
          highlight: true,
          note: '16 erfahrene Open-Source-Entwickler, 246 echte Aufgaben, zufällig mit oder ohne KI-Werkzeuge. Mit KI brauchten sie 19 % länger.',
        },
      ]}
    />
  )
}
