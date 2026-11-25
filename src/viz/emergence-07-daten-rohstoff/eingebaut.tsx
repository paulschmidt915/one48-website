// Stages 2 and 3 of the episode's "safari" (Folge 7, 19:14–29:08): data collection built in on purpose,
// and data collection as the business model.

import { DataTable } from '@/viz/_kit'

export default function Eingebaut() {
  return (
    <DataTable
      columns={[
        { key: 'firma', label: 'Firma', width: '18%' },
        { key: 'angebot', label: 'Was die Nutzer bekommen' },
        { key: 'daten', label: 'Was die Firma bekommt' },
        { key: 'rolle', label: 'Rolle der Daten', width: '17%' },
      ]}
      rows={[
        {
          firma: '1X',
          angebot: 'Haushaltsroboter für rund 20.000 Dollar',
          daten: 'Aufzeichnungen, wie Menschen den Roboter per Fernsteuerung durch schwierige Aufgaben führen',
          rolle: 'Bewusst eingebaut',
          detail: 'Weiß die KI nicht weiter, übernimmt ein Mitarbeiter. Jede Handbewegung, Reihenfolge und Umgehung eines Hindernisses fließt zurück ins Training.',
        },
        { firma: 'Strava, Komoot', angebot: 'Sport tracken', daten: 'Routen, Tempo, Herzfrequenz von Millionen Menschen', rolle: 'Bewusst eingebaut' },
        { firma: 'Google Fitbit', angebot: 'Fitness-Armband, günstiger als Whoop, ohne Abo', daten: 'Gesundheits- und Bewegungsdaten rund um die Uhr', rolle: 'Bewusst eingebaut' },
        {
          firma: 'Niantic (Pokémon Go)',
          angebot: 'Ein Handyspiel',
          daten: 'Über 30 Mrd. georeferenzierte 3D-Scans von Straßen, Brücken, Innenstädten',
          rolle: 'Bewusst eingebaut',
          detail: 'Niantic hat aus den Scans eine eigene Plattform gemacht und bietet die Daten KI-Firmen an.',
        },
        {
          firma: 'Shift',
          angebot: 'Kostenlose Wohnungsreinigung in New York',
          daten: 'Bodycam-Videos echter, unaufgeräumter Wohnungen, anonymisiert an KI-Labs verkauft',
          rolle: 'Geschäftsmodell',
          highlight: true,
          detail: 'Start am 28. Mai, deutsche Mutterfirma. Rund 8 Mio. Aufrufe des Launch-Videos, tausende Buchungen in den ersten Tagen. Geplant: Berlin, München und weitere Dienste wie Handwerk und Kochen.',
        },
        { firma: 'DoorDash (Tasks)', angebot: 'Bezahlte Aufträge für Kuriere', daten: 'Videos von Händen beim Wäschefalten, Bettenmachen, Putzen', rolle: 'Geschäftsmodell' },
      ]}
    />
  )
}
