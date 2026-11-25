# Emergence blog posts: the guide

You write (or revise) **one** blog post on Paul's website (one48.de) for **one** episode of his German
podcast *Emergence – Der KI-Podcast*. Eleven other writers do the same for the other episodes, at the
same time, in the same folder. This guide is everything you need. Read it completely before you start.

**What a post is:** German, about **5 minutes** of reading, **600–850 words of text plus 4–6 figures**
that carry information the text does not contain. The website is aimed at businesses: the post must look
like a professional report (think FT, The Economist, a McKinsey or BCG exhibit, a Stripe or Linear
report), not like a playful explainer.

The reference is the demo: `content/blog/emergence-demo.md` with its figures in `src/viz/emergence-demo/`.
Read both before you write anything.

---

## 1. The rules for figures, in short

Paul's words: *"The figures must deliver new information, not be a gimmick. Nothing to really play along
with; at most hovering or expanding. They should replace written text, not supplement it. It has to look
professional, not playful."*

**A figure replaces text.** It carries data, a comparison, a chronology, a structure, a process, a matrix
or a table of key facts. The text does not repeat what the figure shows; it points to it in one clause
("Die Tabelle zeigt, was blieb.") and moves on. Ask of every figure: *which paragraph did it replace?*
If the answer is "none, it illustrates the paragraph", delete the figure.

### Allowed

