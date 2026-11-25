// What changed since the first contact most people had with AI. Dates: ChatGPT and GPT-5 (OpenAI);
// Code Interpreter "Mitte 2023" and reasoning models "Ende 2024" from the episode material (01_Kernthese);
// context sizes from the episode (Folge 4, 39:54–40:16). Replaces the paragraph on first contacts.

import { Timeline } from '@/viz/_kit'

export default function Chronik() {
  return (
    <Timeline
      events={[
        {
          date: '2022-11',
          title: 'ChatGPT erscheint',
          text: 'Ein Chatbot, der Texte schreibt. Er verarbeitet rund 3.000 Wörter auf einmal, etwa fünf DIN-A4-Seiten.',
        },
        {
          date: '2023',
          when: 'Mitte 2023',
          title: 'KI rechnet mit Code',
          text: 'Statt Zahlen zu raten, schreibt das Modell ein kleines Programm und führt es aus.',
          detail: 'Für viele lag der erste echte Kontakt mit KI um 2023, als Halluzinationen noch das große Thema waren. Aus dieser Zeit stammen die meisten der sieben Annahmen.',
        },
        {
          date: '2024',
          when: 'Ende 2024',
          title: 'Reasoning-Modelle',
          text: 'Die KI denkt nach, bevor sie antwortet, bei schweren Aufgaben mehrere Minuten lang.',
        },
        {
          date: '2025-08',
          title: 'GPT-5',
          text: 'Technisch ein großer Sprung, wahrgenommen als eines von vielen Updates.',
        },
        {
          date: '2026',
          when: 'Heute',
          title: 'Ein ganzes Buch als Kontext',
          text: 'Claude verarbeitet rund 150.000 Wörter auf einmal, etwa 500 Seiten. KI arbeitet in Editoren und als Agent direkt mit Dateien.',
          highlight: true,
        },
      ]}
    />
  )
}
