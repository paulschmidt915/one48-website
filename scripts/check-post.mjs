// Checks one blog post and its figures without starting Next.js, so several people (or agents) can
// run it at the same time: it only reads files and writes nothing.
//
//   node scripts/check-post.mjs <slug>
//   npm run check-post -- <slug>
//
// What it checks:
//   1. the header (title, date, description, series fields for Emergence posts)
//   2. length (words, reading time) and number of figures
//   3. every ```viz block has its file src/viz/<slug>/<name>.tsx with a default export
//   4. images and files the post links to exist under public/blog/<slug>/
//   5. the figures' imports stay inside the post's own folder and the kit, and they follow the
//      interaction rules (hover/focus tooltips and click-to-expand only: no controls, toggles,
//      sliders, drag, step-through, autoplay, count-ups or animation)
//   6. TypeScript: type-checks src/viz/<slug>/ (in memory, nothing written)
//   7. test-renders every figure once (catches crashes on the first render)
//   8. builds the newsletter e-mail and checks it has no SVG, scripts or empty figure boxes
//
// Errors (✗) must be fixed; warnings (!) are worth a look. Exit code 1 when there are errors.

import fs from 'node:fs'
import path from 'node:path'
import { register } from 'node:module'
import { pathToFileURL } from 'node:url'
import ts from 'typescript'

const root = process.cwd()
const slug = process.argv[2]
if (!slug || slug.startsWith('-')) {
  console.error('\n  Which post? node scripts/check-post.mjs <slug>\n')
  process.exit(1)
}

const errors = []
const warnings = []
const notes = []
const error = (m) => errors.push(m)
const warn = (m) => warnings.push(m)
const note = (m) => notes.push(m)
const rel = (p) => path.relative(root, p)

const mdFile = path.join(root, 'content', 'blog', `${slug}.md`)
const vizDir = path.join(root, 'src', 'viz', slug)
const publicDir = path.join(root, 'public', 'blog', slug)

if (!fs.existsSync(mdFile)) {
  console.error(`\n  ✗ There is no content/blog/${slug}.md\n`)
  process.exit(1)
}

// ───────── 1. Header ─────────

const { readPost, formatDate, vizFile } = await import(pathToFileURL(path.join(root, 'src/lib/posts.ts')).href)
const { postEmail } = await import(pathToFileURL(path.join(root, 'src/lib/newsletter.ts')).href)

let post
try {
  post = readPost(slug)
} catch (e) {
  console.error(`\n  ✗ ${e.message}\n`)
  process.exit(1)
}
const source = fs.readFileSync(mdFile, 'utf8')
const header = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
const has = (key) => new RegExp(`^${key}:`, 'm').test(header)

if (!post.description) error('description is missing (one or two sentences: list, link preview, e-mail preview).')
else if (post.description.length > 220) warn(`description is ${post.description.length} characters; keep it under about 200.`)
if (post.title.length > 70) warn(`title is ${post.title.length} characters; shorter titles read better (under about 60).`)
if (!post.draft) warn('draft: true is not set. Keep it until Paul has read the post.')

const emergence = slug.startsWith('emergence-') && slug !== 'emergence-demo'
if (emergence || post.series) {
  if (post.lang !== 'de') error('lang: de is missing.')
  if (!post.series) error('series: emergence is missing.')
  else {
    const n = Number(slug.match(/^emergence-(\d+)/)?.[1])
    if (!post.series.episode) error('episode: <number> is missing.')
    else if (n && post.series.episode !== n) error(`episode: ${post.series.episode} does not match the slug (${n}).`)
    if (!post.series.podcast) error('podcast: <link to the episode> is missing (https://open.spotify.com/episode/…).')
    else if (!/^https:\/\/open\.spotify\.com\/(episode|show)\/[A-Za-z0-9]+$/.test(post.series.podcast))
      warn(`podcast: ${post.series.podcast} — expected https://open.spotify.com/episode/<id> without ?query.`)
    if (!has('duration')) warn('duration: <minutes> is missing (shown as "69 Min." next to the listen button).')
  }
}

