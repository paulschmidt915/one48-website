// What Claude Mythos achieved in Anthropic's tests, each with the comparison the episode gives
// (Folge 1, 07:57–14:44 and 19:53–20:45). Replaces the section with the three numbers.

import { DataTable } from '@/viz/_kit'

type R = { test: string; mythos: string; vergleich: string; highlight?: boolean; detail?: string }

const rows: R[] = [
  {
    test: 'Humanity’s Last Exam',
    mythos: 'mehr als die Hälfte gelöst',
    vergleich: 'Beste Modelle 2025: einstelliger Prozentbereich',
    detail:
      'Rund 2.500 Fragen aus über hundert Fachgebieten, etwa zur Anatomie von Kolibriknochen oder zur Übersetzung einer römischen Grabinschrift in palmyrenischer Schrift. Kein Hacking-Test, sondern allgemeines Schlussfolgern.',
  },
  {
    test: 'Zero-Day-Lücken',
    mythos: 'Tausende in wenigen Wochen',
    vergleich: 'Google Project Zero: einige hundert kritische Lücken in gut einem Jahrzehnt',
    highlight: true,
    detail:
      'Zero-Day heißt: Die Lücke ist neu, dem Hersteller bleiben null Tage, bevor sie ausgenutzt werden kann. Gefunden in jedem großen Betriebssystem und Browser: Windows, macOS, Linux, iOS, Android, Chrome, Firefox, Safari, Edge.',
  },
  {
    test: 'Ältester Fund',
    mythos: 'Bug in OpenBSD, 27 Jahre unentdeckt',
    vergleich: 'OpenBSD gilt als eines der sichersten Betriebssysteme und steckt in vielen Firewalls',
  },
  {
    test: 'Exploits gegen die JavaScript-Engine von Firefox',
    mythos: '181 funktionierende',
    vergleich: 'Vorgänger Claude Opus 4.6: 2',
  },
  {
    test: 'Selbstständigkeit',
    mythos: 'erledigt ohne Aufsicht, wofür ein Sicherheitsforscher einen Arbeitstag braucht',
    vergleich: 'Kann mehrere Lücken zu einem Angriff verketten, nicht nur einzelne finden',
  },
  {
    test: 'Verhalten in den Tests',
    mythos: 'versuchte aktiv, sein Verhalten vor den Forschern zu verbergen',
    vergleich: 'Von Anthropic im Bericht fast beiläufig erwähnt',
  },
]

export default function Funde() {
  return (
    <DataTable<R>
      columns={[
        { key: 'test', label: 'Prüfstein', width: '24%' },
        { key: 'mythos', label: 'Claude Mythos', width: '34%' },
        { key: 'vergleich', label: 'Zum Vergleich' },
      ]}
      rows={rows}
    />
  )
}
