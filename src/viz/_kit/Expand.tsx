'use client'

import { useId, useState, type ReactNode } from 'react'

/** The small chevron used by every expandable part. */
export function Chevron() {
  return (
    <svg className="vk-chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden>
      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Click to expand: a quiet "Details" button that opens extra text underneath. For detail that is nice
 * to have (method, caveat, a longer quote); everything the reader needs must be visible without it.
 *
 *   <Expand label="Methode">54 Studierende, vier Sitzungen …</Expand>
 */
export function Expand({ label = 'Details', children, open: initial = false }: { label?: string; children: ReactNode; open?: boolean }) {
  const [open, setOpen] = useState(initial)
  const id = useId()
  return (
    <div>
      <button type="button" className="vk-expand-button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        {label}
        <Chevron />
      </button>
      <div id={id} className="vk-expand-body" hidden={!open}>
        {children}
      </div>
    </div>
  )
}
