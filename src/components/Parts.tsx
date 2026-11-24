import type { Part } from '@/site'

/**
 * Text with links inside it; the links are styled by `.rich a`. Links to a page of this site
 * (`#projects`) stay in the tab, where the pager moves to that page.
 */
export default function Parts({ parts }: { parts: Part[] }) {
  return parts.map((part, i) =>
    typeof part === 'string' ? (
      part
    ) : part.href.startsWith('#') ? (
      <a key={i} href={part.href}>
        {part.label}
      </a>
    ) : (
      <a key={i} href={part.href} target="_blank" rel="noopener noreferrer">
        {part.label}
      </a>
    )
  )
}
