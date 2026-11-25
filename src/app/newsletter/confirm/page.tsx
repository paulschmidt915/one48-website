import type { Metadata } from 'next'
import Backdrop from '@/components/Backdrop'
import RollLink from '@/components/RollLink'
import Confirm from './Confirm'

export const metadata: Metadata = {
  title: 'Confirm your subscription – Paul Schmidt',
  robots: { index: false },
}

export default async function ConfirmPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams
  return (
    <>
      <Backdrop />
      <main className="blog">
      <header className="blog-top">
        <RollLink href="/blog">Blog</RollLink>
      </header>
      <Confirm token={token ?? ''} />
      </main>
    </>
  )
}
