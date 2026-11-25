// Four thinking tools compared: what each takes over, how fast it spread, what was lost and what grew.
// Replaces three paragraphs of history.

import { DataTable } from '@/viz/_kit'

export default function Werkzeuge() {
  return (
    <DataTable
      columns={[
        { key: 'werkzeug', label: 'Werkzeug', width: '22%' },
        { key: 'domaene', label: 'Übernimmt' },
        { key: 'verlust', label: 'Geht verloren' },
        { key: 'gewinn', label: 'Bleibt oder wächst' },
      ]}
      rows={[
        {
          werkzeug: 'Taschenrechner',
          domaene: 'Rechnen',
          verlust: 'Kopfrechnen',
          gewinn: 'Mathematisches Verständnis',
          detail: 'Als in den 1970er-Jahren die ersten bezahlbaren Geräte in die Schulen kamen, waren 72 % der Lehrkräfte dagegen. Bis sie überall waren, vergingen Jahrzehnte.',
        },
        { werkzeug: 'Suchmaschine', domaene: 'Fakten erinnern', verlust: 'Das Wissen selbst', gewinn: 'Wissen, wo es steht' },
        {
          werkzeug: 'GPS',
          domaene: 'Navigieren',
          verlust: 'Orientierungssinn',
          gewinn: 'Sich in fremden Städten zurechtfinden',
          detail: 'Bis GPS in jedem Auto war, dauerte es etwa 15 Jahre.',
        },
        {
          werkzeug: 'ChatGPT',
          domaene: 'Alles, was über Sprache läuft',
          verlust: 'Offen',
          gewinn: 'Offen',
          highlight: true,
          detail:
            'Drei Unterschiede zu allen Werkzeugen davor: Es greift alle sprachbasierten Aufgaben zugleich an, es verbreitete sich in Wochen (100 Millionen Nutzer in zwei Monaten), und man merkt oft nicht, welchen Teil des Denkens es übernommen hat.',
        },
      ]}
    />
  )
}
