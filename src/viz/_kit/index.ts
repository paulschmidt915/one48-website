// The Emergence viz kit. Import everything from here:
//
//   import { DataTable, Timeline, color, fmt } from '@/viz/_kit'
//
// Rules, API and examples: docs/emergence-blog/GUIDE.md. A demo of the parts: content/blog/emergence-demo.md
// with its figures in src/viz/emergence-demo/.

export { color, hex, seriesColor } from './tokens'
export { fmt, compact, ticks, niceMax, type FormatOptions } from './format'
export { useReveal, useSize, useReducedMotion } from './hooks'
export { useTooltip, Tooltip, TipRow, type Tip } from './Tooltip'
export { Legend, type LegendItem } from './Legend'
export { Expand, Chevron } from './Expand'
export { Stats, type StatItem } from './Stat'

// Exhibits
export { DataTable, type Column, type Row } from './DataTable'
export { BarChart, type Bar } from './BarChart'
export { DotPlot, type DotRow } from './DotPlot'
export { LineChart, type LineSeries, type Annotation } from './LineChart'
export { Timeline, type TimelineEvent } from './Timeline'
export { SmallMultiples, Sparkline, type Panel } from './SmallMultiples'
export { Flow, Layers, type FlowStep, type Layer } from './Flow'
export { Matrix, type Axis, type Quadrant, type MatrixItem } from './Matrix'
export { UnitChart, type UnitGroup } from './UnitChart'

// Not allowed in Emergence figures any more. Kept only so older figures compile until they are
// revised; scripts/check-post.mjs reports them as errors.
export { Toggle, Slider, Controls, type ToggleOption } from './Controls'
export { CountUp } from './Stat'
export { useTween, useScrollProgress } from './hooks'
export { Reveal } from './Reveal'
