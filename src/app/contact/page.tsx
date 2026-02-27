'use client'

import { useRouter } from 'next/navigation'
import ContactPage from '@/components/ContactPage'

export default function ContactRoute() {
  const router = useRouter()
  return <ContactPage onBack={() => router.push('/')} />
}
