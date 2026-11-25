// Stage 1 of the episode's "safari" (Folge 7, 14:30–19:14): companies whose data is a by-product of another business.

import { DataTable } from '@/viz/_kit'

export default function Nebenprodukt() {
  return (
    <DataTable
      columns={[
        { key: 'firma', label: 'Firma', width: '18%' },
        { key: 'geschaeft', label: 'Eigentliches Geschäft' },
        { key: 'daten', label: 'Daten, die dabei entstehen' },
        { key: 'umfang', label: 'Umfang', width: '22%' },
      ]}
      rows={[
        { firma: 'Plenty', geschaeft: 'Vertikale Indoor-Farmen', daten: 'Pflanzenwachstum, Licht, Wasser, Temperatur', umfang: 'rund 10 Mio. Datenpunkte am Tag' },
        { firma: 'Recursion', geschaeft: 'Wirkstoffforschung mit Laborrobotern', daten: 'Bilddaten aus Experimenten an Zellkulturen', umfang: 'Millionen Experimente' },
        { firma: 'Tempus AI', geschaeft: 'Genomische Krebsdiagnostik', daten: 'Klinische und genomische Patientendaten', umfang: '50-mal größer als die größte öffentliche Genomdatenbank' },
        {
          firma: 'Medal',
          geschaeft: 'Plattform für Gaming-Clips',
          daten: 'Maus- und Tastatureingaben zu jedem Clip',
          umfang: 'über 2 Mrd. Clips im Jahr',
          highlight: true,
          detail:
            'OpenAI soll 500 Mio. Dollar für Medal geboten haben. Gründer Pim de Witte lehnte ab und gründete das KI-Lab General Intuition, das mit diesen Daten eigene Modelle trainiert.',
        },
      ]}
    />
  )
}
