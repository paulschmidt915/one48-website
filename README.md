# one48 Website

Moderne Landing Page für one48 - KI-Beratung & Training.
Technologie-Stack: Vite, React, Tailwind CSS.

## Setup

1. Abhängigkeiten installieren:
   ```bash
   npm install
   ```

2. Entwicklungsserver starten:
   ```bash
   npm run dev
   ```
   Öffne `http://localhost:3000` im Browser.

## Deployment auf Vercel

Dieses Projekt verwendet **Vite**.

**WICHTIG:** 
Wenn du das Projekt auf Vercel bereits als Next.js-Projekt angelegt hast, musst du die Einstellungen ändern:

1. Gehe in deinem Vercel-Dashboard auf das Projekt.
2. Klicke auf **Settings**.
3. Unter **Build & Development Settings**:
   - Stelle **Framework Preset** auf **Vite** um.
   - (Falls "Vite" nicht verfügbar ist, wähle "Other" und stelle sicher, dass `Output Directory` auf `dist` steht).
4. Speichere die Änderungen und starte ein neues Deployment (z.B. durch Push auf Main).
