import { ImageResponse } from 'next/og'
import { site } from '@/site'

export const alt = site.name
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const field = (color: string, style: React.CSSProperties): React.CSSProperties => ({
  position: 'absolute',
  width: 900,
  height: 900,
  borderRadius: '50%',
  background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 68%)`,
  ...style,
})

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 64,
          background: '#e9edf2',
          color: '#10131a',
          position: 'relative',
        }}
      >
        <div style={field('#bccbdf', { top: -420, left: -320 })} />
        <div style={field('#c9d0d9', { top: -180, right: -380 })} />
        <div style={field('#a9b9cf', { bottom: -520, left: 260 })} />
        <div style={{ display: 'flex', fontSize: 168, fontWeight: 600, letterSpacing: '-0.05em', lineHeight: 1 }}>{site.name}</div>
        <div style={{ display: 'flex', fontSize: 38, marginTop: 28, letterSpacing: '-0.02em', maxWidth: 760 }}>{site.phrase}</div>
      </div>
    ),
    size
  )
}
