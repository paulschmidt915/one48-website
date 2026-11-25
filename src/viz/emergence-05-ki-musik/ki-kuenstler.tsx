// The AI artists the episode names, with their reach. Numbers as stated in Folge 5 (09:07–10:33),
// cross-checked with the episode script. Replaces the paragraph listing the three artists.

import { DataTable } from '@/viz/_kit'

export default function KiKuenstler() {
  return (
    <DataTable
      columns={[
        { key: 'name', label: 'KI-Künstler', width: '24%' },
        { key: 'hoerer', label: 'Monatliche Hörer (Mio.)', format: { decimals: 1 }, bar: true },
        { key: 'hit', label: 'Größter Song (Mio. Streams)', format: { decimals: 0 } },
        { key: 'erfolg', label: 'Erfolg' },
      ]}
      rows={[
        {
          name: 'Breaking Rust',
          hoerer: 1.1,
          hit: 26,
          erfolg: 'Platz 1 der Billboard Country Digital Song Sales',
          highlight: true,
        },
        {
          name: 'IngaRose',
          hoerer: 1.9,
          hit: 7,
          erfolg: 'Platz 1 der Spotify Viral 100 und bei iTunes (global und USA)',
          detail: 'Ihr größter Song „Celebrate Me“ lief vor allem als Tonspur unter Videos auf TikTok und Instagram.',
        },
        {
          name: 'Blow Records',
          hoerer: 1.0,
          hit: 64,
          erfolg: 'Die höchsten Streaming-Einnahmen eines KI-Künstlers',
          detail: 'Der größte Track beruht auf einem bestehenden Lied, ist aber KI-generiert. Viele Hörer wissen das nicht.',
        },
      ]}
    />
  )
}
