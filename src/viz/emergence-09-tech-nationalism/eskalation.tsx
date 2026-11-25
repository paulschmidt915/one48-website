// How US technology controls moved inwards, from 1946 to the Fable ban (Folge 9, 13:25–16:56 and 24:07–24:56).
// The episode dates the CHIPS Act to 2024 under Trump and the 2023 tightening to Trump; both were under
// Biden (CHIPS Act 2022), so the CHIPS Act is left out and the 2023 tightening is not attributed.

import { Timeline } from '@/viz/_kit'

export default function Eskalation() {
  return (
    <Timeline
      layout="horizontal"
      events={[
        {
          date: '1946',
          title: 'Atomtechnik abgeriegelt',
          text: 'Nach dem Manhattan-Projekt sperren die USA die Technologie per Gesetz, auch für Großbritannien und Kanada, die mitgebaut hatten.',
          detail: 'Erst 1958, zwölf Jahre später, dürfen die Verbündeten wieder an der Atomtechnologie mitarbeiten.',
        },
        { date: '2019', title: 'Huawei verbannt', text: 'Der chinesische Konzern verliert den Zugang zu amerikanischer Technologie.' },
        {
          date: '2022',
          title: 'Keine Spitzenchips für China',
          text: 'Die Regierung Biden verbietet den Export von Hochleistungschips nach China, 2023 werden die Regeln verschärft.',
        },
        { date: '2025', title: 'TikTok muss verkaufen', text: 'Die App wird in den USA zum Verkauf gezwungen.' },
        {
          date: '2026-06',
          title: 'Fable 5 gesperrt',
          text: 'Erstmals trifft es ein amerikanisches Unternehmen, und mit ihm die engsten Verbündeten.',
          highlight: true,
          detail:
            'Im Januar 2026 hatte Anthropic-Chef Dario Amodei in Davos selbst für Exportkontrollen geworben: Gute KI-Chips an China zu verkaufen sei, als verkaufe man Atomwaffen an Nordkorea.',
        },
      ]}
    />
  )
}
