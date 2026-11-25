// Blog posts: one Markdown file per post in content/blog/<slug>.md.
//
// Each file starts with a short header:
//
//   ---
//   title: The title of the post
//   date: 2026-11-25
//   description: One or two sentences for the list, link previews and the e-mail preview.
//   draft: true            (optional: only shown while running `npm run dev`)
//   lang: de               (optional: de or en, default en; switches the page's words and date format)
//   ---
//
// Posts of the podcast series "Emergence" add (see docs/emergence-blog/GUIDE.md):
//
//   series: emergence
//   episode: 3
//   podcast: https://open.spotify.com/episode/…    (the episode)
//   duration: 69                                   (optional: length of the episode in minutes)
//   outro: One sentence for the block at the end    (optional: replaces the default sentence)
//
// Besides plain Markdown, posts can use three special blocks, written as fenced code blocks:
//
//   ```viz <name>        a figure: src/viz/<slug>/<name>.tsx, mounted in the browser
//   ```pull              a pull quote
//   ```stat              one to three key numbers (static), separated by lines of ---
//
// Each is rendered twice: for the website (`html`) and for the newsletter (`emailHtml`), where
// interactive figures become a short card that links to the figure on the website.
//
// No imports from the app (no `@/` paths), so scripts/newsletter.mjs and scripts/check-post.mjs
// can use this file as well.

import fs from 'node:fs'
import path from 'node:path'
import { Marked, type Tokens } from 'marked'

export type Lang = 'de' | 'en'

export type Series = {
  key: 'emergence'
  /** "Emergence" */
  name: string
  /** "Der KI-Podcast" */
  tagline: string
  /** The show on Spotify. */
  show: string
  /** Episode number, null if missing in the header. */
  episode: number | null
  /** Link to the episode, null if missing in the header. */
  podcast: string | null
  /** Length of the episode in minutes. */
  duration: number | null
}

export type Post = {
  slug: string
  title: string
  /** YYYY-MM-DD */
  date: string
  description: string
  draft: boolean
  lang: Lang
  series: Series | null
  /** Optional sentence for the closing block of a series post. */
  outro: string
  /** Estimated minutes to read it, figures included. */
  readingMinutes: number
  /** Names of the interactive figures, in order (```viz <name>). */
  vizzes: string[]
  /** The post as HTML for the website. */
  html: string
  /** The post as HTML for the newsletter: figures become link cards. */
  emailHtml: string
}

export const seriesInfo = {
  emergence: {
    key: 'emergence' as const,
    name: 'Emergence',
    tagline: 'Der KI-Podcast',
    show: 'https://open.spotify.com/show/7qSUA2thxkiXCXmp8OUFc5',
  },
}

/** Words the post page and the e-mail use, per language. */
export const words = {
  en: {
    allPosts: 'All posts',
    minRead: (n: number) => `${n} min read`,
    episode: 'Episode',
    listen: 'Listen to the episode',
    allEpisodes: 'All episodes on Spotify',
    figure: 'Figure',
    openFigure: 'View the interactive figure →',
    source: 'Source',
    readOnline: 'Read on the website',
    outroTitle: (n: number | null) => (n ? `The whole story: episode ${n}` : 'The whole story in the podcast'),
    outroText: 'This was the short version. The episode goes deeper, with all sources in the show notes.',
  },
  de: {
    allPosts: 'Alle Beiträge',
    minRead: (n: number) => `${n} Min. Lesezeit`,
    episode: 'Folge',
    listen: 'Folge anhören',
    allEpisodes: 'Alle Folgen auf Spotify',
    figure: 'Grafik',
    openFigure: 'Grafik interaktiv ansehen →',
    source: 'Quelle',
    readOnline: 'Auf der Website lesen',
    outroTitle: (n: number | null) => (n ? `Die ganze Geschichte: Folge ${n}` : 'Die ganze Geschichte im Podcast'),
    outroText: 'Das hier war die Kurzfassung. In der Folge gehe ich tiefer rein, alle Quellen stehen in den Shownotes.',
  },
}

const dir = path.join(process.cwd(), 'content', 'blog')

/** Where the component of a figure lives: src/viz/<slug>/<name>.tsx */
export const vizFile = (slug: string, name: string) => path.join(process.cwd(), 'src', 'viz', slug, `${name}.tsx`)

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** "key: value" lines, as in the header. Lines without a key continue the value above. */
function fields(text: string): Record<string, string> {
  const out: Record<string, string> = {}
  let last = ''
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^([a-zA-Z][\w-]*):\s?(.*)$/)
    if (m) {
      last = m[1].toLowerCase()
      out[last] = m[2].trim()
    } else if (last && line.trim()) {
      out[last] += ' ' + line.trim()
    }
  }
  return out
}

