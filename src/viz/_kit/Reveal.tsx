'use client'

import type { ReactNode } from 'react'
import { useReveal } from './hooks'

/**
 * A quiet fade-in once the content scrolls into view. Rarely needed: every figure already fades in as a
 * whole. No movement, only opacity. `delay` in ms.
 */
export function Reveal({ children, delay = 0, as: Tag = 'div' }: { children: ReactNode; delay?: number; as?: 'div' | 'span' | 'li' }) {
  const [ref, shown] = useReveal<HTMLDivElement>()
  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className="vk-reveal"
      data-hidden={shown ? undefined : ''}
      style={{ '--d': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  )
}