// ───────── 2. Length and figures ─────────

const body = source.replace(/^---[\s\S]*?\n---/, '')
const prose = body.replace(/```[\s\S]*?```/g, ' ').replace(/<[^>]+>/g, ' ')
const words = prose.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length
const blocks = [...body.matchAll(/^```(\w+)[^\n]*\n([\s\S]*?)^```/gm)]
const vizBlocks = [...body.matchAll(/^```viz[ \t]+([^\s`]+)[^\n]*\n([\s\S]*?)^```/gm)].map((m) => ({ name: m[1], text: m[2] }))
if (emergence) {
  if (words < 550) warn(`${words} words of text; aim for 600–850.`)
  if (words > 900) warn(`${words} words of text; aim for 600–850. Let the figures carry more and cut what they already show.`)
  if (vizBlocks.length < 4) warn(`${vizBlocks.length} figures; aim for 4–6 information-dense figures.`)
  if (vizBlocks.length > 6) warn(`${vizBlocks.length} figures; 4–6 is the range.`)
  if (post.readingMinutes > 7) warn(`${post.readingMinutes} min reading time; aim for about 5.`)
}
const statBlocks = blocks.filter((b) => b[1] === 'stat').length
if (statBlocks > 1) warn(`${statBlocks} \`\`\`stat blocks; use at most one per post.`)
note(`${words} words, ${vizBlocks.length} figures, ${post.readingMinutes} min reading time`)

for (const b of blocks) if (!['viz', 'pull', 'stat'].includes(b[1]) && b[1] !== '') note(`code block \`\`\`${b[1]}: shown as code (did you mean viz, pull or stat?)`)
if (/^```\s*$/m.test(body.replace(/^```[\s\S]*?^```/gm, ''))) warn('A ``` fence seems to be left open.')

// ───────── 3. Figure files ─────────

const seen = new Set()
for (const v of vizBlocks) {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(v.name)) {
    error(`\`\`\`viz ${v.name}: names are lower-case letters, digits and dashes (e.g. gehirn-aktivitaet).`)
    continue
  }
  if (seen.has(v.name)) error(`\`\`\`viz ${v.name} is used twice; every figure needs its own name.`)
  seen.add(v.name)
  const file = vizFile(slug, v.name)
  if (!fs.existsSync(file)) {
    error(`\`\`\`viz ${v.name}: ${rel(file)} does not exist.`)
    continue
  }
  if (!/export\s+default\b/.test(fs.readFileSync(file, 'utf8'))) error(`${rel(file)} has no default export.`)
  if (!/^title:/m.test(v.text)) warn(`\`\`\`viz ${v.name} has no title: line.`)
  if (!/^caption:/m.test(v.text)) warn(`\`\`\`viz ${v.name} has no caption: line (the e-mail shows only title + caption).`)
  if (!/^source:/m.test(v.text)) warn(`\`\`\`viz ${v.name} has no source: line. Every figure with data needs one.`)
  const title = v.text.match(/^title:\s*(.*)$/m)?.[1] ?? ''
  if (title && title.split(/\s+/).length < 4) warn(`\`\`\`viz ${v.name}: title "${title}" is a label, not a takeaway. State what the figure shows ("Gefühlt schneller, gemessen 19 % langsamer").`)
  const caption = v.text.match(/^caption:\s*(.*)$/m)?.[1] ?? ''
  if (/\b(zieh(e|t)? (den|am|die|das)|schieb|schalte (um|zwischen|oben)|umschalten|schalter|scroll|probier|spiel (mit|selbst|durch)|rate (mal|selbst)|klick dich|regler)\b/i.test(caption))
    error(`\`\`\`viz ${v.name}: the caption asks the reader to play ("${caption.slice(0, 60)}…"). Figures are read, not operated; at most mention that details open on hover or click.`)
  const img = v.text.match(/^image:\s*(\S+)/m)?.[1]
  if (img) checkAsset(img, `image: of ${v.name}`, true)
}

