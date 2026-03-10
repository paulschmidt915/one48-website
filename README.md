# one48.de – Monorepo-Struktur

Next.js 16 Plattform, die mehrere Apps unter der Domain **one48.de** hostet.

---

## Überblick: Welche Apps gibt es?

| App | Routen | Beschreibung |
|---|---|---|
| **Agency Website** | `/`, `/contact`, `/legal` | B2B AI-Consulting Landing Page |
| **Nutrition Tracker** | `/tracker`, `/tracker/rezepte`, `/tracker/week` | KI-gestützter Food Tracker mit Rezept-Generator |
| **Planner** | `/privat`, `/planner` | Privater KI-Wochenplaner (passwortgeschützt) |

---

## Ordnerstruktur

```
src/
├── app/                              # Next.js App Router (nur Routing)
│   ├── (agency)/                     # Route Group – Agency Website
│   │   ├── layout.tsx                # Stub: agency-spezifisches Layout
│   │   ├── page.tsx                  # Route: /
│   │   ├── contact/page.tsx          # Route: /contact
│   │   └── legal/page.tsx            # Route: /legal
│   ├── (apps)/                       # Route Group – Interne Apps
│   │   ├── layout.tsx                # Stub: geteiltes Apps-Layout
│   │   ├── privat/page.tsx           # Route: /privat
│   │   ├── planner/page.tsx          # Route: /planner
│   │   └── tracker/                  # Route Group: Tracker-App
│   │       ├── layout.tsx            # Tracker-Layout (iOS viewport, IBM Plex Mono)
│   │       ├── page.tsx              # Route: /tracker
│   │       ├── rezepte/page.tsx      # Route: /tracker/rezepte
│   │       └── week/page.tsx         # Route: /tracker/week
│   ├── globals.css                   # Geteilte Basis-Styles (Tailwind, CSS-Variablen)
│   ├── layout.tsx                    # Root Layout (Fonts, SiteShell, Analytics)
│   └── opengraph-image.tsx           # OG-Image Generator
│
├── apps/                             # App-spezifischer Code – nach Projekt gruppiert
│   ├── agency/                       # Agency Website
│   │   ├── components/               # Alle UI-Komponenten der Agency-Seite
│   │   │   ├── SiteShell.tsx         # Haupt-Layout-Wrapper (zeigt/versteckt Navbar)
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── ProofSnippets.tsx
│   │   │   ├── Process.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── AboutMe.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── Cta.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── LegalPage.tsx
│   │   │   ├── CaseStudy.tsx
│   │   │   ├── DecisionNavigator.tsx
│   │   │   ├── Philosophy.tsx
│   │   │   └── Stats.tsx
│   │   └── agency.css                # Stub für agency-spezifische Styles
│   │
│   ├── tracker/                      # Nutrition Tracker App
│   │   ├── components/
│   │   │   ├── MacroSummary.tsx      # Tages-Makro-Übersicht mit Fortschrittsbalken
│   │   │   ├── TrackerInput.tsx      # Text/Kamera-Input für Mahlzeiten
│   │   │   ├── EntryList.tsx         # Liste der Tageseinträge
│   │   │   └── RecipeInput.tsx       # Input-Bar für Rezept-Suche
│   │   ├── services/
│   │   │   ├── geminiNutrition.ts    # Gemini: Text/Bild → Makrowerte
│   │   │   ├── geminiRecipes.ts      # Gemini: Rezeptvorschläge & vollständige Rezepte
│   │   │   └── nutritionService.ts   # Firebase: Einträge & Rezepte lesen/schreiben
│   │   └── tracker.css               # Stub für tracker-spezifische Styles
│   │
│   └── planner/                      # Weekly Planner App
│       ├── components/
│       │   ├── One48Planner.tsx      # Haupt-Planner-Komponente (Firebase + AI)
│       │   └── PrivateArea.tsx       # Passwort-Schutz + App-Auswahl-Dashboard
│       ├── services/
│       │   └── gemini.ts             # Gemini: KI-Assistent für Wochenplanung
│       └── planner.css               # Stub für planner-spezifische Styles
│
└── lib/                              # Wirklich geteilter Code (app-übergreifend)
    ├── firebase.ts                   # Firebase-Konfiguration (Auth + 2x Realtime DB)
    └── audiohelper.ts                # Audio-Aufnahme & Transkription (Tracker + Planner)
```

---

## Wichtige Konventionen

### Route Groups `(agency)` und `(apps)`
Die Klammern sind Next.js **Route Groups** – sie ändern die URL **nicht**. `/` bleibt `/`, nicht `/(agency)/`. Sie dienen ausschließlich der Organisation und ermöglichen pro Gruppe ein eigenes `layout.tsx`.

### Jede App hat ihr eigenes UX
Jede App hat ein `layout.tsx` und eine `{app}.css`-Datei. So bekommt jede App ihr eigenes Design:

1. **Styles** in die `{app}.css` schreiben
2. **Import** in das App-`layout.tsx` hinzufügen:
   ```ts
   // src/app/(agency)/layout.tsx
   import '@/apps/agency/agency.css'
   ```
3. **Layout-Logik** (eigene Fonts, Provider, Wrapper) direkt in `layout.tsx`

### `src/app/` enthält nur Routing
Die `app/`-Verzeichnisse enthalten ausschließlich dünne `page.tsx`-Dateien, die Komponenten aus `src/apps/` importieren und rendern. Keine Geschäftslogik, keine Styles hier.

### `src/lib/` für geteilten Code
Code der von **mehreren Apps** genutzt wird landet in `src/lib/`:
- `firebase.ts` – wird von Tracker und Planner genutzt
- `audiohelper.ts` – wird von Tracker-Input und Planner genutzt

App-spezifische Services (z.B. Gemini-Prompts für den Planner) bleiben in `src/apps/{app}/services/`.

---

## Neue App hinzufügen

1. **Ordner anlegen:**
   ```
   src/apps/neue-app/
   ├── components/
   ├── services/        (falls nötig)
   └── neue-app.css
   ```

2. **Route Group anlegen:**
   ```
   src/app/(neue-app)/
   ├── layout.tsx       (pass-through oder mit eigenem UX)
   └── page.tsx         (importiert aus @/apps/neue-app/components/)
   ```

3. **Fertig.** Alle anderen Apps bleiben unberührt.

---

## Tech Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Sprache | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Datenbank | Firebase Realtime Database (europe-west1) |
| Auth | Firebase Authentication (Google OAuth) |
| AI | Google Gemini (Nutrition, Rezepte, Planner) |
| Analytics | Vercel Analytics |
| Icons | Lucide React |

---

## Entwicklung

```bash
npm run dev      # Entwicklungsserver starten
npm run build    # Produktions-Build
npm run start    # Produktionsserver starten
npm run lint     # Linting
```

Umgebungsvariablen werden aus `.env.local` geladen (nicht im Repository).
