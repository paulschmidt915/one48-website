'use client'

import { useEffect, useId, useRef } from 'react'
import Subscribe from './Subscribe'

/** A "Newsletter" button that opens the sign-up form in a modal dialog. */
export default function NewsletterButton({ label = 'Newsletter', lang = 'en' }: { label?: string; lang?: 'en' | 'de' }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  // Never leave the page locked if the button goes away while the dialog is open.
  useEffect(() => () => document.documentElement.removeAttribute('data-viewer'), [])

  const open = () => {
    const el = dialog.current
    if (!el || el.open) return
    el.showModal()
    // Same lock as the phone viewer: the page behind stays still, the Pager stands down.
    document.documentElement.setAttribute('data-viewer', '')
    el.querySelector<HTMLInputElement>('input[name="email"]')?.focus()
  }

  return (
    <>
      <button type="button" className="nl-button" onClick={open}>
        {label}
      </button>
      <dialog
        ref={dialog}
        className="nl-dialog"
        aria-labelledby={titleId}
        onClose={() => document.documentElement.removeAttribute('data-viewer')}
        onClick={(e) => {
          // A click on the backdrop (the dialog element itself, outside the card) closes it.
          if (e.target === e.currentTarget) dialog.current?.close()
        }}
      >
        <div className="nl-card">
          <button type="button" className="nl-close quiet" onClick={() => dialog.current?.close()}>
            {lang === 'de' ? 'Schließen' : 'Close'}
          </button>
          <Subscribe lang={lang} titleId={titleId} />
        </div>
      </dialog>
    </>
  )
}
