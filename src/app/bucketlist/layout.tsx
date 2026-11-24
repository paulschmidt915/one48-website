import { Manrope } from 'next/font/google'

// The Bucketlist pages belong to the app, not to the site: they keep the typeface they were built with.
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export default function BucketlistLayout({ children }: { children: React.ReactNode }) {
  return <div className={manrope.variable}>{children}</div>
}
