'use client'

import React, { useEffect, useRef, useCallback } from 'react'

/* ─── Types ─── */
interface BlobState {
  x: number       // 0–1 (relative to viewport width)
  y: number       // 0–1 (relative to viewport height)
  radius: number  // 0–1 (relative to min viewport dimension)
  color: [number, number, number, number] // RGBA, alpha 0–1
}

interface GradientKeyframe {
  scrollPosition: number  // 0–1
  blobs: BlobState[]
}

/* ─── Keyframe states ───
 * 5 Blobs pro State. Jeder Blob ist an eine feste "Zone" verankert
 * (Index 0 = links/mitte, 1 = oben rechts, 2 = mitte unten, 3 = unten links,
 * 4 = unten rechts). Positionen drifteen nur ±0.04 zwischen States, damit
 * beim Scrollen nichts über die Bildfläche "zischt".
 * Variation passiert stattdessen über Radius (0.20 → 0.42) und Farbe.
 */
const KEYFRAMES: GradientKeyframe[] = [
  // ── State 1 — Hero (deep dark blue) ──
  {
    scrollPosition: 0.0,
    blobs: [
      { x: 0.20, y: 0.50, radius: 0.34, color: [55, 135, 200, 0.95] }, // Dominanter Blue-Glow (links/mitte)
      { x: 0.72, y: 0.22, radius: 0.24, color: [18, 50, 80, 0.85] },   // Dunkles Petrol oben rechts
      { x: 0.55, y: 0.68, radius: 0.26, color: [30, 70, 115, 0.70] },  // Mittelblau Mitte unten
      { x: 0.10, y: 0.86, radius: 0.22, color: [25, 65, 100, 0.75] },  // Soft mid blue unten links
      { x: 0.88, y: 0.78, radius: 0.25, color: [22, 55, 88, 0.65] },   // Dezenter Blau-Hauch rechts
    ],
  },
  // ── State 2 — Früher Übergang (blau → violett, Radien wachsen) ──
  {
    scrollPosition: 0.33,
    blobs: [
      { x: 0.22, y: 0.48, radius: 0.42, color: [95, 90, 200, 0.92] },  // Blue-Glow wird violett + bläht sich auf
      { x: 0.70, y: 0.24, radius: 0.32, color: [25, 125, 190, 0.88] }, // Petrol wird zu hellem Cyan, wächst
      { x: 0.53, y: 0.66, radius: 0.20, color: [55, 45, 140, 0.78] },  // Mitte unten schrumpft zu tiefem Indigo
      { x: 0.12, y: 0.82, radius: 0.28, color: [200, 115, 55, 0.82] }, // Unten links: Blau → warmes Orange
      { x: 0.86, y: 0.80, radius: 0.22, color: [150, 55, 110, 0.72] }, // Unten rechts: Blau → Magenta
    ],
  },
  // ── State 3 — Mitte/Spät (Farben fast voll, größte Radius-Spreizung) ──
  {
    scrollPosition: 0.66,
    blobs: [
      { x: 0.18, y: 0.52, radius: 0.30, color: [200, 35, 140, 0.94] }, // Pink-Magenta, kompakter
      { x: 0.74, y: 0.26, radius: 0.40, color: [18, 185, 215, 0.90] }, // Cyan jetzt dominant, riesig
      { x: 0.54, y: 0.70, radius: 0.32, color: [100, 35, 170, 0.84] }, // Violett bläht sich auf
      { x: 0.10, y: 0.82, radius: 0.24, color: [235, 150, 40, 0.88] }, // Gold kompakter Hotspot
      { x: 0.88, y: 0.78, radius: 0.28, color: [220, 70, 85, 0.84] },  // Coral/Rot wächst
    ],
  },
  // ── State 4 — Cards / CTA (full color, vibrant) ──
  {
    scrollPosition: 1.0,
    blobs: [
      { x: 0.22, y: 0.50, radius: 0.38, color: [220, 25, 105, 0.95] }, // Pink-Magenta, groß und heiß
      { x: 0.76, y: 0.24, radius: 0.30, color: [10, 195, 225, 0.92] }, // Cyan zieht sich wieder zusammen
      { x: 0.50, y: 0.68, radius: 0.26, color: [120, 25, 185, 0.82] }, // Violett kompakt
      { x: 0.10, y: 0.84, radius: 0.32, color: [250, 170, 35, 0.92] }, // Gold bläht sich auf
      { x: 0.86, y: 0.80, radius: 0.22, color: [235, 65, 80, 0.88] },  // Rot kompakter Akzent
    ],
  },
]

