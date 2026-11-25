'use client'

import { Fragment, useState, type ReactNode } from 'react'
import { Chevron } from './Expand'
import { fmt, type FormatOptions } from './format'
import { color } from './tokens'

export type Column<R> = {
  /** Field of the row to show (or use `cell`). */
  key: keyof R & string
  /** Column heading, short. */
  label: string
  /** 'right' for numbers (default when the values are numbers), 'left' for text. */
  align?: 'left' | 'right'
  /** How a number is written (unit, decimals, sign …), via fmt(). */
  format?: FormatOptions | ((v: number) => string)
  /** Draw a small bar next to the number. 'diverging' for values around zero (blue +, red −). */
  bar?: boolean | 'diverging'
  /** Custom cell content (overrides key/format). */
  cell?: (row: R) => ReactNode
  /** CSS width, e.g. '40%' or '8rem'. */
  width?: string
}

export type Row = {
  /** Highlight this row: accent marker and bold. */
  highlight?: boolean
  /** Extra detail, shown when the reader clicks the row. */
  detail?: ReactNode
}

/**
 * An exhibit table: aligned tabular numbers, optional small bars, one highlighted row, and rows that
 * open on click to show detail (source, method, a caveat). It replaces a paragraph full of numbers.
 *
 *   <DataTable
 *     columns={[
 *       { key: 'studie', label: 'Studie' },
 *       { key: 'effekt', label: 'Effekt', format: { unit: ' %', sign: true }, bar: 'diverging' },
 *     ]}
 *     rows={[
 *       { studie: 'Entwickler (METR 2025)', effekt: -19, detail: '16 Entwickler, 246 Aufgaben …' },
 *       { studie: 'Berater (BCG 2023)', effekt: 40, highlight: true },
 *     ]}
 *   />
 *
 * Keep it to 3–8 rows and 2–4 columns; the first column names the row. `total` adds a sum line.
 * On phones a table with three or more columns turns into one block per row (column names as labels).
 */
export function DataTable<R extends Row & Record<string, unknown>>({
  columns,
  rows,
  total,
}: {
  columns: Column<R>[]
  rows: R[]
  /** A last line in bold, e.g. { name: 'Summe', value: 120 } with the same keys as the rows. */
  total?: Partial<R>
}) {
  const [open, setOpen] = useState<number | null>(null)
  const anyHighlight = rows.some((r) => r.highlight)
  const isNum = (c: Column<R>) => rows.every((r) => typeof r[c.key] === 'number' || r[c.key] == null)
  const ranges = new Map(
    columns.map((c) => {
      const vs = rows.map((r): unknown => r[c.key]).filter((v): v is number => typeof v === 'number')
      return [c.key, { max: Math.max(0, ...vs.map(Math.abs)) }]
    }),
  )
  const text = (c: Column<R>, v: unknown) =>
    typeof v === 'number' ? (typeof c.format === 'function' ? c.format(v) : fmt(v, c.format)) : (v as ReactNode)

  const cell = (c: Column<R>, r: Partial<R>, highlight: boolean) => {
    if (c.cell && r !== total) return c.cell(r as R)
    const v = r[c.key]
    if (!c.bar || typeof v !== 'number') return text(c, v)
    const max = ranges.get(c.key)!.max || 1
    const diverging = c.bar === 'diverging'
    const share = Math.abs(v) / max
    const fill = diverging ? (v < 0 ? color.neg : color.pos) : !anyHighlight || highlight ? color.accent : color.base
    return (
      <span className="vk-cellbar">
        <span className="vk-num">{text(c, v)}</span>
        <span className="vk-cellbar-track" aria-hidden>
          {diverging && <span className="vk-cellbar-zero" style={{ left: '50%' }} />}
          <span
            className="vk-cellbar-fill"
            style={
              {
                '--c': fill,
                left: diverging ? (v < 0 ? `${50 - share * 50}%` : '50%') : 0,
                width: `${diverging ? share * 50 : share * 100}%`,
              } as React.CSSProperties
            }
          />
        </span>
      </span>
    )
  }

  return (
    <div className="vk vk-table-wrap">
      <table className="vk-table" data-stack={columns.length > 2 ? '' : undefined}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} data-align={c.align ?? (isNum(c) ? 'right' : 'left')} style={c.width ? { width: c.width } : undefined}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const expandable = !!r.detail
            const isOpen = open === i
            const toggle = () => setOpen(isOpen ? null : i)
            return (
              <Fragment key={i}>
                <tr
                  data-on={r.highlight ? '' : undefined}
                  data-expandable={expandable ? '' : undefined}
                  data-open={isOpen ? '' : undefined}
                  onClick={expandable ? toggle : undefined}
                >
                  {columns.map((c, ci) => {
                    const num = isNum(c)
                    const content = cell(c, r, !!r.highlight)
                    return (
                      <td key={c.key} data-label={c.label} data-align={c.align ?? (num ? 'right' : 'left')} data-num={num ? '' : undefined}>
                        {ci === 0 && expandable ? (
                          <span className="vk-row-head">
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              onClick={(e) => {
                                e.stopPropagation()
                                toggle()
                              }}
                            >
                              <span>{content}</span>
                              <Chevron />
                            </button>
                          </span>
                        ) : (
                          content
                        )}
                      </td>
                    )
                  })}
                </tr>
                {isOpen && (
                  <tr className="vk-detail">
                    <td colSpan={columns.length}>{r.detail}</td>
                  </tr>
                )}
              </Fragment>
            )
          })}
        </tbody>
        {total && (
          <tfoot>
            <tr>
              {columns.map((c) => (
                <td key={c.key} data-align={c.align ?? (isNum(c) ? 'right' : 'left')} data-num={isNum(c) ? '' : undefined}>
                  {total[c.key] === undefined ? '' : text(c, total[c.key])}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  )
}
