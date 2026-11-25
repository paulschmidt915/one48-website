// Where the match data goes: from measuring to the coach's tablet.
// Sources: Folge 11 (transcript); FIFA (2026); Brighton/Caicedo and Sevilla figures as cited in the episode.

import { DataTable } from '@/viz/_kit'

export default function Daten() {
  return (
    <DataTable
      columns={[
        { key: 'stufe', label: 'Stufe', width: '16%' },
        { key: 'beispiel', label: 'Beispiel' },
        { key: 'zahl', label: 'Größenordnung', align: 'right', width: '24%' },
      ]}
      rows={[
        {
          stufe: 'Messen',
          beispiel: 'WM 2026: Kameras, Sensor im Ball, 3D-Scans aller Spieler',
          zahl: '150 Mio. Datenpunkte pro Spiel',
        },
        {
          stufe: 'Bewerten',
          beispiel: 'Expected Goals: wie wahrscheinlich aus einer Situation ein Tor fällt; ein Elfmeter liegt bei rund 0,8',
          zahl: 'über 40 öffentliche FIFA-Kennzahlen',
          detail: 'Nach der Gruppenphase der WM 2026 hatte Deutschland 7,38 Expected Goals, mehr als jedes andere Team.',
        },
        {
          stufe: 'Scouten',
          beispiel: 'Brighton kauft Moisés Caicedo, weil die Daten ihn für unterschätzt halten, und verkauft ihn Jahre später',
          zahl: '4 → 115 Mio. Pfund',
          detail: 'Auch Jugendliche werden so gesichtet: Apps wie aiScout vermessen per Handyvideo über 20 Punkte am Körper und bewerten das Talent.',
        },
        {
          stufe: 'Analysieren',
          beispiel: 'FC Sevilla: ein Sprachmodell durchsucht Scouting-Berichte und berät den Trainer',
          zahl: '200.000 Berichte',
        },
        {
          stufe: 'Coachen',
          beispiel: 'Football AI Pro von FIFA und Lenovo für alle 48 Teams: Fragen in normaler Sprache, Antworten als Video oder 3D-Grafik',
          zahl: 'über 2.000 Kennzahlen',
          highlight: true,
          detail: 'Erlaubt nur vor und nach dem Spiel, nicht während der 90 Minuten. FIFA-Präsident Infantino will so den Zugang zu Daten „demokratisieren“, auch für kleine Nationen ohne eigene Analyseabteilung.',
        },
      ]}
    />
  )
}
