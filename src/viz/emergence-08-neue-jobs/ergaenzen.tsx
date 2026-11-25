// The episode's examples of complementarity: what the technology takes over and what becomes more
// important. Source: Folge 8 (04:29–07:44). Replaces the paragraph with Radiologe, Anwalt, Handwerker, Excel.

import { DataTable } from '@/viz/_kit'

export default function Ergaenzen() {
  return (
    <DataTable
      columns={[
        { key: 'fall', label: 'Fall', width: '20%' },
        { key: 'nimmt', label: 'Technik übernimmt' },
        { key: 'bleibt', label: 'Wird wichtiger' },
        { key: 'art', label: 'Muster', width: '18%' },
      ]}
      rows={[
        { fall: 'Radiologe', nimmt: 'Routinebefunde', bleibt: 'Das Urteil bei schwierigen Fällen', art: 'Job wird wertvoller' },
        { fall: 'Anwalt', nimmt: 'Recherche, Aktenwälzen', bleibt: 'Die Strategie für den Fall', art: 'Job wird wertvoller' },
        { fall: 'Handwerker', nimmt: 'Kalkulationen, Angebote, Marketingtexte', bleibt: 'Das Handwerk selbst', art: 'Job wird wertvoller' },
        {
          fall: 'Buchhalter',
          nimmt: 'Rechnen und Dokumentieren (Excel)',
          bleibt: 'Analyse und Interpretation',
          art: 'Neues Berufsbild',
          highlight: true,
          detail: 'Als der Computer das Rechnen übernahm, verschwanden die Buchhalter nicht. Es gab danach mehr von ihnen, mit einem anderen Profil: weniger Zahlen abtippen, mehr Zahlen deuten.',
        },
        {
          fall: 'KI-Rollen',
          nimmt: '–',
          bleibt: 'KI trainieren, bewerten, auf Sicherheit prüfen; Ethik und Compliance',
          art: 'Neuer Beruf',
          detail: 'Rollen, die es vor fünf Jahren nicht gab und die heute zu den am schnellsten wachsenden gehören. Manche sind hoch spezialisiert, andere brauchen vor allem Prozessverständnis und Menschenkenntnis statt eines Informatikabschlusses.',
        },
      ]}
    />
  )
}
