'use client'

import type { ReactNode } from 'react'
import { fmt, type FormatOptions } from './format'

/**
 * @deprecated Numbers no longer count up. Write the number with fmt() instead. Kept so older figures
 * compile: it now shows the final value at once. Flagged by scripts/check-post.mjs.
 */
export function CountUp({ value, ...format }: { value: number; duration?: number } & FormatOptions) {
  const { duration: _d, ...rest } = format as FormatOptions & { duration?: number }
  return <span className="vk-num">{fmt(value, rest)}</span>
}

export type StatItem = { value: number | string; label: ReactNode } & FormatOptions

/**
 * Two to four key numbers side by side, static. For headline numbers between paragraphs the ```stat
 * block in Markdown is simpler. Use this inside a figure, e.g. above a table.
 *
 *   <Stats items={[{ value: 54, label: 'Probanden' }, { value: 83, unit: ' %', label: 'konnten nichts zitieren' }]} />
 */
export function Stats({ items }: { items: StatItem[] }) {
  return (
    <div className="vk vk-stats">
      {items.map(({ value, label, ...format }, i) => (
        <div key={i}>
          <span className="vk-stat-value">{typeof value === 'number' ? fmt(value, format) : value}</span>
          <span className="vk-stat-label">{label}</span>
        </div>
      ))}
    </div>
  )
}
