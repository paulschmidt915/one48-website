'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react'

export type Tip<T> = { x: number; y: number; item: T } | null

/**
 * Hover and focus tooltips for any marks.
 *
 *   const tt = useTooltip<Row>()
 *   <div ref={tt.ref} className="vk">                      ← the area the tooltip stays inside
 *     {rows.map((r) => <rect key={r.id} {...tt.bind(r)} tabIndex={0} … />)}
 *     <Tooltip tip={tt.tip}>{(r) => <><strong>{fmt(r.value)}</strong>{r.label}</>}</Tooltip>
 *   </div>
 *
 * Mouse: follows the pointer. Keyboard: shows on focus, above the mark. Touch: a tap shows it,
 * a tap elsewhere hides it.
 */
export function useTooltip<T>() {
  const ref = useRef<HTMLDivElement>(null)
  const [tip, setTip] = useState<Tip<T>>(null)

  const show = useCallback((item: T, clientX: number, clientY: number) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setTip({ x: clientX - r.left, y: clientY - r.top, item })
  }, [])
  const hide = useCallback(() => setTip(null), [])

  useEffect(() => {
    if (!tip) return
    const away = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setTip(null)
    }
    document.addEventListener('pointerdown', away)
    return () => document.removeEventListener('pointerdown', away)
  }, [tip])

  const bind = useCallback(
    (item: T) => ({
      onPointerMove: (e: React.PointerEvent) => show(item, e.clientX, e.clientY),
      onPointerDown: (e: React.PointerEvent) => show(item, e.clientX, e.clientY),
      onPointerLeave: (e: React.PointerEvent) => {
        if (e.pointerType !== 'touch') setTip(null)
      },
      onFocus: (e: React.FocusEvent) => {
        const b = (e.currentTarget as Element).getBoundingClientRect()
        show(item, b.left + b.width / 2, b.top)
      },
      onBlur: () => setTip(null),
    }),
    [show],
  )

  return { ref: ref as RefObject<HTMLDivElement>, tip, show, hide, bind }
}

/** The tooltip box. Stays inside its container; sits above the point, or below near the top. */
export function Tooltip<T>({ tip, children }: { tip: Tip<T>; children: (item: T) => ReactNode }) {
  const box = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null)

  useLayoutEffect(() => {
    const el = box.current
    if (!tip || !el) return setPos(null)
    const parent = el.offsetParent as HTMLElement | null
    const w = el.offsetWidth
    const h = el.offsetHeight
    const max = (parent?.clientWidth ?? 9999) - w
    const left = Math.max(0, Math.min(max, tip.x - w / 2))
    const top = tip.y - h - 14 < -8 ? tip.y + 18 : tip.y - h - 14
    setPos({ left, top })
  }, [tip])

  if (!tip) return null
  return (
    <div
      ref={box}
      className="vk-tip"
      role="status"
      style={pos ? { left: pos.left, top: pos.top } : { left: 0, top: 0, visibility: 'hidden' }}
    >
      {children(tip.item)}
    </div>
  )
}

/** One row in a tooltip that lists several series: line key, name, value. */
export function TipRow({ color, label, value }: { color: string; label: ReactNode; value: ReactNode }) {
  return (
    <div className="vk-tip-row">
      <span className="vk-swatch" data-shape="line" style={{ '--c': color } as React.CSSProperties} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}
