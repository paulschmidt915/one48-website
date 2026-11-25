// What OpenAI has done and what researchers demand, with where each measure applies
// (Folge 6, 55:17–63:25).

import { DataTable } from '@/viz/_kit'

export default function Massnahmen() {
  return (
    <DataTable
      columns={[
        { key: 'was', label: 'Maßnahme', width: '30%' },
        { key: 'wer', label: 'Von' },
        { key: 'grenze', label: 'Reichweite' },
      ]}
      rows={[
        { was: 'GPT-4o-Update zurückgerollt', wer: 'OpenAI', grenze: 'Ein Modell, nicht die Trainingsmethode' },
        {
          was: 'GPT-5 mit rund 170 Fachleuten für psychische Gesundheit überarbeitet',
          wer: 'OpenAI',
          grenze: 'Psychosen, Suizid, Selbstverletzung, emotionale Abhängigkeit',
        },
        {
          was: 'Kindersicherung und Alterserkennung',
          wer: 'OpenAI',
          grenze: 'Nur Minderjährige',
          detail: 'Eltern können Ruhezeiten setzen und Sprachmodus oder Memory abschalten. Erkennt das Modell einen Minderjährigen, gelten strengere Regeln bei Drogen, Körperbild, Suizid und Selbstverletzung.',
        },
        { was: 'Vertrauensperson wird bei heiklen Gesprächen benachrichtigt', wer: 'OpenAI', grenze: 'Nur wer eine hinterlegt; ohne Gesprächsinhalt' },
        { was: 'Medienkompetenz und Warnhinweise', wer: 'Nutzer', grenze: 'Schmeichelei wirkt laut Stanford auch bei informierten Nutzern' },
        {
          was: 'KI gibt sich als Maschine zu erkennen, keine Gefühlssprache',
          wer: 'Thomas Fuchs, Ziv Ben-Zion',
          grenze: 'Immer wieder, vor allem in emotionalen Momenten',
        },
        { was: 'Modelle für Ehrlichkeit statt Zufriedenheit belohnen', wer: 'Forderung der Folge', grenze: 'Setzt an der Ursache an', highlight: true },
      ]}
    />
  )
}
