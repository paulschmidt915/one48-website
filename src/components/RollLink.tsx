import Link from 'next/link'

/** Text link whose label rolls over on hover. */
export default function RollLink({ href, children }: { href: string; children: string }) {
  const label = (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  )
  return href.startsWith('http') ? (
    <a className="link" href={href} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  ) : (
    <Link className="link" href={href}>
      {label}
    </Link>
  )
}
