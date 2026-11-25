'use client'

import type { ReactNode } from 'react'
import { fmt, niceMax, type FormatOptions } from './format'
import { Legend } from './Legend'
import { color, seriesColor } from './tokens'
import { Tooltip, TipRow, useTooltip } from './Tooltip'

export type Bar = {
  /** Category name. */
  label: string
  /** One number, or one per series (then pass `series`). Negative values grow to the left of zero. */
  value: number | number[]
  /** Paint this bar in the accent colour and grey out the others (single series only). */
  highlight?: boolean
  /** Extra line in the tooltip: detail, not something the reader must know. */
  note?: ReactNode
}

/**
 * Horizontal bars with the value at the tip. Static and fully readable; hover or focus shows the note.
 * On wide figures the labels sit in a column on the left, on phones above the bar.
 *
 *   <BarChart unit=" %" data={[
 *     { label: 'Nur Gehirn', value: 100 },
 *     { label: 'Suchmaschine', value: 79 },
 *     { label: 'ChatGPT', value: 45, highlight: true },
 *   ]} />
 *
 * Changes (−19 %, +40 %): negative values grow left from a zero line; pass `sign` for "+40 %".
 * Two or three values per bar (grouped): `series={['2016', '2026']}` and `value: [40, 61]`; the first
 * series is grey (`base`), the last the accent, unless `colors` says otherwise.
 */
export function BarChart({
  data,
  series,
  colors,
  max,
  thickness = 14,
  labelWidth,
  format,
  ...fmtOptions
}: {
  data: Bar[]
  /** Names of the series when `value` is an array (2–3). A legend is added. */
  series?: string[]
  /** Colours per series; default: base grey for all but the last, accent for the last. */
  colors?: string[]
  /** End of the scale (default: a round number above the largest value). */
  max?: number
  /** Bar thickness in px (max 24). */
  thickness?: number
  /** Width of the label column on wide figures, e.g. '14rem'. */
  labelWidth?: string
  /** Custom value text; otherwise fmt() with the unit/decimals/prefix/sign you pass. */
  format?: (v: number) => string
} & FormatOptions) {
  const tt = useTooltip<Bar>()
  const text = format ?? ((v: number) => fmt(v, fmtOptions))
  const values = (b: Bar) => (Array.isArray(b.value) ? b.value : [b.value])
  const all = data.flatMap(values)
  const hi = max ?? niceMax(Math.max(...all, 0))
  const lo = Math.min(0, ...all) < 0 ? -niceMax(-Math.min(...all)) : 0
  const pos = (v: number) => ((v - lo) / (hi - lo || 1)) * 100
  const zero = pos(0)
  const anyHighlight = !series && data.some((b) => b.highlight)
  const thick = Math.min(24, series ? Math.min(thickness, 10) : thickness)
  const seriesColors = colors ?? (series ? series.map((_, i) => (i === series.length - 1 ? color.accent : series.length > 2 ? seriesColor(i + 1) : color.base)) : [])

  return (
    <div className="vk" ref={tt.ref}>
      {series && series.length > 1 && <Legend items={series.map((s, i) => ({ label: s, color: seriesColors[i] }))} />}
      <div className="vk-bars" style={labelWidth ? ({ '--label-w': labelWidth } as React.CSSProperties) : undefined}>
        {data.map((b) => {
          const on = !anyHighlight || b.highlight
          return (
            <div key={b.label} className="vk-bar-row" data-on={anyHighlight && on ? '' : undefined} tabIndex={b.note || series ? 0 : undefined} {...(b.note || series ? tt.bind(b) : {})}>
              <div className="vk-bar-label">{b.label}</div>
              <div className="vk-bar-track">
                {values(b).map((v, i) => {
                  const a = Math.min(zero, pos(v))
                  const w = Math.abs(pos(v) - zero)
                  return (
                    <div className="vk-bar-line" key={i} style={{ position: 'relative', margin: `0 4.5rem 0 ${lo < 0 ? '4.5rem' : 0}`, height: Math.max(18, thick) }}>
                      {lo < 0 && <span style={{ position: 'absolute', left: `${zero}%`, top: -3, bottom: -3, width: 1, background: color.axis }} />}
                      <div
                        className="vk-bar"
                        style={
                          {
                            position: 'absolute',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            left: `${a}%`,
                            width: `max(2px, ${w}%)`,
                            '--thick': `${thick}px`,
                            '--c': series ? seriesColors[i] : v < 0 && lo < 0 && !anyHighlight ? color.neg : on ? color.accent : color.rest,
                            borderRadius: v < 0 ? '4px 2px 2px 4px' : undefined,
                          } as React.CSSProperties
                        }
                      />
                      <span
                        className="vk-bar-value"
                        style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', ...(v < 0 ? { right: `calc(${100 - a}% + 0.4rem)` } : { left: `calc(${a + w}% + 0.4rem)` }) }}
                      >
                        {text(v)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <Tooltip tip={tt.tip}>
        {(b) =>
          series ? (
            <>
              <div className="vk-tip-title">{b.label}</div>
              {values(b).map((v, i) => (
                <TipRow key={i} color={seriesColors[i]} label={series[i]} value={text(v)} />
              ))}
              {b.note && <div style={{ marginTop: '0.3rem' }}>{b.note}</div>}
            </>
          ) : (
            <>
              <strong>{text(values(b)[0])}</strong>
              {b.label}
              {b.note && <div style={{ marginTop: '0.2rem' }}>{b.note}</div>}
            </>
          )
        }
      </Tooltip>
    </div>
  )
}
