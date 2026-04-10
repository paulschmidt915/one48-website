'use client'

import { useRouter, usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

type View = 'landing' | 'contact' | 'legal'

const VIEW_ROUTES: Record<View, string> = {
  landing: '/',
  contact: '/contact',
  legal: '/legal',
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const currentView: View =
    pathname === '/contact' ? 'contact' :
      pathname === '/legal' ? 'legal' : 'landing'

  const navigateTo = (view: View) => router.push(VIEW_ROUTES[view])

  const isTrackerLegal = pathname === '/tracker-legal'
  const isLanding = pathname === '/'

  return (
    <div className={isTrackerLegal ? 'min-h-screen bg-[#f0efed] relative z-10' : 'relative z-10'}>
      {!isTrackerLegal && <Navbar onNavigate={navigateTo} currentView={currentView} />}
      <main>{children}</main>
      {!isTrackerLegal && !isLanding && <Footer onNavigate={navigateTo} />}
    </div>
  )
}
