// The look of posts in the podcast series "Emergence": the episode line above the title, the
// "listen" pill below it, and the block at the end that points to the episode and the show.

import type { Post, Series } from '@/lib/posts'
import { words } from '@/lib/posts'

/**
 * The series mark: a small grid of dots of which some light up, a different pattern per episode
 * (it "emerges" when the page opens). Purely decorative.
 */
export function EpisodeMark({ episode }: { episode: number | null }) {
  const n = 5
  let seed = (episode ?? 0) * 2654435761 + 97
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648
    return seed / 2147483648
  }
  const dots = Array.from({ length: n * n }, (_, i) => ({ i, on: rand() < 0.42 || i === 12 }))
  return (
    <svg className="ep-mark" viewBox="0 0 50 50" aria-hidden>
      {dots.map(({ i, on }) => (
        <circle
          key={i}
          cx={5 + (i % n) * 10}
          cy={5 + Math.floor(i / n) * 10}
          r={on ? 3.1 : 1.3}
          data-on={on ? '' : undefined}
          style={{ '--i': (i * 7) % 25 } as React.CSSProperties}
        />
      ))}
    </svg>
  )
}

function Play() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
      <path d="M4.5 2.8v10.4c0 .5.6.8 1 .5l8-5.2a.6.6 0 0 0 0-1L5.5 2.3c-.4-.3-1 0-1 .5Z" fill="currentColor" />
    </svg>
  )
}

const episodeLine = (s: Series, w: (typeof words)['de']) => `${s.name}${s.episode ? ` · ${w.episode} ${String(s.episode).padStart(2, '0')}` : ''}`

/** Above the title: series and episode, linked to the episode. */
export function EpisodeKicker({ series, lang }: { series: Series; lang: Post['lang'] }) {
  const w = words[lang]
  return (
    <a className="ep-kicker" href={series.podcast ?? series.show} target="_blank" rel="noopener noreferrer">
      <EpisodeMark episode={series.episode} />
      <span>{episodeLine(series, w)}</span>
    </a>
  )
}

/** Below the title: "Folge anhören · 69 Min." */
export function ListenPill({ series, lang }: { series: Series; lang: Post['lang'] }) {
  const w = words[lang]
  return (
    <a className="ep-listen" href={series.podcast ?? series.show} target="_blank" rel="noopener noreferrer">
      <span className="ep-play">
        <Play />
      </span>
      <span className="ep-listen-text">
        <span>{w.listen}</span>
        <span className="ep-listen-meta">
          {series.episode ? `${w.episode} ${series.episode}` : series.name}
          {series.duration ? ` · ${series.duration} Min.` : ''} · Spotify
        </span>
      </span>
    </a>
  )
}

/** After the post: the way to the whole episode. `text` replaces the default sentence. */
export function EpisodeOutro({ series, lang, text }: { series: Series; lang: Post['lang']; text?: string }) {
  const w = words[lang]
  return (
    <section className="ep-outro" aria-labelledby="ep-outro-title">
      <div className="ep-outro-mark">
        <EpisodeMark episode={series.episode} />
        <span>{episodeLine(series, w)}</span>
      </div>
      <h2 id="ep-outro-title" className="ep-outro-title">
        {w.outroTitle(series.episode)}
      </h2>
      <p className="ep-outro-text">{text || w.outroText}</p>
      <div className="ep-outro-actions">
        <a className="button" href={series.podcast ?? series.show} target="_blank" rel="noopener noreferrer">
          <Play />
          <span style={{ marginLeft: '0.5rem' }}>
            {w.listen}
            {series.duration ? ` · ${series.duration} Min.` : ''}
          </span>
        </a>
        <a className="ep-outro-show" href={series.show} target="_blank" rel="noopener noreferrer">
          {w.allEpisodes} →
        </a>
      </div>
    </section>
  )
}
