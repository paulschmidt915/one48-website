'use client'

import { useRouter } from 'next/navigation'
import One48Planner from '@/components/One48Planner'

export default function PlannerRoute() {
  const router = useRouter()
  return <One48Planner onBack={() => router.push('/privat')} />
}
