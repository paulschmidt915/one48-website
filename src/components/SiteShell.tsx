'use client'

import { useRouter, usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

type View = 'landing' | 'contact' | 'legal' | 'private' | 'planner'

const VIEW_ROUTES: Record<View, string> = {
  landing: '/',
  contact: '/contact',
  legal: '/legal',
  private: '/privat',
  planner: '/planner',
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const currentView: View =
    pathname === '/contact' ? 'contact' :
      pathname === '/legal' ? 'legal' :
        pathname === '/privat' ? 'private' :
          pathname === '/planner' ? 'planner' : 'landing'

  const navigateTo = (view: View) => router.push(VIEW_ROUTES[view])

  const isTracker = pathname === '/tracker'

  return (
    <div className={isTracker ? 'min-h-screen bg-white relative z-10' : 'relative z-10'}>
      {!isTracker && <Navbar onNavigate={navigateTo} currentView={currentView} />}
      <main className={isTracker ? 'pb-32' : ''}>{children}</main>
      {!isTracker && <Footer onNavigate={navigateTo} />}
    </div>
  )
}
