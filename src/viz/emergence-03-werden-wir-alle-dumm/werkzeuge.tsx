// Four thinking tools compared: what each takes over, what was lost, what remained or grew
// (Folge 3, 09:54–11:41, 18:42–19:33, 22:42–25:43, 28:25–28:37). Replaces three paragraphs of history.

import { DataTable } from '@/viz/_kit'

export default function Werkzeuge() {
  return (
    <DataTable
      columns={[
        { key: 'werkzeug', label: 'Werkzeug', width: '20%' },
        { key: 'nimmt', label: 'Übernimmt' },
        { key: 'verlust', label: 'Geht verloren' },
        { key: 'gewinn', label: 'Bleibt oder wächst' },
      ]}
      rows={[
        {
          werkzeug: 'Taschenrechner',
          nimmt: 'Rechnen',
          verlust: 'Kopfrechnen',
          gewinn: 'Mathematisches Verständnis, Problemlösen',
          detail: 'Als in den 1970er-Jahren die ersten bezahlbaren Taschenrechner in die Schulen kamen, waren 72 % der Lehrkräfte dagegen. Bis sie flächendeckend da waren, vergingen Jahrzehnte.',
        },
        {
          werkzeug: 'Suchmaschine',
          nimmt: 'Fakten erinnern',
          verlust: 'Das Wissen selbst',
          gewinn: 'Wissen, wo es steht',
          detail: 'Der Google-Effekt (Columbia University, 2011): Was wir für online abrufbar halten, merken wir uns schlechter. Den Speicherort merken wir uns dafür besser.',
        },
        {
          werkzeug: 'Navi',
          nimmt: 'Navigieren',
          verlust: 'Orientierungssinn',
          gewinn: 'Sich in fremden Städten zurechtfinden',
          detail: 'Bis GPS verbreitet war, dauerte es rund 15 Jahre.',
        },
        {
          werkzeug: 'ChatGPT',
          nimmt: 'Alles, was über Sprache läuft: schreiben, argumentieren, analysieren, programmieren',
          verlust: 'Offen',
          gewinn: 'Offen',
          highlight: true,
          detail: '100 Millionen Nutzer in zwei Monaten: Für Schulen, Institutionen und Gewohnheiten blieb keine Zeit, sich anzupassen. Und anders als beim Taschenrechner merkt man oft nicht, welchen Teil des Denkens die Maschine übernommen hat.',
        },
      ]}
    />
  )
}
