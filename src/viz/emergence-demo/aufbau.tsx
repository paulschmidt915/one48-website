// How the MIT study was run, in four steps. Replaces the method paragraph.

import { Flow } from '@/viz/_kit'

export default function Aufbau() {
  return (
    <Flow
      steps={[
        { title: 'Drei Gruppen', value: '54', text: 'Studierende aus Boston, zufällig verteilt: nur Gehirn, Suchmaschine, ChatGPT.' },
        { title: 'Sitzung 1 bis 3', value: '20 Min.', text: 'Einmal im Monat ein Essay, jede Gruppe mit ihrem Werkzeug.' },
        { title: 'Messung', value: '32', text: 'Elektroden (EEG) zeichnen die Hirnaktivität beim Schreiben auf.' },
        {
          title: 'Sitzung 4: Tausch',
          text: 'Die ChatGPT-Gruppe schreibt ohne Hilfe, die Gehirn-Gruppe zum ersten Mal mit ChatGPT.',
          detail:
            'Wer zuerst selbst gedacht hatte, profitierte danach von der KI. Wer drei Sitzungen nur mit KI gearbeitet hatte, kam ohne sie kaum zurecht.',
          highlight: true,
        },
      ]}
    />
  )
}
