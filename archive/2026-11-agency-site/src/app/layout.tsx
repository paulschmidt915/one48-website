import type { Metadata, Viewport } from 'next'
import { Manrope, Playfair_Display } from 'next/font/google'
import './globals.css'
import SiteShell from '@/apps/agency/components/SiteShell'
import GradientBackground from '@/apps/agency/components/GradientBackground'
import SmoothScroll from '@/apps/agency/components/SmoothScroll'
import { Analytics } from "@vercel/analytics/next"

export const viewport: Viewport = {
  viewportFit: 'cover',
}

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
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
    <html lang="de" className={`dark ${manrope.variable} ${playfairDisplay.variable}`}>
      <body>
        <SmoothScroll />
        <div className="relative min-h-screen overflow-x-hidden selection:bg-primary/20 selection:text-primary">
          {/* Animated Gradient Background — Canvas-based with scroll reactivity */}
          <GradientBackground />
          <SiteShell>{children}</SiteShell>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
