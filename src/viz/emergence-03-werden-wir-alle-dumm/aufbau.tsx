// How the MIT study was run (Kosmyna et al. 2025; Folge 3, 04:37–07:51). Replaces the method paragraph.
// Numbers: 54 participants, 20-minute essays, one per month over four months, 32 EEG electrodes,
// 18 participants in session 4 (study notes A, section 3).

import { Flow } from '@/viz/_kit'

export default function Aufbau() {
  return (
    <Flow
      steps={[
        {
          title: 'Drei Gruppen',
          value: '54 Studierende',
          text: 'Aus Hochschulen im Raum Boston, zufällig verteilt: nur der eigene Kopf, Suchmaschine oder ChatGPT.',
        },
        {
          title: 'Sitzung 1 bis 3',
          value: '20 Minuten',
          text: 'Je ein Essay, einmal im Monat. Jede Gruppe schreibt mit ihrem Werkzeug.',
        },
        {
          title: 'Messung',
          value: '32 Elektroden',
          text: 'Ein EEG zeichnet die Hirnaktivität beim Schreiben auf, danach ein Interview zum eigenen Text.',
        },
        {
          title: 'Sitzung 4: Tausch',
          value: '18 Teilnehmende',
          text: 'Die ChatGPT-Gruppe schreibt ohne Hilfe, die Kopf-Gruppe zum ersten Mal mit ChatGPT.',
          detail:
            'Wer zuerst selbst gedacht hatte und dann ChatGPT bekam, zeigte die höchste Vernetzung aller Gruppen. Die Suchmaschinen-Gruppe nahm am Tausch nicht teil.',
          highlight: true,
        },
      ]}
    />
  )
}
