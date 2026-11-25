// From Lampard's ghost goal to the sensor ball: the referee technology since 2010.
// Sources: Folge 11 (transcript), research notes of the episode (FIFA, IFAB, Electronics Weekly, Al Jazeera).

import { Timeline } from '@/viz/_kit'

export default function Chronik() {
  return (
    <Timeline
      events={[
        {
          date: '2010-06',
          title: 'Lampards Tor zählt nicht',
          text: 'WM-Achtelfinale gegen Deutschland: Der Ball springt einen guten halben Meter hinter die Linie, der Schiedsrichter sieht es nicht. FIFA-Präsident Blatter, bis dahin Gegner jeder Technik, schwenkt um.',
        },
        { date: '2012-07', title: 'Torlinientechnik zugelassen', text: 'Die Regelhüter des IFAB genehmigen sie zwei Jahre nach Lampard.' },
        {
          date: '2014',
          title: 'Erste WM mit Torlinientechnik',
          text: 'Sieben Kameras pro Tor; ist der ganze Ball über der Linie, vibriert die Uhr des Schiedsrichters, in unter einer Sekunde.',
          detail: 'Bis zu 500 Bilder pro Sekunde, die Ballposition wird auf etwa 5 mm genau berechnet.',
        },
        {
          date: '2018',
          title: 'Videobeweis bei der WM',
          text: 'Schiedsrichter vor Bildschirmen greifen ein, wenn auf dem Platz ein klarer Fehler passiert.',
          detail: 'Nur vier Situationen sind überprüfbar: Tor oder kein Tor, Elfmeter, glatte Rote Karte, Verwechslung des Spielers.',
        },
        {
          date: '2022',
          title: 'Halbautomatisches Abseits',
          text: '12 Kameras unter dem Stadiondach verfolgen bis zu 29 Punkte am Körper jedes Spielers, 50-mal pro Sekunde. Ein Sensor im Ball meldet den Moment des Passes.',
          detail: 'Die Prüfung dauert damit etwa 20 bis 25 Sekunden statt rund 70.',
        },
        {
          date: '2026-06',
          title: 'Die technologischste WM',
          text: 'Der Ball Trionda zeichnet jede Berührung auf, alle 48 Kader sind in 3D gescannt, Schiedsrichter tragen Kameras für das Fernsehbild.',
          highlight: true,
          detail: 'Die FIFA nennt das Turnier in den USA, Mexiko und Kanada das größte Live-Experiment mit künstlicher Intelligenz, das der Sport je gesehen hat.',
        },
      ]}
    />
  )
}
