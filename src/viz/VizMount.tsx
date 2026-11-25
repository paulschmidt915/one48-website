'use client'

// Brings a post's figures to life. The Markdown block ```viz <name> renders as
// <div class="viz-stage" data-viz="<slug>/<name>"> (see src/lib/posts.ts). After the page has loaded,
// this component finds those placeholders and mounts the default export of
// src/viz/<slug>/<name>.tsx into each one. Nothing to register: the file name is the address.
//
// A missing file or a component that throws shows a red box in development and is quietly left out
// in production (the figure's title and caption stay). It never takes the page down.
//
// It also lets figures, quotes and stats fade in quietly the first time they scroll into view (only
// opacity, nothing moves; skipped with reduced motion and for what is already on screen).

import { Component, useEffect, useState, type ComponentType, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

const dev = process.env.NODE_ENV === 'development'

type Target = { el: HTMLElement; path: string }

export default function VizMount({ slug }: { slug: string; lang?: 'de' | 'en' }) {
  const [targets, setTargets] = useState<Target[]>([])

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(`[data-post="${CSS.escape(slug)}"]`)
    if (!root) return
    setTargets(
      [...root.querySelectorAll<HTMLElement>('.viz-stage[data-viz]')].map((el) => ({ el, path: el.dataset.viz! })),
    )
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) return

    // Fade in: only what is still below the fold, so nothing on screen blinks.
    const blocks = [...root.querySelectorAll<HTMLElement>('.viz, .pull, .stats')].filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight * 0.9,
    )
    blocks.forEach((el) => (el.dataset.reveal = 'hidden'))
    const rise = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).dataset.reveal = 'shown'
            rise.unobserve(e.target)
          }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    blocks.forEach((el) => rise.observe(el))

    return () => rise.disconnect()
  }, [slug])

  return (
    <>
      {targets.map((t) =>
        createPortal(
          <Guard path={t.path} el={t.el}>
            <Load path={t.path} el={t.el} />
          </Guard>,
          t.el,
          t.path,
        ),
      )}
    </>
  )
}

function Load({ path, el }: { path: string; el: HTMLElement }) {
  const [state, setState] = useState<{ C: ComponentType } | { error: string } | null>(null)

  useEffect(() => {
    let live = true
    const [slug, name] = path.split('/')
    import(`./${slug}/${name}.tsx`)
      .then((m) => {
        if (typeof m.default !== 'function') throw new Error(`src/viz/${path}.tsx has no default export (export default function …).`)
        if (live) setState({ C: m.default })
      })
      .catch((e: unknown) => {
        const message = e instanceof Error ? e.message : String(e)
        console.error(`Figure ${path}:`, e)
        if (live)
          setState({
            error: /cannot find module/i.test(message) ? `There is no file src/viz/${path}.tsx.` : message,
          })
      })
    return () => {
      live = false
    }
  }, [path])

  useEffect(() => {
    if (!state) return
    el.dataset.mounted = ''
    if ('error' in state && !dev) hideFigure(el)
  }, [state, el])

  if (!state) return null
  if ('error' in state) return dev ? <Problem path={path} message={state.error} /> : null
  return <state.C />
}

/** In production a broken figure goes away completely, title and caption included. */
function hideFigure(el: HTMLElement) {
  ;(el.closest('figure') ?? el).hidden = true
}

function Problem({ path, message }: { path: string; message: string }) {
  return (
    <div className="viz-error" role="alert">
      <strong>Figure “{path}” failed</strong>
      {message}
      {'\n'}(Only shown in development. In production the figure is left out.)
    </div>
  )
}

/** Keeps a figure that throws while rendering from taking the page with it. */
class Guard extends Component<{ path: string; el: HTMLElement; children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  componentDidCatch(error: Error) {
    console.error(`Figure ${this.props.path} crashed:`, error)
    this.props.el.dataset.mounted = ''
    if (!dev) hideFigure(this.props.el)
  }
  render() {
    if (this.state.error) return dev ? <Problem path={this.props.path} message={this.state.error.stack ?? this.state.error.message} /> : null
    return this.props.children
  }
}
