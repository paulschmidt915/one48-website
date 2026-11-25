// The seven assumptions about AI from the episode (Folge 4, 07:23–12:08), where each comes from and
// the reality check (14:33–22:52). Origins and dates from the episode material (01_Kernthese, 04_Script).
// Replaces the enumeration of the assumptions and the paragraph-by-paragraph reality check.

import { DataTable } from '@/viz/_kit'

export default function Annahmen() {
  return (
    <DataTable
      columns={[
        { key: 'annahme', label: 'Annahme', width: '26%' },
        { key: 'herkunft', label: 'Woher sie kommt' },
        { key: 'heute', label: 'Stand heute' },
      ]}
      rows={[
        {
          annahme: '„KI ist ein Chatbot“',
          herkunft: 'So haben die meisten KI kennengelernt: im Chatfenster',
          heute: 'Das Chatfenster ist die Einstiegsstufe. In Editoren (IDEs) und als Agent arbeitet KI mit Dateien und erledigt Aufgaben selbst',
          highlight: true,
          detail:
            'Für Paul die wichtigste Korrektur der Folge: Wer mit mehreren PDFs, einer Excel-Datei oder ganzen Ordnern arbeitet, sollte das nicht mehr im Chatfenster tun, sondern in einer Umgebung, in der die KI jede Datei öffnen, ändern und abspeichern kann.',
        },
        {
          annahme: '„Ein Prompt, eine Antwort“',
          herkunft: 'Die meisten Gespräche bestehen aus ein paar Nachrichten',
          heute: 'Mit Kontext, Rückfragen und Korrekturen wird aus dem Automaten ein Sparringspartner',
        },
        {
          annahme: '„Eine schnellere Suchmaschine“',
          herkunft: 'Fast die Hälfte aller Anfragen sind Wissensfragen',
          heute: 'Die Stärke ist die Synthese: viele Quellen zusammenführen und daraus eine neue Antwort bauen',
        },
        {
          annahme: '„Gut für E-Mails und Zusammenfassungen“',
          herkunft: 'Der erste Anwendungsfall jeder KI-Schulung',
          heute: 'Datenanalyse, Code, Mustererkennung, Automatisierung',
        },
        {
          annahme: '„KI halluziniert“',
          herkunft: 'Erfundene Quellen, besonders sichtbar in den ersten Jahren',
          heute: 'Gibt es noch, durch Websuche und Retrieval Augmented Generation (RAG) aber deutlich seltener',
          detail:
            'Halluzination ist vor allem ein Problem beim Abruf von Fakten aus dem Modell selbst. Bei Analyse, Synthese und Strukturierung spielt sie eine kleinere Rolle.',
        },
        {
          annahme: '„KI kann nicht rechnen“',
          herkunft: 'GPT-3.5 scheiterte 2023 an einfacher Arithmetik',
          heute: 'Modelle schreiben Code, um zu rechnen; Reasoning-Modelle denken bei schweren Aufgaben minutenlang nach',
        },
        {
          annahme: '„KI schreibt Slop“',
          herkunft: 'Ergebnisse von Anfragen ohne Kontext',
          heute: 'Generischer Output ist ein Input-Problem: Wer dem Architekten nur „Bau mir ein Haus“ sagt, bekommt ein Haus wie jedes andere',
        },
      ]}
    />
  )
}
