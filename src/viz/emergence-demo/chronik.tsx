// From one-to-one tutoring to the MIT study: the research the episode builds on.

import { Timeline } from '@/viz/_kit'

export default function Chronik() {
  return (
    <Timeline

      events={[
        { date: '1984', title: 'Bloom: Einzelbetreuung schlägt jeden Unterricht', text: 'Schüler mit einer Lehrkraft für sich allein lernen weit mehr als in der Klasse. Bezahlbar war das nie.' },
        { date: '1998', title: 'Clark: der erweiterte Geist', text: 'Ein Notizbuch kann Teil des Denkens sein, wenn man ihm bewusst vertraut und jederzeit darauf zugreift.' },
        { date: '2011', title: 'Der Google-Effekt', text: 'Was online verfügbar bleibt, merken wir uns schlechter. Dafür merken wir uns, wo es steht.' },
        { date: '2022-11', title: 'ChatGPT erscheint', text: '100 Millionen Nutzer in zwei Monaten.' },
        {
          date: '2025-06',
          title: 'Die MIT-Studie',
          text: 'Weniger Hirnaktivität beim Schreiben mit ChatGPT. Ein Preprint, noch nicht begutachtet.',
          highlight: true,
          detail: 'Kritik: kleine Stichprobe von Elite-Studierenden, nur eine Fähigkeit (Essays) getestet, keine unabhängige Begutachtung. Mehr Hinweis als Beweis.',
        },
      ]}
    />
  )
}
