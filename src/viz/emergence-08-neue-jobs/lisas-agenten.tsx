// Lisa's six agents in the episode's thought experiment (Folge 8, 11:42–15:03): what each takes over
// and what is left for Lisa. Replaces the step-by-step story of the six agents.

import { DataTable } from '@/viz/_kit'

export default function LisasAgenten() {
  return (
    <DataTable
      columns={[
        { key: 'agent', label: 'Agent', width: '24%' },
        { key: 'macht', label: 'Übernimmt' },
        { key: 'lisa', label: 'Lisa macht noch', width: '28%' },
      ]}
      rows={[
        {
          agent: 'Kundenrecherche',
          macht: 'Sucht Firmen nach Zielbranche, Mindestgröße und Region und legt jeden Morgen eine sortierte Liste in die Kundendatenbank',
          lisa: 'Kriterien festlegen',
          detail: 'Vorher kostete die Recherche Lisa rund eine Stunde am Tag, der Agent braucht Minuten. Er nutzt dieselben Quellen wie sie: Kundendatenbank, Branchenverzeichnisse.',
        },
        { agent: 'Erstansprache', macht: 'Schreibt aus den Rechercheergebnissen, Vorlagen und Lisas Tonfall persönliche Anschreiben', lisa: 'Gegenlesen, korrigieren' },
        { agent: 'Gesprächsnotizen', macht: 'Hört bei Kundentelefonaten mit, fasst zusammen, trägt alles in die Datenbank ein', lisa: '–' },
        { agent: 'Angebotsentwürfe', macht: 'Füllt Preise, Mengenrabatte und Lieferbedingungen aus Notizen und Produktkatalog vor', lisa: 'Prüfen, verhandeln' },
        { agent: 'Wochenbericht', macht: 'Baut den Verkaufsbericht, den Lisa sonst freitagmorgens von Hand erstellt', lisa: '–' },
        { agent: 'Konkurrenz', macht: 'Verfolgt Preise, neue Produkte und Presseberichte der Wettbewerber', lisa: 'Briefing vor jedem Termin lesen' },
      ]}
    />
  )
}
