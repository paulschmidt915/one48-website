// What a full basic income would cost in the USA, against what the US state has ever spent or raised.
// All three numbers from Eduardo Porter, The Guardian (15. Dezember 2025); the episode cites the first.
// Replaces the paragraph with Porter's calculation.

import { BarChart } from '@/viz/_kit'

export default function Kosten() {
  return (
    <BarChart
      unit=" %"
      max={50}
      labelWidth="17rem"
      data={[
        {
          label: 'Grundeinkommen in Höhe des Medianlohns (53.000 $) für jeden Erwachsenen',
          value: 45,
          highlight: true,
          note: 'Über 14 Billionen Dollar im Jahr.',
        },
        {
          label: 'Steuereinnahmen aller staatlichen Ebenen, Höchstwert seit den 1960ern',
          value: 30,
          note: 'Lagen seitdem nie über 30 % der Wirtschaftsleistung.',
        },
        {
          label: 'Öffentliche Sozialausgaben, Höchstwert seit 1980',
          value: 25,
          note: 'Lagen seitdem nie über 25 % der Wirtschaftsleistung.',
        },
      ]}
    />
  )
}
