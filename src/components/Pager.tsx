'use client'

import { useEffect } from 'react'

const DURATION = 900
const LOCK = 1000
const THRESHOLD = 24

/**
 * Turns the `.page` sections into whole pages: one wheel gesture, arrow key or
 * in-page link moves exactly one page, with its own eased animation. Touch keeps
 * native scrolling, which CSS scroll snapping turns into the same page steps.
 */
export default function Pager() {
  useEffect(() => {
    const html = document.documentElement
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pages = () => Array.from(document.querySelectorAll<HTMLElement>('.page'))
    html.setAttribute('data-pager', '')

    let frame = 0
    let lockedUntil = 0
    let lastWheel = 0
    let lastAbs = 0
    let acc = 0
    let used = false

    const current = () => {
      const mid = window.scrollY + window.innerHeight / 2
      let index = 0
      pages().forEach((p, i) => {
        if (p.offsetTop <= mid) index = i
      })
      return index
    }

    const scrollToY = (to: number) => {
      cancelAnimationFrame(frame)
      const from = window.scrollY
      if (reduced.matches || Math.abs(to - from) < 1) {
        window.scrollTo(0, to)
        return
      }
      // Snapping would fight the frame-by-frame scroll; it comes back at the end.
      html.style.scrollSnapType = 'none'
      const start = performance.now()
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION)
        const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
        window.scrollTo(0, from + (to - from) * e)
        if (t < 1) {
          frame = requestAnimationFrame(step)
        } else {
          frame = 0
          html.style.scrollSnapType = ''
        }
      }
      frame = requestAnimationFrame(step)
    }

    const goTo = (i: number) => {
      const list = pages()
      const page = list[Math.max(0, Math.min(list.length - 1, i))]
      lockedUntil = performance.now() + LOCK
      if (page) scrollToY(page.offsetTop)
    }

    // The phone viewer is open: it has the wheel and the keys, the page stays put.
    const viewerOpen = () => html.hasAttribute('data-viewer')

    const onWheel = (e: WheelEvent) => {
      if (viewerOpen()) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) e.preventDefault()
        return
      }
      if (e.ctrlKey || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      const dir = Math.sign(e.deltaY)
      const i = current()
      const page = pages()[i]

      // A page taller than the window scrolls normally until its edge.
      if (!frame && page) {
        const r = page.getBoundingClientRect()
        if ((dir > 0 && r.bottom > window.innerHeight + 1) || (dir < 0 && r.top < -1)) return
      }
      e.preventDefault()

      // One gesture moves one page; a trackpad's inertia afterwards is part of the same gesture.
      const now = performance.now()
      const abs = Math.abs(e.deltaY)
      const fresh = now - lastWheel > 200 || (abs > lastAbs * 2 && abs > 20)
      lastWheel = now
      lastAbs = abs
      if (fresh) {
        acc = 0
        used = false
      }
      if (used || now < lockedUntil) return

      acc += e.deltaY
      if (Math.abs(acc) >= THRESHOLD) {
        used = true
        goTo(i + dir)
      }
    }

    const onKey = (e: KeyboardEvent) => {
      if (viewerOpen() || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return
      const target = e.target as HTMLElement
      if (target.closest('input, textarea, select, [contenteditable]')) return
      if (e.key === ' ' && target.closest('button, a')) return

      const steps: Record<string, number> = { ArrowDown: 1, PageDown: 1, ' ': 1, ArrowUp: -1, PageUp: -1 }
      let to: number | null = null
      if (e.key === 'Home') to = 0
      else if (e.key === 'End') to = pages().length - 1
      else if (e.key in steps) to = current() + (e.key === ' ' && e.shiftKey ? -1 : steps[e.key])
      if (to === null) return
      e.preventDefault()
      goTo(to)
    }

    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest?.('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')!.slice(1)
      const i = pages().findIndex((p) => p.id === id)
      if (i < 0) return
      e.preventDefault()
      goTo(i)
      history.replaceState(null, '', i === 0 ? window.location.pathname : `#${id}`)
    }

    // Pages after the first fade their contents in when they first come into view.
    const seen = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-seen', '')
            seen.unobserve(entry.target)
          }
        }),
      { threshold: 0.35 }
    )
    pages().slice(1).forEach((p) => seen.observe(p))

    // A page that is mostly out of view fades out, so the end of one page never shows above the
    // next (Safari snaps a page below the status bar, and the strip above it shows the page before).
    const away = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.toggleAttribute('data-away', entry.intersectionRatio < 0.3)),
      { threshold: [0, 0.3, 0.6, 1] }
    )
    pages().forEach((p) => away.observe(p))

    // Opened at #projects, or the window got a new width: settle on a whole page again. Never while
    // the person is scrolling: the phone's toolbar collapsing on the first swipe also resizes.
    let touched = false
    const markTouched = () => (touched = true)
    const align = (fromHash = false) => {
      if (frame) return
      const list = pages()
      const hashed = fromHash ? list.findIndex((p) => window.location.hash === `#${p.id}`) : -1
      const page = list[hashed >= 0 ? hashed : current()]
      if (page && Math.abs(window.scrollY - page.offsetTop) > 1 && page.offsetHeight <= window.innerHeight + 1) {
        window.scrollTo(0, page.offsetTop)
      }
    }
    const onLoad = () => {
      if (window.location.hash && !touched) align(true)
    }
    let width = window.innerWidth
    const onResize = () => {
      if (window.innerWidth === width) return
      width = window.innerWidth
      align()
    }
    const settle = requestAnimationFrame(onLoad)
    window.addEventListener('load', onLoad)
    window.addEventListener('resize', onResize)
    window.addEventListener('touchstart', markTouched, { passive: true })
    window.addEventListener('wheel', markTouched, { passive: true })

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
      seen.disconnect()
      away.disconnect()
      cancelAnimationFrame(frame)
      cancelAnimationFrame(settle)
      window.removeEventListener('load', onLoad)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('touchstart', markTouched)
      window.removeEventListener('wheel', markTouched)
      html.style.scrollSnapType = ''
      html.removeAttribute('data-pager')
    }
  }, [])

  return null
}