/* ─── Math helpers ─── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v))

function lerpBlob(a: BlobState, b: BlobState, t: number): BlobState {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    radius: lerp(a.radius, b.radius, t),
    color: [
      lerp(a.color[0], b.color[0], t),
      lerp(a.color[1], b.color[1], t),
      lerp(a.color[2], b.color[2], t),
      lerp(a.color[3], b.color[3], t),
    ],
  }
}

function interpolateKeyframes(progress: number): BlobState[] {
  const p = clamp(progress, 0, 1)
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const a = KEYFRAMES[i]
    const b = KEYFRAMES[i + 1]
    if (p >= a.scrollPosition && p <= b.scrollPosition) {
      const span = b.scrollPosition - a.scrollPosition
      const t = span === 0 ? 0 : (p - a.scrollPosition) / span
      return a.blobs.map((blob, idx) => lerpBlob(blob, b.blobs[idx], t))
    }
  }
  return KEYFRAMES[KEYFRAMES.length - 1].blobs
}

/* ─── Noise canvas (grain) ───
 * Wird einmal pro resize erzeugt und dann jeden Frame über das Gradient
 * gelegt. Bei halber Render-Auflösung sieht das Korn etwas chunky/filmisch
 * aus, was wir wollen.
 */
function generateNoiseCanvas(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const cx = c.getContext('2d')
  if (!cx) return c
  const img = cx.createImageData(w, h)
  const data = img.data
  for (let i = 0; i < data.length; i += 4) {
    const v = (Math.random() * 255) | 0
    data[i] = v
    data[i + 1] = v
    data[i + 2] = v
    data[i + 3] = 255
  }
  cx.putImageData(img, 0, 0)
  return c
}

/* ─── Component ─── */
// Overscan: Canvas ragt auf jeder Seite um diesen Anteil über den Viewport
// hinaus. Dadurch liegt die harte Canvas-Kante (und alles was der
// feDisplacementMap-Filter von "außerhalb" reinzieht) außerhalb des
// sichtbaren Bereichs → keine harten Ränder mehr. Muss groß genug sein,
// um den Displacement-Scale (440px) aufzufangen.
const OVERSCAN = 0.22

const GradientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const noiseCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const scrollProgress = useRef(0)
  const animRef = useRef<number>(0)
  const startTimeRef = useRef(0)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    // Viewport-Bereich innerhalb der Canvas. Blob-Koordinaten (0..1) mappen
    // auf diesen Bereich, nicht auf die volle (overscanned) Canvas.
    const vpW = W / (1 + 2 * OVERSCAN)
    const vpH = H / (1 + 2 * OVERSCAN)
    const insetX = OVERSCAN * vpW
    const insetY = OVERSCAN * vpH
    const time = performance.now() - startTimeRef.current

    // Read scroll progress from CSS variable (gesetzt von page.tsx)
    const target =
      parseFloat(
        document.documentElement.style.getPropertyValue('--scroll-progress')
      ) || 0
    // Easing — sorgt für sanften Übergang durch State 2
    scrollProgress.current += (target - scrollProgress.current) * 0.12
    const p = scrollProgress.current

    const blobs = interpolateKeyframes(p)

    /* 1 ── Pure black base ── */
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1.0
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, W, H)

    /* 2 ── Discrete light pools (additive, quadratic ease-out falloff) ── */
    ctx.globalCompositeOperation = 'lighter'

    // minDim bezieht sich auf den sichtbaren Viewport — nicht auf die
    // overscanned Canvas — damit die Blob-Größen optisch gleich bleiben.
    const minDim = Math.min(vpW, vpH)

    blobs.forEach((blob, i) => {
      // Sehr langsamer organischer Sinus-Drift
      const dx = Math.sin(time * 0.00018 + i * 1.7) * 0.022
      const dy = Math.cos(time * 0.00021 + i * 1.3) * 0.022
      const dr = 1.0 + Math.sin(time * 0.00014 + i * 0.9) * 0.05

      const cx = insetX + (blob.x + dx) * vpW
      const cy = insetY + (blob.y + dy) * vpH
      const radius = blob.radius * minDim * dr

      const r = blob.color[0] | 0
      const g = blob.color[1] | 0
      const b = blob.color[2] | 0
      const a = blob.color[3]

      // Äußerer Radius stark vergrößert → verlängerter Tail / längerer Path,
      // ohne den heißen Kern aufzublähen. Der Kern bleibt dort, wo er war.
      const outerRadius = radius * 1.9
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, outerRadius)
      // Stops so verteilt, dass der Kern kompakt bleibt (bis ~0.12) und sich
      // der weiche Abfall über einen wesentlich größeren Bereich erstreckt.
      grad.addColorStop(0.00, `rgba(${r},${g},${b},${a})`)
      grad.addColorStop(0.05, `rgba(${r},${g},${b},${a * 0.88})`)
      grad.addColorStop(0.12, `rgba(${r},${g},${b},${a * 0.62})`)
      grad.addColorStop(0.24, `rgba(${r},${g},${b},${a * 0.36})`)
      grad.addColorStop(0.40, `rgba(${r},${g},${b},${a * 0.18})`)
      grad.addColorStop(0.58, `rgba(${r},${g},${b},${a * 0.08})`)
      grad.addColorStop(0.78, `rgba(${r},${g},${b},${a * 0.025})`)
      grad.addColorStop(1.00, `rgba(${r},${g},${b},0)`)

      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)
    })

    /* 3 ── Vignette (verstärkt moody look an den Rändern) ──
     * Zentriert auf den sichtbaren Viewport, nicht auf die overscanned
     * Canvas, damit der dunkelste Punkt am Bildrand (nicht weit draußen)
     * liegt. */
    ctx.globalCompositeOperation = 'source-over'
    const cxV = insetX + vpW / 2
    const cyV = insetY + vpH / 2
    const vGrad = ctx.createRadialGradient(
      cxV, cyV, minDim * 0.30,
      cxV, cyV, Math.max(vpW, vpH) * 0.85
    )
    vGrad.addColorStop(0, 'rgba(0,0,0,0)')
    vGrad.addColorStop(0.55, 'rgba(0,0,0,0.18)')
    vGrad.addColorStop(1, 'rgba(0,0,0,0.55)')
    ctx.fillStyle = vGrad
    ctx.fillRect(0, 0, W, H)

    /* 4 ── Film grain (overlay blend) ──
     * Direkt ins Canvas gebackt → vermeidet mixBlendMode-Probleme der
     * SVG-Variante (ohne isolation: isolate blendet die mit dem Body)
     */
    const noise = noiseCanvasRef.current
    if (noise) {
      ctx.imageSmoothingEnabled = false
      ctx.globalCompositeOperation = 'overlay'
      ctx.globalAlpha = 0.12
      ctx.drawImage(noise, 0, 0, W, H)
      ctx.globalAlpha = 1.0
      ctx.globalCompositeOperation = 'source-over'
      ctx.imageSmoothingEnabled = true
    }

    animRef.current = requestAnimationFrame(draw)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const vpW = window.innerWidth
      const vpH = window.innerHeight
      // Canvas ist (1 + 2*OVERSCAN)× so breit/hoch wie der Viewport,
      // und wird per negativem left/top nach außen versetzt. Das Eltern-
      // Element ist fixed inset-0 mit overflow-hidden → alles, was über
      // den Viewport ragt, wird sauber geclippt.
      const cssW = vpW * (1 + 2 * OVERSCAN)
      const cssH = vpH * (1 + 2 * OVERSCAN)
      canvas.width = Math.max(1, Math.floor(cssW * dpr))
      canvas.height = Math.max(1, Math.floor(cssH * dpr))
      canvas.style.width = `${cssW}px`
      canvas.style.height = `${cssH}px`
      canvas.style.left = `${-vpW * OVERSCAN}px`
      canvas.style.top = `${-vpH * OVERSCAN}px`
      // Noise bei halber Auflösung erzeugen → leicht chunkier, filmischer Look
      const nW = Math.max(1, Math.ceil(canvas.width / 2))
      const nH = Math.max(1, Math.ceil(canvas.height / 2))
      noiseCanvasRef.current = generateNoiseCanvas(nW, nH)
    }

    resize()
    startTimeRef.current = performance.now()
    window.addEventListener('resize', resize)
    animRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [draw])

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{ backgroundColor: '#000000', isolation: 'isolate' }}
    >
      {/* SVG-Filter: verzerrt das gesamte Canvas durch ein Turbulenz-Feld
          → aus den kreisförmigen Blobs werden organische Lobes / Mesh-Flächen.
          GPU-beschleunigt; läuft nur als Compositing-Pass auf dem Canvas. */}
      <svg
        width="0"
        height="0"
        className="absolute"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {/* Großwellige Verzerrung — formt die Blobs in unregelmäßige,
              langgestreckte Flächen. Der erweiterte Filter-Bereich (-30% / 160%)
              verhindert, dass die jetzt deutlich längeren Paths am Canvas-Rand
              abgeschnitten werden. */}
          <filter
            id="mesh-warp"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.0028 0.0034"
              numOctaves="3"
              seed="11"
              result="warp"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="warp"
              scale="440"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <canvas
        ref={canvasRef}
        className="absolute"
        style={{
          // width/height/left/top werden in resize() dynamisch gesetzt
          // (Canvas ragt über den Viewport hinaus, damit die harte Kante
          // außerhalb des sichtbaren Bereichs liegt).
          willChange: 'transform',
          filter: 'url(#mesh-warp)',
        }}
      />
    </div>
  )
}

export default GradientBackground
