// What machines decide in four sports: help, measuring, or replacement.
// Sources: Folge 11 (transcript); research notes of the episode (ATP, All England Club, NFL, MLB, FIFA).

import { DataTable } from '@/viz/_kit'

export default function Sportarten() {
  return (
    <DataTable
      columns={[
        { key: 'sport', label: 'Sport', width: '17%' },
        { key: 'seit', label: 'Seit', width: '10%' },
        { key: 'technik', label: 'Was die Technik tut' },
        { key: 'stufe', label: 'Stufe', width: '15%' },
      ]}
      rows={[
        {
          sport: 'Tennis',
          seit: '2025',
          technik: 'Eine Kamera ruft „Out“, die Linienrichter der großen Turniere sind abgeschafft, in Wimbledon nach fast 150 Jahren.',
          stufe: 'Ersatz',
          detail: 'US Open 2020 erstmals auf großer Bühne, Australian Open 2021 als erstes Grand-Slam-Turnier ganz ohne Linienrichter, ATP-Tour und Wimbledon ab 2025.',
        },
        {
          sport: 'American Football (NFL)',
          seit: '2025',
          technik: 'Ein Kamerasystem ersetzt die Messkette für den Raumgewinn. Wo der Ball liegt, legt weiter der Schiedsrichter fest.',
          stufe: 'Messung',
        },
        {
          sport: 'Fußball',
          seit: '2014',
          technik: 'Torlinie und Abseitsposition misst die Maschine. Foul, Elfmeter und Absicht beurteilt der Mensch.',
          stufe: 'Messung',
          highlight: true,
          detail: 'Im Labor erkennen erste KI-Systeme Fouls mit knapp 90 % Treffsicherheit. Vorgeschlagen ist eine Foul-Wahrscheinlichkeit, erst als Hilfe für den Schiedsrichter, später vielleicht als automatisches Signal wie beim Abseits.',
        },
        {
          sport: 'Baseball (MLB)',
          seit: '2026',
          technik: 'Auf Antrag eines Teams darf ein Kamerasystem den Schiedsrichter bei Ball und Strike überstimmen.',
          stufe: 'Hilfe',
          detail: 'Der Schiedsrichter ruft weiter jeden Wurf; jedes Team hat zwei Anträge.',
        },
      ]}
    />
  )
}
