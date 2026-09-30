'use client'

import { createClient, type OAuthAuthorizationDetails, type OAuthGrant, type Session } from '@supabase/supabase-js'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { APPLE_SERVICES_ID, assistantName, isTrustedRedirect, PAGE_URL, SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from './config'

declare global {
  interface Window {
    AppleID?: {
      auth: {
        init(config: Record<string, unknown>): void
        signIn(): Promise<{ authorization: { id_token: string } }>
      }
    }
  }
}

const APPLE_SCRIPT = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/de_DE/appleid.auth.js'
const link = 'underline decoration-[#35C8B4] decoration-2 underline-offset-2 hover:text-[#1A7F72]'
const primary = 'w-full rounded-xl bg-[#111111] px-4 py-3 font-semibold text-white disabled:opacity-50'
const secondary = 'w-full rounded-xl border border-[#D9D4C7] bg-white px-4 py-3 font-semibold disabled:opacity-50'

type State =
  | { step: 'loading' }
  | { step: 'signIn' }
  | { step: 'consent'; details: OAuthAuthorizationDetails }
  | { step: 'untrusted'; details: OAuthAuthorizationDetails }
  | { step: 'redirecting' }
  | { step: 'manage'; grants: OAuthGrant[] }
  | { step: 'error'; message: string }

function loadAppleScript(): Promise<void> {
  if (window.AppleID) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = APPLE_SCRIPT
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Anmelden mit Apple ließ sich nicht laden.'))
    document.head.appendChild(script)
  })
}

