'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import Hero from '@/apps/agency/components/Hero'
import Intro from '@/apps/agency/components/Intro'
import Boxes from '@/apps/agency/components/Boxes'
import Cta from '@/apps/agency/components/Cta'
import Footer from '@/apps/agency/components/Footer'

export default function LandingPage() {
  const router = useRouter()
  const introRef = useRef<HTMLDivElement>(null)

  // Drive --scroll-progress from real scroll position so the gradient
  // background evolves across the ENTIRE page (top → bottom), not just
  // the first viewport.
  useEffect(() => {
    const update = () => {
      const docHeight = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      )
      const progress = Math.min(1, Math.max(0, window.scrollY / docHeight))
      document.documentElement.style.setProperty('--scroll-progress', String(progress))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const goToContact = () => router.push('/contact')
  const navigateTo = (view: 'landing' | 'contact' | 'legal') => {
    const routes = { landing: '/', contact: '/contact', legal: '/legal' }
    router.push(routes[view])
  }

  const scrollToIntro = () => {
    introRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Hero onScrollDown={scrollToIntro} />
      <div ref={introRef}>
        <Intro />
      </div>
      <Boxes />
      <Cta onNavigateContact={goToContact} />
      <Footer onNavigate={navigateTo} />
    </>
  )
}