- Tables of key facts and numbers, with aligned numbers, small bars, expandable rows
- Bar charts, dot plots, range/before-after plots, line charts, small multiples, unit charts ("65 von 100")
- Timelines with **all** events visible
- Process flows, layer stacks (who sits on whom), 2×2 matrices that classify the episode's cases
- Static key numbers (```stat), one sober pull quote
- Interaction **only for detail**: hover/focus tooltips (value, source, a note) and click-to-expand
  (a table row, a timeline event, a step opens its detail text)
- One quiet fade-in of the whole figure on first view (the page does this; you add nothing)

### Not allowed

- Sliders, toggles, tabs or buttons that switch a figure between states. If two states matter, show both
  side by side (`SmallMultiples`, two columns, a `DotPlot` with two values, a grouped `BarChart`)
- Drag, scrub, step-through players, prev/next buttons, autoplay, anything on a timer
- Games, quizzes, "guess first", "try it yourself", simulated chats, sandboxes
- Counters that count up, draw-in lines, bars that grow, anything that moves while the reader reads,
  figures that change while scrolling
- Purely illustrative or metaphorical figures, schematic "explainer toys" (a brain, a funnel of little
  people, a spinning loop), made-up example values, "Demo-Werte"
- Mascots, cartoon figures, emoji-like icons, decorative illustration, chat bubbles as decoration
- A figure that only says what the paragraph next to it already says
- Hover-only information: every figure must be fully readable without touching it (this is also what the
  e-mail and print versions show)

`npm run check-post -- <slug>` flags most of this as errors (section 10).

### Good and bad, by example

| Bad: illustrates the text | Good: replaces text |
|---|---|
| A paragraph tells the history from 1984 to 2025, and a slider steps through the same years. | A `Timeline` with all five dates, a sentence each; the text says "Die Forschung dahinter steht im Zeitstrahl" and goes on with the argument. |
| "Die Entwickler schätzten 24 % schneller, fühlten sich 20 % schneller und waren 19 % langsamer", then a bar chart of the same three numbers. | The text says "Die Entwickler lagen auf der falschen Seite der Null." The `DotPlot` holds the three numbers on one axis with a zero line. |
| A toggle "ohne KI / mit KI" that animates bars between two states. | `SmallMultiples` with both states side by side on the same scale, or a `DotPlot` with two values per row. |
| A schematic loop "Auslagern → weniger Übung → mehr Auslagern" drawn as circles with arrows. | A `DataTable`: four tools (Taschenrechner, Suchmaschine, GPS, KI) × what each takes over, what was lost, what grew. Three paragraphs of history become one exhibit. |
| A cartoon chat that "types" the flattering answers of a chatbot. | A `DataTable` of the documented cases: date, what the user asked, what the model answered, outcome; detail on click. |
| "Stell dir 100 Menschen vor": an animated grid that fills up. | A static `UnitChart` or simply the number in a ```stat block, with the source. |
| A drag-the-line game "Wo war der Ball?". | A `Flow` or `Layers` figure of the decision chain (Torlinientechnik → VAR → Schiedsrichter), each step with its accuracy and the year it came. |

## 2. Your files (and nothing else)

| What | Where |
|---|---|
| The post | `content/blog/<slug>.md` |
| Its figures | `src/viz/<slug>/<name>.tsx` (one file per figure; data files and helpers may sit next to them) |
| Its images | `public/blog/<slug>/…` |

`<slug>` is fixed per episode (table in section 12), e.g. `emergence-03-werden-wir-alle-dumm`.

**Do not touch anything else.** Not `src/lib`, `src/app`, `src/components`, `src/viz/_kit`,
`src/viz/VizMount.tsx`, `globals.css`, `package.json`, `scripts/`, other posts or their folders, `docs/`.
Nothing needs registering: a figure is found by its file name. If the kit lacks something, build it inside
your own folder. If you think the shared code has a bug, say so in your report instead of fixing it.
When you revise a post, delete figure files you no longer use (only in your own folder).

Do not install packages, do not commit, do not push, do not send newsletters, do not read `.env*`.

## 3. Source material

- **The transcript** of your episode is in Paul's Google Drive. Load the tool with ToolSearch
  (`select:mcp__36ff1d0f-6cd7-480b-bd82-989c02880ba5__read_file_content`) and read it by file id (table in
  section 12). A transcript is 35–90 kB; when the tool says the result is too large, it saves it as JSON
  (`{fileContent, title, viewUrl}`) and tells you the path. Read it in slices, e.g.
  `jq -r '.fileContent' <path> | sed -n '1,200p'`, until you have read all of it. The first line says
  `# Folge N — Transkript`: check it is your episode.
- **The episode description** on Spotify (table in section 12) summarises the arc and has the key numbers
  spelled correctly.
- **Ignore** anything called "Skript-Guide", listener statistics, CSV files and the "Folgenspeicher" folder.
- Transcripts are machine-made (Whisper): names and numbers can be garbled ("Chat-GBT", "55%. 80%").
  Cross-check numbers with the Spotify description or the context. **Never invent numbers, studies, dates or
  quotes.** A figure with made-up or "illustrative" values is not allowed. If a number is unclear and you
  cannot verify it, leave it out.
- Figures need real data, so collect while you read: every number, date, comparison, list of actors,
  sequence of steps the episode mentions. That list is your raw material for the figures.
- Sources: name them in the figure's `source:` line (study or institution, year), as the episode does. If the
  episode is the only source you have, write `source: Folge N` or "zitiert in Folge N". Links only if sure.

## 4. The post: structure and length

```
---  front matter (section 5)  ---

Opening (2–3 short paragraphs): the episode's scene, story or striking fact. No "In diesem Beitrag…".

## Section heading            ← 3–5 sections with ## headings, following the episode's arc
One or two paragraphs: the argument, the interpretation, what it means.
A sentence that leads into the figure ("Was die Studie gemessen hat:" / "Die Tabelle zeigt, was blieb.")

```viz name                   ← the facts, numbers, sequence, structure
…
```

Text continues with the next thought, not with a description of the figure.

Optional, once each:  ```stat (1–3 key numbers)   and   ```pull (one sentence of Paul's)

Closing paragraph: the episode's own conclusion or question, in one or two sentences.
```

The page adds the rest itself: the episode line and a "Folge anhören" button above the text, a box
"Die ganze Geschichte: Folge N" with buttons to the episode and the show at the end, then the newsletter
sign-up. **Do not** write your own "Hör dir die Folge an" paragraph or Spotify links.

Division of labour:
- **Text** carries the story, the argument, the interpretation, the voice. Scenes, people, the "why".
- **Figures** carry the material: numbers, dates, comparisons, lists, sequences, who-owns-what.
  Where the old text had a run of numbers, a chronology or an enumeration, that is now a figure.

Length:
- **600–850 words** of text (figures not counted), **4–6 figures**. Reading time is computed as
  230 words a minute plus 24 seconds per figure and should come out at about 5 minutes.
- Short paragraphs (2–4 sentences). Headings short and concrete ("Was das MIT gemessen hat").
- The first figure within the first third. Never two figures in a row without a sentence between them.

## 5. Front matter

```yaml
---
title: Werden wir alle dumm?
date: 2026-11-25
description: Eine MIT-Studie misst weniger Hirnaktivität beim Schreiben mit ChatGPT. Was sie zeigt und was andere Studien ergänzen.
draft: true
lang: de
series: emergence
episode: 3
podcast: https://open.spotify.com/episode/0FUMEvfoSkjbmbNAP5x5AQ
duration: 69
---
```

| Field | Rule |
|---|---|
| `title` | German, short (under ~60 characters), close to the episode's title, without "#3". |
| `date` | `YYYY-MM-DD`. Use the date your task gives you; otherwise `2026-11-25`. |
| `description` | 1–2 sentences, under ~200 characters. Shown under the title, in the post list, link previews and as e-mail preview. A hook, not a table of contents. |
| `draft` | Always `true`. Paul publishes. |
| `lang` | `de` |
| `series` | `emergence` |
| `episode` | The episode number, without leading zero. |
| `podcast` | Spotify link of the episode, exactly as in section 12 (no `?si=…`). No link yet: `https://open.spotify.com/show/7qSUA2thxkiXCXmp8OUFc5`. |
| `duration` | Length of the episode in whole minutes (section 12). |
| `outro` | Optional. One sentence replacing the default text in the closing box, naming what else the episode covers ("In der Folge geht es außerdem um Kahneman und Sokrates."). |

## 6. Building blocks in the Markdown

Normal Markdown (`**fett**`, `*kursiv*`, links, lists, `> Zitat`), plus three blocks written as fenced code
blocks with `key: value` lines.

### Figure: ```viz

````md
```viz befunde
title: Wer sich auf KI verlässt, verliert Können. Wer sie nutzt, gewinnt Qualität
caption: Gemessene Veränderungen in Studien, die die Folge zitiert. Zeilen mit Pfeil haben Details.
source: Darmspiegelungs-Studie (2025); Boston Consulting Group und Harvard (2023)
size: wide
height: 320
```
````

| Key | |
|---|---|
| name (after `viz`) | lower-case, digits, dashes. The component lives in `src/viz/<slug>/<name>.tsx`. |
| `title` | Required. An **action title**: the takeaway as a statement ("Gefühlt 20 % schneller, gemessen 19 % langsamer"), not a topic ("Entwickler-Tempo"). |
| `caption` | Required. What is shown, unit, base ("Veränderung der Arbeitszeit durch KI-Werkzeuge"). If there is detail, say so briefly ("Zeilen mit Pfeil haben Details", "Details beim Überfahren"). Never ask the reader to play ("Schalte um", "Zieh den Regler"). |
| `source` | Required for every figure with data. |
| `size` | `column` (default, text width) or `wide` (up to 64rem). Wide for tables with 4+ columns, timelines in `horizontal` layout, flows with 4+ steps, line charts. |
| `height` | Px reserved while the figure loads (roughly its real height; default 360). |
| `image`, `alt` | Optional, e-mail only: a static PNG/JPG/WebP in `public/blog/<slug>/` shown in the newsletter. Not SVG. |

Title, caption and source line are drawn by the page around your component. Your component only draws the
inside: no own card, border, title or source line.

### Key numbers: ```stat

````md
```stat
value: 55 %
label: weniger neuronale Konnektivität in der ChatGPT-Gruppe
---
value: 83 %
label: der ChatGPT-Gruppe konnten aus ihrem eigenen Essay nicht zitieren
source: Kosmyna et al., MIT Media Lab (2025)
```
````

1–3 static numbers in a row, separated by `---`; at most one block per post, for the numbers the episode
hangs on. German number format (`1.000`, `1,5 Mio.`, `83 %`, `−20 %`). Keep the value short; qualifiers
("bis zu") go into the label.

### Pull quote: ```pull

````md
```pull
Wir wissen etwas nicht und wissen noch nicht einmal das.
— Paul in Folge 3
```
````

At most one per post: a real sentence from the episode (lightly smoothed), or of a person quoted in it.

### Images

`![Beschreibung](/blog/<slug>/bild.webp)` with the file in `public/blog/<slug>/`. WebP or JPG for photos,
PNG for screenshots, under ~300 kB, at least 1200 px wide. Only images you may use. No SVG in Markdown.
Usually not needed: no decorative images.

## 7. Writing German: tone

- **Paul's voice**, first person where it fits. Clear, precise, a little personal, never breathless. The
  readers are professionals; write like a good business column, not like social media.
- **Condense, don't transcribe.** No "also", "sozusagen", "genau", no greetings, no "in dieser Folge".
- **Concrete over abstract.** Keep the episode's scenes, people and cases.
- **Don't narrate the figure.** Point to it in one clause and continue with the next thought.
- **No filler and no AI tone:** no "spannend", "eintauchen", "In einer Welt, in der…", "Es ist wichtig zu
  betonen", "Fazit:", chains of rhetorical questions, emoji, hashtags.
- **Address:** only if the episode speaks to listeners; then sparingly with **du**. Never "Sie".
- **Typography:** „Anführungszeichen“, dash with spaces – like this, `83 %`, `1.000`, `1,5 Mio.`,
  `2,4 Mrd. Dollar`, "13. Juni 2026".
- **Sensitive topics.** Episode 6 deals with the death of a 19-year-old, overdose and suicide. A short
  content note in italics at the top (*Hinweis: Dieser Beitrag handelt von …*), no details of methods, no
  figure about the death itself, and a last line: *Wenn es dir nicht gut geht: Die Telefonseelsorge ist rund
  um die Uhr erreichbar unter 0800 111 0 111 oder 0800 111 0 222, online unter online.telefonseelsorge.de.*

## 8. Figures: look and form

**Pick the form by the content:**

| The content | Use |
|---|---|
| Key facts about a study, a company, a law; a comparison of 3–8 things across 2–4 attributes | `DataTable` |
| A run of numbers (effects, shares, costs) | `DataTable` with `bar`, or `BarChart` |
| Changes around zero (−19 %, +40 %) | `DataTable` with `bar: 'diverging'`, or `BarChart` with negatives |
| Expectation vs. reality, then vs. now, two values per case | `DotPlot` with two values (series names above the dots) |
| A ranking | `DotPlot` or `BarChart` with `highlight` on the one that matters |
| Growth over years | `LineChart` (`highlight` the series the title is about; `log` across orders of magnitude) |
| The same measure for several cases, or two states of one thing | `SmallMultiples` (with `Sparkline`, `UnitChart`, `BarChart` inside, same scale) |
| A share of people or things ("65 von 100") | `UnitChart`, or just a ```stat number |
| A chronology | `Timeline` (vertical; `horizontal` for 3–5 events in a wide figure) |
| How something works, step by step; a study design | `Flow` |
| A stack: technology layers, value chain, who depends on whom | `Layers` |
| The episode's cases classified on two dimensions | `Matrix` (quadrants with the cases listed inside) |

**Design rules** (the series must look like one):
- **Action title** in the Markdown; the figure itself has no title.
- **Colour:** one accent plus greys. `color.accent` for what the title is about, `color.base` for the
  comparison values, `color.rest` for background marks. The kit does this when you mark one row, bar, event
  or step with `highlight: true`. More colours (`color.series[…]`) only for real categories that must be
  told apart; `color.pos` / `color.neg` only for plus/minus. Never colour by value, never a rainbow.
- **No left accent stripes, ever:** no box, card, row, quote or highlighted item with a coloured bar on its
  left edge (`border-left`, inset left shadow, a thin pseudo-element bar). Paul explicitly rejects this look.
  The kit marks highlights with accent-coloured text, a quiet tint or a thin full outline; check-post flags stripes.
- **Direct labels instead of legends** where possible: values at the bar ends, names at the line ends,
  series names above the dots. The kit does this.
- **Numbers:** German format via `fmt()`, aligned (tables and axes use tabular figures), units in the
  column head or after the number, never in a legend.
- **Annotations** for what the reader must notice: a reference line (`DotPlot` `reference`, `LineChart`
  `annotations`), a highlighted row. Short notes under a chart: `<p className="vk-note">`.
- Thin marks, hairline grids, one y-axis only (two measures = two charts).
- Text never in data colours: labels in `color.ink`, `color.ink2`, `color.muted`.
- No 3D, no shadows on marks, no pie charts, no gauges, no icons, no illustrations.
- Light theme only; the font is inherited.
- Every figure works at **320 px width** (the kit's parts reflow: tables become one block per row, flows
  and timelines go vertical) and with **touch** (tooltips open on tap; nothing important is hover-only).
- Data lives **in your file**, as arrays at the top, with a comment where each number comes from.

## 9. Writing a figure component

`src/viz/<slug>/<name>.tsx`:

```tsx
// Measured effects of working with AI, from the studies the episode cites (Folge 3, 32:27–36:10).

import { DataTable } from '@/viz/_kit'

export default function Befunde() {
  return (
    <DataTable
      columns={[
        { key: 'wer', label: 'Wer' },
        { key: 'was', label: 'Gemessen' },
        { key: 'effekt', label: 'Veränderung', format: { unit: ' %', sign: true }, bar: 'diverging' },
      ]}
      rows={[
        { wer: 'Ärztinnen und Ärzte', was: 'Auffälligkeiten erkannt, nachdem die KI wegfiel', effekt: -20, highlight: true,
          detail: 'Darmspiegelung, Studie von 2025: erst mit KI-Unterstützung, dann ohne.' },
        { wer: 'Berater (BCG)', was: 'Qualität der Ergebnisse', effekt: 40 },
      ]}
    />
  )
}
```

Rules:
- **Default export**, a component **without props**, file named like the `viz` name in the Markdown.
- Imports **only** from `react`, `@/viz/_kit` and files in your own folder. No `next/*`, no `@/components`,
  no other posts, no new packages. `'use client'` is not needed.
- Prefer the kit parts. A custom SVG/HTML figure is fine when the content needs it (a specific structure, a
  map of actors), built with the same tokens (`color.*`, `fmt`, `className="vk"`, `useTooltip`, `Expand`).
- State only for detail: which row/event/item is open or selected (`useState<string | null>(null)`,
  `setOpen(open === id ? null : id)`). Nothing else changes.
- No `window`/`document` at the top level of the file; no timers, no animation, no CSS `@keyframes`.
- Styles: kit classes, SVG attributes, inline styles with kit colours, or a CSS module next to the file.
- Keep it small: usually 20–120 lines, most of it data.

How it gets onto the page: the ```viz block becomes a placeholder `<div data-viz="<slug>/<name>">`;
`src/viz/VizMount.tsx` loads `src/viz/<slug>/<name>.tsx` by its file name in the browser. A missing file or a
crash shows a red box in development and is left out in production; it never breaks the page.

## 10. The e-mail fallback

Every post is also sent as a newsletter from the same Markdown. E-mail cannot run figures (and Gmail shows
no SVG), so each ```viz block becomes a grey card with "GRAFIK", the **title**, the optional `image:`, the
**caption** and the link **"Grafik interaktiv ansehen →"** to the figure on the website. ```stat shows as
big numbers, ```pull as a quote, and the episode line and a "Folge anhören" box are added.

So: the **action title must state the takeaway** (it is all an e-mail reader gets of the figure), and the
text must still make sense without the figures. Where a figure replaced a paragraph, keep the one clause
that names its finding ("Die Entwickler lagen auf der falschen Seite der Null.").

## 11. Checking your work

```bash
npm run check-post -- <slug>
```

It only reads files, so it is safe while the other writers work. It checks the front matter, length and
number of figures, titles/captions/sources, that each figure file exists with a default export, your
images and imports, **the interaction rules** (errors for `Slider`, `Toggle`, `Controls`, `CountUp`,
`useTween`, `useScrollProgress`, `setInterval`, `requestAnimationFrame`, form controls, drag and pointer-down
handlers, step state like `setStep(s + 1)`, player/quiz state and buttons, CSS animations, captions that ask
the reader to play), TypeScript for your folder, a test render of every figure, and the e-mail version.
Fix every **✗**; read every **!**. Hover/focus tooltips and click-to-expand state pass.

**Do not run** `npm run dev`, `next dev`, `npm run build`, `next build` or `npm install`: twelve writers would
fight over the same build folder and port. (`npx tsc --noEmit --incremental false` is allowed but checks the
whole repository, including the other writers' half-finished files.)

Check by reading your code what the script cannot see:
- Does each figure replace a paragraph? Is anything in the text repeated in a figure (or vice versa)?
- Is every figure readable without hovering or clicking? Would it work printed?
- Does it work at 320 px (no fixed widths above ~300 px; use `useSize()` for custom SVGs)?
- German labels, German number format, a source on every data figure.

## 12. The episodes

| Nr | Slug | Spotify title | Episode link (`podcast:`) | Min. | Transcript file id |
|---|---|---|---|---|---|
| 1 | `emergence-01-project-glasswing` | #1 Claude Mythos. Warum Anthropic seine beste KI einsperrt | https://open.spotify.com/episode/4DRZMa0ORP3E8r74B9pFk5 | 39 | `1rprM5W8MMuyp9JqcEBnMf7wZqSAAjGEJ` |
| 2 | `emergence-02-kampf-der-kontinente` | #2 KI und Energie. Was bestimmt die KI-Vorherrschaft | https://open.spotify.com/episode/15Wzy2trdVjrQ9rKEeo6kO | 51 | `1owDtXX9jTIfgCFsnoMkvIIcUOqmXARaq` |
| 3 | `emergence-03-werden-wir-alle-dumm` | #3 Macht KI uns dumm? Und wenn ja, wäre das so schlimm? | https://open.spotify.com/episode/0FUMEvfoSkjbmbNAP5x5AQ | 69 | `17ZvNM4sgQoPZmqB3Bvn4OrLsui9CzqDh` |
| 4 | `emergence-04-wir-nutzen-ki-falsch` | #4 KI richtig nutzen. Drei Hebel für deine Arbeit mit KI | https://open.spotify.com/episode/36J7sumgfxOuKyExw5YYrd | 50 | `1zjsynrVroGi5SJNnaaRQup6w6dLpO7y-` |
| 5 | `emergence-05-ki-musik` | #5 KI-Musik. Was kann der Mensch besser als die KI? | https://open.spotify.com/episode/7t2L6QwaImRnu8JmldYhM1 | 96 | `1cG46X86lw4qDEFSyIiB9hXxBh4rEHFuI` |
| 6 | `emergence-06-der-ja-sager` | #6 Der Ja-Sager. ChatGPTs gefährlichstes Feature | https://open.spotify.com/episode/0ctxLhK4ds25fSNN3tLPuw | 70 | `1quT5VoU_TeAeK4cdgjs9T1T3_vG5W_r-` |
| 7 | `emergence-07-daten-rohstoff` | #7 Daten als neues Gold. Wie Startups versuchen, an deine Daten zu kommen. | https://open.spotify.com/episode/6UP38qm0wNoupMSQLjYgfV | 45 | `1-CW68lb2Xu47_XPCGHrmTBSvslCLuRZd` |
| 8 | `emergence-08-neue-jobs` | #8 KI-Agenten. Wie sich unsere Arbeit verändern wird. | https://open.spotify.com/episode/4SfDggANdYD56xhBrmYTM5 | 35 | `10Kx-HQt6M0xIoyZGQPAi6xvrQ5gZB5Me` |
| 9 | `emergence-09-tech-nationalism` | #9 Tech-Nationalismus. Warum Claude Fable wirklich verboten wurde. | https://open.spotify.com/episode/5qGmQR6KNd3AQiP0QJaFvp | 52 | `1tS21Wwz5lL_rMyyVxGZXD7Spzg6e9883` |
| 10 | `emergence-10-grundeinkommen` | #10 Bedingungsloses Einkommen. Wann werden wir endlich arbeitslos? | https://open.spotify.com/episode/5AKhZWIMA7EjX6Bjx2t3BO | 37 | `1KTC25EHnppIG342oLT6kBzUEsyip2cih` |
| 11 | `emergence-11-ki-im-fussball` | #11 KI im Fußball. Im Zwiespalt zwischen Technik und Legenden. | https://open.spotify.com/episode/3VkVYGkKmlzlKRbWTNrqy7 | 44 | `10rjop8H1KASyAw2wG_LNvRZtHOz7RZ1J` |
| 12 | `emergence-12-peter-thiel` | not found on Spotify yet | use the show link (section 5) unless your task gives one | – | not found; ask, or search Drive (below) |

The transcript ids were matched by keyword search, so check the first line (`# Folge N`). All transcripts are
named `07_Transkript.md`, one per episode folder. To search yourself: load
`mcp__36ff1d0f-6cd7-480b-bd82-989c02880ba5__search_files` and query
`title contains 'Transkript' and fullText contains '<a word from your episode>'` with
`excludeContentSnippets: true`. The Spotify search tool (`mcp__d4fe60ed-9ec7-4aa1-96e2-41d12c1aac83__search`)
finds episode links and descriptions.

## 13. Kit reference

Import from `@/viz/_kit`. Each file in `src/viz/_kit/` starts with an example; the demo figures in
`src/viz/emergence-demo/` show real use. All parts are static; `highlight: true` marks the item the title
is about; `note` adds a hover/focus tooltip; `detail` adds click-to-expand text.

```tsx
// Table: aligned numbers, optional small bars, one highlighted row, rows that open on click.
<DataTable
  columns={[
    { key: 'werkzeug', label: 'Werkzeug', width: '22%' },
    { key: 'anteil', label: 'Anteil', format: { unit: ' %' }, bar: true },        // bar: true | 'diverging'
    { key: 'kosten', label: 'Kosten', format: (v) => compact(v, { unit: ' $' }) },
  ]}
  rows={[{ werkzeug: 'GPS', anteil: 40, kosten: 2e9, highlight: true, detail: 'Längerer Text …' }]}
  total={{ werkzeug: 'Summe', anteil: 100 }}            // optional bold last line
/>
// Text cells are fine too (a comparison matrix). Cell content can be custom: { key, label, cell: (row) => … }.
// On phones, tables with 3+ columns become one block per row.

// Bars: value at the tip, labels in a left column on wide figures. Negative values grow left of zero.
<BarChart unit=" %" sign data={[{ label: 'Tempo', value: -19, highlight: true }, { label: 'Qualität', value: 40 }]} />
<BarChart series={['2016', '2026']} unit=" %" data={[{ label: 'USA', value: [40, 61] }]} />  // grey then accent

// Dot plot: ranking, or two values per row (then vs. now, forecast vs. actual), optional reference line.
<DotPlot unit=" %" sign min={-30} max={30} reference={{ value: 0, label: 'kein Effekt' }}
  rows={[{ label: 'Erwartet', value: 24 }, { label: 'Gemessen', value: -19, highlight: true, note: '16 Entwickler …' }]} />
<DotPlot series={['2016', '2026']} sort="desc" rows={[{ label: 'USA', value: [40, 61] }, { label: 'EU', value: [25, 12] }]} />

// Lines: crosshair tooltip, names at the line ends, one highlighted series in the accent, others grey.
<LineChart x={[2019, 2020, 2021, 2022]} highlight="China" unit=" GW" log={false}
  annotations={[{ x: 2022, label: 'ChatGPT' }]}
  series={[{ name: 'China', values: [5, 9, 18, 35] }, { name: 'USA', values: [10, 12, 15, 20] }]} />

// Small multiples: the same small chart per case, same scale. Sparkline = a line without axes.
<SmallMultiples min="10rem" panels={[
  { title: 'China', value: '90 GW', content: <Sparkline values={[5, 9, 18, 35, 60, 90]} labels={['2019', '2024']} max={90} /> },
  { title: 'USA', value: '45 GW', content: <Sparkline values={[10, 12, 15, 20, 30, 45]} labels={['2019', '2024']} max={90} highlight={false} /> },
]} />

// Timeline: all events visible; `detail` opens on click; `gaps` shows "14 Jahre später".
<Timeline events={[{ date: '1998', title: 'Clark: der erweiterte Geist', text: '…' },
  { date: '2025-06', title: 'Die MIT-Studie', text: '…', highlight: true, detail: '…' }]} />
<Timeline layout="horizontal" events={[…3–5 events…]} />       // columns on wide figures (size: wide)
// date: "2016", "2016-07", "2016-07-06" or "-370" (v. Chr.); `when` overrides the shown text.

// Flow: a process in 3–6 numbered steps, left to right on wide figures, top to bottom on phones.
<Flow steps={[{ title: 'Drei Gruppen', value: '54', text: '…' }, { title: 'Sitzung 4: Tausch', text: '…', highlight: true, detail: '…' }]} />

// Layers: a stack, each layer with a short verdict on the right.
<Layers layers={[{ title: 'Modelle', aside: 'USA 80 %', text: '…', highlight: true }, { title: 'Chips', aside: 'Taiwan' }]} />

// 2×2 matrix: quadrants top-left, top-right, bottom-left, bottom-right, with the cases listed inside.
<Matrix x={{ label: 'Leistung heute', low: 'schlechter', high: 'besser' }}
  y={{ label: 'Können morgen', low: 'verliert', high: 'gewinnt' }}
  quadrants={[{ title: '…', items: ['…'] }, { title: '…', highlight: true }, { title: '…' }, { title: '…' }]} />

// Unit chart: "65 von 100". legend={false} inside small multiples.
<UnitChart total={100} groups={[{ label: 'verstanden', value: 65 }]} restLabel="nicht verstanden" unit=" von 100" />

// Static key numbers inside a figure (between paragraphs use ```stat).
<Stats items={[{ value: 54, label: 'Studierende' }, { value: 1.5, decimals: 1, unit: ' Mio.', label: 'Songs' }]} />

// Your own figure: tokens and helpers
import { color, fmt, compact, Expand, Tooltip, TipRow, useSize, useTooltip } from '@/viz/_kit'
const [box, { width }] = useSize<HTMLDivElement>()     // measure, draw the SVG to fit
const tt = useTooltip<Item>()                            // <div ref={tt.ref} className="vk"> … <g {...tt.bind(item)} tabIndex={0}>
                                                         // <Tooltip tip={tt.tip}>{(it) => <><strong>{fmt(it.v)}</strong>{it.label}</>}</Tooltip>
<Expand label="Methode">…</Expand>                       // click-to-expand detail
```

Helpers: `fmt(1234.5)` → `1.234,5`; `fmt(83, { unit: ' %' })` → `83 %`; `fmt(-3, { sign: true })` → `−3`;
`compact(2_400_000_000)` → `2,4 Mrd.`; `ticks(0, 87)`, `niceMax(87)` → `100`.

Colours (`color.*`): `accent`, `base`, `rest`, `accentWash`, `pos`, `neg`, `series[0…7]` (real categories
only), `ink`, `ink2`, `muted`, `grid`, `line`, `axis`, `surface`. Class names: `vk` (root of a custom figure),
`vk-note` (note under a chart), `vk-kicker` (small heading above a block), `vk-num` (tabular figures).

**Not allowed** (still exported only so older figures compile; the check reports them): `Slider`, `Toggle`,
`Controls`, `CountUp`, `useTween`, `useScrollProgress`. `Reveal` and `useReveal` are not needed: every figure
already fades in once.

## 14. Final checklist

- [ ] Only files in `content/blog/<slug>.md`, `src/viz/<slug>/`, `public/blog/<slug>/` were created, changed or deleted.
- [ ] Front matter complete: title, date, description, `draft: true`, `lang: de`, `series: emergence`, `episode`, `podcast`, `duration`.
- [ ] 600–850 words of text, 4–6 figures, about 5 minutes reading time.
- [ ] Every figure replaces text: it carries numbers, dates, comparisons or structure the text does not repeat.
- [ ] Every figure has an action title, a caption with unit/base, and a source line; no made-up values.
- [ ] Interaction only for detail (hover/focus tooltips, click-to-expand); every figure fully readable without it.
- [ ] Nothing moves, counts, steps, plays or toggles. No illustrations, icons, mascots, chat bubbles.
- [ ] One accent plus greys; extra colours only for real categories; direct labels; German number format.
- [ ] German throughout, Paul's voice, no filler, no own Spotify links in the text.
- [ ] Text readable without the figures (e-mail): each figure's finding named in one clause.
- [ ] `npm run check-post -- <slug>` shows no ✗.
- [ ] Your report lists the files you created or deleted, each figure with the paragraph it replaced, any number you could not verify, and anything in the shared code you think is wrong.
