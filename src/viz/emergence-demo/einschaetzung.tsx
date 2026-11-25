// The METR study: what developers expected, what they felt, what was measured.

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
        { label: 'Gemessen', value: -19, highlight: true, note: '16 erfahrene Open-Source-Entwickler, 246 Aufgaben, zufällig mit oder ohne KI-Werkzeuge.' },
      ]}
    />
  )
}
