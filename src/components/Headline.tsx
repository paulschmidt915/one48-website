'use client'

import { Fragment, useEffect, useRef } from 'react'

const REST = 480
const PEAK = 800
const RADIUS = 260

type Props = {
  children: string
  /** Word indexes that start a new line, on phones and on wider screens. */
  breaks: { narrow: number[]; wide: number[] }
}

/** The headline, set letter by letter: letters rise in on load and grow heavier near the pointer. */
export default function Headline({ children, breaks }: Props) {
  const root = useRef<HTMLHeadingElement>(null)
  const words = children.split(' ')
  let index = 0

  useEffect(() => {
    const el = root.current
    if (!el) return
    const letters = Array.from(el.querySelectorAll<HTMLElement>('.ch'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Once the letters have risen, stop clipping so heavier letters have room.
    const ready = window.setTimeout(() => el.setAttribute('data-ready', ''), reduced ? 0 : 2200)

    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return () => window.clearTimeout(ready)
    }

    const weights = letters.map(() => REST)
    let px = -9999
    let py = -9999
    let frame = 0

    const tick = () => {
      const rects = letters.map((l) => l.getBoundingClientRect())
      let moving = false
      letters.forEach((l, i) => {
        const r = rects[i]
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2))
        const t = Math.max(0, 1 - d / RADIUS)
        const target = REST + (PEAK - REST) * t * t
        weights[i] += (target - weights[i]) * 0.14
        if (Math.abs(target - weights[i]) > 0.5) moving = true
        l.style.fontWeight = weights[i].toFixed(1)
      })
      frame = moving ? requestAnimationFrame(tick) : 0
    }
    const wake = () => {
      if (!frame && el.hasAttribute('data-ready')) frame = requestAnimationFrame(tick)
    }
    const move = (e: PointerEvent) => {
      px = e.clientX
      py = e.clientY
      wake()
    }
    const leave = () => {
      px = py = -9999
      wake()
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.clearTimeout(ready)
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <h1 className="headline" ref={root} aria-label={children}>
      {words.map((word, w) => {
        const narrow = breaks.narrow.includes(w)
        const wide = breaks.wide.includes(w)
        return (
          <Fragment key={w}>
            {w > 0 && (
              <span aria-hidden className={`gap${narrow ? ' not-narrow' : ''}${wide ? ' not-wide' : ''}`}>
                {' '}
              </span>
            )}
            {narrow && <br aria-hidden className="only-narrow" />}
            {wide && <br aria-hidden className="only-wide" />}
            <span className="word" aria-hidden>
              {Array.from(word).map((ch) => {
                const i = index++
                return (
                  <span key={i} className="ch" style={{ '--i': i } as React.CSSProperties}>
                    {ch}
                  </span>
                )
              })}
            </span>
          </Fragment>
        )
      })}
    </h1>
  )
}
