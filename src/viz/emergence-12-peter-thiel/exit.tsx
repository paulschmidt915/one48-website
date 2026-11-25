// Der letzte Schritt: drei Anläufe, den Staat selbst zum Produkt zu machen, und Thiels eigene
// Ausweichländer. Angaben aus Skript und Recherche-Notizen zu Folge 12 (u. a. NYT und Handelsblatt, 2026).

import { Timeline } from '@/viz/_kit'

export default function Exit() {
  return (
    <Timeline
      events={[
        {
          date: '2008',
          title: 'Anlauf 1: Städte auf hoher See',
          text: 'Thiel finanziert ein Institut für „Seasteading“: schwimmende Städte außerhalb jedes Staatsgebiets, mit eigenen Regeln. Gebaut wurde nie eine.',
        },
        {
          date: '2009',
          title: 'Der Essay',
          text: 'Als eigentliche Aufgabe nennt Thiel die „escape from politics in all its forms“, die Flucht aus der Politik in all ihren Formen.',
          detail: 'Der Essay heißt „The Education of a Libertarian“. Aus ihm stammt auch die Idee hinter dem Seasteading.',
        },
        { date: '2011', title: 'Ausweichland: Neuseeland', text: 'Thiel besorgt sich die neuseeländische Staatsbürgerschaft.' },
        {
          date: '2019',
          title: 'Anlauf 2: Sonderzonen an Land',
          text: 'Anker-Investor von Pronomos, einem Fonds für Charter Cities: halbautonome Zonen mit eigenen Gesetzen, etwa Próspera auf einer Insel vor Honduras.',
        },
        {
          date: '2021',
          title: 'Anlauf 3: ein „Netzwerk-Staat“',
          text: 'Praxis will einen ganzen Staat mit eigenen Regeln bauen. Thiel ist nur indirekt über Fonds beteiligt; bisher ist es mehr Ankündigung als Stadt.',
        },
        { date: '2022', title: 'Ausweichland: Malta', text: 'Thiel beantragt einen Pass in Malta.' },
        {
          date: '2026',
          when: 'Frühjahr 2026',
          title: 'Ausweichland: Argentinien',
          text: 'Binnen etwa zwei Monaten verlässt er seine Häuser in Los Angeles und Miami, kauft eine Villa in Buenos Aires und trifft Präsident Milei. Dazu ein Grundstück in Uruguay als Reserve.',
          highlight: true,
          detail: 'Milei über das Treffen: Ein Anarcho-Kapitalist habe einen anderen getroffen. Ein Vertrauter Thiels: In dem Moment, in dem China Taiwan angreife, sitze er in Buenos Aires; es sei gut, einen Plan B für die Zivilisation zu haben.',
        },
      ]}
    />
  )
}
