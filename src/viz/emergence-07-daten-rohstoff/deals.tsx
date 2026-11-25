// What AI companies pay for access to text, as cited in Folge 7 (05:59–06:39). Replaces the paragraph on licensing deals.

import { DataTable } from '@/viz/_kit'

export default function Deals() {
  return (
    <DataTable
      columns={[
        { key: 'quelle', label: 'Datenquelle', width: '30%' },
        { key: 'kaeufer', label: 'Käufer', width: '16%' },
        { key: 'betrag', label: 'Betrag', width: '24%' },
        { key: 'wofuer', label: 'Wofür' },
      ]}
      rows={[
        {
          quelle: 'News Corp (Wall Street Journal, New York Post)',
          kaeufer: 'OpenAI',
          betrag: 'rund 250 Mio. Dollar',
          wofuer: 'Artikel als Trainingsdaten',
          highlight: true,
          detail: 'Ähnliche Verträge hat OpenAI mit Axel Springer und weiteren großen Verlagen geschlossen.',
        },
        { quelle: 'Reddit', kaeufer: 'OpenAI', betrag: 'rund 70 Mio. Dollar im Jahr', wofuer: 'Zugang zu den Forenbeiträgen' },
        { quelle: 'Reddit', kaeufer: 'Google', betrag: 'rund 60 Mio. Dollar im Jahr', wofuer: 'Zugang zu den Forenbeiträgen' },
      ]}
    />
  )
}
