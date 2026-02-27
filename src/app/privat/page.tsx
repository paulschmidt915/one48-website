'use client'

import { useRouter } from 'next/navigation'
import PrivateArea from '@/components/PrivateArea'

type View = 'landing' | 'contact' | 'legal' | 'private' | 'planner'

const VIEW_ROUTES: Record<View, string> = {
  landing: '/',
  contact: '/contact',
  legal: '/legal',
  private: '/privat',
  planner: '/planner',
}

export default function PrivatRoute() {
  const router = useRouter()
  const navigateTo = (view: View) => router.push(VIEW_ROUTES[view])
  return <PrivateArea onNavigate={navigateTo} />
}
