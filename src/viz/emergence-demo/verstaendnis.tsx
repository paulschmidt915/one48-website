// Two ways of using AI side by side, on the same scale: how much of the material people understood.

import { SmallMultiples, UnitChart } from '@/viz/_kit'

export default function Verstaendnis() {
  return (
    <SmallMultiples
      min="13rem"
      panels={[
        {
          title: 'KI für Verständnisfragen genutzt',
          value: 'über 65 %',
          content: <UnitChart legend={false} total={100} columns={10} groups={[{ label: 'verstanden', value: 65 }]} restLabel="nicht verstanden" unit=" von 100" />,
        },
        {
          title: 'Fertige Antworten übernommen',
          value: '40 %',
          content: <UnitChart legend={false} total={100} columns={10} groups={[{ label: 'verstanden', value: 40 }]} restLabel="nicht verstanden" unit=" von 100" />,
        },
      ]}
    />
  )
}
