// Everything the home page says, in one place.

export type Part = string | { label: string; href: string }

const about: Part[] = [
  'I bring AI into everyday work at ',
  { label: 'Bertelsmann', href: 'https://www.linkedin.com/in/paul-schmidt-550917178/' },
  ', build my own ',
  { label: 'apps', href: '#projects' },
  ', research what it means for work and society at WU Vienna, and talk about it on my ',
  { label: 'podcast', href: 'https://open.spotify.com/show/7qSUA2thxkiXCXmp8OUFc5' },
  ', on ',
  { label: 'Instagram', href: 'https://www.instagram.com/paulexplainsai/' },
  ' or ',
  { label: 'YouTube', href: 'https://www.youtube.com/@paulexplainsai' },
  '.',
]

/** One screenshot in the phone viewer, from public/projects/screens/<slug>/. */
export type Screen = { src: string; caption: string }

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
  /** Screenshots for the phone viewer ("Look inside"), apps only. */
  screens?: Screen[]
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
    screens: [
      { src: '/projects/screens/bucketlist/1-intro.webp', caption: 'The places you don\'t want to forget, in one app.' },
      { src: '/projects/screens/bucketlist/2-map.webp', caption: 'Every saved place on the map, and how many of a city you have seen.' },
    ],
  },
  {
    slug: 'nextup',
    name: 'Nextup',
    kind: 'iOS app',
    logo: '/projects/nextup.webp',
    text: ['To-dos and all my calendars in one place, plus flashcards for studying. On iPhone, Mac and the web.'],
    status: wip,
    screens: [
      { src: '/projects/screens/nextup/1-courses.webp', caption: 'Every course on one page, with the next to-dos and the cards due today.' },
      { src: '/projects/screens/nextup/2-course.webp', caption: 'A course: its lectures, and what still needs doing for the next one.' },
      { src: '/projects/screens/nextup/3-calendar.webp', caption: 'To-dos and all calendars together in one day.' },
      { src: '/projects/screens/nextup/4-flashcards.webp', caption: 'Flashcards per course, with spaced repetition.' },
      { src: '/projects/screens/nextup/5-new.webp', caption: 'A new to-do in a few taps, with course, day and time.' },
    ],
  },
  {
    slug: 'gymtracker',
    name: 'Gymtracker',
    kind: 'iOS app',
    logo: '/projects/gymtracker.webp',
    text: ['A strength and mobility training log for iPhone and Apple Watch, synced to Apple Health.'],
    status: wip,
    screens: [
      { src: '/projects/screens/gymtracker/1-today.webp', caption: 'The month at a glance, with the workout that is running right now.' },
      { src: '/projects/screens/gymtracker/2-circuit.webp', caption: 'A kettlebell circuit: set the weights for every round.' },
      { src: '/projects/screens/gymtracker/3-clock.webp', caption: 'The clock runs, one tap per finished round.' },
      { src: '/projects/screens/gymtracker/4-summary.webp', caption: 'After the workout: rounds, time and the muscles it trained.' },
    ],
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
    screens: [
      { src: '/projects/screens/wtw/1-outfits.webp', caption: 'Outfit ideas for today, for the occasion and the weather.' },
      { src: '/projects/screens/wtw/2-look.webp', caption: 'A look as a collage, with why it works.' },
      { src: '/projects/screens/wtw/3-wardrobe.webp', caption: 'The whole wardrobe, photographed and cut out.' },
      { src: '/projects/screens/wtw/4-item.webp', caption: 'One piece with its colour, material and brand.' },
      { src: '/projects/screens/wtw/5-builder.webp', caption: 'Build your own outfit from the wardrobe.' },
    ],
  },
  {
    slug: 'bunch',
    name: 'Bunch',
    kind: 'iOS app',
    logo: '/projects/bunch.webp',
    text: ['Party games in German: join with a code and play live rounds together. Grew out of my quiz You Asked for That.'],
    status: wip,
    screens: [
      { src: '/projects/screens/bunch/1-games.webp', caption: 'A catalogue of party games, one phone per player.' },
      { src: '/projects/screens/bunch/2-lobby.webp', caption: 'Join a lobby and build your own face.' },
      { src: '/projects/screens/bunch/3-vibes.webp', caption: 'Vibes: place each other on a triangle of words.' },
      { src: '/projects/screens/bunch/4-prompt.webp', caption: 'Prompt: everyone writes a secret prompt, the AI answers, you vote.' },
      { src: '/projects/screens/bunch/5-rally.webp', caption: 'Rally: answer in turn, whoever misses loses a life.' },
    ],
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
