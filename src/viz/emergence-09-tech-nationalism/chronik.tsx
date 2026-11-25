// The days of the Fable 5 ban, from the launch to Anthropic's blog post (Folge 9, 02:27–10:16;
// reconstructed in the episode from Semafor, Politico and David Sacks' post on X).
// Times are American time, as in the episode. When Amodei came to the phone differs between
// transcript (after 14:00) and storyline (after 13:00), so it is given as "nach Mittag".

import { Timeline } from '@/viz/_kit'

export default function Chronik() {
  return (
    <Timeline
      events={[
        {
          date: '2026-06',
          when: 'Mittwoch',
          title: 'Anthropic bringt Fable 5',
          text: 'Laut David Sacks, dem KI-Beauftragten des Weißen Hauses, ein Mythos ohne die gefährlichsten Fähigkeiten. Gedacht als Claude-Modell für die breite Masse.',
        },
        {
          date: '2026-06',
          when: 'Donnerstag',
          title: 'Amazon meldet eine Lücke',
          text: 'Ein Sicherheitspapier von Amazon soll zeigen, dass sich auch Fable 5 jailbreaken lässt. Amazon-Chef Andy Jassy spricht direkt mit dem Weißen Haus, die NSA hält die Befunde für Beweis genug.',
          detail:
            'Dazu der Hinweis, das zurückgehaltene Modell Mythos sei in die Hände einer chinesischen Gruppe geraten. Amazon ist Anthropics größter Investor (8 Mrd. Dollar, Option auf 20 Mrd.) und der Cloud-Anbieter, auf dem Anthropic läuft.',
        },
        {
          date: '2026-06-13',
          when: 'Freitag, gegen 9 Uhr',
          title: 'Krisenrunde im Weißen Haus',
          text: 'Cyberdirektor Sean Cairncross, Finanzminister Scott Bessent und weitere beraten am Telefon. Anthropic-Chef Dario Amodei ist auf einem Wellness-Retreat und erst nach Mittag erreichbar.',
        },
        {
          date: '2026-06-13',
          when: 'Freitagnachmittag',
          title: 'Drei Telefonate, keine Zusage',
          text: 'Amodei spricht von eng begrenzten, nicht universellen Jailbreaks. Die Regierung verlangt, Fable sofort vom Netz zu nehmen. Amodei bittet um Zeit und sagt nichts zu.',
          detail:
            'Am Hörer: Cairncross, Bessent, Handelsminister Lutnick, Exportkontrollchef Kessler, Stabssekretär Will Scharf, der stellvertretende Stabschef Richard Walters und NSC-Berater Walker Barrett.',
        },
        {
          date: '2026-06-13',
          when: 'Freitag, 17:21 Uhr',
          title: 'Exportkontrolle mit 90 Minuten Frist',
          text: 'Fable 5 muss für alle Nutzer außerhalb der USA abgeschaltet werden. Anthropic kann keine Staatsangehörigkeit prüfen, also geht das Modell weltweit vom Netz, auch für die eigenen Leute im Ausland.',
          highlight: true,
        },
        {
          date: '2026-06-13',
          when: 'Freitag, 19:38 Uhr',
          title: 'Anthropic widerspricht öffentlich',
          text: 'Die Regierung habe keinen Beweis für einen universellen Jailbreak vorgelegt, nur mündlich vor einer eng begrenzten Lücke gewarnt.',
          detail:
            'Vergleichbare Fähigkeiten hätten auch frei verfügbare Modelle wie GPT-5.5 von OpenAI. Die Direktive trifft trotzdem nur Anthropic, nicht OpenAI, Google oder Meta. Ein Verfahren, das transparent, fair, eindeutig und auf technische Fakten gestützt ist, sei das nicht.',
        },
      ]}
    />
  )
}
