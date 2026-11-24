import type { Part } from '@/site'

/** Text with links inside it; the links are styled by `.rich a`. */
export default function Parts({ parts }: { parts: Part[] }) {
  return parts.map((part, i) =>
    typeof part === 'string' ? (
      part
    ) : (
      <a key={i} href={part.href} target="_blank" rel="noopener noreferrer">
        {part.label}
      </a>
    )
  )
}
