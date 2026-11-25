'use client'

import type { ReactNode } from 'react'
import { fmt, type FormatOptions } from './format'
import { useSize } from './hooks'
import { color } from './tokens'

export type Panel = {
  title: string
  /** A headline number for the panel, already formatted ("83 %"). */
  value?: ReactNode
  /** The small chart or content: a Sparkline, a UnitChart, a BarChart … */
  content?: ReactNode
  /** One sentence under the panel. */
  note?: ReactNode
}

/**
 * The same small chart repeated for several cases, side by side, on the same scale: three countries,
 * four studies, then and now. Instead of a toggle between states, show all states at once.
 *
 *   <SmallMultiples min="10rem" panels={[
 *     { title: 'Lehrkräfte 1970er', value: '72 %', content: <UnitChart legend={false} groups={[{ label: 'dagegen', value: 72 }]} />, note: 'gegen Taschenrechner' },
 *     …
 *   ]} />
 *
 * Give every panel the same kind of content and the same scale (pass the same `max`), or the comparison lies.
 */
export function SmallMultiples({ panels, min = '11rem' }: { panels: Panel[]; /** Smallest panel width. */ min?: string }) {
  return (
    <div className="vk vk-multiples" style={{ '--min': min } as React.CSSProperties}>
      {panels.map((p, i) => (
        <section key={i} className="vk-panel">
          <header className="vk-panel-head">
            <span className="vk-panel-title">{p.title}</span>
            {p.value !== undefined && <span className="vk-panel-value">{p.value}</span>}
          </header>
          {p.content}
          {p.note && <p className="vk-panel-note">{p.note}</p>}
        </section>
      ))}
    </div>
  )
}

/**
 * A small line without axes for small multiples or table cells: start and end value labelled.
 * Pass the same `min`/`max` to every sparkline you compare.
 *
 *   <Sparkline values={[3, 5, 9, 14]} labels={['2020', '2026']} unit=" Mio." max={20} />
 */
export function Sparkline({
  values,
  labels,
  min = 0,
  max,
  height = 56,
  highlight = true,
  ...format
}: {
  values: number[]
  /** Text under the first and last point, e.g. years. */
  labels?: [string, string]
  min?: number
  max?: number
  height?: number
  /** Accent colour (true) or grey (false). */
  highlight?: boolean
} & FormatOptions) {
  const [ref, { width }] = useSize<HTMLDivElement>()
  const hi = max ?? Math.max(...values)
  const padR = 4
  const w = Math.max(0, width - padR)
  const top = 16
  const h = height - top - (labels ? 16 : 4)
  const x = (i: number) => (i / Math.max(1, values.length - 1)) * w
  const y = (v: number) => top + h - ((v - min) / (hi - min || 1)) * h
  const d = values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('')
  const stroke = highlight ? color.accent : color.base
  const n = values.length - 1
  return (
    <div ref={ref} className="vk-spark" style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} role="img" aria-label={values.map((v) => fmt(v, format)).join(', ')}>
          <line x1={0} x2={w} y1={top + h} y2={top + h} stroke={color.axis} />
          <path d={d} fill="none" stroke={stroke} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          <circle cx={x(n)} cy={y(values[n])} r={3.5} fill={stroke} stroke={color.surface} strokeWidth={2} />
          <text x={0} y={y(values[0]) - 7} className="vk-num">
            {fmt(values[0], format)}
          </text>
          <text x={x(n)} y={y(values[n]) - 8} textAnchor="end" className="vk-num" style={{ fill: 'var(--viz-ink)', fontWeight: 600 }}>
            {fmt(values[n], format)}
          </text>
          {labels && (
            <>
              <text x={0} y={height - 2}>{labels[0]}</text>
              <text x={w} y={height - 2} textAnchor="end">
                {labels[1]}
              </text>
            </>
          )}
        </svg>
      )}
    </div>
  )
}
