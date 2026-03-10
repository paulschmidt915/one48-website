'use client'

import { useRouter } from 'next/navigation'
import Hero from '@/apps/agency/components/Hero'
import ProofSnippets from '@/apps/agency/components/ProofSnippets'
import Process from '@/apps/agency/components/Process'
import Services from '@/apps/agency/components/Services'
import AboutMe from '@/apps/agency/components/AboutMe'
import FAQ from '@/apps/agency/components/FAQ'
import Cta from '@/apps/agency/components/Cta'

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
