import type { Metadata, Viewport } from 'next'
import { Funnel_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { site } from '@/site'
import './globals.css'

const font = Funnel_Display({ subsets: ['latin'], variable: '--font-site', display: 'swap' })

const title = `${site.name} – ${site.phrase.replace(/\.$/, '')}`
const description = `${site.phrase} ${site.aboutText}`

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: '#e9edf2',
}

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(site.url),
  alternates: { canonical: site.url },
  openGraph: { title, description, url: site.url, siteName: 'one48', locale: 'en_US', type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
