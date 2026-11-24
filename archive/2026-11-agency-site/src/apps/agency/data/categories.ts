export type CategorySlug =
  | 'consultancy'
  | 'apps'
  | 'tools'
  | 'research'
  | 'podcast'

export type Category = {
  slug: CategorySlug
  num: string
  title: string
  slogan: string
  description: string
  longDescription: string
  color: string
  glowColor: string
  accent: string
  icon?: string
  icons?: string[]
  highlights: { title: string; description: string }[]
  offerings: string[]
}

export const categories: Category[] = [
  {
    slug: 'consultancy',
    num: '01',
    title: 'BERATUNG',
    slogan: 'Digitale Strategie, geliefert',
    description:
      'KI-Strategie, Anwendungsfall-Analyse und Fahrpläne. Wir bringen Klarheit in den Hype und identifizieren die Hebel mit echtem Geschäftsnutzen.',
    longDescription:
      'Wir helfen Unternehmen dabei, KI nicht als Hype, sondern als Werkzeug zu verstehen. In strukturierten Workshops identifizieren wir die Anwendungsfälle mit dem größten Hebel und liefern einen klaren Fahrplan, mit dem dein Team sofort loslegen kann — ohne Schlagworte, dafür mit messbarem Geschäftsnutzen.',
    color: 'rgba(255,168,0,0.4)',
    glowColor: 'rgba(255,168,0,0.18)',
    accent: '#FFA800',
    icon: '/categorie_icons/beratung.png',
    highlights: [
      {
        title: 'KI-Strategie',
        description:
          'Vom Status quo zur klaren Zielarchitektur. Wir definieren, wo KI für dich wirklich relevant ist.',
      },
      {
        title: 'Anwendungsfall-Bewertung',
        description:
          'Wir bewerten potenzielle Anwendungsfälle nach Aufwand, Risiko und Geschäftsnutzen.',
      },
      {
        title: 'Team-Befähigung',
        description:
          'Praxis-Workshops, in denen dein Team lernt, KI-Werkzeuge souverän einzusetzen.',
      },
      {
        title: 'Anbieter-Auswahl',
        description:
          'Selbst bauen oder zukaufen? Wir helfen bei der nüchternen Bewertung von Modellen, Plattformen und Anbietern.',
      },
    ],
    offerings: [
      'KI-Reifegrad-Analyse für dein Unternehmen',
      'Strategie- und Sondierungs-Workshops mit deinem Team',
      'Priorisierter Anwendungsfall-Fahrplan als Arbeitsdokument',
      'Begleitung beim ersten Pilotprojekt',
      'Empfehlungen zu Eigenentwicklung oder Zukauf von Modellen und Werkzeugen',
    ],
  },
  {
    slug: 'apps',
    num: '02',
    title: 'APPS',
    slogan: 'Intelligente Produkte, sorgfältig gebaut',
    description:
      'Maßgeschneiderte Web- und Mobile-Apps mit KI im Kern. Vom Prototyp bis zur produktiven Einführung — mit Fokus auf Nutzbarkeit.',
    longDescription:
      'Wir bauen Apps, in denen KI nicht aufgeklebt, sondern eingebaut ist. Vom ersten Prototyp bis zur produktiven Einführung entwickeln wir Web- und Mobile-Produkte, die intuitiv funktionieren und echten Mehrwert liefern — schnell genug, um zu lernen, robust genug, um zu skalieren.',
    color: 'rgba(0,255,224,0.4)',
    glowColor: 'rgba(0,255,224,0.18)',
    accent: '#00FFE0',
    icons: [
      '/categorie_icons/app_foodtracker.png',
      '/categorie_icons/app_youaskedforthat.png',
    ],
    highlights: [
      {
        title: 'Schnelles Prototyping',
        description:
          'In wenigen Wochen vom Konzept zum klickbaren Prototyp — testbar mit echten Nutzern.',
      },
      {
        title: 'KI-Integration',
        description:
          'LLMs, Vision, Voice und Embeddings sauber in dein Produkt eingebettet.',
      },
      {
        title: 'Plattformübergreifend',
        description:
          'Web, iOS und Android aus einer Hand — mit Fokus auf Performance und UX.',
      },
      {
        title: 'Produktionsreif',
        description:
          'Skalierbare Architektur, Monitoring und CI/CD von Tag eins an mitgedacht.',
      },
    ],
    offerings: [
      'Sondierungs- und Prototyping-Phasen',
      'Gestaltung und Bedienung, die KI-Funktionen verständlich macht',
      'Web- oder Mobile-App in produktiver Qualität',
      'Backend, Datenpipeline und Modell-Integration',
      'App-Store-Veröffentlichung und laufende Weiterentwicklung',
    ],
  },
  {
    slug: 'tools',
    num: '03',
    title: 'TOOLS',
    slogan: 'Smartere Workflows, umgesetzt',
    description:
      'Automatisierungen, interne Tools und Copilot-Integrationen, die deinem Team täglich Zeit zurückgeben.',
    longDescription:
      'Manche der wertvollsten KI-Lösungen sind keine glänzenden Apps, sondern unscheinbare interne Tools, die täglich Stunden sparen. Wir bauen Automatisierungen, Copiloten und maßgeschneiderte Workflows, die genau dort ansetzen, wo dein Team am meisten Reibung spürt.',
    color: 'rgba(255,168,0,0.4)',
    glowColor: 'rgba(255,168,0,0.18)',
    accent: '#FFA800',
    icon: '/categorie_icons/tool.png',
    highlights: [
      {
        title: 'Automatisierung',
        description:
          'Repetitive Prozesse identifizieren und durch verlässliche Pipelines ersetzen.',
      },
      {
        title: 'Maßgeschneiderte Copiloten',
        description:
          'Interne Assistenten, die dein Domänenwissen kennen und im Alltag wirklich helfen.',
      },
      {
        title: 'Integrationen',
        description:
          'Anbindung an deine bestehenden Systeme — Slack, Notion, CRM, ERP, eigene APIs.',
      },
      {
        title: 'Mess­barer ROI',
        description:
          'Wir messen vorher und nachher: gesparte Zeit, weniger Fehler, höherer Output.',
      },
    ],
    offerings: [
      'Prozess-Analyse deines Teams',
      'Maßgeschneiderte Copiloten auf Basis deiner Daten',
      'Automatisierungen für wiederkehrende Prozesse',
      'Integrationen in deine bestehende Werkzeug-Landschaft',
      'Schulung und Übergabe an dein Team',
    ],
  },
  {
    slug: 'research',
    num: '04',
    title: 'FORSCHUNG',
    slogan: 'Neue Technologien, entschlüsselt',
    description:
      'Wir beobachten den KI-Markt, evaluieren neue Modelle und übersetzen Forschung in konkrete Empfehlungen für dein Unternehmen.',
    longDescription:
      'Der KI-Markt verändert sich wöchentlich — wir bleiben dran, damit du es nicht musst. Wir testen neue Modelle, vergleichen Anbieter und destillieren das, was wirklich relevant ist, in nüchterne Empfehlungen, die du sofort einordnen und nutzen kannst.',
    color: 'rgba(0,255,224,0.4)',
    glowColor: 'rgba(0,255,224,0.18)',
    accent: '#00FFE0',
    icon: '/categorie_icons/research.png',
    highlights: [
      {
        title: 'Modell-Benchmarking',
        description:
          'Wir testen aktuelle Modelle auf deinen Daten und Anwendungsfällen — nicht auf generischen Benchmarks.',
      },
      {
        title: 'Marktüberblick',
        description:
          'Wer kann was, wo lohnt sich der Wechsel, und was ist nur Marketing?',
      },
      {
        title: 'Prototypen',
        description:
          'Schnelle Machbarkeitsstudien, die zeigen, ob ein neuer Ansatz für dich funktioniert.',
      },
      {
        title: 'Berichte',
        description:
          'Kompakte Berichte, die dein Team auf den aktuellen Stand bringen — ohne Hype.',
      },
    ],
    offerings: [
      'Individuelle Modell-Auswertungen für deine Anwendungsfälle',
      'Quartalsweise Trend- und Marktberichte',
      'Technische Tiefenanalysen zu spezifischen Themen',
      'Machbarkeitsstudien für neue Ansätze',
      'Austausch und Sparring mit deinem Technik-Team',
    ],
  },
  {
    slug: 'podcast',
    num: '05',
    title: 'PODCAST & BLOG',
    slogan: 'Echte Einblicke, geteilt',
    description:
      'Echte Erfahrungen, Methoden und Geschichten aus dem KI-Alltag — kompakt und ohne Schlagwörter.',
    longDescription:
      'Wir teilen, was wir im Alltag mit KI lernen — ehrlich, konkret und ohne Schlagwort-Bingo. Im Podcast und Blog gibt es Methoden, Fehlschläge und Erfolgsgeschichten aus echten Projekten, gedacht für alle, die KI nicht nur diskutieren, sondern einsetzen wollen.',
    color: 'rgba(204,0,136,0.4)',
    glowColor: 'rgba(204,0,136,0.18)',
    accent: '#CC0088',
    icon: '/categorie_icons/podcast.png',
    highlights: [
      {
        title: 'Podcast',
        description:
          'Gespräche mit Machern, die KI in ihren Unternehmen wirklich umgesetzt haben.',
      },
      {
        title: 'Blog',
        description:
          'Tiefgehende Artikel zu Strategie, Werkzeugen und Erfahrungen aus unseren Projekten.',
      },
      {
        title: 'Methoden',
        description:
          'Praxiserprobte Vorlagen und Methoden, die du direkt mitnehmen kannst.',
      },
      {
        title: 'Gemeinschaft',
        description:
          'Ein wachsendes Netzwerk aus Praktikern, das voneinander lernt.',
      },
    ],
    offerings: [
      'Wöchentliche Podcast-Folgen mit KI-Praktikern',
      'Tiefgehende Blog-Artikel aus echten Projekten',
      'Methoden und Vorlagen zum Herunterladen',
      'Newsletter mit ausgewählten Einblicken',
      'Veranstaltungen und Treffen der Gemeinschaft',
    ],
  },
]

export function getCategory(slug: CategorySlug): Category {
  const category = categories.find((c) => c.slug === slug)
  if (!category) {
    throw new Error(`Unknown category slug: ${slug}`)
  }
  return category
}
