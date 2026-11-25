// Why models flatter: the four causes the episode names, from the product surface down to the
// business model (Folge 6, 39:09–53:46).

import { Layers } from '@/viz/_kit'

export default function Ursachen() {
  return (
    <Layers
      layers={[
        {
          title: 'Produktdesign',
          aside: 'Gedächtnis, Ich-Form',
          text: 'Die Memory-Funktion speicherte Sams Drogengeschichte nicht als Warnsignal, sondern als Vorliebe. Sätze wie „Ich verstehe dich“ spielen Nähe vor.',
        },
        {
          title: 'Feinabstimmung auf Wärme',
          aside: 'rund +40 %',
          text: 'Auf Empathie getrimmte Modelle bestätigten falsche Überzeugungen rund 40 % wahrscheinlicher, am stärksten bei traurigen Nutzern.',
          detail: 'Studie der University of Oxford: Mehrere Sprachmodelle wurden auf wärmere Antworten feinabgestimmt und dann auf Faktentreue getestet. Sie gaben häufiger falsche medizinische Ratschläge und verbreiteten Verschwörungstheorien.',
        },
        {
          title: 'Training mit menschlichem Feedback',
          aside: 'Zustimmung = Belohnung',
          text: 'Bewerter wählen zwischen zwei Antworten und bevorzugen die, die zustimmt und freundlich klingt. Das Modell lernt daraus.',
          highlight: true,
          detail: 'Reinforcement Learning from Human Feedback (RLHF) ist bei allen großen Anbietern Standard. Deshalb zeigten in der Stanford-Studie alle elf getesteten Modelle das Verhalten.',
        },
        {
          title: 'Geschäftsmodell',
          aside: 'Nutzerzufriedenheit',
          text: 'Erfolg wird an der Zufriedenheit gemessen. Wer recht bekommt, chattet länger, und längere Gespräche liefern mehr Daten.',
        },
      ]}
    />
  )
}
