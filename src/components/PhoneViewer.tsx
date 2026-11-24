'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Screen } from '@/site'

type Props = {
  name: string
  screens: Screen[]
  onClose: () => void
}

/** A phone in a dialog: swipe, drag or arrow through screenshots of an app. */
export default function PhoneViewer({ name, screens, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    el.showModal()
    // Keep the page behind still while the phone is open.
    document.documentElement.setAttribute('data-viewer', '')
    return () => document.documentElement.removeAttribute('data-viewer')
  }, [])

  const go = useCallback(
    (i: number) => {
      const el = track.current
      if (!el) return
      const to = Math.max(0, Math.min(screens.length - 1, i))
      el.scrollTo({ left: to * el.clientWidth, behavior: 'smooth' })
    },
    [screens.length]
  )

  // Which screen is showing, from the scroll position.
  useEffect(() => {
    const el = track.current
    if (!el) return
    const update = () => setIndex(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)))
    el.addEventListener('scroll', update, { passive: true })
    return () => el.removeEventListener('scroll', update)
  }, [])

  // Mouse drag, like a swipe on a phone.
  useEffect(() => {
    const el = track.current
    if (!el) return
    let startX = 0
    let startLeft = 0
    let dragging = false
    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      dragging = true
      startX = e.clientX
      startLeft = el.scrollLeft
      el.setPointerCapture(e.pointerId)
      el.setAttribute('data-dragging', '')
    }
    const move = (e: PointerEvent) => {
      if (dragging) el.scrollLeft = startLeft - (e.clientX - startX)
    }
    const up = (e: PointerEvent) => {
      if (!dragging) return
      dragging = false
      el.removeAttribute('data-dragging')
      const moved = e.clientX - startX
      const from = Math.round(startLeft / el.clientWidth)
      go(Math.abs(moved) > el.clientWidth * 0.15 ? from - Math.sign(moved) : from)
    }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    return () => {
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
    }
  }, [go])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(index + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(index - 1)
    }
  }

  return (
    <dialog
      ref={dialog}
      className="viewer"
      aria-label={`Screens of ${name}`}
      onClose={onClose}
      onCancel={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        // A click on the backdrop, outside the stage, closes the viewer.
        if (e.target === e.currentTarget) dialog.current?.close()
      }}
    >
      <div className="viewer-stage" onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}>
        <p className="viewer-title">
          <span>{name}</span>
          <span className="viewer-count" aria-live="polite">
            {index + 1} / {screens.length}
          </span>
        </p>

        <div className="viewer-row">
          <button type="button" className="viewer-arrow" aria-label="Previous screen" disabled={index === 0} onClick={() => go(index - 1)}>
            <span aria-hidden>←</span>
          </button>

          <div className="phone">
            <div className="phone-screen">
              <div className="phone-track" ref={track} tabIndex={0} aria-label="Screens, use the arrow keys">
                {screens.map((s, i) => (
                  <figure key={s.src} className="phone-slide" aria-label={`${i + 1} of ${screens.length}: ${s.caption}`}>
                    <Image src={s.src} alt={s.caption} width={603} height={1311} sizes="(max-width: 48rem) 80vw, 360px" draggable={false} priority={i === 0} />
                  </figure>
                ))}
              </div>
              <span className="phone-island" aria-hidden />
            </div>
          </div>

          <button
            type="button"
            className="viewer-arrow"
            aria-label="Next screen"
            disabled={index === screens.length - 1}
            onClick={() => go(index + 1)}
          >
            <span aria-hidden>→</span>
          </button>
        </div>

        <p className="viewer-caption">{screens[index]?.caption}</p>
        <div className="viewer-dots">
          {screens.map((s, i) => (
            <button
              key={s.src}
              type="button"
              className="viewer-dot"
              aria-label={`Screen ${i + 1}`}
              aria-current={i === index || undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>

      <button type="button" className="viewer-close quiet" onClick={() => dialog.current?.close()}>
        Close
      </button>
    </dialog>
  )
}
