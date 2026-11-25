// These 2: Thiels Wetten auf den Körper als sechs Stufen, vom Doping bis zum Chip im Schädel.
// Angaben aus Skript und Recherche-Notizen zu Folge 12.

import { DataTable } from '@/viz/_kit'

export default function Koerper() {
  return (
    <DataTable
      columns={[
        { key: 'stufe', label: 'Stufe', width: '20%' },
        { key: 'firma', label: 'Firma', width: '22%' },
        { key: 'ansatz', label: 'Ansatz' },
      ]}
      rows={[
        {
          stufe: '1 · optimieren',
          firma: 'Enhanced Games',
          ansatz: 'Spiele, bei denen Doping erlaubt ist: ärztlich überwacht, aber ohne Dopingkontrollen.',
          detail: 'Sportverbände und Mediziner halten das für brandgefährlich. Die Wette dahinter: Die Grenzen, die wir dem Körper setzen, sind keine natürlichen.',
        },
        {
          stufe: '2 · reparieren',
          firma: 'EpiBone',
          ansatz: 'Züchtet aus körpereigenen Stammzellen und einem CT-Scan passgenauen Ersatzknochen im Bioreaktor.',
        },
        {
          stufe: '3 · verjüngen',
          firma: 'NewLimit',
          ansatz: 'Will Zellen per mRNA auf ein jüngeres Muster aktiver Gene zurücksetzen und so das Altern selbst behandeln.',
          detail: 'Mitgegründet von Brian Armstrong, dem Chef der Krypto-Börse Coinbase.',
        },
        {
          stufe: '4 · konservieren',
          firma: 'Until',
          ansatz: 'Umkehrbare Kälte-Konservierung: Organe einfrieren und funktionsfähig wieder auftauen, langfristig ganze Körper.',
        },
        {
          stufe: '5 · reproduzieren',
          firma: 'Rhea',
          ansatz: 'Fruchtbarkeits-Netzwerk über Ländergrenzen: Kinderwunsch-Kliniken, künstliche Befruchtung mit KI, eine Art Börse für Ei- und Samenzellen.',
          detail: 'Stabil bleibt eine Bevölkerung bei 2,1 Kindern pro Frau. Fast die ganze entwickelte Welt liegt darunter, Teile Ostasiens unter eins.',
        },
        {
          stufe: '6 · verschmelzen',
          firma: 'Neuralink',
          ansatz: 'Gut tausend Elektroden auf haarfeinen Fäden, von einem Roboter ins Gehirn genäht. Heute steuern Gelähmte damit Computer, Fernziel ist die Verbindung von Mensch und KI.',
          highlight: true,
        },
      ]}
    />
  )
}
