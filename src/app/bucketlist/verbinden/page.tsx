import type { Metadata } from 'next'
import Connect from './Connect'

const url = 'https://www.one48.de/bucketlist/verbinden'
const title = 'Bucketlist mit Claude oder ChatGPT verbinden'
const description = 'Deine Bucketlist-Orte und -Listen in Claude, ChatGPT und anderen KI-Assistenten, mit deinem eigenen Konto.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  robots: { index: false },
}

// Consent page of Bucketlist's OAuth 2.1 server (Supabase Auth → OAuth Server → Authorization
// Path). Supabase sends the user here with ?authorization_id=…; without it the page shows the
// connected assistants and how to connect one. Source of the concept: bucketlist repo,
// docs/MCP-CONNECTOR.md.
export default function BucketlistConnectPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#111111] font-body">
      <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#1A7F72]">Bucketlist</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Mit KI-Assistenten verbinden</h1>
        <Connect />
      </div>
    </div>
  )
}
