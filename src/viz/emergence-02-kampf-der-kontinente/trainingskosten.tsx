// Training cost of one model, DeepSeek V3 against three US models (Folge 2, 13:17 and 22:18–23:32).

import { DataTable, fmt } from '@/viz/_kit'

const DEEPSEEK = 5.6 // Mio. $, final training run of DeepSeek V3, the base model of R1

const rows = [
  {
    modell: 'DeepSeek V3 (Basis von R1)',
    jahr: '2024',
    kosten: DEEPSEEK,
    faktor: 1,
    highlight: true,
    detail: 'Nur der letzte Trainingslauf: 2.048 Nvidia-H800-Chips, rund 55 Tage. Forschung, Experimente und die eigene Chip-Flotte sind nicht enthalten; Analysten schätzen DeepSeeks Gesamtinvestitionen auf über 1 Mrd. $.',
  },
  { modell: 'GPT-4 (OpenAI)', jahr: '2023', kosten: 100, faktor: 100 / DEEPSEEK, detail: 'Laut Sam Altman „mehr als“ 100 Mio. $.' },
  { modell: 'Gemini Ultra (Google)', jahr: '2024', kosten: 191, faktor: 191 / DEEPSEEK, detail: 'Schätzung des Stanford AI Index.' },
  { modell: 'GPT-5 (OpenAI)', jahr: '2025', kosten: 500, faktor: 500 / DEEPSEEK, detail: 'Untere Schätzung für einen Trainingslauf; Gesamtschätzungen reichen bis 2,5 Mrd. $.' },
]

export default function Trainingskosten() {
  return (
    <DataTable
      columns={[
        { key: 'modell', label: 'Modell', width: '34%' },
        { key: 'jahr', label: 'Jahr', width: '10%' },
        { key: 'kosten', label: 'Training, Mio. $', format: { unit: '' }, bar: true },
        { key: 'faktor', label: 'Vielfaches von DeepSeek', format: (v) => `${fmt(Math.round(v))}×` },
      ]}
      rows={rows}
    />
  )
}
