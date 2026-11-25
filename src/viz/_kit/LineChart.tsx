'use client'

import { useState } from 'react'
import { compact, fmt, niceMax, ticks, type FormatOptions } from './format'
import { useSize } from './hooks'
import { Legend } from './Legend'
import { color, seriesColor } from './tokens'
import { Tooltip, TipRow, useTooltip } from './Tooltip'

export type LineSeries = {
  name: string
  /** One value per entry in `x`; null leaves a gap. */
  values: (number | null)[]
}

export type Annotation = { x: number | string; label: string }

/**
 * Lines over time. Static; a crosshair follows the pointer (or the arrow keys) and the tooltip lists
 * every series at that point.
 *
 *   <LineChart x={[2019, 2020, 2021, 2022, 2023, 2024]} unit=" Mrd."
 *     series={[{ name: 'Rechenleistung', values: [1, 3, 9, 30, 110, 400] }]} log />
 *
 * One series: accent colour with a light wash below, no legend (the figure title names it).
 * Several series: names at the line ends (a legend only if the ends collide). Pass `highlight` with
 * the name of the series the title is about: it gets the accent, the others grey. Without
 * `highlight`, real categories get series colours in fixed order.
 * Never two y-axes: put a second measure in a second chart.
 */
export function LineChart({
  x,
  series,
  height = 280,
  min = 0,
  max,
  log = false,
  annotations = [],
  highlight,
  xFormat = (v) => String(v),
  format,
  ...fmtOptions
}: {
  /** Positions along the x-axis. Numbers (years) are spaced by value, strings evenly. */
  x: (number | string)[]
  series: LineSeries[]
  height?: number
  min?: number
  max?: number
  /** Logarithmic y-axis, for growth over orders of magnitude. */
  log?: boolean
  annotations?: Annotation[]
  /** Name of the series in focus: accent colour, others grey. */
  highlight?: string
  xFormat?: (v: number | string) => string
  /** Custom value text; otherwise fmt() with unit/decimals/prefix. */
  format?: (v: number) => string
} & FormatOptions) {
  const [box, { width }] = useSize<HTMLDivElement>()
  const tt = useTooltip<number>()
  const [index, setIndex] = useState<number | null>(null)
  const text = format ?? ((v: number) => fmt(v, fmtOptions))
  const multi = series.length > 1
  const colours = series.map((s, i) =>
    !multi ? color.accent : highlight ? (s.name === highlight ? color.accent : color.base) : seriesColor(i),
  )

  const all = series.flatMap((s) => s.values.filter((v): v is number => v !== null))
  const lo = log ? Math.max(1e-9, Math.min(...all.filter((v) => v > 0))) : min
  const hi = max ?? (log ? Math.max(...all) : niceMax(Math.max(...all)))
  const logLo = Math.floor(Math.log10(lo))
  const logHi = Math.ceil(Math.log10(hi))

  const yTicks = log ? Array.from({ length: logHi - logLo + 1 }, (_, i) => 10 ** (logLo + i)) : ticks(lo, hi, 4)
  const yText = (v: number) => (log || Math.abs(v) >= 10000 ? compact(v) : fmt(v))
  const left = Math.max(...yTicks.map((t) => yText(t).length)) * 7 + 10
  const right = multi ? Math.min(120, Math.max(...series.map((s) => s.name.length)) * 7 + 16) : 14
  const top = 14
  const bottom = 26
  const w = Math.max(0, width - left - right)
  const h = height - top - bottom

  const numeric = x.every((v) => typeof v === 'number')
  const x0 = numeric ? (x[0] as number) : 0
  const x1 = numeric ? (x[x.length - 1] as number) : x.length - 1
  const px = (i: number) => left + (((numeric ? (x[i] as number) : i) - x0) / (x1 - x0 || 1)) * w
  const py = (v: number) =>
    top + h - (log ? (Math.log10(v) - logLo) / (logHi - logLo || 1) : (v - lo) / (hi - lo || 1)) * h

  const path = (vals: (number | null)[]) =>
    vals.reduce((d, v, i) => (v === null || (log && v <= 0) ? d : d + `${d && vals[i - 1] != null ? 'L' : 'M'}${px(i).toFixed(1)},${py(v).toFixed(1)}`), '')
  const area = (vals: (number | null)[]) => {
    const pts = vals.map((v, i) => [i, v] as const).filter(([, v]) => v !== null) as [number, number][]
    if (pts.length < 2) return ''
    return `M${px(pts[0][0])},${top + h}` + pts.map(([i, v]) => `L${px(i)},${py(v)}`).join('') + `L${px(pts[pts.length - 1][0])},${top + h}Z`
  }

  const xTickIdx = (() => {
    const n = x.length
    const fit = Math.max(2, Math.floor(w / 64))
    const step = Math.ceil(n / fit)
    const out: number[] = []
    for (let i = 0; i < n; i += step) out.push(i)
    if (out[out.length - 1] !== n - 1) {
      if (n - 1 - out[out.length - 1] < step / 2) out.pop()
      out.push(n - 1)
    }
    return out
  })()

  const nearest = (clientX: number) => {
    const r = box.current?.getBoundingClientRect()
    if (!r) return null
    const mx = clientX - r.left
    let best = 0
    for (let i = 1; i < x.length; i++) if (Math.abs(px(i) - mx) < Math.abs(px(best) - mx)) best = i
    return best
  }
  const pointAt = (i: number) => {
    const ys = series.map((s) => s.values[i]).filter((v): v is number => v !== null)
    return { x: px(i), y: ys.length ? Math.min(...ys.map(py)) : top }
  }
  const move = (i: number | null) => {
    setIndex(i)
    if (i === null) return tt.hide()
    const r = box.current?.getBoundingClientRect()
    const p = pointAt(i)
    if (r) tt.show(i, r.left + p.x, r.top + p.y)
  }

  // End labels: only where they don't collide (otherwise the legend carries the names).
  const ends = series.map((s, si) => {
    let i = s.values.length - 1
    while (i > 0 && s.values[i] === null) i--
    const v = s.values[i]
    return v === null ? null : { si, y: py(v), x: px(i) }
  })
  const endOk = ends.map((e, k) => !!e && ends.every((o, j) => j === k || !o || Math.abs(o.y - e.y) > 14))

  return (
    <div className="vk" ref={tt.ref}>
      {multi && !endOk.every(Boolean) && (
        <Legend shape="line" items={series.map((s, i) => ({ label: s.name, color: colours[i] }))} />
      )}
      <div
        ref={box}
        className="vk-line-plot"
        style={{ height }}
        tabIndex={0}
        role="img"
        aria-label={series.map((s) => `${s.name}: ${s.values.map((v, i) => `${xFormat(x[i])} ${v === null ? '–' : text(v)}`).join(', ')}`).join('. ')}
        onPointerMove={(e) => move(nearest(e.clientX))}
        onPointerDown={(e) => move(nearest(e.clientX))}
        onPointerLeave={(e) => e.pointerType !== 'touch' && move(null)}
        onBlur={() => move(null)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault()
            const d = e.key === 'ArrowRight' ? 1 : -1
            move(Math.max(0, Math.min(x.length - 1, (index ?? (d > 0 ? -1 : x.length)) + d)))
          }
        }}
      >
        {width > 0 && (
          <svg width={width} height={height} aria-hidden>
            {yTicks.map((t) => (
              <g key={t}>
                <line x1={left} x2={left + w} y1={py(t)} y2={py(t)} stroke={t === lo && !log ? color.axis : color.grid} />
                <text x={left - 8} y={py(t)} dy="0.32em" textAnchor="end" className="vk-num">
                  {yText(t)}
                </text>
              </g>
            ))}
            {xTickIdx.map((i) => (
              <text key={i} x={px(i)} y={height - 6} textAnchor={i === 0 ? 'start' : i === x.length - 1 ? 'end' : 'middle'} className="vk-num">
                {xFormat(x[i])}
              </text>
            ))}
            {annotations.map((a) => {
              const i = x.indexOf(a.x)
              if (i < 0) return null
              return (
                <g key={a.label}>
                  <line x1={px(i)} x2={px(i)} y1={top} y2={top + h} stroke={color.axis} />
                  <text x={px(i) + 6} y={top + 10} style={{ fill: 'var(--viz-ink-2)' }}>
                    {a.label}
                  </text>
                </g>
              )
            })}
            {!multi && (
              <path d={area(series[0].values)} fill={color.accentWash} />
            )}
            {series.map((s, si) => (
              <path
                key={s.name}
                className="vk-line-path"
                d={path(s.values)}
                stroke={colours[si]}
                strokeWidth={highlight && s.name === highlight ? 2.5 : 2}
              />
            ))}
            {ends.map(
              (e, k) =>
                e && (
                  <g key={k}>
                    <circle cx={e.x} cy={e.y} r={4} fill={colours[e.si]} stroke={color.surface} strokeWidth={2} />
                    {multi && endOk[k] && (
                      <text x={e.x + 8} y={e.y} dy="0.32em" style={{ fill: highlight && series[e.si].name === highlight ? 'var(--viz-ink)' : 'var(--viz-ink-2)', fontWeight: highlight && series[e.si].name === highlight ? 600 : 400 }}>
                        {series[e.si].name}
                      </text>
                    )}
                  </g>
                ),
            )}
            {index !== null && (
              <g>
                <line x1={px(index)} x2={px(index)} y1={top} y2={top + h} stroke={color.ink} strokeOpacity={0.35} />
                {series.map((s, si) => {
                  const v = s.values[index]
                  return v === null ? null : <circle key={si} cx={px(index)} cy={py(v)} r={4.5} fill={colours[si]} stroke={color.surface} strokeWidth={2} />
                })}
              </g>
            )}
          </svg>
        )}
      </div>
      <Tooltip tip={tt.tip}>
        {(i) =>
          multi ? (
            <>
              <div className="vk-tip-title">{xFormat(x[i])}</div>
              {series.map((s, si) => (
                <TipRow key={s.name} color={colours[si]} label={s.name} value={s.values[i] === null ? '–' : text(s.values[i] as number)} />
              ))}
            </>
          ) : (
            <>
              <strong>{series[0].values[i] === null ? '–' : text(series[0].values[i] as number)}</strong>
              {xFormat(x[i])}
            </>
          )
        }
      </Tooltip>
    </div>
  )
}
