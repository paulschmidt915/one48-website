'use client'

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react'

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect

/** True when the reader asked for less motion. Animate nothing then: show the end state at once. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(q.matches)
    update()
    q.addEventListener('change', update)
    return () => q.removeEventListener('change', update)
  }, [])
  return reduced
}

/**
 * Becomes true once the element has scrolled into view (and stays true). Rarely needed: the whole
 * figure already fades in once (VizMount). At most use it for a quiet fade of your own, never to start
 * a build-up animation.   const [ref, shown] = useReveal<HTMLDivElement>()
 * With reduced motion it is true right away.
 */
export function useReveal<T extends Element>(options: { threshold?: number; margin?: string } = {}): [RefObject<T>, boolean] {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)
  const { threshold = 0.35, margin = '0px 0px -10% 0px' } = options
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: margin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, margin])
  return [ref, shown]
}

/**
 * @deprecated Not allowed in Emergence figures any more: nothing may change while the reader scrolls.
 * Kept only so figures written before the rules changed still compile. scripts/check-post.mjs flags it.
 */
/*
 * How far the element has travelled through the viewport: 0 when its top reaches the bottom of the
 * screen, 1 when its bottom leaves the top. For figures that build up while the reader scrolls.
 * With reduced motion it is always 1 (the finished state).
 */
export function useScrollProgress<T extends Element>(): [RefObject<T>, number] {
  const ref = useRef<T>(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setP(1)
      return
    }
    let frame = 0
    const update = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const v = (vh - r.top) / (vh + r.height)
      setP(Math.min(1, Math.max(0, v)))
    }
    const on = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
      cancelAnimationFrame(frame)
    }
  }, [])
  return [ref, p]
}

/** The element's current width (and height), kept up to date. For SVGs that fill their frame. */
export function useSize<T extends Element>(): [RefObject<T>, { width: number; height: number }] {
  const ref = useRef<T>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  useIso(() => {
    const el = ref.current
    if (!el) return
    const set = () => {
      const r = el.getBoundingClientRect()
      setSize((s) => (s.width === r.width && s.height === r.height ? s : { width: r.width, height: r.height }))
    }
    set()
    const ro = new ResizeObserver(set)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, size]
}

/**
 * @deprecated Not allowed in Emergence figures any more (no count-ups, no animated values).
 * Kept so older figures compile; it now returns `target` straight away. Flagged by scripts/check-post.mjs.
 */
export function useTween(target: number, _options: { duration?: number; start?: boolean } = {}): number {
  return target
}
