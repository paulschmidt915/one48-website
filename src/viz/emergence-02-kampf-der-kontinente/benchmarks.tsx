// Scores of the three big US providers in three benchmarks (Stand April 2026), from the episode's research.

import { DataTable } from '@/viz/_kit'

type R = { modell: string; mmlu: number | null; gpqa: number | null; hle: number | null; highlight?: boolean; detail?: string }

const rows: R[] = [
  { modell: 'Google Gemini', mmlu: 94.1, gpqa: 94.1, hle: 46.4, detail: 'In allen drei Tests: Gemini 3.1 Pro Preview.' },
  { modell: 'OpenAI GPT', mmlu: 91.4, gpqa: 92, hle: 44.3, detail: 'MMLU: GPT-5.2. GPQA Diamond: GPT-5.4, je nach Messung 92 bis 94 %. Last Exam: GPT-5.4 Pro.' },
  { modell: 'Anthropic Claude', mmlu: 90.5, gpqa: 89.2, hle: 34.4, detail: 'In allen drei Tests: Claude Opus 4.6.' },
  { modell: 'Fachleute im eigenen Gebiet', mmlu: null, gpqa: 65, hle: null, detail: 'Doktorand:innen beantworten GPQA-Fragen aus ihrem eigenen Fach zu rund 65 % richtig. Fachfremde mit Internetzugang schaffen 34 %.' },
]

const pct = { unit: ' %' }

export default function Benchmarks() {
  return (
    <div className="vk">
      <DataTable
        columns={[
          { key: 'modell', label: 'Modell', width: '28%' },
          { key: 'mmlu', label: 'MMLU', format: pct, bar: true },
          { key: 'gpqa', label: 'GPQA Diamond', format: pct, bar: true },
          { key: 'hle', label: 'Last Exam', format: pct, bar: true },
        ]}
        rows={rows}
      />
      <p className="vk-note">
        MMLU: 57 Fächer, rund 16.000 Fragen. GPQA Diamond: 198 Fragen von Doktorand:innen aus Biologie, Physik, Chemie.
        Humanity’s Last Exam: die schwersten Fragen von rund 1.000 Fachleuten aus 50 Ländern. Für MMLU und Last Exam
        gibt es keinen vergleichbaren Wert für Menschen.
      </p>
    </div>
  )
}
