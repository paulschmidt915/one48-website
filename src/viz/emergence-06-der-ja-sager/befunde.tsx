// Stanford University study of eleven leading AI models and their users (Folge 6, 31:19–36:36).
// All values are relative changes as the episode states them.

import { DataTable } from '@/viz/_kit'

export default function Befunde() {
  return (
    <DataTable
      columns={[
        { key: 'was', label: 'Gemessen' },
        { key: 'wert', label: 'Veränderung', format: { unit: ' %', sign: true }, bar: 'diverging', width: '34%' },
      ]}
      rows={[
        {
          was: 'Wie oft die KI Handlungen der Nutzer bestätigt (gegenüber Menschen)',
          wert: 50,
          highlight: true,
          detail: 'Getestet wurden elf Modelle: drei kommerzielle (ChatGPT, Gemini, Claude) und offene wie Llama, Mistral, Qwen und DeepSeek. Alle zeigten das Verhalten.',
        },
        { was: 'Überzeugung der Nutzer, im Recht gewesen zu sein', wert: 62 },
        { was: 'Bereitschaft, dieselbe KI wieder zu nutzen', wert: 13 },
        { was: 'Bereitschaft, sich nach einem Streit zu entschuldigen', wert: -28 },
      ]}
    />
  )
}
