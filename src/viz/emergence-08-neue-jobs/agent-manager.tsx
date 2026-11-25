// Key facts on the new role, as the episode presents it (Folge 8, 20:15–20:49 and 30:08–31:47):
// titles in job ads, the name HBR gave it, what the job is and needs, where it exists.
// Replaces the paragraphs on the title chaos and the HBR definition.

import { DataTable } from '@/viz/_kit'

export default function AgentManager() {
  return (
    <DataTable
      columns={[
        { key: 'merkmal', label: 'Merkmal', width: '30%' },
        { key: 'wert', label: 'AI Agent Manager' },
      ]}
      rows={[
        { merkmal: 'Titel in Stellenanzeigen', wert: 'AI Ops Manager, Prompt Engineer, AI Workflow Specialist, AI Orchestration Lead, Machine Learning Operations Manager' },
        { merkmal: 'Einheitlicher Name', wert: 'AI Agent Manager, so definiert von der Harvard Business Review (2026)' },
        { merkmal: 'Aufgaben', wert: 'Anweisungen laufend verfeinern, Übergaben zwischen Mensch und Agent justieren, Fehler finden und beheben' },
        { merkmal: 'Art der Rolle', wert: 'Ein Führungsjob, kein Tech-Job', highlight: true },
        { merkmal: 'Voraussetzung', wert: 'Prozessverständnis: den eigenen Beruf kennen, Ergebnisse beurteilen, wissen, wann ein Mensch übernimmt. Kein Informatikabschluss' },
        { merkmal: 'Gibt es schon bei', wert: 'Salesforce: Agent Manager steuern die Vertriebsagenten für Erstansprache, Terminplanung und Lead-Qualifizierung' },
        { merkmal: 'Ergebnis bei Salesforce', wert: 'Über 350 gebuchte Meetings pro Woche, 60 Mio. $ Pipeline, über 300 neue Kunden in vier Monaten; im Kundenservice lösen Agenten 74 % der Anfragen selbst' },
      ]}
    />
  )
}
