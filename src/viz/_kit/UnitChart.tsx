'use client'

import { useState } from 'react'
import { fmt } from './format'
import { color, seriesColor } from './tokens'
import { Tooltip, useTooltip } from './Tooltip'

export type UnitGroup = { label: string; value: number }

/**
 * "83 von 100": a grid of dots, coloured group by group. Static; hover a dot to see its group, hover
 * a legend entry to light up that group. Several of them side by side: put them in SmallMultiples.
 *
 *   <UnitChart total={100} groups={[{ label: 'konnten nichts zitieren', value: 83 }]} restLabel="konnten zitieren" />
 *
 * One group: accent vs. grey. Several groups: series colours in order, the remainder grey.
 */
export function UnitChart({
  groups,
  total = 100,
  columns = 10,
  legend = true,
  restLabel = 'Rest',
  unit = '',
}: {
  groups: UnitGroup[]
  /** Number of dots (default 100). */
  total?: number
  columns?: number
  /** Hide the legend (e.g. in small multiples where the panel title says it). */
  legend?: boolean
  /** Name of the grey remainder in legend and tooltip. */
  restLabel?: string
  /** Shown after the count in the tooltip, e.g. ' von 100' */
  unit?: string
}) {
  const [focus, setFocus] = useState<number | null>(null)
  const tt = useTooltip<number>()
  const colours = groups.length === 1 ? [color.accent] : groups.map((_, i) => seriesColor(i))
  const all = [...groups, { label: restLabel, value: Math.max(0, total - groups.reduce((s, g) => s + g.value, 0)) }]
  const groupOf: number[] = []
  all.forEach((g, gi) => {
    for (let k = 0; k < Math.round(g.value) && groupOf.length < total; k++) groupOf.push(gi)
  })
  const restIndex = all.length - 1
  const fill = (gi: number) => (gi === restIndex ? color.rest : colours[gi])

  return (
    <div className="vk" ref={tt.ref}>
      {legend && <div onPointerLeave={() => setFocus(null)}>
        <ul className="vk-legend" style={{ marginBottom: '1rem' }}>
          {all.map((g, gi) => (
            <li key={g.label} onPointerEnter={() => setFocus(gi)} style={{ opacity: focus === null || focus === gi ? 1 : 0.45 }}>
              <span className="vk-swatch" data-shape="dot" style={{ '--c': fill(gi) } as React.CSSProperties} />
              <span>
                <strong style={{ color: color.ink, fontWeight: 600 }}>{fmt(g.value)}</strong> {g.label}
              </span>
            </li>
          ))}
        </ul>
      </div>}
      <div
        className="vk-units"
        role="img"
        aria-label={all.map((g) => `${fmt(g.value)} ${g.label}`).join(', ')}
        style={{ '--cols': columns } as React.CSSProperties}
      >
        {groupOf.map((gi, i) => (
          <span
            key={i}
            className="vk-unit"
            {...tt.bind(gi)}
            style={
              {
                '--c': fill(gi),
                '--o': focus === null || focus === gi ? 1 : 0.25,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <Tooltip tip={tt.tip}>
        {(gi) => (
          <>
            <strong>
              {fmt(all[gi].value)}
              {unit}
            </strong>
            {all[gi].label}
          </>
        )}
      </Tooltip>
    </div>
  )
}
