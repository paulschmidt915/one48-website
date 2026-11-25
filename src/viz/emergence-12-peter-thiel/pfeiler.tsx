// These 3: Thiels Wetten auf die Pfeiler Geld und Überwachung, mit der Art seiner Beteiligung.
// Angaben aus Skript und Recherche-Notizen zu Folge 12.

import { DataTable } from '@/viz/_kit'

export default function Pfeiler() {
  return (
    <DataTable
      columns={[
        { key: 'pfeiler', label: 'Pfeiler', width: '14%' },
        { key: 'firma', label: 'Firma', width: '16%' },
        { key: 'was', label: 'Was sie tut' },
        { key: 'rolle', label: 'Thiels Beteiligung', width: '24%' },
      ]}
      rows={[
        {
          pfeiler: 'Geld',
          firma: 'Bitcoin und Krypto',
          was: 'Geld ohne Zentralbank: ab 2014 für etwa 15–20 Mio. $ gekauft, bis März 2022 für rund 1,8 Mrd. $ verkauft. Kurz darauf brach der Markt ein.',
          rolle: 'über Founders Fund',
          detail: 'Die älteste Wette: PayPal sollte 1999 ursprünglich, sinngemäß, eine Weltwährung ohne staatliche Kontrolle werden. Daraus wurde ein Bezahldienst, die Idee blieb.',
        },
        {
          pfeiler: 'Geld',
          firma: 'Erebor',
          was: 'Bank für Kunden, die sonst keiner will: Krypto, Rüstung, Deep-Tech. Gegründet nach dem Zusammenbruch der Silicon Valley Bank 2023.',
          rolle: 'nur indirekt, über seinen Fonds',
        },
        {
          pfeiler: 'Überwachung',
          firma: 'Palantir',
          was: 'Fügt Melde-, Steuer-, Polizei- und Bewegungsdaten zu einem Lagebild zusammen. Rückgrat der US-Einwanderungsbehörde ICE („ImmigrationOS“).',
          rolle: '2003 mitgegründet, Frühphase aus eigener Tasche',
          highlight: true,
        },
        {
          pfeiler: 'Überwachung',
          firma: 'Flock',
          was: 'Über 100.000 Kennzeichen-Kameras in den USA, als Abo für Städte und Nachbarschaften.',
          rolle: 'kleinerer Investor über seinen Fonds',
          detail: 'Über 80 Städte sind wieder ausgestiegen; die Kampagne heißt „Get the Flock Out“.',
        },
        {
          pfeiler: 'Überwachung',
          firma: 'Clearview',
          was: 'Gesichtserkennung mit bis zu 50 Mrd. Fotos aus dem offenen Netz, verkauft an Polizei, FBI und ICE.',
          rolle: '2017 persönlich, rund 200.000 $, kein Fonds dazwischen',
          highlight: true,
          detail: 'In der EU ist das illegal. Allein die Niederlande verhängten über 30 Mio. € Bußgeld. Clearview zahlt nicht, weil die Firma kein Geschäft in der EU hat.',
        },
      ]}
    />
  )
}
