// Who could quote a sentence from the essay they had just written, by group and session
// (Kosmyna et al. 2025, interviews after each session; study notes A, section 6.2).
// Session 1: 15 of 18 in the ChatGPT group could not quote. Session 3: 6 of 18 (ChatGPT), 0 of 18 (others).
// Session 4: 78 % (first ChatGPT, then without) vs. 11 % (first own head, then ChatGPT).

import { DataTable } from '@/viz/_kit'

export default function Zitieren() {
  return (
    <DataTable
      columns={[
        { key: 'gruppe', label: 'Gruppe' },
        { key: 'wann', label: 'Sitzung' },
        { key: 'anteil', label: 'Konnten nicht zitieren', format: { unit: ' %', decimals: 0 }, bar: true, width: '12rem' },
      ]}
      rows={[
        { gruppe: 'ChatGPT', wann: '1', anteil: 83, detail: '15 von 18 konnten keinen Satz aus ihrem eigenen Essay wiedergeben, keiner zitierte korrekt.' },
        { gruppe: 'ChatGPT', wann: '3', anteil: 33, detail: '6 von 18 konnten auch nach drei Sitzungen nicht korrekt zitieren.' },
        { gruppe: 'Suchmaschine', wann: '3', anteil: 0, detail: '0 von 18.' },
        { gruppe: 'Nur der eigene Kopf', wann: '3', anteil: 0, detail: '0 von 18.' },
        { gruppe: 'Erst ChatGPT, dann ohne', wann: '4 (Tausch)', anteil: 78, highlight: true },
        { gruppe: 'Erst eigener Kopf, dann ChatGPT', wann: '4 (Tausch)', anteil: 11 },
      ]}
    />
  )
}
