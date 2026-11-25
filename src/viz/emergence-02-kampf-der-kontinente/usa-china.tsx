// Two strategies for the same goal, USA and China side by side (Folge 2, 38:06–44:33; Stanford AI Index 2026).

import { DataTable } from '@/viz/_kit'

export default function UsaChina() {
  return (
    <DataTable
      columns={[
        { key: 'ebene', label: 'Ebene', width: '18%' },
        { key: 'usa', label: 'USA' },
        { key: 'china', label: 'China' },
      ]}
      rows={[
        { ebene: 'Modelle', usa: 'Spitze der Benchmarks: OpenAI, Anthropic, Google, Meta', china: 'DeepSeek, Qwen und Dutzende weitere, viele offen; nur noch 2,7 % hinter den USA' },
        {
          ebene: 'Kapital',
          usa: '285,9 Mrd. $ private KI-Investitionen 2025',
          china: '12,4 Mrd. $ private KI-Investitionen 2025',
          detail: 'Chinas Staat lenkt zusätzlich Geld über staatliche Fonds, die in diesen Zahlen nicht enthalten sind.',
        },
        { ebene: 'Chips', usa: 'Nvidia, die größten Rechencluster', china: 'Huaweis Ascend 910C; US-Exportverbot für Spitzenchips seit 2022' },
        {
          ebene: 'Energie',
          usa: 'Atomkraft wiederbeleben und neu bauen, bis dahin Gas',
          china: 'Wind und Sonne: knapp die Hälfte der installierten Leistung (Ende 2025), Kohle als Reserve',
          highlight: true,
          detail: 'Bei der tatsächlich erzeugten Energie dominiert in China weiter die Kohle.',
        },
        { ebene: 'Netz', usa: 'Netzausbau braucht Jahre; in Virginia reicht der Strom schon nicht', china: 'Ultrahochspannungsleitungen tragen Wüstenstrom an die Ostküste' },
        { ebene: 'Wer steuert', usa: 'Konzerne und Märkte', china: 'Ein Staat, der Chips, Modelle und Netz zugleich ausbaut' },
      ]}
    />
  )
}
