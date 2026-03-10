'use client'

import { useRouter } from 'next/navigation'
import ContactPage from '@/apps/agency/components/ContactPage'

export default function ContactRoute() {
  const router = useRouter()
  return <ContactPage onBack={() => router.push('/')} />
}
