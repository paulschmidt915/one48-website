// Everything the home page says, in one place.

export type Part = string | { label: string; href: string }

const about: Part[] = [
  'I bring AI into everyday work at ',
  { label: 'Bertelsmann', href: 'https://www.linkedin.com/in/paul-schmidt-550917178/' },
  ', build my own apps, research what it means for work and society at WU Vienna, and talk about it on my ',
  { label: 'podcast', href: 'https://open.spotify.com/show/7qSUA2thxkiXCXmp8OUFc5' },
  ', on ',
  { label: 'Instagram', href: 'https://www.instagram.com/paulexplainsai/' },
  ' or ',
  { label: 'YouTube', href: 'https://www.youtube.com/@paulexplainsai' },
  '.',
]

export type Project = {
  slug: string
  name: string
  kind: string
  /** Square logo in public/projects. */
  logo: string
  /** Short description; links live inside it, as in the sentence on the first page. */
  text: Part[]
  /** Shown instead of a link while a project is not out yet. */
  status?: string
}

const wip = 'WIP, to be released'

// The tiles on the second page, in this order.
const projects: Project[] = [
  {
    slug: 'podcast',
    name: 'Emergence',
    kind: 'Podcast',
    logo: '/projects/podcast.webp',
    text: [
      'Was KI bedeutet: my podcast in German on what AI means for work and society. On ',
      { label: 'Spotify', href: 'https://open.spotify.com/show/7qSUA2thxkiXCXmp8OUFc5' },
      '.',
    ],
  },
  {
    slug: 'insel-der-agenten',
    name: 'Insel der Agenten',
    kind: 'Research',
    logo: '/projects/insel.webp',
    text: ['Seven AI agents share one group chat on an island, each with its own memory and goals. What happens when nobody steers them?'],
    status: 'Ongoing research',
  },
  {
    slug: 'rosenhoefe',
    name: 'Rosenhöfe',
    kind: 'Website',
    logo: '/projects/rosenhoefe.webp',
    text: [
      'The website I built for a cultural venue in Cologne-Ehrenfeld, with events and sign-ups. Live at ',
      { label: 'rosenhoefe-ehrenfeld.de', href: 'https://rosenhoefe-ehrenfeld.de' },
      '.',
    ],
  },
  {
    slug: 'bucketlist',
    name: 'Bucketlist',
    kind: 'iOS app',
    logo: '/projects/bucketlist.webp',
    text: ['Save places you want to go, find them on a map and tick them off. Better than saving them in Google Maps.'],
    status: wip,
  },
  {
    slug: 'nextup',
    name: 'Nextup',
    kind: 'iOS app',
    logo: '/projects/nextup.webp',
    text: ['To-dos and all my calendars in one place, plus flashcards for studying. On iPhone, Mac and the web.'],
    status: wip,
  },
  {
    slug: 'gymtracker',
    name: 'Gymtracker',
    kind: 'iOS app',
    logo: '/projects/gymtracker.webp',
    text: ['A strength and mobility training log for iPhone and Apple Watch, synced to Apple Health.'],
    status: wip,
  },
  {
    slug: 'foodtracker',
    name: 'Foodtracker',
    kind: 'iOS app',
    logo: '/projects/foodtracker.webp',
    text: ['Calories, macros, recipes and favourites: tracking what I eat in as few taps as possible.'],
    status: wip,
  },
  {
    slug: 'what-to-wear',
    name: 'What to Wear',
    kind: 'iOS app',
    logo: '/projects/wtw.webp',
    text: ['Photograph your clothes, get a digital wardrobe and outfit ideas, drawn as a collage.'],
    status: wip,
  },
  {
    slug: 'bunch',
    name: 'Bunch',
    kind: 'iOS app',
    logo: '/projects/bunch.webp',
    text: ['Party games in German: join with a code and play live rounds together. Grew out of my quiz You Asked for That.'],
    status: wip,
  },
]

export const site = {
  name: 'Paul Schmidt',
  phrase: 'Turning AI into action.',
  // Which words of the phrase start a new line: three lines on phones, two on wider screens.
  phraseBreaks: { narrow: [1, 3], wide: [2] },
  // Shown small beside the photo. The age is fixed text: update it on your birthday.
  meta: '27, based in Vienna',
  url: 'https://www.one48.de',
  // The sentence below the name; the links live inside it.
  about,
  projects,
  aboutText: about.map((p) => (typeof p === 'string' ? p : p.label)).join(''),
}
