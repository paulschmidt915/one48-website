// The newsletter: who it comes from, where subscribers live in Resend, and the e-mails it sends.
// No imports from the app (no `@/` paths), so scripts/newsletter.mjs can use this file as well.

import crypto from 'node:crypto'

export const newsletter = {
  siteUrl: 'https://www.one48.de',
  from: 'Paul Schmidt <newsletter@one48.de>',
  replyTo: 'paulschmidt@one48.de',
  /** The Resend segment "one48-Newsletter". */
  segmentId: '724cfb3f-045e-4059-b154-95bbe747dc1a',
}

// ───────── Confirmation links (double opt-in) ─────────
// The link carries the address and the time it was asked for, signed with NEWSLETTER_SECRET,
// so nothing has to be stored until the subscriber confirms.

const week = 7 * 24 * 60 * 60 * 1000

function secret(): string {
  const s = process.env.NEWSLETTER_SECRET
  if (!s) throw new Error('NEWSLETTER_SECRET is not set')
  return s
}

const sign = (payload: string) => crypto.createHmac('sha256', secret()).update(payload).digest('base64url')

export function makeToken(email: string, now = Date.now()): string {
  const payload = Buffer.from(JSON.stringify({ e: email, t: now })).toString('base64url')
  return `${payload}.${sign(payload)}`
}

/** The address in a confirmation token, or null if it is forged or older than a week. */
export function readToken(token: string, now = Date.now()): string | null {
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return null
  const expected = Buffer.from(sign(payload))
  const given = Buffer.from(sig)
  if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) return null
  try {
    const { e, t } = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    if (typeof e !== 'string' || typeof t !== 'number' || now - t > week) return null
    return e
  } catch {
    return null
  }
}

export const isEmail = (s: string) => s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

// ───────── E-mails ─────────
// Built like the website: warm paper with soft colour fields, the portrait and name on top, a frosted
// card, big tight headlines in Funnel Display. Mail programs that drop parts of it (Gmail ignores web
// fonts and background gradients, Outlook rounded corners) fall back to plain paper and system fonts.

