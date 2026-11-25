// From Mozart's dice game to Suno: how machines learned to make music. Dates and numbers from
// Folge 5 (16:40–24:46, 11:18–13:23), checked against the script and Christopher White's book
// "The AI Music Problem" (2025). Replaces the history paragraph and the Suno company paragraph.

import { Timeline } from '@/viz/_kit'

export default function Chronik() {
  return (
    <Timeline
      events={[
        {
          date: '1700',
          when: '18. Jahrhundert',
          title: 'Mozarts musikalisches Würfelspiel',
          text: 'Würfel wählen vorkomponierte Takte aus. Der Zufall setzt zusammen, die Musik hat ein Mensch geschrieben.',
        },
        {
          date: '1992',
          title: 'Regeln: Bach in 55 Sätzen',
          text: 'H. J. Maxwell schreibt 55 Regeln auf, nach denen Bach komponiert. Das Ergebnis klingt korrekt, aber steril.',
        },
        {
          date: '1996',
          title: 'Statistik: das Markov-Modell',
          text: 'David Cope lässt 33.978 Bach-Akkorde auszählen: 27.889 Verbindungen, über 5.000 neue Stücke. Das Modell kennt aber nur den letzten Akkord.',
          detail: 'Danach folgen neuronale Netze, die eigene Kategorien bilden (etwa Dur und Moll), und tiefe Netze mit bis zu rund 90 Schichten, die sich am Original Schritt für Schritt verbessern.',
        },
        {
          date: '2017',
          title: 'Der Transformer',
          text: 'Das Google-Paper „Attention Is All You Need“: Ein Modell schaut auf das ganze Stück zugleich und gewichtet, was gerade wichtig ist.',
        },
        {
          date: '2021',
          title: 'Suno wird gegründet',
          text: 'Ein Start-up in Cambridge, Massachusetts: ein paar Worte rein, ein fertiger Song mit Gesang und Produktion raus.',
          detail: 'Suno kombiniert einen Transformer für die Struktur mit einem Diffusionsmodell für den Klang, das aus Rauschen schrittweise Musik macht.',
        },
        {
          date: '2025-11',
          title: 'Bewertung: 2,45 Mrd. Dollar',
          text: 'Finanzierungsrunde (Serie C). Für die nächste Runde ist von über 5 Mrd. Dollar die Rede.',
        },
        {
          date: '2026-03',
          title: 'Suno v5.5',
          text: 'Eigene Stimme hochladen, eigene Modelle trainieren, „My Taste“ lernt den Geschmack des Nutzers.',
          highlight: true,
        },
      ]}
    />
  )
}
