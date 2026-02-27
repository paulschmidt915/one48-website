'use client'

import { useRouter } from 'next/navigation'
import Hero from '@/components/Hero'
import ProofSnippets from '@/components/ProofSnippets'
import Process from '@/components/Process'
import Services from '@/components/Services'
import AboutMe from '@/components/AboutMe'
import FAQ from '@/components/FAQ'
import Cta from '@/components/Cta'

export default function LandingPage() {
  const router = useRouter()
  const goToContact = () => router.push('/contact')

  return (
    <>
      <Hero onNavigateContact={goToContact} />
      <ProofSnippets />
      <Process />
      <Services />
      <AboutMe onNavigateContact={goToContact} />
      <FAQ />
      <Cta onNavigateContact={goToContact} />
    </>
  )
}
