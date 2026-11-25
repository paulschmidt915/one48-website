'use client'

import Link from 'next/link'
import { useState } from 'react'

type State = { kind: 'idle' | 'sending' | 'done' } | { kind: 'error'; message: string }

/**
 * The last step of the sign-up. A button rather than confirming on page load, so a mail
 * program that opens links to check them cannot subscribe anyone.
 */
export default function Confirm({ token }: { token: string }) {
  const [state, setState] = useState<State>(token ? { kind: 'idle' } : { kind: 'error', message: 'This link is incomplete. Please open it straight from the e-mail.' })

  async function confirm() {
    setState({ kind: 'sending' })
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const data = await res.json().catch(() => ({}))
      setState(res.ok ? { kind: 'done' } : { kind: 'error', message: data.error ?? 'Something went wrong.' })
    } catch {
      setState({ kind: 'error', message: 'No connection. Please try again.' })
    }
  }

  if (state.kind === 'done') {
    return (
      <div className="confirm">
        <h1 className="blog-title">You&rsquo;re in.</h1>
        <p className="blog-lead">From now on, new posts come to you by e-mail. Every e-mail has a link to unsubscribe.</p>
        <p className="confirm-next">
          <Link href="/blog" className="button">Read the blog</Link>
        </p>
      </div>
    )
  }

  return (
    <div className="confirm">
      <h1 className="blog-title">One more click.</h1>
      {state.kind === 'error' ? (
        <>
          <p className="blog-lead" role="alert">{state.message}</p>
          <p className="confirm-next">
            <Link href="/blog#subscribe" className="button">Sign up again</Link>
          </p>
        </>
      ) : (
        <>
          <p className="blog-lead">Confirm that you want to get my new blog posts by e-mail.</p>
          <p className="confirm-next">
            <button type="button" className="button" onClick={confirm} disabled={state.kind === 'sending'}>
              {state.kind === 'sending' ? 'Confirming…' : 'Confirm subscription'}
            </button>
          </p>
        </>
      )}
    </div>
  )
}