async function sha256Hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function Connect() {
  const supabase = useMemo(() => createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY), [])
  const [state, setState] = useState<State>({ step: 'loading' })
  const [session, setSession] = useState<Session | null>(null)
  const [busy, setBusy] = useState(false)
  const authorizationId = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('authorization_id')

  const load = useCallback(async (current: Session | null) => {
    if (!current) return setState({ step: 'signIn' })
    if (!authorizationId) {
      const { data, error } = await supabase.auth.oauth.listGrants()
      return setState(error ? { step: 'error', message: error.message } : { step: 'manage', grants: data ?? [] })
    }
    const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(authorizationId)
    if (error || !data) return setState({ step: 'error', message: error?.message ?? 'Diese Anfrage ist ungültig oder abgelaufen.' })
    // Approved before: straight back to the assistant.
    if (!('authorization_id' in data)) {
      setState({ step: 'redirecting' })
      window.location.assign(data.redirect_url)
      return
    }
    setState({ step: isTrustedRedirect(data.redirect_uri) ? 'consent' : 'untrusted', details: data })
  }, [authorizationId, supabase])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      void load(data.session)
    })
  }, [supabase, load])

  async function signIn() {
    setBusy(true)
    try {
      await loadAppleScript()
      const nonce = crypto.randomUUID()
      window.AppleID!.auth.init({
        clientId: APPLE_SERVICES_ID,
        scope: '',
        redirectURI: PAGE_URL,
        usePopup: true,
        nonce: await sha256Hex(nonce),
      })
      const apple = await window.AppleID!.auth.signIn()
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: apple.authorization.id_token,
        nonce,
      })
      if (error) throw error
      setSession(data.session)
      await load(data.session)
    } catch (error) {
      // Closing Apple's popup is no error worth showing.
      const message = error instanceof Error ? error.message : String((error as { error?: string })?.error ?? '')
      if (message && !message.includes('popup_closed')) setState({ step: 'error', message })
    } finally {
      setBusy(false)
    }
  }

  async function decide(approve: boolean) {
    if (!authorizationId) return
    setBusy(true)
    const { data, error } = approve
      ? await supabase.auth.oauth.approveAuthorization(authorizationId, { skipBrowserRedirect: true })
      : await supabase.auth.oauth.denyAuthorization(authorizationId, { skipBrowserRedirect: true })
    if (error || !data) {
      setBusy(false)
      return setState({ step: 'error', message: error?.message ?? 'Das hat nicht geklappt.' })
    }
    setState({ step: 'redirecting' })
    window.location.assign(data.redirect_url)
  }

  async function revoke(clientId: string) {
    setBusy(true)
    const { error } = await supabase.auth.oauth.revokeGrant({ clientId })
    setBusy(false)
    if (error) return setState({ step: 'error', message: error.message })
    await load(session)
  }

  async function signOut() {
    await supabase.auth.signOut()
    setSession(null)
    setState({ step: 'signIn' })
  }

  switch (state.step) {
    case 'loading':
    case 'redirecting':
      return <p className="mt-8 text-[#6B6B6B]">{state.step === 'loading' ? 'Einen Moment …' : 'Zurück zum Assistenten …'}</p>

    case 'signIn':
      return (
        <div className="mt-8 space-y-5">
          <p>
            {authorizationId
              ? 'Ein KI-Assistent möchte auf deine Bucketlist zugreifen. Melde dich an, um zu sehen, wer fragt, und zu entscheiden.'
              : 'Melde dich an, um zu sehen, welche Assistenten mit deiner Bucketlist verbunden sind.'}
          </p>
          <button className={primary} onClick={signIn} disabled={busy}>
            Mit Apple anmelden
          </button>
          <p className="text-sm text-[#6B6B6B]">
            Nutze dieselbe Apple-ID wie in der App. Noch kein Konto? Lege es zuerst in der App an (Einstellungen → Konto).
          </p>
        </div>
      )

    case 'consent': {
      const who = assistantName(state.details.redirect_uri, state.details.client.name)
      return (
        <div className="mt-8 space-y-6">
          <p className="text-lg">
            <b>{who}</b> möchte auf die Bucketlist von <b>{state.details.user.email || 'deinem Konto'}</b> zugreifen.
          </p>
          <div className="rounded-xl bg-white p-4">
            <p className="font-semibold">{who} darf dann</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>deine gespeicherten Orte, Listen und Notizen lesen,</li>
              <li>Orte speichern und ändern (Status, Besuche, Bewertung, Notiz, Tags),</li>
              <li>eigene private Listen anlegen und Einträge hinzufügen oder entfernen,</li>
              <li>Orte bei Google Maps suchen.</li>
            </ul>
            <p className="mt-4 font-semibold">Nicht möglich, nur in der App</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Orte oder Listen löschen, Listen veröffentlichen,</li>
              <li>Profil, Blockierungen, Meldungen, Konto löschen.</li>
            </ul>
          </div>
          <p className="text-sm text-[#6B6B6B]">
            Was der Assistent liest, geht an seinen Anbieter ({who === 'ChatGPT' ? 'OpenAI' : who === 'Claude' ? 'Anthropic' : 'den Anbieter'}) und
            gilt dort nach dessen Datenschutzbestimmungen. Die Verbindung kannst du jederzeit auf dieser Seite trennen.{' '}
            <a className={link} href="/bucketlist/datenschutz#ki-assistenten">
              Datenschutz
            </a>
          </p>
          <p className="text-xs text-[#6B6B6B]">Weiterleitung an {new URL(state.details.redirect_uri).host}</p>
          <div className="space-y-3">
            <button className={primary} onClick={() => decide(true)} disabled={busy}>
              Erlauben
            </button>
            <button className={secondary} onClick={() => decide(false)} disabled={busy}>
              Ablehnen
            </button>
          </div>
        </div>
      )
    }

    case 'untrusted':
      return (
        <div className="mt-8 space-y-5">
          <p className="rounded-xl bg-[#FDECEA] p-4">
            Diese Anfrage kommt von <b>{state.details.client.name || 'einer unbekannten App'}</b> und würde zu{' '}
            <b>{new URL(state.details.redirect_uri).host}</b> weiterleiten. Das ist kein Assistent, den Bucketlist kennt.
            Wenn du das nicht selbst gestartet hast, lehne ab.
          </p>
          <button className={primary} onClick={() => decide(false)} disabled={busy}>
            Ablehnen
          </button>
        </div>
      )

    case 'manage':
      return (
        <div className="mt-8 space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl font-bold">Verbundene Assistenten</h2>
            {state.grants.length === 0 ? (
              <p className="text-[#6B6B6B]">Keine.</p>
            ) : (
              <ul className="space-y-2">
                {state.grants.map((grant) => (
                  <li key={grant.client.id} className="flex items-center justify-between gap-3 rounded-xl bg-white p-4">
                    <span>
                      <b>{grant.client.name || 'Unbenannt'}</b>
                      <br />
                      <span className="text-sm text-[#6B6B6B]">seit {new Date(grant.granted_at).toLocaleDateString('de-AT')}</span>
                    </span>
                    <button className="rounded-lg border border-[#D9D4C7] px-3 py-2 text-sm font-semibold" onClick={() => revoke(grant.client.id)} disabled={busy}>
                      Trennen
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="space-y-2">
            <h2 className="text-xl font-bold">Verbinden</h2>
            <p>
              In Claude: Einstellungen → Connectors → „Custom Connector hinzufügen“, in ChatGPT: Einstellungen → Apps → Connector
              erstellen. Als URL eintragen:
            </p>
            <code className="block break-all rounded-lg bg-white p-3 text-sm">{`${SUPABASE_URL}/functions/v1/mcp`}</code>
            <p className="text-sm text-[#6B6B6B]">Danach führt dich der Assistent hierher, du meldest dich an und erlaubst den Zugriff.</p>
          </section>
          <button className={secondary} onClick={signOut}>
            Abmelden
          </button>
        </div>
      )

    case 'error':
      return (
        <div className="mt-8 space-y-4">
          <p className="rounded-xl bg-[#FDECEA] p-4">{state.message}</p>
          <p className="text-sm text-[#6B6B6B]">Starte die Verbindung im Assistenten neu. Hilft das nicht: paulschmidt@one48.de</p>
        </div>
      )
  }
}
