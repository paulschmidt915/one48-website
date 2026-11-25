// Colours of the Emergence figures. Use these (CSS variables, defined in kit.css) instead of raw hex,
// so all posts look like one series. Light theme only: the site has no dark mode.
//
// The look is a business exhibit (FT, Economist, consulting reports): one accent plus greys.
// - The one thing the takeaway is about: `accent`. Everything else: `base` (a mid grey that still reads
//   as data) or `rest` (a light grey for background marks such as the unfilled part of a whole).
// - Before/after, then/now, forecast/actual: the earlier or reference value in `base`, the one that
//   matters in `accent`.
// - Only for real categories that must be told apart (three countries, four companies): `series[0…3]`
//   in this fixed order, never shuffled. Colour follows the entity, not its rank.
// - Two opposite sides (positive/negative change, USA vs. China): `pos` (blue) and `neg` (red).
// - Text is never coloured like the data. Labels and values use `ink`, `ink2` or `muted`.

export const color = {
  /** Main text and values */
  ink: 'var(--viz-ink)',
  /** Secondary text */
  ink2: 'var(--viz-ink-2)',
  /** Axis labels, notes */
  muted: 'var(--viz-muted)',
  /** Hairline grid */
  grid: 'var(--viz-grid)',
  /** Hairline separators between rows */
  line: 'var(--viz-line)',
  /** Baseline / axis line */
  axis: 'var(--viz-axis)',
  /** Background of the figure frame (for 2px gaps and rings around marks) */
  surface: 'var(--viz-surface-solid)',
  /** The highlighted mark: what the title is about */
  accent: 'var(--viz-1)',
  /** Comparison marks: the other values, the earlier value, the reference */
  base: 'var(--viz-base)',
  /** Background marks: the unfilled part, inactive dots */
  rest: 'var(--viz-rest)',
  /** A light wash of the accent, e.g. area under a line, a highlighted band */
  accentWash: 'var(--viz-1-wash)',
  /** Real categories only, in fixed order: blue, orange, aqua, yellow, magenta, green, violet, red */
  series: ['var(--viz-1)', 'var(--viz-2)', 'var(--viz-3)', 'var(--viz-4)', 'var(--viz-5)', 'var(--viz-6)', 'var(--viz-7)', 'var(--viz-8)'],
  /** Diverging poles */
  pos: 'var(--viz-1)',
  neg: 'var(--viz-8)',
} as const

/** The raw values (validated: colour-blind safe in this order on the figure surface #f4f6f9). */
export const hex = {
  series: ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#6250d6', '#e34948'],
  base: '#808999',
  rest: '#c3cad4',
  ink: '#10131a',
  ink2: '#454b57',
  muted: '#646a77',
} as const

/** The colour of series number i (0-based). */
export const seriesColor = (i: number) => color.series[Math.min(i, color.series.length - 1)]