/** Parses "83 %", "1,5 Mio.", "2.000", "−55 %" (German or English style) for the count-up. */
export function parseStat(value: string, lang: Lang): { prefix: string; number: number; decimals: number; suffix: string } | null {
  const m = value.match(/^(.*?)([−-]?\d(?:[\d.,]|[  ](?=\d))*)(.*)$/)
  if (!m) return null
  const raw = m[2].replace(/[  ]/g, '').replace('−', '-')
  const [t, d] = lang === 'de' ? ['\\.', ','] : [',', '\\.']
  let digits: string
  let decimals = 0
  if (new RegExp(`^-?\\d{1,3}(${t}\\d{3})+(${d}\\d+)?$`).test(raw) || new RegExp(`^-?\\d+(${d}\\d+)?$`).test(raw)) {
    // 2.000 / 1.234,5 / 1,5 in German; 2,000 / 1,234.5 / 1.5 in English
    const [int, frac = ''] = raw.split(lang === 'de' ? ',' : '.')
    digits = int.replace(/[.,]/g, '') + (frac ? `.${frac}` : '')
    decimals = frac.length
  } else if (/^-?\d+[.,]\d+$/.test(raw)) {
    // "2.5" in a German post: read as a decimal anyway
    digits = raw.replace(',', '.')
    decimals = raw.split(/[.,]/)[1].length
  } else return null
  const number = Number(digits)
  if (!Number.isFinite(number)) return null
  return { prefix: m[1], number, decimals, suffix: m[3] }
}

type Render = { target: 'web' | 'email'; slug: string; lang: Lang; vizzes: string[] }

const emailInk = '#10131a'
const emailMuted = '#5f6573'
const emailSoft = '#8a909c'

function renderViz(name: string, body: string, r: Render, md: Marked): string {
  const f = fields(body)
  const w = words[r.lang]
  const id = `grafik-${name}`
  const title = f.title ? escape(f.title) : ''
  const caption = f.caption ? (md.parseInline(f.caption, { async: false }) as string) : ''
  const source = f.source ? (md.parseInline(f.source, { async: false }) as string) : ''
  r.vizzes.push(name)

  if (r.target === 'email') {
    const href = `/blog/${r.slug}#${id}`
    const image = f.image
      ? `<a href="${href}"><img src="${escape(f.image)}" alt="${escape(f.alt || f.title || '')}" width="508" style="display:block;width:100%;max-width:508px;height:auto;border-radius:12px;margin:0 0 12px;"></a>`
      : ''
    return `<table role="presentation" class="viz-card" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 22px;"><tr><td style="padding:18px 20px;border-radius:18px;background-color:#eef1f5;background-color:rgba(16,19,26,0.045);">
<p style="margin:0 0 4px;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:${emailSoft};">${w.figure}</p>
${title ? `<p style="margin:0 0 8px;font-size:18px;line-height:1.3;font-weight:600;letter-spacing:-0.015em;color:${emailInk};">${title}</p>` : ''}
${image}${caption ? `<p style="margin:0 0 10px;font-size:15px;line-height:1.5;color:${emailMuted};">${caption}</p>` : ''}
<p style="margin:0;font-size:15px;font-weight:600;"><a href="${href}" style="color:${emailInk};text-decoration:underline;text-underline-offset:3px;">${w.openFigure}</a></p>
</td></tr></table>\n`
  }

  const size = f.size === 'wide' ? 'wide' : 'column'
  const height = /^\d+$/.test(f.height ?? '') ? Number(f.height) : 360
  return `<figure class="viz" id="${id}" data-size="${size}"${title ? ` aria-labelledby="${id}-title"` : ''}>
${title ? `<p class="viz-title" id="${id}-title">${title}</p>\n` : ''}<div class="viz-stage" data-viz="${r.slug}/${name}" style="--viz-h:${height}px"></div>
${caption || source ? `<figcaption>${caption ? `<span class="viz-caption">${caption}</span>` : ''}${source ? `<span class="viz-source">${w.source}: ${source}</span>` : ''}</figcaption>\n` : ''}</figure>\n`
}

