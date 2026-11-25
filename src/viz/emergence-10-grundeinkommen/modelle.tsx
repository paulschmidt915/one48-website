// Four ways everybody could share in what AI earns, as the episode goes through them (Folge 10,
// 26:21–32:36): money from the state, Altman's Universal Basic Compute (All-In-Podcast, 2024),
// collective ownership (Altman in The Atlantic, 2026), the AI dividend (Urban Institute, 2026).
// Replaces three paragraphs on dependency, Altman's change of mind and Alaska.

import { DataTable } from '@/viz/_kit'

export default function Modelle() {
  return (
    <DataTable
      columns={[
        { key: 'modell', label: 'Modell', width: '22%' },
        { key: 'bekommst', label: 'Du bekommst' },
        { key: 'gehoert', label: 'Die Maschine gehört' },
        { key: 'bist', label: 'Du bist' },
      ]}
      rows={[
        {
          modell: 'Grundeinkommen in Geld',
          bekommst: 'Jeden Monat Geld, weil der Staat es so beschließt',
          gehoert: 'Einer Handvoll Tech-Konzernen',
          bist: 'Empfänger, vollständig abhängig',
          detail:
            'Finanzierung zum Beispiel über Sam Altmans „American Equity Fund“ (2021): Große Unternehmen zahlen jedes Jahr 2,5 % ihres Werts in eigenen Aktien in einen Fonds. Der Stanford-Ökonom Erik Brynjolfsson warnt, dass die Menschen dann von den Entscheidungen der wenigen abhängen, die die Technik kontrollieren.',
        },
        {
          modell: 'Universal Basic Compute (Altman, 2024)',
          bekommst: 'Ein Stück Rechenleistung: für ein eigenes Projekt, zum Verkaufen oder Spenden',
          gehoert: 'Weiter den Tech-Konzernen: auf ihrer Hardware, nach ihren Regeln',
          bist: 'Nutzer, abhängig von ihrer Infrastruktur',
          detail: 'Vorgeschlagen im All-In-Podcast.',
        },
        {
          modell: 'Kollektives Eigentum (Altman, 2026)',
          bekommst: 'Echte Anteile an den KI-Firmen; ihr Wert fließt als Einkommen zurück',
          gehoert: 'Zum Teil der Allgemeinheit',
          bist: 'Miteigentümer: beteiligt statt abhängig',
          highlight: true,
          detail:
            'Im Interview mit The Atlantic sagte Altman, er glaube nicht mehr so sehr an ein Grundeinkommen wie früher; ihn interessiere kollektives Eigentum. Alle müssten am Aufschwung durch KI teilhaben.',
        },
        {
          modell: 'KI-Dividende (Urban Institute, 2026)',
          bekommst: 'Eine jährliche Dividende aus den Erträgen der KI-Firmen',
          gehoert: 'Den Firmen, die für das Wissen aller zahlen, auf dem ihre KI trainiert ist',
          bist: 'Beteiligt am Ertrag',
          detail:
            'Vorbild ist Alaska: Der Bundesstaat zahlt jedem Bürger jedes Jahr eine Dividende aus den Öleinnahmen, finanziert aus einem Viertel der Förderabgaben, meist 1.000 bis 2.000 Dollar.',
        },
      ]}
    />
  )
}
