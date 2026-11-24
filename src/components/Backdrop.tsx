'use client'

import { useEffect, useRef } from 'react'

/** Drifting colour fields; one patch of light trails the pointer. */
export default function Backdrop() {
  const glow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = glow.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let x = window.innerWidth * 0.7
    let y = window.innerHeight * 0.3
    let tx = x
    let ty = y
    let frame = 0

    const tick = () => {
      x += (tx - x) * 0.045
      y += (ty - y) * 0.045
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(tick) : 0
    }
    const move = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (!frame) frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="backdrop" aria-hidden>
      <div className="backdrop-fields">
        <div className="field field-1" />
        <div className="field field-2" />
        <div className="field field-3" />
        <div className="field field-4" />
        <div className="field field-5" />
        <div className="glow" ref={glow} />
      </div>
      <div className="grain" />
    </div>
  )
}
