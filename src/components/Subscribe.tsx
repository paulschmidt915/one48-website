'use client'

import Link from 'next/link'
import { useState } from 'react'

type State = { kind: 'idle' | 'sending' | 'sent' } | { kind: 'error'; message: string }

/** Sign up for new posts by e-mail. Sends a confirmation e-mail first (double opt-in). */
export default function Subscribe({ title = 'Get new posts by e-mail.' }: { title?: string }) {
  const [state, setState] = useState<State>({ kind: 'idle' })

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
      setState(res.ok ? { kind: 'sent' } : { kind: 'error', message: data.error ?? 'Something went wrong.' })
    } catch {
      setState({ kind: 'error', message: 'No connection. Please try again.' })
    }
  }

  return (
    <section className="subscribe" aria-labelledby="subscribe-title">
      <h2 id="subscribe-title" className="subscribe-title">
        {title}
      </h2>
      {state.kind === 'sent' ? (
        <p className="subscribe-done" role="status">
          Almost done: I sent you an e-mail. Click the link in it to confirm.
        </p>
      ) : (
        <>
          <p className="subscribe-text">When I write something new, it lands in your inbox. No spam, unsubscribe any time.</p>
          <form className="subscribe-form" onSubmit={submit} noValidate>
            <label className="sr-only" htmlFor="subscribe-email">
              E-mail address
            </label>
            <input
              id="subscribe-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              aria-invalid={state.kind === 'error' || undefined}
              aria-describedby={state.kind === 'error' ? 'subscribe-error' : undefined}
            />
            {/* Left empty by people, filled in by bots. */}
            <input className="subscribe-trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden />
            <button type="submit" disabled={state.kind === 'sending'}>
              {state.kind === 'sending' ? 'Sending…' : 'Subscribe'}
            </button>
          </form>
          {state.kind === 'error' && (
            <p className="subscribe-error" id="subscribe-error" role="alert">
              {state.message}
            </p>
          )}
          <p className="subscribe-fine">
            Sent with Resend. Details in the <Link href="/legal#newsletter">privacy policy</Link>.
          </p>
        </>
      )}
    </section>
  )
}
