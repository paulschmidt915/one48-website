// The episode's professions beyond sales (Folge 8, 22:21–28:49): what agents could take over and what
// remains for the person. Replaces the paragraphs on Elektriker, Hausärztin and Lehrer.

import { DataTable } from '@/viz/_kit'

export default function Berufe() {
  return (
    <DataTable
      columns={[
        { key: 'beruf', label: 'Beruf', width: '18%' },
        { key: 'agenten', label: 'Agenten könnten übernehmen' },
        { key: 'bleibt', label: 'Es bleibt', width: '36%' },
      ]}
      rows={[
        {
          beruf: 'Elektriker mit eigenem Betrieb',
          agenten: 'Baustellenbericht aus Fotos und Sprachnotizen, Angebot aus Aufmaß und Materialliste, Termine mit kurzen Fahrtwegen, Buchhaltung aus abfotografierten Belegen',
          bleibt: 'Auf der Baustelle bauen, Lehrlinge ausbilden, Probleme lösen, die kein Lehrbuch kennt',
          detail: 'Heute erledigt er neben der Arbeit: Angebote, Rechnungen, Materiallisten, Kundenmails, Termine, Baustellenberichte, Steuervorbereitung, Website, Personalplanung, Abrechnung mit der Hausverwaltung. Meist abends am Küchentisch oder in der Mittagspause.',
        },
        {
          beruf: 'Hausärztin',
          agenten: 'Arztbrief aus den Notizen, Abgleich der Laborwerte mit Alarm nur bei Auffälligem, vorausgefüllte Überweisungen, Post an die Krankenkassen',
          bleibt: 'Zeit für das Gespräch: merken, dass der ältere Herr nicht wegen der Erkältung kommt, sondern weil er einsam ist',
          highlight: true,
        },
        {
          beruf: 'Lehrer',
          agenten: 'Entwurf der Unterrichtseinheit aus Lernzielen und Lehrplan, Elternbriefe aus Stichpunkten, Vorschläge für Zeugnisformulierungen',
          bleibt: 'Merken, dass ein Schüler seit zwei Wochen still ist, und ihn nach der Stunde ansprechen',
        },
      ]}
    />
  )
}
