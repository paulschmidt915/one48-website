// The days around the announcement (Folge 1, 21:38–24:08). Replaces the chronological paragraph.

import { Timeline } from '@/viz/_kit'

export default function Woche() {
  return (
    <Timeline
      layout="horizontal"
      events={[
        {
          date: '2026-04',
          when: 'Vor dem 7. April 2026',
          title: 'Washington wird vorab informiert',
          text: 'Vizepräsident J. D. Vance und Finanzminister Scott Bessent sprechen mit den Tech-Chefs, darunter Dario Amodei, Elon Musk, Sundar Pichai, Sam Altman und Satya Nadella.',
        },
        {
          date: '2026-04-07',
          title: 'Ankündigung ohne Veröffentlichung',
          text: 'Anthropic stellt Claude Mythos vor, gibt es aber nicht frei. Stattdessen startet Project Glasswing.',
        },
        {
          date: '2026-04-08',
          title: 'Notfalltreffen mit den Bankchefs',
          text: 'Bessent und Fed-Chef Jerome Powell bestellen die Chefs der größten US-Banken ein. Ihre Frage: Ist das Finanzsystem sicher?',
          highlight: true,
          detail: 'Warum zuerst die Banken: Geld ist am Ende eine Zahl in einer Datenbank. Wer sie löschen kann, löscht das Geld, und alle anderen Branchen hängen am Finanzsystem.',
        },
      ]}
    />
  )
}