const ink = '#10131a'
const muted = '#5f6573'
const soft = '#8a909c'
const paper = '#e9edf2'
const display = `'Funnel Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`
const fields = [
  'radial-gradient(ellipse 70% 55% at 8% 0%, #bccbdf 0%, rgba(188,203,223,0) 70%)',
  'radial-gradient(ellipse 60% 50% at 100% 18%, #c9d0d9 0%, rgba(201,208,217,0) 70%)',
  'radial-gradient(ellipse 55% 45% at 45% 40%, #ffffff 0%, rgba(255,255,255,0) 70%)',
  // Fades out before the bottom edge, where the mail program's own background takes over.
  'radial-gradient(ellipse 60% 32% at 25% 66%, #b3c1d4 0%, rgba(179,193,212,0) 70%)',
].join(', ')

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** The frame every e-mail sits in. */
function layout({ preview, body, footer, lang = 'en' }: { preview: string; body: string; footer: string; lang?: 'de' | 'en' }): string {
  const site = newsletter.siteUrl
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
<title>${escape(preview)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  body, table, td, a, p, h1, h2, h3, li { font-family: ${display}; }
  a { color: ${ink}; }
  .post h2 { font-size: 24px; line-height: 1.2; margin: 34px 0 8px; font-weight: 500; letter-spacing: -0.03em; color: ${ink}; }
  .post h3 { font-size: 18px; line-height: 1.3; margin: 26px 0 6px; font-weight: 600; letter-spacing: -0.015em; color: ${ink}; }
  .post p, .post ul, .post ol { margin: 0 0 16px; }
  .post ul, .post ol { padding-left: 22px; }
  .post li { margin: 0 0 6px; }
  .post strong { color: ${ink}; font-weight: 600; }
  .post a { color: ${ink}; text-decoration: underline; text-underline-offset: 3px; }
  .post img { max-width: 100%; height: auto; border-radius: 16px; }
  .post blockquote { margin: 0 0 16px; padding: 2px 0 2px 16px; color: ${muted}; }
  .post code { font-family: Menlo, Consolas, monospace; font-size: 14px; background: rgba(16,19,26,0.06); padding: 1px 5px; border-radius: 5px; }
  .post pre { background: rgba(16,19,26,0.05); padding: 14px 16px; border-radius: 14px; overflow-x: auto; }
  .post pre code { background: none; padding: 0; }
  .post hr { border: 0; border-top: 1px solid rgba(16,19,26,0.12); margin: 30px 0; }
  @media (max-width: 520px) {
    .card { padding: 30px 24px !important; border-radius: 24px !important; }
    .h1 { font-size: 40px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${paper};color:${ink};-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escape(preview)}&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${paper};background-image:${fields};">
  <tr><td align="center" style="padding:28px 14px 44px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">
      <tr><td style="padding:0 6px 30px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="font-size:15px;font-weight:600;letter-spacing:-0.02em;"><a href="${site}" style="color:${ink};text-decoration:none;">one48</a></td>
          <td align="right" style="font-size:15px;"><a href="${site}/blog" style="color:${muted};text-decoration:none;">Blog</a></td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:0 6px 22px;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td width="52" style="padding-right:14px;"><img src="${site}/email/paul.jpg" width="52" height="52" alt="Paul Schmidt" style="display:block;width:52px;height:52px;border-radius:50%;"></td>
          <td>
            <div style="font-size:18px;font-weight:500;letter-spacing:-0.025em;line-height:1.15;">Paul Schmidt</div>
            <div style="font-size:14px;color:${muted};padding-top:3px;">Turning AI into action.</div>
          </td>
        </tr></table>
      </td></tr>
      <tr><td class="card" style="background-color:#f6f8fb;background-color:rgba(255,255,255,0.62);border:1px solid rgba(255,255,255,0.85);border-radius:28px;padding:40px 36px;box-shadow:0 1px 2px rgba(16,19,26,0.04), 0 24px 48px -28px rgba(16,19,26,0.28);font-size:17px;line-height:1.6;letter-spacing:-0.005em;color:#2b2f38;">
        ${body}
      </td></tr>
      <tr><td style="padding:24px 8px 0;font-size:13px;line-height:1.6;color:${soft};">
        ${footer}
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`
}

const h1 = (inner: string) =>
  `<h1 class="h1" style="margin:0 0 18px;font-size:48px;line-height:0.96;font-weight:480;letter-spacing:-0.045em;color:${ink};">${inner}</h1>`

const button = (href: string, label: string) =>
  `<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:999px;background-color:${ink};">
    <a href="${href}" style="display:inline-block;padding:15px 28px;border-radius:999px;background-color:${ink};color:${paper};text-decoration:none;font-size:16px;font-weight:500;letter-spacing:-0.01em;">${label}</a>
  </td></tr></table>`

const footerLink = (href: string, label: string) => `<a href="${href}" style="color:${soft};text-decoration:underline;">${label}</a>`

export function confirmEmail(token: string): { subject: string; html: string; text: string } {
  const url = `${newsletter.siteUrl}/newsletter/confirm?token=${encodeURIComponent(token)}`
  const subject = 'Confirm your subscription'
  const html = layout({
    preview: 'One click and you get my new posts by e-mail.',
    body: `
      ${h1('One more click.')}
      <p style="margin:0 0 28px;">You asked to get my new blog posts by e-mail. Confirm that this was you, and the next one comes straight to your inbox.</p>
      ${button(url, 'Confirm subscription')}
      <p style="margin:28px 0 0;font-size:14px;line-height:1.5;color:${soft};">Didn&rsquo;t ask for this? Just ignore this e-mail and you won&rsquo;t hear from me. The link works for seven days.</p>`,
    footer: `Paul Schmidt · Vienna · ${footerLink(`${newsletter.siteUrl}/legal`, 'Impressum &amp; Datenschutz')}`,
  })
  const text = `You asked to get my new blog posts by e-mail. Please confirm that this was you:\n\n${url}\n\nIf you did not ask for this, just ignore this e-mail. The link works for seven days.\n\nPaul Schmidt · ${newsletter.siteUrl}`
  return { subject, html, text }
}

/** Links and images in a post point to the site, so they work in the e-mail too. */
const absolute = (html: string) => html.replace(/(href|src)="\/(?!\/)/g, `$1="${newsletter.siteUrl}/`)

type EmailPost = {
  slug: string
  title: string
  description: string
  /** The post rendered for e-mail (Post.emailHtml): interactive figures are link cards there. */
  html: string
  dateLabel: string
  lang?: 'de' | 'en'
  readingMinutes?: number
  /** A post of the podcast series: an episode line on top, a block pointing to the episode at the end. */
  series?: { name: string; show: string; episode: number | null; podcast: string | null; duration: number | null } | null
}

const emailWords = {
  en: {
    read: 'Read on the website',
    episode: 'Episode',
    listen: 'Listen to the episode',
    show: 'All episodes on Spotify',
    outro: 'This was the short version. The episode goes deeper, with all sources in the show notes.',
    min: (n: number) => `${n} min read`,
    footer: (link: string) => `You get this because you subscribed on ${link}. Just reply to write to me.`,
    unsubscribe: 'Unsubscribe',
  },
  de: {
    read: 'Auf der Website lesen',
    episode: 'Folge',
    listen: 'Folge anhören',
    show: 'Alle Folgen auf Spotify',
    outro: 'Das hier war die Kurzfassung. In der Folge gehe ich tiefer rein, alle Quellen stehen in den Shownotes.',
    min: (n: number) => `${n} Min. Lesezeit`,
    footer: (link: string) => `Du bekommst diese E-Mail, weil du dich auf ${link} angemeldet hast. Antworte einfach, wenn du mir schreiben willst.`,
    unsubscribe: 'Abmelden',
  },
}

/** A blog post as a newsletter. Resend fills in the unsubscribe link for every subscriber. */
export function postEmail(post: EmailPost): {
  subject: string
  html: string
  previewText: string
} {
  const url = `${newsletter.siteUrl}/blog/${post.slug}`
  const lang = post.lang ?? 'en'
  const w = emailWords[lang]
  const s = post.series
  const episodeLabel = s ? `${escape(s.name)}${s.episode ? ` · ${w.episode} ${s.episode}` : ''}` : ''
  const meta = [escape(post.dateLabel), s && post.readingMinutes ? w.min(post.readingMinutes) : ''].filter(Boolean).join(' · ')
  const top = s
    ? `<p style="margin:0 0 12px;font-size:13px;color:${soft};"><a href="${s.podcast ?? s.show}" style="color:${ink};text-decoration:none;font-weight:600;">${episodeLabel}</a> · ${meta}</p>`
    : `<p style="margin:0 0 12px;font-size:13px;color:${soft};">${meta}</p>`
  const outro = s
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:30px 0 0;"><tr><td style="padding:22px 22px 24px;border-radius:20px;background-color:#eef1f5;background-color:rgba(16,19,26,0.045);">
        <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:${soft};">${episodeLabel}</p>
        <p style="margin:0 0 16px;font-size:16px;line-height:1.5;color:${muted};">${w.outro}</p>
        ${button(s.podcast ?? s.show, w.listen + (s.duration ? ` · ${s.duration} Min.` : ''))}
        <p style="margin:14px 0 0;font-size:14px;"><a href="${s.show}" style="color:${muted};text-decoration:underline;">${w.show}</a></p>
      </td></tr></table>`
    : ''
  const html = layout({
    lang,
    preview: post.description || post.title,
    body: `
      ${top}
      ${h1(`<a href="${url}" style="color:${ink};text-decoration:none;">${escape(post.title)}</a>`)}
      <div class="post" style="padding-top:6px;">${absolute(post.html)}</div>
      <div style="padding-top:14px;">${button(url, w.read)}</div>
      ${outro}`,
    footer: `${w.footer(footerLink(`${newsletter.siteUrl}/blog`, 'one48.de'))}<br>
      ${footerLink('{{{RESEND_UNSUBSCRIBE_URL}}}', w.unsubscribe)} · ${footerLink(`${newsletter.siteUrl}/legal`, 'Impressum &amp; Datenschutz')}`,
  })
  return { subject: post.title, html, previewText: post.description }
}
