'use client'

import { createClient } from '@supabase/supabase-js'
import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '../verbinden/config'

const primary = 'w-full rounded-xl bg-[#111111] px-4 py-3 font-semibold text-white disabled:opacity-50'
const MIN_PASSWORD = 8

type State =
  | { step: 'loading' }
  | { step: 'confirmed' }
  | { step: 'newPassword' }
  | { step: 'passwordSet' }
  | { step: 'nothing' }
  | { step: 'error'; message: string }

/** What the link in the URL says: Supabase puts `type` and the tokens, or an error, into the hash. */
function linkInfo(): { type: string | null; error: string | null } {
  const hash = new URLSearchParams(window.location.hash.slice(1))
  const query = new URLSearchParams(window.location.search)
  return {
    type: hash.get('type') ?? query.get('type'),
    error: hash.get('error_description') ?? query.get('error_description'),
  }
}

export default function Account() {
  // The session from the link lives only on this page; nothing is kept in the browser.
  const supabase = useMemo(
    () => createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, { auth: { persistSession: false } }),
    [],
  )
  const [state, setState] = useState<State>({ step: 'loading' })
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const { type, error } = linkInfo()
    if (error) {
      setState({
        step: 'error',
        message: error.includes('expired') || error.includes('invalid')
          ? 'Der Link ist abgelaufen oder wurde schon benutzt. Fordere in der App einen neuen an.'
          : error,
      })
      return
    }
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setState({ step: 'newPassword' })
    })
    supabase.auth.getSession().then(({ data: session }) => {
      if (!session.session) return setState((current) => (current.step === 'loading' ? { step: 'nothing' } : current))
      if (type === 'recovery') return setState({ step: 'newPassword' })
      setState({ step: 'confirmed' })
      // The address is confirmed; signing in happens in the app.
      void supabase.auth.signOut({ scope: 'local' })
    })
    return () => data.subscription.unsubscribe()
  }, [supabase])

  async function savePassword(event: FormEvent) {
    event.preventDefault()
    if (password.length < MIN_PASSWORD) return setMessage(`Mindestens ${MIN_PASSWORD} Zeichen.`)
    setBusy(true)
    setMessage(null)
    const { error } = await supabase.auth.updateUser({ password })
    setBusy(false)
    if (error) {
      return setMessage(
        error.code === 'same_password' ? 'Das ist dein bisheriges Passwort. Wähle ein neues.'
          : error.code === 'weak_password' ? `Das Passwort ist zu schwach: mindestens ${MIN_PASSWORD} Zeichen.`
            : error.message,
      )
    }
    setPassword('')
    setState({ step: 'passwordSet' })
    void supabase.auth.signOut({ scope: 'local' })
  }

  switch (state.step) {
    case 'loading':
      return <p className="mt-8 text-[#6B6B6B]">Einen Moment …</p>

    case 'confirmed':
      return (
        <div className="mt-8 space-y-4">
          <p className="text-lg font-semibold">Deine E-Mail-Adresse ist bestätigt.</p>
          <p>Öffne jetzt Bucketlist auf deinem iPhone und melde dich mit deiner E-Mail-Adresse und deinem Passwort an.</p>
        </div>
      )

    case 'newPassword':
      return (
        <form className="mt-8 space-y-4" onSubmit={savePassword}>
          <p>Wähle ein neues Passwort für dein Bucketlist-Konto.</p>
          <input
            className="w-full rounded-xl border border-[#D9D4C7] bg-white px-4 py-3"
            type="password"
            autoComplete="new-password"
            placeholder={`Neues Passwort (mindestens ${MIN_PASSWORD} Zeichen)`}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {message && <p className="rounded-xl bg-[#FDECEA] p-3 text-sm">{message}</p>}
          <button className={primary} type="submit" disabled={busy || password.length < MIN_PASSWORD}>
            Passwort speichern
          </button>
        </form>
      )

    case 'passwordSet':
      return (
        <div className="mt-8 space-y-4">
          <p className="text-lg font-semibold">Dein neues Passwort ist gespeichert.</p>
          <p>Melde dich damit in der App an (Einstellungen → Konto → „Mit E-Mail anmelden“).</p>
        </div>
      )

    case 'nothing':
      return (
        <p className="mt-8">
          Diese Seite öffnest du über den Link in einer Mail von Bucketlist: zum Bestätigen deiner E-Mail-Adresse oder zum
          Setzen eines neuen Passworts.
        </p>
      )

    case 'error':
      return (
        <div className="mt-8 space-y-4">
          <p className="rounded-xl bg-[#FDECEA] p-4">{state.message}</p>
          <p className="text-sm text-[#6B6B6B]">Hilft das nicht: paulschmidt@one48.de</p>
        </div>
      )
  }
}
