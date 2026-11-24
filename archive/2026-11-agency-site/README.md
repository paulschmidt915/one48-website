# Archive: the one48 agency site (until November 2026)

The site as it was before it became a single page. Nothing in this folder is built or deployed
(`tsconfig.json` and `globals.css` exclude `archive/`); it is kept for its content.

| Here | Was |
| --- | --- |
| `src/app/(agency)/` | The pages: home, consultancy, apps, tools, research, podcast, contact, legal |
| `src/apps/agency/components/` | Sections and building blocks (Hero, Intro, Services, AboutMe, FAQ, CaseStudy, …) |
| `src/apps/agency/data/categories.ts` | Texts for the five categories |
| `src/app/layout.tsx`, `globals.css`, `opengraph-image.tsx` | Root layout, dark theme, share image |
| `public/` | Profile pictures, category icons, video |
| `metadata.json`, `scripts/` | Old project metadata, image helper script |

To bring something back, copy it into `src/` (or `public/`). The components expect the old theme
in `globals.css` and these packages, which were removed with the site: `lucide-react`, `lenis`,
`recharts`, `firebase`, `@google/generative-ai`.

The complete old site is also in git: the last commit with it live is `d6f2a67`.
