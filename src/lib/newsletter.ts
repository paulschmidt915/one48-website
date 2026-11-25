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

const ink = '#10131a'
const muted = '#5b6170'
const paper = '#e9edf2'
const fonts = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** The frame every e-mail sits in: the name on top, a white card, a small footer. */
function layout({ preview, body, footer }: { preview: string; body: string; footer: string }): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escape(preview)}</title>
<style>
  .post h2 { font-size: 20px; line-height: 1.3; margin: 32px 0 8px; font-weight: 600; letter-spacing: -0.01em; }
  .post h3 { font-size: 17px; line-height: 1.35; margin: 24px 0 6px; font-weight: 600; }
  .post p, .post ul, .post ol { margin: 0 0 16px; }
  .post li { margin: 0 0 6px; }
  .post a { color: ${ink}; text-decoration: underline; }
  .post img { max-width: 100%; height: auto; border-radius: 12px; }
  .post blockquote { margin: 0 0 16px; padding: 2px 0 2px 16px; border-left: 2px solid ${ink}; color: ${muted}; }
  .post code { font-family: Menlo, Consolas, monospace; font-size: 14px; background: ${paper}; padding: 1px 5px; border-radius: 4px; }
  .post pre { background: ${paper}; padding: 14px 16px; border-radius: 10px; overflow-x: auto; }
  .post pre code { background: none; padding: 0; }
  .post hr { border: 0; border-top: 1px solid #d6dbe2; margin: 28px 0; }
</style>
</head>
<body style="margin:0;padding:0;background:${paper};color:${ink};font-family:${fonts};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escape(preview)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${paper};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
      <tr><td style="padding:0 8px 16px;font-size:15px;font-weight:600;letter-spacing:-0.02em;">
        <a href="${newsletter.siteUrl}" style="color:${ink};text-decoration:none;">one48</a>
        <span style="color:${muted};font-weight:400;"> · Paul Schmidt</span>
      </td></tr>
      <tr><td style="background:#ffffff;border-radius:20px;padding:36px 32px;font-size:16px;line-height:1.6;">
        ${body}
      </td></tr>
      <tr><td style="padding:20px 8px 0;font-size:13px;line-height:1.5;color:${muted};">
        ${footer}
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`
}

const button = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:${ink};color:${paper};text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:999px;">${label}</a>`

export function confirmEmail(token: string): { subject: string; html: string; text: string } {
  const url = `${newsletter.siteUrl}/newsletter/confirm?token=${encodeURIComponent(token)}`
  const subject = 'Confirm your subscription'
  const html = layout({
    preview: 'One click and you get my new posts by e-mail.',
    body: `
      <h1 style="margin:0 0 12px;font-size:26px;line-height:1.15;font-weight:600;letter-spacing:-0.03em;">One more click</h1>
      <p style="margin:0 0 24px;">You asked to get my new blog posts by e-mail. Please confirm that this was you:</p>
      <p style="margin:0 0 24px;">${button(url, 'Confirm subscription')}</p>
      <p style="margin:0;color:${muted};font-size:14px;">If you did not ask for this, just ignore this e-mail: you will not hear from me. The link works for seven days.</p>`,
    footer: `Paul Schmidt · <a href="${newsletter.siteUrl}/legal" style="color:${muted};">Impressum &amp; Datenschutz</a>`,
  })
  const text = `You asked to get my new blog posts by e-mail. Please confirm that this was you:\n\n${url}\n\nIf you did not ask for this, just ignore this e-mail. The link works for seven days.\n\nPaul Schmidt · ${newsletter.siteUrl}`
  return { subject, html, text }
}

/** Links and images in a post point to the site, so they work in the e-mail too. */
const absolute = (html: string) => html.replace(/(href|src)="\/(?!\/)/g, `$1="${newsletter.siteUrl}/`)

/** A blog post as a newsletter. Resend fills in the unsubscribe link for every subscriber. */
export function postEmail(post: { slug: string; title: string; description: string; html: string; dateLabel: string }): {
  subject: string
  html: string
  previewText: string
} {
  const url = `${newsletter.siteUrl}/blog/${post.slug}`
  const html = layout({
    preview: post.description || post.title,
    body: `
      <p style="margin:0 0 8px;font-size:13px;color:${muted};">${escape(post.dateLabel)}</p>
      <h1 style="margin:0 0 24px;font-size:30px;line-height:1.12;font-weight:600;letter-spacing:-0.035em;">
        <a href="${url}" style="color:${ink};text-decoration:none;">${escape(post.title)}</a>
      </h1>
      <div class="post">${absolute(post.html)}</div>
      <p style="margin:28px 0 0;">${button(url, 'Read on the website')}</p>`,
    footer: `You get this because you subscribed to my blog on <a href="${newsletter.siteUrl}/blog" style="color:${muted};">one48.de</a>. Reply to this e-mail to write to me.<br>
      <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:${muted};">Unsubscribe</a> · <a href="${newsletter.siteUrl}/legal" style="color:${muted};">Impressum &amp; Datenschutz</a>`,
  })
  return { subject: post.title, html, previewText: post.description }
}
