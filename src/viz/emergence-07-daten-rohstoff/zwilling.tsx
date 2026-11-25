// The everyday data sources the episode lists (Folge 7, 38:01–41:39), grouped by area of life.
// Replaces the long enumeration at the end of the episode.

import { DataTable } from '@/viz/_kit'

export default function Zwilling() {
  return (
    <DataTable
      columns={[
        { key: 'bereich', label: 'Bereich', width: '20%' },
        { key: 'quellen', label: 'Quellen' },
        { key: 'wissen', label: 'Was sie über dich wissen' },
      ]}
      rows={[
        { bereich: 'Körper', quellen: 'Smartwatch, Fitness-Tracker, Zyklus-App, Blutzuckermessgerät, DNA-Test, Patientenakte', wissen: 'Herzschlag, Blutsauerstoff, Hauttemperatur, Gene, Diagnosen' },
        { bereich: 'Schlaf und Essen', quellen: 'Schlaftracker, Ernährungstracker, Lieferdienste, Supermarkt-Apps, smarter Kühlschrank', wissen: 'Wann du schläfst, wie unruhig, was du isst und bestellst' },
        { bereich: 'Zuhause', quellen: 'Saugroboter, Thermostat, Lichtsteuerung, Sprachassistent, Kamera, Smart Meter', wissen: 'Grundriss, wann du da bist, wann du duschst und kochst' },
        { bereich: 'Bewegung', quellen: 'Google Maps, Auto-Telemetrie, Öffis, E-Scooter, Carsharing', wissen: 'Wo du warst, wie schnell du fährst, wie hart du bremst' },
        { bereich: 'Kommunikation', quellen: 'Messenger, E-Mail, Videotelefonie, Dating-Apps', wissen: 'Wem du schreibst, wie schnell du antwortest, wen du attraktiv findest' },
        { bereich: 'Geld und Arbeit', quellen: 'Banking-Apps, PayPal, Klarna, Kalender, Projekt-Tools, Browser', wissen: 'Wofür du Geld ausgibst, wann du produktiv bist und wann nicht' },
        { bereich: 'Vorlieben und Gefühle', quellen: 'Netflix, Spotify, Kindle, YouTube, Mood-Tracker, Journaling-Apps, Suchanfragen', wissen: 'Was du hörst, wenn du traurig bist, wonach du nachts suchst', highlight: true },
        { bereich: 'Identität', quellen: 'Face ID, Touch ID, Smartphone-Sensoren', wissen: 'Dein Gesicht, dein Fingerabdruck, dein Gang, wie du tippst' },
      ]}
    />
  )
}
