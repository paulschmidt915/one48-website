// Christopher White's hurdles for music AI and how Suno deals with each. From Folge 5 (26:20–52:58
// and 74:18–76:50), based on White, "The AI Music Problem" (Routledge 2025).
// Replaces the three paragraphs on data, tokens and structure.

import { DataTable } from '@/viz/_kit'

export default function Huerden() {
  return (
    <DataTable
      columns={[
        { key: 'huerde', label: 'Hürde', width: '18%' },
        { key: 'problem', label: 'Warum Musik schwerer ist als Text' },
        { key: 'umweg', label: 'Sunos Antwort' },
        { key: 'stand', label: 'Stand', width: '14%' },
      ]}
      rows={[
        {
          huerde: '1. Daten',
          problem: 'Wenige Menschen können Noten schreiben, Notenscanner machen massenhaft Fehler, computerlesbare Notendateien sind rar. Wiederholungen halbieren den Bestand schätzungsweise noch einmal.',
          umweg: 'Lernt keine Noten, sondern rohes Audio aus dem Netz.',
          stand: 'umgangen',
          detail: 'Whites Rechnung: Alle Bücher bei Google Books zu lesen dauert über 4.500 Jahre, alle Noten der Bibliothek IMSLP durchzusehen 285 Jahre. Computerlesbare Notendateien (MIDI, MusicXML) gibt es weltweit wohl nicht mehr als 200.000.',
        },
        {
          huerde: '2. Tokens',
          problem: 'Es gibt keine kleinste sinnvolle Einheit. Ein C auf Schlag 1 in C-Dur bedeutet etwas anderes als auf Schlag 3 in F-Dur.',
          umweg: 'Neuronale Audio-Codecs schneiden das Audio in Schnipsel ohne musikalische Bedeutung.',
          stand: 'umgangen, aber ineffizient',
        },
        {
          huerde: '3. Struktur',
          problem: 'Musik lebt von Bezügen quer durchs Stück und von gebrochenen Regeln. Sie ist weder vorhersagbar noch nah beieinander.',
          umweg: 'Transformer für die Form, Diffusion für den Klang, längere Kontextfenster.',
          stand: 'ungelöst',
          detail: 'Typische Folgen: Phrasen enden zweimal, Themen kehren nicht zurück, ein Instrument aus dem ersten Refrain fehlt im zweiten. Viele KI-Songs überzeugen die ersten 30 Sekunden und verlieren dann den Zusammenhalt.',
        },
        {
          huerde: '4. Deutung',
          problem: 'Hörer suchen Erlebtes hinter einem Song. Eine KI weiß nur aus Texten, was Liebeskummer ist.',
          umweg: 'Personalisierung: eigene Stimme, eigenes Modell.',
          stand: 'keine Frage der Technik',
          highlight: true,
        },
      ]}
    />
  )
}
