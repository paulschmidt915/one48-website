import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import SiteShell from '@/components/SiteShell'
import { Analytics } from "@vercel/analytics/next"

export const viewport: Viewport = {
  viewportFit: 'cover',
}

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'one48 – GenAI & Digitalisierungs-Beratung',
  description: 'Praxisnahe GenAI-Beratung und Trainings für Unternehmen. Gemeinsam entwickeln wir Ihre KI-Strategie – schnell, konkret und messbar.',
  metadataBase: new URL('https://www.one48.de'),
  alternates: {
    canonical: 'https://www.one48.de',
  },
  openGraph: {
    title: 'one48 – GenAI & Digitalisierungs-Beratung',
    description: 'Praxisnahe GenAI-Beratung und Trainings für Unternehmen. Gemeinsam entwickeln wir Ihre KI-Strategie – schnell, konkret und messbar.',
    url: 'https://www.one48.de',
    siteName: 'one48',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'one48 – GenAI & Digitalisierungs-Beratung',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'one48 – GenAI & Digitalisierungs-Beratung',
    description: 'Praxisnahe GenAI-Beratung und Trainings für Unternehmen. Gemeinsam entwickeln wir Ihre KI-Strategie – schnell, konkret und messbar.',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <div className="relative min-h-screen overflow-x-hidden selection:bg-primary/20 selection:text-primary">
          {/* Background Orbs */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary opacity-10 dark:opacity-20 rounded-full blur-orb-1"></div>
            <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-primary opacity-10 dark:opacity-15 rounded-full blur-orb-2"></div>
          </div>
          <SiteShell>{children}</SiteShell>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