function renderPull(body: string, r: Render, md: Marked): string {
  const lines = body.trim().split(/\r?\n/)
  const by = /^\s*(—|–|--)\s*/.test(lines[lines.length - 1] ?? '') && lines.length > 1 ? lines.pop()!.replace(/^\s*(—|–|--)\s*/, '') : ''
  const quote = md.parseInline(lines.join(' ').trim(), { async: false }) as string
  if (r.target === 'email') {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;"><tr><td style="padding:14px 0;border-top:1px solid #d4d7dd;border-bottom:1px solid #d4d7dd;">
<p style="margin:0;font-size:22px;line-height:1.3;font-weight:500;letter-spacing:-0.02em;color:${emailInk};">${quote}</p>
${by ? `<p style="margin:8px 0 0;font-size:14px;color:${emailSoft};">${escape(by)}</p>` : ''}
</td></tr></table>\n`
  }
  return `<figure class="pull"><blockquote><p>${quote}</p></blockquote>${by ? `<figcaption>${escape(by)}</figcaption>` : ''}</figure>\n`
}

function renderStat(body: string, r: Render, md: Marked): string {
  const items = body
    .split(/^\s*---\s*$/m)
    .map(fields)
    .filter((f) => f.value)
    .slice(0, 3)
  if (r.target === 'email') {
    const cells = items
      .map(
        (f) => `<td valign="top" style="padding:0 16px 0 0;">
<p style="margin:0;font-size:40px;line-height:1;font-weight:500;letter-spacing:-0.04em;color:${emailInk};">${escape(f.value)}</p>
<p style="margin:8px 0 0;font-size:14px;line-height:1.4;color:${emailMuted};">${md.parseInline(f.label ?? '', { async: false })}</p>
</td>`,
      )
      .join('')
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;"><tr>${cells}</tr></table>\n`
  }
  const sources = [...new Set(items.map((f) => f.source).filter(Boolean))]
  return `<div class="stats" data-count="${items.length}">${items
    .map((f) => {
      return `<div class="stat"><span class="stat-value">${escape(f.value)}</span><span class="stat-label">${md.parseInline(f.label ?? '', { async: false })}</span></div>`
    })
    .join('')}${
    sources.length
      ? `<p class="stats-source">${words[r.lang].source}: ${sources.map((s) => md.parseInline(s!, { async: false })).join(' · ')}</p>`
      : ''
  }</div>\n`
}

function render(markdown: string, r: Render): string {
  const md = new Marked()
  md.use({
    renderer: {
      code(token: Tokens.Code) {
        const [kind, name] = (token.lang ?? '').trim().split(/\s+/)
        if (kind === 'viz' && name && /^[a-z0-9][a-z0-9-]*$/.test(name)) return renderViz(name, token.text, r, md)
        if (kind === 'pull') return renderPull(token.text, r, md)
        if (kind === 'stat') return renderStat(token.text, r, md)
        return false
      },
    },
  })
  return md.parse(markdown, { async: false }) as string
}

/**
 * Minutes to read: about 230 words a minute, plus 24 seconds per figure. The figures carry content
 * (tables, timelines, comparisons) that takes real time to read.
 */
function readingTime(html: string, figures: number): number {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ')
  const count = text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length
  return Math.max(1, Math.round(count / 230 + figures * 0.4))
}

function parse(slug: string, source: string): Post {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) throw new Error(`content/blog/${slug}.md: the header between --- lines is missing`)
  const meta: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^(['"])(.*)\1$/, '$2')
  }
  if (!meta.title) throw new Error(`content/blog/${slug}.md: no title`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date ?? '')) throw new Error(`content/blog/${slug}.md: date must be YYYY-MM-DD`)
  const lang: Lang = meta.lang === 'de' ? 'de' : 'en'
  const int = (s?: string) => (s && /^\d+$/.test(s) ? Number(s) : null)
  const series: Series | null =
    meta.series === 'emergence'
      ? {
          ...seriesInfo.emergence,
          episode: int(meta.episode),
          podcast: /^https?:\/\//.test(meta.podcast ?? '') ? meta.podcast : null,
          duration: int(meta.duration),
        }
      : null

  const vizzes: string[] = []
  const html = render(match[2], { target: 'web', slug, lang, vizzes })
  const emailHtml = render(match[2], { target: 'email', slug, lang, vizzes: [] })
  return {
    slug,
    title: meta.title,
    date: meta.date,
    description: meta.description ?? '',
    draft: meta.draft === 'true',
    lang,
    series,
    outro: meta.outro ?? '',
    readingMinutes: readingTime(html, vizzes.length),
    vizzes,
    html,
    emailHtml,
  }
}

/** One post straight from its file, drafts included (for scripts). */
export function readPost(slug: string): Post | undefined {
  const file = path.join(dir, `${slug}.md`)
  return fs.existsSync(file) ? parse(slug, fs.readFileSync(file, 'utf8')) : undefined
}

/**
 * All posts, newest first. Drafts only when `includeDrafts` is set: by default under `npm run dev`,
 * or in a local production build made with SHOW_DRAFTS=1 (never set it on Vercel).
 */
export function getPosts(includeDrafts = process.env.NODE_ENV === 'development' || process.env.SHOW_DRAFTS === '1'): Post[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => parse(f.slice(0, -3), fs.readFileSync(path.join(dir, f), 'utf8')))
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
}

export function getPost(slug: string, includeDrafts?: boolean): Post | undefined {
  return getPosts(includeDrafts).find((p) => p.slug === slug)
}

/** "25 November 2026", or "25. November 2026" in German. */
export function formatDate(date: string, lang: Lang = 'en'): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
