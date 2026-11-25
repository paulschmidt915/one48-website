// Blog posts: one Markdown file per post in content/blog/<slug>.md.
//
// Each file starts with a short header:
//
//   ---
//   title: The title of the post
//   date: 2026-11-25
//   description: One or two sentences for the list, link previews and the e-mail preview.
//   draft: true            (optional: only shown while running `npm run dev`)
//   ---
//
// No imports from the app (no `@/` paths), so scripts/newsletter.mjs can use this file as well.

import fs from 'node:fs'
import path from 'node:path'
import { marked } from 'marked'

export type Post = {
  slug: string
  title: string
  /** YYYY-MM-DD */
  date: string
  description: string
  draft: boolean
  /** The post as HTML. */
  html: string
}

const dir = path.join(process.cwd(), 'content', 'blog')

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
  return {
    slug,
    title: meta.title,
    date: meta.date,
    description: meta.description ?? '',
    draft: meta.draft === 'true',
    html: marked.parse(match[2], { async: false }),
  }
}

/** All posts, newest first. Drafts only when `includeDrafts` is set. */
export function getPosts(includeDrafts = process.env.NODE_ENV === 'development'): Post[] {
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

/** "25 November 2026" */
export function formatDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}
