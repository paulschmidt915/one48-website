// The three levers of the episode (Folge 4, 31:00–41:02): what to do, with which tools (in the detail), and the
// example Paul gives, plus the key number for levers 2 and 3 (37:52; 39:54–40:16). Replaces three
// paragraphs of how-to.

import { DataTable } from '@/viz/_kit'

export default function Hebel() {
  return (
    <DataTable
      columns={[
        { key: 'hebel', label: 'Hebel', width: '20%' },
        { key: 'was', label: 'Was du tust' },
        { key: 'beispiel', label: 'Beispiel' },
        { key: 'zahl', label: 'Kennzahl', width: '16%' },
      ]}
      rows={[
        {
          hebel: '1 · KI coden lassen',
          was: 'Das Problem im Editor beschreiben; die KI schreibt ein kleines Tool, das es löst',
          beispiel: '100 PDFs einer Abschlussarbeit einheitlich umbenennen, statt hundertmal zu klicken',
          zahl: 'eine neue Fähigkeit statt mehr Tempo',
          highlight: true,
          detail:
            'Werkzeuge: Visual Studio Code, Cursor oder GitHub Copilot, dazu ChatGPT, Claude oder Gemini. Der größte Hebel, weil er eine neue Fähigkeit freischaltet: Die KI erledigt nicht die Aufgabe, sie baut das Werkzeug dafür. Von dort reicht der Weg bis zur eigenen Website oder App. Das Stichwort heißt Vibe-Coding; ihm widmet Paul eine der nächsten Folgen.',
        },
        {
          hebel: '2 · Sprechen statt tippen',
          was: 'Längere Eingaben an die KI diktieren statt tippen',
          beispiel: 'Lose Gedanken frei einsprechen; die KI macht daraus Text',
          zahl: 'rund 150 statt 40 Wörter pro Minute',
          detail: 'Werkzeuge: Wispr Flow, Superwhisper oder das Mikrofon in ChatGPT und Claude. Die eingebauten Diktierfunktionen der Smartphones scheitern an Eigennamen, schnellem Sprechen und langen Texten. KI-Transkription nicht.',
        },
        {
          hebel: '3 · Kontext statt Prompt',
          was: 'Der KI alles geben, was ein kluger Kollege bräuchte, um zu helfen',
          beispiel: 'Bewerbung: Lebenslauf, Stellenausschreibung, Website der Firma und frühere Anschreiben mitgeben',
          zahl: 'rund 150.000 statt 3.000 Wörter auf einmal',
          detail: 'Am besten im Editor, wo die KI alle Dateien lesen kann. Statt um Prompt Engineering, die perfekte Frage, geht es um Context Engineering: das richtige Material.',
        },
      ]}
    />
  )
}
