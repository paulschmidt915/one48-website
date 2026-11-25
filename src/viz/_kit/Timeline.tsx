'use client'

import type { ReactNode } from 'react'
import { Expand } from './Expand'

export type TimelineEvent = {
  /** "2016", "2025-06", "2025-06-18" or "-370" (370 v. Chr.). Events are shown in the order given. */
  date: string
  /** The date as shown, e.g. "Juni 2025" or "um 370 v. Chr.". Defaults to a German version of `date`. */
  when?: string
  title: string
  /** One or two sentences, always visible. */
  text?: ReactNode
  /** Longer detail behind a "Details" button (optional). */
  detail?: ReactNode
  /** The event the title is about: accent dot, bold. */
  highlight?: boolean
}

const months = ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.']

/** "2025-06-18", "2025-06", "2016" or "-370" (370 BC) */
function parts(date: string): [number, number?, number?] {
  const m = date.match(/^(-?\d+)(?:-(\d{1,2}))?(?:-(\d{1,2}))?$/)
  if (!m) return [NaN]
  return [Number(m[1]), m[2] ? Number(m[2]) : undefined, m[3] ? Number(m[3]) : undefined]
}
const year = (y: number) => (y < 0 ? `${-y} v. Chr.` : String(y))
function label(date: string): string {
  const [y, m, d] = parts(date)
  if (Number.isNaN(y)) return date
  if (!m) return year(y)
  return d ? `${d}. ${months[m - 1]} ${year(y)}` : `${months[m - 1]} ${year(y)}`
}
function gap(a: string, b: string): string | null {
  const [y1, m1 = 1] = parts(a)
  const [y2, m2 = 1] = parts(b)
  const months = (y2 - y1) * 12 + (m2 - m1)
  if (!Number.isFinite(months) || months < 24) return null
  return `${Math.round(months / 12)} Jahre später`
}

/**
 * A chronology with every event visible at once: date, title, a sentence each. It replaces a
 * paragraph of "first … then … in 2016 …". Optional detail opens on click.
 *
 *   <Timeline events={[
 *     { date: '2016-07', title: 'Pokémon Go erscheint', text: 'Eine Milliarde Downloads.' },
 *     { date: '2024-11', title: 'Niantic zeigt sein Weltmodell', text: '…', highlight: true },
 *   ]} />
 *
 * `layout="horizontal"`: columns side by side on wide figures (use `size: wide`, at most 5 events),
 * the vertical list on phones. `gaps`: shows "47 Jahre später" between distant events.
 * 3–10 events work best.
 */
export function Timeline({
  events,
  layout = 'vertical',
  gaps = false,
}: {
  events: TimelineEvent[]
  layout?: 'vertical' | 'horizontal'
  gaps?: boolean
  /** @deprecated ignored: all events are shown */
  start?: number
  /** @deprecated ignored */
  even?: boolean
}) {
  const body = (e: TimelineEvent) => (
    <div className="vk-tlv-body">
      <p className="vk-tlv-title">{e.title}</p>
      {e.text && <div className="vk-tlv-text">{e.text}</div>}
      {e.detail && <Expand>{e.detail}</Expand>}
    </div>
  )

  if (layout === 'horizontal')
    return (
      <div className="vk vk-tlh">
        <ol className="vk-tlh-list" style={{ '--n': events.length } as React.CSSProperties}>
          {events.map((e, k) => (
            <li key={k} className="vk-tlh-item" data-on={e.highlight ? '' : undefined}>
              <p className="vk-tlv-when">{e.when ?? label(e.date)}</p>
              {body(e)}
            </li>
          ))}
        </ol>
      </div>
    )

  return (
    <ol className="vk vk-tlv">
      {events.map((e, k) => {
        const g = gaps && k > 0 ? gap(events[k - 1].date, e.date) : null
        return (
          <li key={k}>
            {g && <p className="vk-tlv-gap">{g}</p>}
            <div className="vk-tlv-item" data-on={e.highlight ? '' : undefined}>
              <p className="vk-tlv-when">{e.when ?? label(e.date)}</p>
              <span className="vk-tlv-rail" aria-hidden />
              {body(e)}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
