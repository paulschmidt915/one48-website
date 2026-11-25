// Numbers the German way: 1.234,5 · 83 % · 1,2 Mio.

export type FormatOptions = {
  /** Digits after the comma (default: as needed, at most 1) */
  decimals?: number
  /** Text after the number, e.g. ' %' or ' Mrd. $' (add the space yourself) */
  unit?: string
  /** Text before the number, e.g. '$' or '+' */
  prefix?: string
  /** Show + for positive numbers */
  sign?: boolean
  /** 'de-DE' (default) or 'en-GB' */
  locale?: string
}

/** fmt(1234.5) → "1.234,5", fmt(83, { unit: ' %' }) → "83 %", fmt(-3, { sign: true }) → "−3" */
export function fmt(n: number, o: FormatOptions = {}): string {
  const s = n.toLocaleString(o.locale ?? 'de-DE', {
    minimumFractionDigits: o.decimals ?? 0,
    maximumFractionDigits: o.decimals ?? 1,
  })
  const signed = n < 0 ? s.replace('-', '−') : o.sign && n > 0 ? `+${s}` : s
  return `${o.prefix ?? ''}${signed}${o.unit ?? ''}`
}

/** compact(1_200_000) → "1,2 Mio.", compact(3_400_000_000) → "3,4 Mrd.", compact(12_500) → "12.500" */
export function compact(n: number, o: Omit<FormatOptions, 'decimals'> = {}): string {
  const a = Math.abs(n)
  if (a >= 1e12) return fmt(n / 1e12, { ...o, unit: ` Bio.${o.unit ?? ''}` })
  if (a >= 1e9) return fmt(n / 1e9, { ...o, unit: ` Mrd.${o.unit ?? ''}` })
  if (a >= 1e6) return fmt(n / 1e6, { ...o, unit: ` Mio.${o.unit ?? ''}` })
  return fmt(n, { ...o, decimals: 0 })
}

/** Clean axis ticks between 0 (or min) and max: about `count` round steps. */
export function ticks(min: number, max: number, count = 4): number[] {
  if (max === min) return [min]
  const raw = (max - min) / count
  const mag = 10 ** Math.floor(Math.log10(raw))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw
  const out: number[] = []
  for (let v = Math.ceil(min / step) * step; v <= max + step * 1e-9; v += step) out.push(Number(v.toFixed(10)))
  return out
}

/** A rounded "nice" maximum for an axis: niceMax(87) → 100, niceMax(4.2) → 5 */
export function niceMax(max: number): number {
  const t = ticks(0, max, 4)
  const last = t[t.length - 1]
  return last >= max ? last : last + (t[1] - t[0])
}
