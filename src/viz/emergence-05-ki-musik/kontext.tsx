// The episode's cases (Folge 5, 77:45–91:43), classified by who makes the music and where its meaning
// comes from. Listed inside their quadrant, not placed by position. Replaces the paragraph that went
// through Xania Monet, K-Pop, Running Up That Hill and the AI persona.

import { Matrix } from '@/viz/_kit'

export default function Kontext() {
  return (
    <Matrix
      x={{ label: 'Wer macht die Musik', low: 'Mensch', high: 'KI' }}
      y={{ label: 'Woher kommt die Bedeutung', low: 'aus dem Leben der Künstler', high: 'von außen oder erfunden' }}
      quadrants={[
        {
          title: 'Bedeutung aus der Fiktion',
          text: 'Ein menschlicher Song, aufgeladen von einer Serie.',
          items: ['„Running Up That Hill“ (Kate Bush, 1985): 2022 durch „Stranger Things“ auf Platz 1 der UK-Charts'],
        },
        {
          title: 'Kein Mensch mehr nötig',
          text: 'Musik von der Maschine, Bedeutung von anderswo.',
          items: ['Timmy-Balladen: der Wal als Anlass, kein Künstler', 'KI-Persona mit erfundener Biografie', 'Suno „My Taste“: die Bedeutung ist der Hörer selbst'],
          highlight: true,
        },
        {
          title: 'Der klassische Fall',
          text: 'Handwerk und Bedeutung aus einem Leben.',
          items: ['Eric Clapton, „Tears in Heaven“', 'Herbert Grönemeyer, „Mensch“'],
        },
        {
          title: 'Geteilte Arbeit',
          text: 'Die Musik macht die KI, das Leben bringt der Mensch.',
          items: ['Xania Monet: eigene Texte, KI-Musik, Plattenvertrag in Millionenhöhe', 'K-Pop: KI-Tracks, echte Performer'],
        },
      ]}
    />
  )
}
