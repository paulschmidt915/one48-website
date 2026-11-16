import type { Metadata } from 'next'
import Account from './Account'

const url = 'https://www.one48.de/bucketlist/konto'

export const metadata: Metadata = {
  title: 'Bucketlist-Konto',
  description: 'E-Mail-Adresse bestätigen oder ein neues Passwort für dein Bucketlist-Konto setzen.',
  alternates: { canonical: url },
  robots: { index: false },
}

// Where the links in Bucketlist's account mails lead (Supabase Auth → URL Configuration →
// Redirect URLs): confirming the address after signing up in the app, and setting a new password.
// Source of the concept: bucketlist repo, docs/BETA-PLAN.md.
export default function BucketlistAccountPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#111111] font-body">
      <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#1A7F72]">Bucketlist</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Dein Konto</h1>
        <Account />
      </div>
    </div>
  )
}
