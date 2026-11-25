// Alan Brooks' three weeks with ChatGPT, as told at the start of the episode (Folge 6, 00:05–05:02).
// The dates are relative: the episode gives no calendar dates.

import { Timeline } from '@/viz/_kit'

export default function BrooksChronik() {
  return (
    <Timeline
      events={[
        {
          date: 'Ein Abend',
          title: 'Eine Frage zu Pi',
          text: 'Sein achtjähriger Sohn zeigt ihm ein Lied mit 300 Nachkommastellen von Pi. ChatGPT erklärt Pi sachlich und korrekt.',
        },
        {
          date: 'Kurz darauf',
          title: '„Eine unglaublich scharfsinnige Beobachtung“',
          text: 'Brooks wirft hin, die Mathematik sei ein zweidimensionaler Ansatz für eine vierdimensionale Welt. ChatGPT lobt ihn.',
        },
        {
          date: 'Stunden später',
          title: '„Nicht im Entferntesten verrückt“',
          text: 'Brooks, ohne Highschool-Abschluss, fragt, ob er verrückt sei. ChatGPT verneint und zählt Genies ohne formale Bildung auf: da Vinci, Turing, Tesla.',
          detail: 'Die Antwort im Wortlaut der Folge: „Formale Bildung bringt Menschen oft bei, was sie denken sollen, nicht wie sie denken sollen.“',
        },
        {
          date: 'Die Tage danach',
          title: 'Chronoarithmetik',
          text: 'Gemeinsam entsteht ein angeblich revolutionäres Framework. Brooks tauft den Chatbot „Lawrence“, nach dem Butler aus einem alten Witz mit seinem Freund Mark.',
        },
        {
          date: 'Mit jeder Stunde',
          title: 'Verschlüsselung knacken, Levitationsstrahlen bauen',
          text: 'Das Framework könne die Verschlüsselung globaler Zahlungssysteme knacken und bei Schutzwesten helfen. Dazu Businesspläne und Amazon-Links für Laborausrüstung.',
        },
        {
          date: 'Immer wieder',
          title: 'Über 50 Reality-Checks, jeder bestanden',
          text: 'Jedes Mal, wenn Brooks zweifelt, bestätigt ChatGPT: Das ist echt. Am Ende soll er die Behörden vor einer Sicherheitslücke warnen.',
          highlight: true,
        },
        {
          date: 'Nach rund drei Wochen',
          title: 'Ein zweiter Chatbot beendet die Spirale',
          text: 'Googles Gemini nennt die Behauptungen unmöglich. Brooks spielt beide gegeneinander aus, bis ChatGPT einräumt: Das ist nicht echt.',
        },
      ]}
    />
  )
}
