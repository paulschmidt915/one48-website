'use client'

import Link from 'next/link'
import { useState } from 'react'

type State = { kind: 'idle' | 'sending' | 'sent' } | { kind: 'error'; message: string }

const text = {
  en: {
    title: 'Get new posts by e-mail.',
    done: 'Almost done: I sent you an e-mail. Click the link in it to confirm.',
    lead: 'When I write something new, it lands in your inbox. No spam, unsubscribe any time.',
    label: 'E-mail address',
    placeholder: 'you@example.com',
    sending: 'Sending…',
    subscribe: 'Subscribe',
    failed: 'Something went wrong.',
    invalid: null as string | null,
    offline: 'No connection. Please try again.',
    fine: ['Sent with Resend. Details in the ', 'privacy policy', '.'],
  },
  de: {
    title: 'Neue Beiträge per E-Mail.',
    done: 'Fast geschafft: Ich habe dir eine E-Mail geschickt. Klick auf den Link darin, um zu bestätigen.',
    lead: 'Wenn ich etwas Neues schreibe, landet es in deinem Postfach. Kein Spam, jederzeit abbestellbar.',
    label: 'E-Mail-Adresse',
    placeholder: 'du@beispiel.de',
    sending: 'Wird gesendet …',
    subscribe: 'Abonnieren',
    failed: 'Da ist etwas schiefgelaufen.',
    invalid: 'Bitte gib eine gültige E-Mail-Adresse ein.',
    offline: 'Keine Verbindung. Bitte versuch es noch einmal.',
    fine: ['Versand über Resend. Details in der ', 'Datenschutzerklärung', '.'],
  },
}

/** Sign up for new posts by e-mail. Sends a confirmation e-mail first (double opt-in). */
export default function Subscribe({ title, lang = 'en' }: { title?: string; lang?: 'en' | 'de' }) {
  const [state, setState] = useState<State>({ kind: 'idle' })
  const t = text[lang]

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setState({ kind: 'sending' })
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.get('email'), website: form.get('website') }),
      })
      const data = await res.json().catch(() => ({}))
      // The server answers in English; German pages say it in German.
      const message = lang === 'en' ? data.error ?? t.failed : res.status === 400 && t.invalid ? t.invalid : t.failed
      setState(res.ok ? { kind: 'sent' } : { kind: 'error', message })
    } catch {
      setState({ kind: 'error', message: t.offline })
    }
  }

  return (
    <section className="subscribe" aria-labelledby="subscribe-title">
      <h2 id="subscribe-title" className="subscribe-title">
        {title ?? t.title}
      </h2>
      {state.kind === 'sent' ? (
        <p className="subscribe-done" role="status">
          {t.done}
        </p>
      ) : (
        <>
          <p className="subscribe-text">{t.lead}</p>
          <form className="subscribe-form" onSubmit={submit} noValidate>
            <label className="sr-only" htmlFor="subscribe-email">
              {t.label}
            </label>
            <input
              id="subscribe-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={t.placeholder}
              required
              aria-invalid={state.kind === 'error' || undefined}
              aria-describedby={state.kind === 'error' ? 'subscribe-error' : undefined}
            />
            {/* Left empty by people, filled in by bots. */}
            <input className="subscribe-trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden />
            <button type="submit" disabled={state.kind === 'sending'}>
              {state.kind === 'sending' ? t.sending : t.subscribe}
            </button>
          </form>
          {state.kind === 'error' && (
            <p className="subscribe-error" id="subscribe-error" role="alert">
              {state.message}
            </p>
          )}
          <p className="subscribe-fine">
            {t.fine[0]}
            <Link href="/legal#newsletter">{t.fine[1]}</Link>
            {t.fine[2]}
          </p>
        </>
      )}
    </section>
  )
}
