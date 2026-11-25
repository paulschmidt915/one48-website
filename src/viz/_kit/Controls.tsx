'use client'

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

export type ToggleOption<V extends string> = { value: V; label: string }

/**
 * @deprecated Not allowed in Emergence figures any more: no toggles, sliders or other controls. If two
 * states matter, show them side by side (SmallMultiples, two columns, DotPlot with two values).
 * Kept only so figures written before the rules changed still compile; scripts/check-post.mjs flags it.
 *
 * A row of pills, exactly one is on: switch between two or three states of a figure
 * ("Ohne KI" / "Mit KI", "2016" / "2026"). Put it above the chart it changes.
 *
 *   const [view, setView] = useState<'ohne' | 'mit'>('ohne')
 *   <Toggle label="Gruppe" options={[{ value: 'ohne', label: 'Ohne KI' }, { value: 'mit', label: 'Mit KI' }]}
 *           value={view} onChange={setView} />
 */
export function Toggle<V extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: ToggleOption<V>[]
  value: V
  onChange: (value: V) => void
  /** What the toggle switches, for screen readers. */
  label: string
}) {
  const row = useRef<HTMLDivElement>(null)
  const [thumb, setThumb] = useState<{ left: number; width: number } | null>(null)

  useLayoutEffect(() => {
    const measure = () => {
      const el = row.current?.querySelector<HTMLButtonElement>('button[aria-pressed="true"]')
      if (el) setThumb({ left: el.offsetLeft, width: el.offsetWidth })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (row.current) ro.observe(row.current)
    return () => ro.disconnect()
  }, [value])

  return (
    <div className="vk-toggle" role="group" aria-label={label} ref={row}>
      {thumb && <span className="vk-toggle-thumb" style={{ left: thumb.left, width: thumb.width }} aria-hidden />}
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

/**
 * @deprecated Not allowed in Emergence figures any more: no toggles, sliders or other controls. If two
 * states matter, show them side by side (SmallMultiples, two columns, DotPlot with two values).
 * Kept only so figures written before the rules changed still compile; scripts/check-post.mjs flags it.
 *
 * A slider to scrub through a range (years, steps, a quantity). Shows its label and the current value.
 *
 *   <Slider label="Jahr" min={2016} max={2026} value={year} onChange={setYear} />
 */
export function Slider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  format = (v) => String(v),
}: {
  label: string
  min: number
  max: number
  step?: number
  value: number
  onChange: (value: number) => void
  format?: (value: number) => ReactNode
}) {
  const p = ((value - min) / (max - min || 1)) * 100
  return (
    <label className="vk-slider">
      <span className="vk-slider-head">
        <span>{label}</span>
        <output>{format(value)}</output>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--p': `${p}%` } as React.CSSProperties}
      />
    </label>
  )
}

/**
 * @deprecated Not allowed in Emergence figures any more: no toggles, sliders or other controls. If two
 * states matter, show them side by side (SmallMultiples, two columns, DotPlot with two values).
 * Kept only so figures written before the rules changed still compile; scripts/check-post.mjs flags it.
 * One row above a chart for its toggles and sliders.
 */
export function Controls({ children }: { children: ReactNode }) {
  return <div className="vk-controls">{children}</div>
}
