'use client'

export type LegendItem = { label: string; color: string }

/**
 * Names of the series, with a swatch shaped like the mark ('bar' | 'line' | 'dot').
 * Always show one when a chart has two or more series. Pass `active` + `onToggle` to let readers
 * switch series on and off (colours stay with their series).
 */
export function Legend({
  items,
  shape = 'bar',
  active,
  onToggle,
}: {
  items: LegendItem[]
  shape?: 'bar' | 'line' | 'dot'
  active?: boolean[]
  onToggle?: (index: number) => void
}) {
  return (
    <ul className="vk-legend">
      {items.map((it, i) => {
        const swatch = <span className="vk-swatch" data-shape={shape} style={{ '--c': it.color } as React.CSSProperties} />
        return (
          <li key={it.label}>
            {onToggle ? (
              <button type="button" aria-pressed={active ? active[i] : true} onClick={() => onToggle(i)}>
                {swatch}
                {it.label}
              </button>
            ) : (
              <>
                {swatch}
                {it.label}
              </>
            )}
          </li>
        )
      })}
    </ul>
  )
}
