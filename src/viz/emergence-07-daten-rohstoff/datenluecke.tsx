// How much video exists of the physical world vs. internet video overall, as cited in Folge 7 (30:11–31:11).
// Replaces the run of data volumes in the text.

import { BarChart, compact } from '@/viz/_kit'

export default function Datenluecke() {
  return (
    <BarChart
      labelWidth="16rem"
      format={(v) => `${compact(v)} Std.`}
      data={[
        { label: 'Internet-Video', value: 1_000_000_000, note: 'Ungefähr eine Milliarde Stunden.' },
        {
          label: 'Physische Interaktionsdaten',
          value: 300_000,
          highlight: true,
          note: 'Aufnahmen, wie sich echte Hände bewegen, wie echte Räume aussehen, wie sich Objekte anfühlen: 0,03 % der Videodaten.',
        },
      ]}
    />
  )
}
