// Why unemployment through AI differs from unemployment in an economic crisis (Folge 10, 15:38–19:09).
// Replaces the two paragraphs on the "double problem" of the state and on the tax base.

import { DataTable } from '@/viz/_kit'

export default function KriseOderKi() {
  return (
    <DataTable
      columns={[
        { key: 'frage', label: 'Was passiert mit …', width: '28%' },
        { key: 'krise', label: 'Wirtschaftskrise' },
        { key: 'ki', label: 'KI übernimmt die Arbeit' },
      ]}
      rows={[
        { frage: 'der Arbeit', krise: 'Es wird weniger gearbeitet', ki: 'Sie wird weiter gemacht, von Algorithmen und Maschinen' },
        { frage: 'der Wertschöpfung', krise: 'Sinkt', ki: 'Bleibt gleich oder steigt: KI kennt keinen Urlaub, kein Wochenende' },
        { frage: 'den Löhnen', krise: 'Sinken', ki: 'Fallen weg' },
        {
          frage: 'den Steuern auf Arbeit',
          krise: 'Sinken',
          ki: 'Fallen weg',
          detail:
            'In Deutschland kommen rund zwei Drittel aller Staatseinnahmen aus Steuern und Abgaben auf Arbeit, also auf Löhne, Gehälter und Einkommen.',
        },
        { frage: 'dem Bedarf an Hilfe', krise: 'Steigt', ki: 'Steigt' },
        {
          frage: 'dem Geld',
          krise: 'Fehlt: Der Kuchen wird kleiner, mehr Menschen wollen ein Stück',
          ki: 'Ist da, fließt aber als Gewinn zu den Unternehmen und am Staat vorbei',
          highlight: true,
        },
      ]}
    />
  )
}
