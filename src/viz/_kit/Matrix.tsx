'use client'

import type { ReactNode } from 'react'
import { color } from './tokens'
import { Tooltip, useTooltip } from './Tooltip'

export type Axis = { label: string; low: string; high: string }
export type Quadrant = { title: string; text?: ReactNode; items?: string[]; highlight?: boolean }
export type MatrixItem = { label: string; x: number; y: number; highlight?: boolean; note?: ReactNode }

/**
 * A 2×2 matrix: two axes, four quadrants with a title, a sentence and examples. Optionally items
 * placed by position (0–1 on each axis); only use positions you can justify from the episode, otherwise
 * list the items inside their quadrant.
 *
 *   <Matrix
 *     x={{ label: 'Leistung heute', low: 'schlechter', high: 'besser' }}
 *     y={{ label: 'Können morgen', low: 'verliert', high: 'gewinnt' }}
 *     quadrants={[
 *       { title: 'Anstrengung, die sich lohnt', items: ['…'] },   // top left
 *       { title: 'Lernen mit Gerüst', items: ['…'], highlight: true },  // top right
 *       { title: 'Doppelt verloren', items: ['…'] },                // bottom left
 *       { title: 'Bequem, aber teuer', items: ['…'] },              // bottom right
 *     ]}
 *   />
 */
export function Matrix({
  x,
  y,
  quadrants,
  items = [],
  height = '20rem',
}: {
  x: Axis
  y: Axis
  /** Top left, top right, bottom left, bottom right. */
  quadrants?: [Quadrant, Quadrant, Quadrant, Quadrant]
  items?: MatrixItem[]
  /** Minimum height of the field. */
  height?: string
}) {
  const tt = useTooltip<MatrixItem>()
  return (
    <div className="vk" ref={tt.ref}>
      <div className="vk-matrix">
        <div className="vk-matrix-y">
          <span>{y.low}</span>
          <span className="vk-matrix-axis-title">{y.label} →</span>
          <span>{y.high}</span>
        </div>
        <div className="vk-matrix-field" style={{ '--h': height } as React.CSSProperties}>
          {(quadrants ?? [{ title: '' }, { title: '' }, { title: '' }, { title: '' }]).map((q, i) => (
            <div key={i} className="vk-quad" data-on={q.highlight ? '' : undefined}>
              {q.title && <p className="vk-quad-title">{q.title}</p>}
              {q.text && <div className="vk-quad-text">{q.text}</div>}
              {q.items && (
                <ul>
                  {q.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {items.map((it) => (
            <span
              key={it.label}
              className="vk-matrix-item"
              data-side={it.x > 0.7 ? 'left' : 'right'}
              tabIndex={it.note ? 0 : undefined}
              {...(it.note ? tt.bind(it) : {})}
              style={{ left: `${it.x * 100}%`, top: `${(1 - it.y) * 100}%`, '--c': it.highlight ? color.accent : color.base } as React.CSSProperties}
            >
              <span style={{ fontWeight: it.highlight ? 600 : 500 }}>{it.label}</span>
            </span>
          ))}
        </div>
        <div className="vk-matrix-x">
          <span>{x.low}</span>
          <span className="vk-matrix-axis-title">{x.label} →</span>
          <span>{x.high}</span>
        </div>
      </div>
      <Tooltip tip={tt.tip}>
        {(it) => (
          <>
            <strong>{it.label}</strong>
            {it.note}
          </>
        )}
      </Tooltip>
    </div>
  )
}
