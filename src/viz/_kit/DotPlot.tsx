'use client'

import type { ReactNode } from 'react'
import { fmt, niceMax, ticks, type FormatOptions } from './format'
import { color, seriesColor } from './tokens'
import { Tooltip, TipRow, useTooltip } from './Tooltip'

export type DotRow = {
  label: string
  /** One value (ranked dot plot) or two/three (range or before/after: "dumbbell"). */
  value: number | number[]
  /** The row the title is about. */
  highlight?: boolean
  /** Extra detail in the tooltip. */
  note?: ReactNode
}

/**
 * Dot plot: one dot per row on a shared axis, or two dots joined by a line for a range, a before/after
 * or forecast vs. actual. Leaner than bars and shows gaps directly. Values are labelled at the dot;
 * with two values the series names sit above the first row (no legend box).
 *
 *   // Expectation vs. measurement, a zero line:
 *   <DotPlot unit=" %" sign reference={{ value: 0, label: 'kein Effekt' }} rows={[
 *     { label: 'Erwartet vorher', value: 24 },
 *     { label: 'Gefühlt danach', value: 20 },
 *     { label: 'Gemessen', value: -19, highlight: true },
 *   ]} />
 *
 *   // Then and now per country:
 *   <DotPlot series={['2016', '2026']} unit=" %" rows={[{ label: 'USA', value: [40, 61] }, …]} />
 */
export function DotPlot({
  rows,
  series,
  colors,
  min,
  max,
  reference,
  labelWidth,
  sort,
  format,
  ...fmtOptions
}: {
  rows: DotRow[]
  /** Names of the values when `value` is an array; shown above the first row. */
  series?: string[]
  /** Colours per value; default: grey for the first, accent for the last. */
  colors?: string[]
  min?: number
  max?: number
  /** A vertical reference line, e.g. zero, an average or a target. */
  reference?: { value: number; label?: string }
  /** Width of the label column on wide figures, e.g. '12rem'. */
  labelWidth?: string
  /** Order rows by their (last) value. Default: as given. */
  sort?: 'desc' | 'asc'
  format?: (v: number) => string
} & FormatOptions) {
  const tt = useTooltip<DotRow>()
  const text = format ?? ((v: number) => fmt(v, fmtOptions))
  const vals = (r: DotRow) => (Array.isArray(r.value) ? r.value : [r.value])
  const last = (r: DotRow) => vals(r)[vals(r).length - 1]
  const ordered = sort ? [...rows].sort((a, b) => (sort === 'desc' ? last(b) - last(a) : last(a) - last(b))) : rows
  const all = rows.flatMap(vals).concat(reference ? [reference.value] : [])
  const lowest = Math.min(...all)
  const lo = min ?? (lowest < 0 ? -niceMax(-lowest) : 0)
  const hi = max ?? niceMax(Math.max(...all))
  const at = (v: number) => ((v - lo) / (hi - lo || 1)) * 100
  const tickValues = ticks(lo, hi, 4)
  const anyHighlight = rows.some((r) => r.highlight)
  const n = Math.max(...rows.map((r) => vals(r).length))
  const palette = colors ?? Array.from({ length: n }, (_, i) => (n === 1 ? color.accent : i === n - 1 ? color.accent : n > 2 ? seriesColor(i + 1) : color.base))
  const dotColor = (r: DotRow, i: number) => (n === 1 ? (!anyHighlight || r.highlight ? color.accent : color.base) : palette[i])
  const tickText = (v: number) => (format ? format(v) : fmt(v, { ...fmtOptions, unit: fmtOptions.unit?.trim() === '%' ? ' %' : '' }))

  return (
    <div className="vk vk-dots" ref={tt.ref} data-series={series && n > 1 ? '' : undefined} style={labelWidth ? ({ '--label-w': labelWidth } as React.CSSProperties) : undefined}>
      <div className="vk-dots-axis" aria-hidden>
        <span />
        <div className="vk-dots-ticks">
          {tickValues.map((t) => (
            <span key={t} className="vk-dots-tick" style={{ left: `${at(t)}%` }}>
              {tickText(t)}
            </span>
          ))}
        </div>
      </div>
      {ordered.map((r, ri) => {
        const v = vals(r)
        const a = Math.min(...v)
        const b = Math.max(...v)
        const end = last(r)
        const side = at(end) > 82 || (v.length > 1 && end < v[0]) ? 'left' : 'right'
        const interactive = !!r.note || v.length > 1
        return (
          <div
            key={r.label}
            className="vk-dots-row"
            data-on={anyHighlight && r.highlight ? '' : undefined}
            tabIndex={interactive ? 0 : undefined}
            {...(interactive ? tt.bind(r) : {})}
          >
            <div className="vk-dots-label">{r.label}</div>
            <div className="vk-dots-plot">
              {tickValues.map((t) => (
                <span key={t} className="vk-dots-grid" data-zero={t === 0 && lo < 0 ? '' : undefined} style={{ left: `${at(t)}%` }} />
              ))}
              {reference && <span className="vk-dots-grid" data-zero="" style={{ left: `${at(reference.value)}%` }} />}
              {v.length > 1 && <span className="vk-dots-link" style={{ left: `${at(a)}%`, width: `${at(b) - at(a)}%` }} />}
              {v.map((x, i) => (
                <span key={i} className="vk-dots-dot" style={{ left: `${at(x)}%`, '--c': dotColor(r, i) } as React.CSSProperties}>
                  {ri === 0 && series && <span className="vk-dots-serieslabel">{series[i]}</span>}
                </span>
              ))}
              <span className="vk-dots-value" data-side={side} style={{ left: `${at(end)}%` }}>
                {text(end)}
              </span>
            </div>
          </div>
        )
      })}
      {reference?.label && (
        <p className="vk-note" style={{ marginTop: '0.5rem' }}>
          Senkrechte Linie: {reference.label} ({text(reference.value)})
        </p>
      )}
      <Tooltip tip={tt.tip}>
        {(r) => (
          <>
            {vals(r).length > 1 ? (
              <>
                <div className="vk-tip-title">{r.label}</div>
                {vals(r).map((x, i) => (
                  <TipRow key={i} color={palette[i]} label={series?.[i] ?? ''} value={text(x)} />
                ))}
              </>
            ) : (
              <>
                <strong>{text(vals(r)[0])}</strong>
                {r.label}
              </>
            )}
            {r.note && <div style={{ marginTop: '0.3rem' }}>{r.note}</div>}
          </>
        )}
      </Tooltip>
    </div>
  )
}