const used = new Set(vizBlocks.map((v) => v.name))
const files = fs.existsSync(vizDir) ? walk(vizDir) : []
for (const f of files) {
  const name = path.relative(vizDir, f).replace(/\.tsx$/, '')
  if (f.endsWith('.tsx') && path.dirname(f) === vizDir && !used.has(name)) note(`${rel(f)} is not used by a \`\`\`viz block (fine if it is a helper).`)
}

// ───────── 4. Images and files ─────────

function checkAsset(url, where, forEmail) {
  if (/^https?:\/\//.test(url) || url.startsWith('#') || url.startsWith('mailto:')) return
  if (!url.startsWith('/')) return warn(`${where}: ${url} — use an absolute path like /blog/${slug}/bild.webp.`)
  if (url.startsWith('/blog/') && !url.startsWith(`/blog/${slug}/`) && !url.startsWith(`/blog/${slug}#`) && url.split('/').length > 3 && /\.\w+$/.test(url))
    warn(`${where}: ${url} — this post's files belong in public/blog/${slug}/.`)
  if (/\.\w{2,5}$/.test(url.split('#')[0])) {
    const file = path.join(root, 'public', url.split('#')[0])
    if (!fs.existsSync(file)) error(`${where}: ${url} — public${url} does not exist.`)
  }
  if (forEmail && /\.svg$/i.test(url)) error(`${where}: ${url} — SVG does not show in Gmail; use PNG, JPG or WebP for anything that also goes into the e-mail.`)
}
for (const m of body.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)) checkAsset(m[1], 'image', true)
for (const m of body.matchAll(/(?<!!)\[[^\]]*\]\(([^)\s]+)/g)) checkAsset(m[1], 'link', false)
for (const m of body.matchAll(/<img[^>]+src="([^"]+)"/g)) checkAsset(m[1], '<img>', true)
if (/<script\b/i.test(body)) error('<script> in the Markdown does not run (and must not go into the e-mail). Put code into a figure.')
if (/<svg\b/i.test(body)) error('<svg> in the Markdown: Gmail drops it. Put drawings into a figure (```viz) instead.')
if (/<figure[^>]+data-viz/i.test(body)) error('Write figures as ```viz <name> blocks, not as <figure data-viz> HTML.')

// ───────── 5. Imports ─────────

