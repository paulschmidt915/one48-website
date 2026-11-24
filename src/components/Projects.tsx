'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Parts from '@/components/Parts'
import type { Project } from '@/site'

/**
 * Project tiles. Hovering a tile, or tapping it, shows its description: over the
 * tile on wide screens, folded out below it in the list on phones.
 */
export default function Projects({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<string | null>(null)
  const list = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!open) return
    const outside = (e: PointerEvent) => {
      const tile = list.current?.querySelector(`[data-slug="${open}"]`)
      if (!tile?.contains(e.target as Node)) setOpen(null)
    }
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [open])

  return (
    <ul className="tiles" ref={list}>
      {projects.map((p, i) => {
        const isOpen = open === p.slug
        const more = `${p.slug}-more`
        return (
          <li
            key={p.slug}
            className="tile"
            data-slug={p.slug}
            data-open={isOpen || undefined}
            style={{ '--i': i } as React.CSSProperties}
          >
            <button
              type="button"
              className="tile-face"
              aria-expanded={isOpen}
              aria-controls={more}
              onClick={() => setOpen(isOpen ? null : p.slug)}
            >
              <span className="tile-logo">
                <Image src={p.logo} alt="" width={512} height={512} sizes="(min-width: 48rem) 240px, 48px" />
              </span>
              <span className="tile-label">
                <span className="tile-name">{p.name}</span>
                <span className="tile-kind">{p.kind}</span>
              </span>
              <span className="tile-plus" aria-hidden />
            </button>
            <div className="tile-more" id={more}>
              <div className="tile-more-inner">
                <p className="tile-head" aria-hidden>
                  <span className="tile-name">{p.name}</span>
                  <span className="tile-kind">{p.kind}</span>
                </p>
                <p className="tile-text rich">
                  <Parts parts={p.text} />
                </p>
                {p.status && <p className="tile-status">{p.status}</p>}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
