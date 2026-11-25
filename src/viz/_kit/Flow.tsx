'use client'

import type { ReactNode } from 'react'
import { Expand } from './Expand'

export type FlowStep = {
  title: string
  /** A key number for this step, already formatted ("54 Personen"). */
  value?: ReactNode
  /** One or two sentences, always visible. */
  text?: ReactNode
  /** Longer detail behind a "Details" button. */
  detail?: ReactNode
  /** The step the title is about. */
  highlight?: boolean
}

/**
 * A process or chain in 3–6 steps: boxes joined by arrows, left to right on wide figures, top to
 * bottom on phones. Numbered. For a sequence of stages, a value chain, how a study was run.
 *
 *   <Flow steps={[
 *     { title: 'Sitzung 1–3', text: 'Jede Gruppe schreibt mit ihrem Werkzeug.' },
 *     { title: 'Sitzung 4', text: 'Die Gruppen tauschen.', highlight: true },
 *   ]} />
 *
 * `direction="vertical"` keeps it top to bottom everywhere (for longer texts). `numbered={false}`
 * hides the step numbers.
 */
export function Flow({
  steps,
  direction = 'auto',
  numbered = true,
}: {
  steps: FlowStep[]
  direction?: 'auto' | 'vertical'
  numbered?: boolean
}) {
  return (
    <div className="vk vk-flow">
      <ol className="vk-flow-list" data-dir={direction}>
        {steps.map((s, i) => (
          <li key={i} className="vk-flow-step" data-on={s.highlight ? '' : undefined}>
            {numbered && <p className="vk-flow-num">{String(i + 1).padStart(2, '0')}</p>}
            <p className="vk-flow-title">{s.title}</p>
            {s.value !== undefined && <p className="vk-flow-value">{s.value}</p>}
            {s.text && <div className="vk-flow-text">{s.text}</div>}
            {s.detail && <Expand>{s.detail}</Expand>}
          </li>
        ))}
      </ol>
    </div>
  )
}

export type Layer = {
  title: string
  /** Short value or verdict on the right ("USA 80 %", "kritisch"). */
  aside?: ReactNode
  text?: ReactNode
  detail?: ReactNode
  highlight?: boolean
}

/**
 * A stack of layers, top to bottom: a technology stack, the levels of a supply chain, who sits on
 * whom. Each layer with a short verdict on the right.
 *
 *   <Layers layers={[
 *     { title: 'Anwendungen', aside: 'offen', text: '…' },
 *     { title: 'Chips', aside: 'USA, Taiwan', text: '…', highlight: true },
 *   ]} />
 */
export function Layers({ layers }: { layers: Layer[] }) {
  return (
    <ol className="vk vk-layers">
      {layers.map((l, i) => (
        <li key={i} className="vk-layer" data-on={l.highlight ? '' : undefined}>
          <span className="vk-layer-title">{l.title}</span>
          {l.aside !== undefined ? <span className="vk-layer-aside">{l.aside}</span> : <span />}
          {l.text && <div className="vk-layer-text">{l.text}</div>}
          {l.detail && <Expand>{l.detail}</Expand>}
        </li>
      ))}
    </ol>
  )
}