for (const f of files.filter((f) => /\.(tsx?|css)$/.test(f))) {
  const code = fs.readFileSync(f, 'utf8')
  for (const m of code.matchAll(/(?:import|export)\s[^'"]*?from\s+['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]|^\s*import\s+['"]([^'"]+)['"]/gm)) {
    const spec = m[1] ?? m[2] ?? m[3]
    const ok =
      spec === 'react' ||
      spec === 'react-dom' ||
      spec === '@/viz/_kit' ||
      spec.startsWith('@/viz/_kit/') ||
      spec.startsWith(`@/viz/${slug}/`) ||
      (spec.startsWith('.') && path.resolve(path.dirname(f), spec).startsWith(vizDir))
    if (!ok) error(`${rel(f)} imports "${spec}". Figures may only import react, @/viz/_kit and files in src/viz/${slug}/.`)
  }
  if (/\bfetch\s*\(/.test(code) && /https?:\/\//.test(code)) warn(`${rel(f)} fetches from the internet; put the data into the file instead.`)
  if (/#[0-9a-f]{6}\b/i.test(code) && f.endsWith('.tsx')) note(`${rel(f)} uses raw hex colours; prefer color.* from the kit so the series stays consistent.`)
}

// ───────── 5b. Interaction rules ─────────
// Figures are business exhibits: readable without interaction. Allowed: hover/focus tooltips and
// click-to-expand / select-to-show-detail. Not allowed: controls, sliders, toggles between states,
// drag, step-through players, autoplay, count-ups, animation loops, games and quizzes.

const banned = {
  Slider: 'a slider',
  Toggle: 'a toggle between states (show both states side by side instead: SmallMultiples, two columns, DotPlot with two values)',
  Controls: 'a control row',
  CountUp: 'a count-up (write the number)',
  useTween: 'an animated value',
  useScrollProgress: 'a figure that changes while scrolling',
}
for (const f of files.filter((f) => /\.(tsx?|css)$/.test(f))) {
  const code = fs.readFileSync(f, 'utf8')
  const where = rel(f)
  const line = (re) => {
    const i = code.search(re)
    return i < 0 ? 0 : code.slice(0, i).split('\n').length
  }
  const kitImports = [...code.matchAll(/import\s*\{([^}]*)\}\s*from\s*['"]@\/viz\/_kit[^'"]*['"]/g)].flatMap((m) => m[1].split(',').map((x) => x.replace(/\btype\b/, '').split(/\s+as\s+/)[0].trim()))
  for (const name of kitImports) if (banned[name]) error(`${where}: imports ${name}: ${banned[name]} is not allowed.`)
  const rules = [
    [/\bsetInterval\s*\(/, 'setInterval: no autoplay or timed changes.'],
    [/\brequestAnimationFrame\s*\(/, 'requestAnimationFrame: no animation loops.'],
    [/type\s*=\s*["']range["']|<input\b|<select\b|<textarea\b/, 'form controls (input, select, range): figures have no controls.'],
    [/\bsetPointerCapture\b|\bonDrag\w*\b|\bdraggable\b|\bonMouseDown\b|\bonTouchStart\b|\bonTouchMove\b|\bonPointerDown\b/, 'pointer/drag handlers: no dragging. For tooltips that also open on tap, spread tt.bind(item) from useTooltip.'],
    [/\bset[A-Z]\w*\(\s*(?:\(?\s*\w+\s*\)?\s*=>\s*)?(?:Math\.(?:min|max)\([^)]*)?\w+\s*[+-]\s*1\b/, 'step state (set…(x + 1)): no step-through, prev/next or players. Show all steps at once.'],
    [/const\s*\[\s*(step|stage|phase|slide|frame|round|tick|playing|isPlaying|autoplay|score|guess|answer|quiz|points|lives|revealed)\b/i, 'state named like a player, game or quiz: not allowed.'],
    [/>\s*(Weiter|Zurück|Nächste[rsn]?|Vorherige[rsn]?|Abspielen|Play|Pause|Start|Starten|Nochmal|Neu starten|Mischen|Würfeln|Raten|Auflösen|Lösung zeigen)\s*</, 'buttons like Weiter/Zurück/Play/Start/Auflösen: no players, games or quizzes.'],
    [/aria-label\s*=\s*["'](Weiter|Zurück|Nächste|Vorherige|Play|Pause|Abspielen)/, 'prev/next or play buttons: show everything at once.'],
    [/@keyframes\b|\banimation\s*:|\banimation(Name|Duration|Delay)\s*:/, 'CSS animation: at most the fade the page already gives every figure.'],
    [/\bautoPlay\b|\bautoplay\b/, 'autoplay.'],
    [/border-left|borderLeft|border-inline-start|borderInlineStart|inset\s+\d+(\.\d+)?(px|rem)\s+0\s+0|`inset \$\{|insetInlineStart/, 'left accent stripe (border-left or an inset left shadow): Paul never wants boxes or rows with a stripe on the left. Mark highlights with the kit (highlight: true) or a quiet tint.'],
  ]
  for (const [re, msg] of rules) if (re.test(code)) error(`${where}:${line(re)} ${msg}`)
  if (/\bsetTimeout\s*\(/.test(code)) warn(`${where}:${line(/\bsetTimeout\s*\(/)} setTimeout: make sure nothing changes on its own.`)
  if (/aria-pressed/.test(code)) warn(`${where}:${line(/aria-pressed/)} pressed-style buttons: only allowed to select an item and show its detail, never to switch the figure between states.`)
  if (/\buseReveal\b|\bReveal\b/.test(code)) note(`${where}: useReveal/Reveal are not needed; every figure already fades in once.`)
  if (/<Timeline\b[^>]*\b(start|even)=/.test(code)) warn(`${where}: Timeline's start/even props are ignored now (all events are shown).`)
}

// ───────── 6. TypeScript ─────────

const tsFiles = files.filter((f) => /\.tsx?$/.test(f))
if (tsFiles.length) {
  const cfgFile = path.join(root, 'tsconfig.json')
  const cfg = ts.readConfigFile(cfgFile, ts.sys.readFile)
  const parsed = ts.parseJsonConfigFileContent(cfg.config, ts.sys, root)
  const options = { ...parsed.options, noEmit: true, incremental: false, tsBuildInfoFile: undefined }
  const program = ts.createProgram([...tsFiles, path.join(root, 'node_modules/next/types/global.d.ts')], options)
  const diags = ts.getPreEmitDiagnostics(program).filter((d) => !d.file || !d.file.fileName.includes('node_modules'))
  for (const d of diags) {
    const msg = ts.flattenDiagnosticMessageText(d.messageText, '\n')
    if (d.file && d.start !== undefined) {
      const { line, character } = d.file.getLineAndCharacterOfPosition(d.start)
      error(`TypeScript ${rel(d.file.fileName)}:${line + 1}:${character + 1} ${msg}`)
    } else error(`TypeScript: ${msg}`)
  }
}

// ───────── 7. Test render ─────────

if (vizBlocks.length && errors.every((e) => !e.startsWith('TypeScript'))) {
  register(pathToFileURL(path.join(root, 'scripts/check-post-loader.mjs')).href)
  const React = (await import('react')).default
  const { renderToString } = await import('react-dom/server')
  const quiet = console.error
  for (const v of vizBlocks) {
    const file = vizFile(slug, v.name)
    if (!fs.existsSync(file)) continue
    const logged = []
    console.error = (...a) => logged.push(a.map(String).join(' '))
    try {
      const mod = await import(pathToFileURL(file).href)
      if (typeof mod.default !== 'function') throw new Error('the default export is not a component')
      renderToString(React.createElement(mod.default))
    } catch (e) {
      const m = String(e?.message ?? e)
      if (/\b(window|document|navigator|localStorage|matchMedia|ResizeObserver|IntersectionObserver)\b.*(not defined|is not a function)/.test(m))
        note(`${v.name}: uses ${m.split(' ')[0]} while rendering. Works in the browser, but moving it into useEffect is safer.`)
      else error(`${v.name}: crashes on its first render: ${m}`)
    } finally {
      console.error = quiet
    }
    for (const l of logged.filter((l) => !/useLayoutEffect does nothing on the server/.test(l)))
      if (/unique "key"|Each child in a list/.test(l)) warn(`${v.name}: React says: ${l.split('\n')[0].slice(0, 200)}`)
      else if (/Warning:/.test(l)) warn(`${v.name}: ${l.split('\n')[0].slice(0, 200)}`)
  }
}

// ───────── 8. E-mail ─────────

try {
  const email = postEmail({ ...post, html: post.emailHtml, dateLabel: formatDate(post.date, post.lang) })
  if (/<svg\b/i.test(email.html)) error('The e-mail contains <svg>; Gmail drops it.')
  if (/<script\b/i.test(email.html)) error('The e-mail contains <script>.')
  if (/viz-stage|data-viz/.test(email.html)) error('The e-mail still contains an interactive placeholder.')
  if (/<figure[^>]*>\s*<\/figure>/.test(email.html)) error('The e-mail contains an empty <figure>.')
} catch (e) {
  error(`Building the e-mail failed: ${e.message}`)
}

// ───────── Report ─────────

console.log(`\n  ${post.title}  (content/blog/${slug}.md)\n`)
for (const n of notes) console.log(`  · ${n}`)
for (const w of warnings) console.log(`  ! ${w}`)
for (const e of errors) console.log(`  ✗ ${e}`)
console.log(errors.length ? `\n  ${errors.length} error(s), ${warnings.length} warning(s).\n` : `\n  ✓ No errors${warnings.length ? `, ${warnings.length} warning(s)` : ''}.\n`)
process.exit(errors.length ? 1 : 0)

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]))
}
