---
title: Daten als neues Gold: Warum KI jetzt deine Wohnung filmt
date: 2026-10-14
description: Das Internet ist fast leergelesen. Jetzt jagen KI-Firmen Daten, die es dort nicht gibt: 3D-Scans aus Pokémon Go, Bodycams beim Putzen, dein Puls.
lang: de
series: emergence
episode: 7
podcast: https://open.spotify.com/episode/6UP38qm0wNoupMSQLjYgfV
duration: 45
outro: In der Folge geht es außerdem um synthetische Daten, Embodied Cognition und Roboter, die lernen sollen wie Kleinkinder.
---

Sommer 2016. Innerhalb weniger Wochen laden über eine Milliarde Menschen dieselbe App herunter. Überall stehen Leute mit erhobenem Handy und jagen virtuelle Monster. Dann ebbt der Hype ab, und Pokémon Go wird zur Erinnerung an einen Sommer.

Was damals kaum jemand wusste: Jedes Mal, wenn ein Spieler sein Handy hob, passierte im Hintergrund noch etwas anderes. Eine Milliarde Menschen dachten, sie spielen ein Spiel. In Wirklichkeit bauten sie an einem der begehrtesten Schätze der KI-Welt. Warum, beginnt mit einer unbequemen Tatsache: Den KI-Firmen gehen die Daten aus.

## Das Internet ist leergelesen

Daten sind der Treibstoff jedes KI-Modells. Was es kostet, an gute Texte zu kommen, zeigen die Lizenzverträge der letzten Jahre:

```viz deals
title: KI-Firmen zahlen Hunderte Millionen für Texte, die schon geschrieben sind
caption: Lizenzverträge für Trainingsdaten, wie in der Folge genannt. Zeilen mit Pfeil haben Details.
source: Folge 7, nach Medienberichten
size: wide
height: 230
```

Dabei steckt fast alles schon in den Modellen. Epoch AI schätzt, dass bis 2028 alle öffentlich verfügbaren Texte des Internets verbraucht sind. Neuer Text kommt nur mit vier bis fünf Prozent im Jahr dazu, die Trainingsdatensätze der großen Modelle wachsen um über 300 Prozent, 50- bis 80-mal schneller.

Dass die KI sich ihre Daten einfach selbst schreibt, trägt nicht weit. Ein Paper in *Nature* hat 2024 gezeigt, dass Modelle, die immer wieder auf eigenen Texten trainiert werden, kollabieren: Sie rutschen in einen generischen Durchschnitt und verlieren alles Ungewöhnliche. Synthetische Daten können die Knappheit hinauszögern, lösen können sie sie nicht.

Dazu kommt der abnehmende Grenznutzen: Viele Benchmarks erfüllen die Modelle längst zu über 90 Prozent. Das heißt nicht, dass KI alles kann. Nur alles, was sich aus dem Internet lernen lässt.

## Daten, die es noch nicht gibt

Die eigentliche Frage ist also nicht, wie viele Daten es gibt, sondern: Woher kommen die neuen? Manche Firmen sind fast nebenbei darauf gestoßen, in Gewächshäusern, Laboren, Krebskliniken und beim Gaming.

```viz nebenprodukt
title: Die ersten Datenschätze entstanden als Nebenprodukt
caption: Firmen mit einem anderen Geschäft, das nebenbei Daten erzeugt, die es im Internet nicht gibt. Zeilen mit Pfeil haben Details.
source: Folge 7
size: wide
height: 330
```

Wie wertvoll das ist, zeigt Medal: OpenAI wollte die Firma kaufen, wegen der Mausklicks und Tastendrücke ihrer Nutzer.

Andere Firmen bauen das Sammeln von Anfang an ein. Und damit zurück zu Pokémon Go. Die Handys wurden beim Spielen auffällig heiß, und das lag nicht nur an der Grafik. Wer ein Pokémon in die echte Welt setzte, vermaß dabei die Umgebung dreidimensional und mit genauer Position, genau dort, wo GPS versagt: in Innenstädten, unter Brücken, in Häuserschluchten.

```stat
value: 1 Mrd.
label: Downloads von Pokémon Go in wenigen Wochen im Sommer 2016 (mindestens)
---
value: 30 Mrd.
label: georeferenzierte 3D-Scans echter Orte entstanden beim Spielen (mindestens)
source: Folge 7
```

Die letzte Stufe ist die radikalste. Bei Shift ist das Putzen nur der Köder: Die Reinigungskraft trägt eine Kamera in der Kappe, verkauft werden die Aufnahmen deiner Wohnung. Die Übersicht zeigt den Weg dorthin.

```viz eingebaut
title: Erst bewusst eingebaut, dann das eigentliche Geschäft
caption: Was die Nutzer bekommen und was die Firma dafür bekommt. Zeilen mit Pfeil haben Details.
source: Folge 7
size: wide
height: 470
```

## Was dem Internet fehlt: der Körper

Warum Schlafzimmer, Straßenzüge und Mausbewegungen? Weil all das Daten über die echte Welt sind. Text gibt es rund 300 Billionen Tokens. Aufnahmen davon, wie sich echte Hände bewegen und echte Objekte anfühlen, sind dagegen ein winziger Bruchteil der Videodaten.

```viz datenluecke
title: Physische Interaktionsdaten sind 0,03 % der Videodaten
caption: Weltweit verfügbare Stunden, geschätzt. Details beim Überfahren.
source: Schätzungen, zitiert in Folge 7
height: 170
```

Ein Forscher aus Berkeley nennt das den 100.000-Jahre-Daten-Gap: So lange bräuchte man beim heutigen Tempo, um genug physische Daten für ein Modell auf dem Niveau heutiger Sprachmodelle zu sammeln.

Dahinter steht eine Idee namens Embodied Cognition: Intelligenz sitzt nicht nur im Kopf, sondern im ganzen Körper. Kein Wikipedia-Artikel erklärt, wie sich ein nasser Teller anfühlt. Der Robotiker Hans Moravec hat das schon in den 1980er-Jahren auf den Punkt gebracht: Die schweren Probleme sind leicht, die leichten sind schwer. Was jedes dreijährige Kind kann, fällt einer KI schwer, weil es die Daten dafür nicht gibt.

```pull
Das Internet war die Digitalisierung unseres Denkens. Was jetzt passiert, ist die Digitalisierung unserer Erfahrung.
— Paul in Folge 7
```

## Der digitale Zwilling

Wo endet das? Vielleicht bei digitalen Zwillingen: vollständigen Abbildern eines echten Systems, gespeist mit denselben Echtzeitdaten wie das Original. Für Flugzeugturbinen, Fabriken und ganze Städte gibt es sie schon, manche sagen Ausfälle besser voraus als das Original.

Was, wenn es so einen Zwilling irgendwann von einem Menschen gibt? Die Daten dafür geben wir längst her, freiwillig und schleichend über Jahre.

```viz zwilling
title: Fast jeder Lebensbereich liefert schon heute Daten
caption: Alltägliche Datenquellen, die die Folge aufzählt, nach Lebensbereich.
source: Folge 7
size: wide
height: 560
```

Noch liegt das alles verstreut über Hunderte Apps. Aber jedes Puzzlestück existiert schon digital. Wie viel fehlt noch, bis jemand daraus ein vollständiges Bild eines Menschen zusammensetzt? Und wenn dein digitaler Zwilling eines Tages alles hat, was dich ausmacht: Was unterscheidet euch dann noch?
