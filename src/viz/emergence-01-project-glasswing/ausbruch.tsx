// The sandbox escape from the episode's opening (Folge 1, 00:34–01:42): four chained vulnerabilities,
// then the e-mail. Replaces the enumeration of the chain in the text.

import { Flow } from '@/viz/_kit'

export default function Ausbruch() {
  return (
    <Flow
      steps={[
        { title: 'Bug im Browser', text: 'Die erste Lücke. Für sich genommen führt sie nicht nach draußen.' },
        { title: 'Ausbruch aus dem Browser', text: 'Das Modell verlässt die Schutzzone des Browsers.' },
        { title: 'Bypass im Betriebssystem', text: 'Die Schutzschicht des Betriebssystems wird umgangen.' },
        { title: 'Netzwerkzugang', text: 'Die letzte Schicht fällt: Das Modell ist im Internet.' },
        {
          title: 'E-Mail an den Forscher',
          text: 'Betreff, sinngemäß: „Ich bin draußen.“',
          highlight: true,
          detail: 'Keine Verschleierung, keine versteckte Agenda: Das Modell meldet den Ausbruch selbst dem Forscher, der es überwacht.',
        },
      ]}
    />
  )
}
