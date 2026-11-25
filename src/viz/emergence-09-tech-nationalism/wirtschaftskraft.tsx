// Economic output 2025 in trillion dollars, as the episode compares them (Folge 9, 41:47–42:20).
// China is purchasing-power adjusted ("über 40"), the others nominal, as in the episode.

import { BarChart, fmt } from '@/viz/_kit'

export default function Wirtschaftskraft() {
  return (
    <>
      <BarChart
        max={50}
        format={(v) => (v === 40 ? `über ${fmt(v)} Bio. $` : `${fmt(v)} Bio. $`)}
        data={[
          { label: 'China', value: 40, note: 'kaufkraftbereinigt' },
          { label: 'USA', value: 30 },
          { label: 'EU', value: 22, highlight: true, note: '27 Länder mit 27 Digitalstrategien' },
          { label: 'Deutschland', value: 6 },
        ]}
      />
      <p className="vk-note">Rund, 2025. China kaufkraftbereinigt, die übrigen Werte nominal.</p>
    </>
  )
}
