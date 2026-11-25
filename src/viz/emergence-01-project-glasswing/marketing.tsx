// The marketing question: Paul's three objections and the counter-argument to each
// (Folge 1, 24:37–27:35). Replaces the pro/contra paragraphs.

import { DataTable } from '@/viz/_kit'

type R = { punkt: string; verdacht: string; dagegen: string; highlight?: boolean }

const rows: R[] = [
  {
    punkt: 'Das Vorbild GPT-2',
    verdacht: '2019 hielt OpenAI GPT-2 als zu gefährlich zurück. Neun Monate später kam es doch.',
    dagegen: 'GPT-2 erzeugte Text. Mythos hackt Systeme autonom, und eine Veröffentlichung ist nicht geplant.',
    highlight: true,
  },
  {
    punkt: 'Der Börsengang',
    verdacht: 'Anthropic steht vor dem IPO. Ein gefährlich klingendes Modell und große Partnerlogos heben den Wert.',
    dagegen: 'Zwölf Konkurrenten setzen sich nicht für den PR-Gag eines Rivalen an einen Tisch.',
  },
  {
    punkt: 'Die Alarm-Rhetorik',
    verdacht: 'Die Tech-Branche warnt gern vor ihren eigenen Produkten.',
    dagegen: 'Finanzminister und Fed-Chef bestellen die Wall Street nicht für eine Pressemitteilung ein.',
  },
]

export default function Marketing() {
  return (
    <DataTable<R>
      columns={[
        { key: 'punkt', label: 'Punkt', width: '20%' },
        { key: 'verdacht', label: 'Spricht für Marketing' },
        { key: 'dagegen', label: 'Spricht dagegen' },
      ]}
      rows={rows}
    />
  )
}
