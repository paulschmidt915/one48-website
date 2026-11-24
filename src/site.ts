// Everything the home page says, in one place.

type Part = string | { label: string; href: string }

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
  aboutText: about.map((p) => (typeof p === 'string' ? p : p.label)).join(''),
}
