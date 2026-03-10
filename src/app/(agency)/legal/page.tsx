'use client'

import { useRouter } from 'next/navigation'
import LegalPage from '@/apps/agency/components/LegalPage'

export default function LegalRoute() {
  const router = useRouter()
  return <LegalPage onBack={() => router.push('/')} />
}
