import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'one48 – GenAI & Digitalisierungs-Beratung'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#111827',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow – blau oben rechts */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.35) 0%, transparent 70%)',
          }}
        />
        {/* Background glow – orange unten links */}
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-100px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(234,88,12,0.30) 0%, transparent 70%)',
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(234,88,12,0.15)',
            border: '1px solid rgba(234,88,12,0.4)',
            borderRadius: '999px',
            padding: '6px 18px',
            marginBottom: '36px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#EA580C',
            }}
          />
          <span style={{ color: '#EA580C', fontSize: '16px', fontWeight: 600, letterSpacing: '0.05em' }}>
            GenAI · Digitalisierung · Training
          </span>
        </div>

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '4px',
            marginBottom: '28px',
          }}
        >
          <span
            style={{
              fontSize: '96px',
              fontWeight: 700,
              color: '#F3F4F6',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            one
          </span>
          <span
            style={{
              fontSize: '96px',
              fontWeight: 700,
              color: '#EA580C',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            48
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: '28px',
            color: '#9CA3AF',
            margin: 0,
            maxWidth: '700px',
            lineHeight: 1.4,
          }}
        >
          Praxisnahe KI-Beratung & Trainings für Unternehmen –{' '}
          <span style={{ color: '#F3F4F6' }}>schnell, konkret und messbar.</span>
        </p>

        {/* URL unten rechts */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            right: '80px',
            color: '#4B5563',
            fontSize: '18px',
          }}
        >
          one48.de
        </div>
      </div>
    ),
    { ...size }
  )
}
