import { Resend } from 'resend'
import { confirmEmail, isEmail, makeToken, newsletter, readToken } from '@/lib/newsletter'

// POST { email }            → sends the confirmation e-mail (double opt-in).
// POST { token }            → the subscriber clicked the link and pressed "Confirm": add them to the segment.

const json = (body: object, status = 200) => Response.json(body, { status })

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY
  if (!key || !process.env.NEWSLETTER_SECRET) return json({ error: 'The newsletter is not set up yet.' }, 503)
  const resend = new Resend(key)

  let body: { email?: unknown; token?: unknown; website?: unknown }
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Bad request.' }, 400)
  }

  // Confirm.
  if (typeof body.token === 'string') {
    const email = readToken(body.token)
    if (!email) return json({ error: 'This link is no longer valid. Please sign up again.' }, 400)

    const existing = await resend.contacts.get({ email })
    if (existing.data) {
      const updated = await resend.contacts.update({ email, unsubscribed: false })
      if (updated.error) return failed(updated.error)
      const added = await resend.contacts.segments.add({ email, segmentId: newsletter.segmentId })
      // Already in the segment is fine.
      if (added.error && !/already/i.test(added.error.message)) return failed(added.error)
    } else {
      const created = await resend.contacts.create({ email, unsubscribed: false, segments: [{ id: newsletter.segmentId }] })
      if (created.error) return failed(created.error)
    }
    return json({ ok: true })
  }

  // Sign up. The hidden "website" field is only ever filled in by bots.
  if (typeof body.website === 'string' && body.website) return json({ ok: true })
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!isEmail(email)) return json({ error: 'Please enter a valid e-mail address.' }, 400)

  const mail = confirmEmail(makeToken(email))
  const sent = await resend.emails.send({ from: newsletter.from, replyTo: newsletter.replyTo, to: email, ...mail })
  if (sent.error) return failed(sent.error)
  return json({ ok: true })
}

function failed(error: { message: string }) {
  console.error('newsletter:', error.message)
  return json({ error: 'Something went wrong. Please try again later.' }, 502)
}
