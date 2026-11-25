---
title: KI im Fußball: Technik gegen Legende
date: 2026-11-15
description: Bei der WM 2026 misst die Technik jeden Zentimeter. Das macht Fußball gerechter. Aber was wird dann aus Wembley 1966, der Hand Gottes und dem spontanen Torjubel?
lang: de
series: emergence
episode: 11
podcast: https://open.spotify.com/episode/3VkVYGkKmlzlKRbWTNrqy7
duration: 44
outro: In der Folge geht es außerdem um mein eigenes WM-Prognosemodell, Talent-Apps fürs Handy und Sensorwesten, die Verletzungen vorhersagen sollen.
---

London, 30. Juli 1966. Fast 100.000 Menschen sitzen im Wembley-Stadion, WM-Finale, England gegen Deutschland, 2:2 nach 90 Minuten. In der Verlängerung schießt Geoff Hurst, der Ball knallt an die Unterkante der Latte, springt senkrecht nach unten und wieder heraus ins Feld.

Schiedsrichter Gottfried Dienst hat nichts gesehen und läuft zu seinem Linienrichter Tofik Bachramow. Eine gemeinsame Sprache haben die beiden nicht. Ein Zeigen, ein Nicken: Tor. England gewinnt 4:2 und wird zum einzigen Mal Weltmeister.

Sechzig Jahre später weiß es niemand sicher. Hurst sagt, der Ball sei mindestens einen Meter hinter der Linie gewesen. Hans Tilkowski, der deutsche Torwart, war sich hundertprozentig sicher: kein Tor. Das Wembley-Tor ist nicht trotz seiner Ungeklärtheit zur Legende geworden, sondern wegen ihr. Heute wüsste es die Uhr des Schiedsrichters, bevor sich die Spieler umgedreht haben. Wollen wir das eigentlich?

## Ein Fehler, der die Technik erfand

Den Weg dorthin ebnete ein zweiter Fehler im selben Duell: 2010 zählte ein Tor von Frank Lampard nicht, obwohl der Ball klar hinter der Linie war. Danach ging es schnell, bis zur WM 2026, die die FIFA als größtes Live-Experiment mit KI im Sport verkauft.

```viz chronik
title: In 16 Jahren vom Phantomtor zum Ball mit Sensor
caption: Schiedsrichter-Technik bei Weltmeisterschaften seit 2010. Einträge mit Pfeil haben Details.
source: FIFA; IFAB; zitiert in Folge 11
height: 620
```

## Die unsichtbare Datenflut

Was im Fernsehen zu sehen ist, ist nur die Oberfläche, und das meiste davon ist Messtechnik, keine KI. Darunter liegt eine Kette, die vom Messpunkt bis auf das iPad an der Seitenlinie reicht.

```viz daten
title: Aus 150 Millionen Datenpunkten pro Spiel werden Scouting, Analyse und Coaching
caption: Nutzung der Spieldaten im Profifußball, je ein Beispiel. Zeilen mit Pfeil haben Details.
source: FIFA (2026); Vereinsangaben, zitiert in Folge 11
size: wide
height: 420
```

Ich habe mit den öffentlichen Kennzahlen der Gruppenphase ein Wochenend-Modell gebaut, das den Weltmeister ausrechnet (wer-wird-weltmeister.com). Eine Vorhersage ist das nicht, es kennt pro Team nur drei Spiele; die Profis rechnen mit Jahrzehnten. Rasmus Ankersen, lange beim FC Brentford, sagt dazu: Daten sagen dir nicht, wen du nehmen sollst, sondern wo du hinschauen musst.

Am weitesten geht Google DeepMind. Mit dem FC Liverpool hat es eine KI Eckbälle planen lassen, und Liverpools eigene Fachleute fanden ihre Vorschläge fast immer besser.

```viz tacticai
title: Liverpools Experten zogen die Ecke der Maschine in 90 % der Fälle vor
caption: Aufbau und Ergebnis der TacticAI-Studie. Der Schritt mit Pfeil hat Details.
source: Wang et al., „TacticAI“, Nature Communications (2024)
size: wide
height: 260
```

An diesem Punkt habe ich mich zum ersten Mal gefragt, wo das aufhört. Arsène Wenger, bei der FIFA für die Entwicklung des Fußballs zuständig, sagt voraus, dass Trainer die KI bald mitten im Spiel fragen werden, was sie tun sollen.

## Erst Hilfe, dann Ersatz

Beim Schiedsrichter verläuft eine Grenze: Maschinen sind gut im Messen, nicht im Urteilen. Ob ein Spieler Absicht hatte oder schauspielert, ist Auslegung, keine Null oder Eins. In anderen Sportarten kommt die Technik als Hilfe und ersetzt am Ende den Menschen. Der Fußball steht auf diesem Weg noch am Anfang.

```viz sportarten
title: Im Tennis entscheidet die Kamera allein, im Fußball misst sie nur
caption: Was Technik in vier Sportarten übernimmt. Zeilen mit Pfeil haben Details.
source: ATP; All England Club; NFL; MLB; zitiert in Folge 11
size: wide
height: 380
```

## Gerechter, aber stiller

Ungerechter ist der Fußball durch all das nicht geworden, im Gegenteil.

```stat
value: 99,3 %
label: korrekte Entscheidungen bei der WM 2018, der ersten mit Videobeweis (zuvor rund 95 %)
source: FIFA (2018)
```

Aber stell dir vor, dein Team trifft. Du springst auf, hältst inne, schaust auf die Anzeigetafel. Eine Sekunde, zwei, sieben. Erst dann grünes Licht, und aus Jubel ist Erleichterung geworden. Bei Szenen mit Videobeweis war die Stimmung auf Twitter mehr als doppelt so oft negativ wie sonst, so eine Studie mit dem Titel „Video kills the sentiment“.

```viz jubel
title: Bei Videobeweis-Szenen sind drei von vier Tweets negativ, sonst gut jeder dritte
caption: Anteil negativer Tweets, je 100 Tweets, gerundet.
source: „Video kills the sentiment“, PLoS One (2020): 643.251 Tweets zu 129 Premier-League-Spielen
height: 340
```

Die Technik nimmt dem Spiel auch seine Legenden. 1986, WM-Viertelfinale, Argentinien gegen England: Diego Maradona boxt den Ball mit der Hand ins Tor, „ein bisschen mit dem Kopf von Maradona und ein bisschen mit der Hand Gottes“. Vier Minuten später dribbelt er zum Tor des Jahrhunderts. Der Videobeweis hätte das erste Tor zu Recht annulliert und eine der größten Legenden verhindert.

Und wenn der Trainer in der 70. Minute wechselt, weil das iPad es sagt, und es geht schief: Auf wen ist man dann sauer? Da ist kein Gegenüber mehr. Der Philosoph Byung-Chul Han schreibt, ohne das Gebrochene verkümmere das Schöne zum Glatten. Genau so glätten wir den Fußball.

## Der Fehler als Feature

Am Ende ist das eine Frage über uns: Was mögen wir aneinander? Fast nie das Fehlerlose. Den optimalen Weg gibt es nur einmal, erst die Abweichung davon macht uns verschieden.

```pull
Es gibt Bereiche, in denen der Fehler kein Bug ist, sondern ein Feature.
— Paul in Folge 11
```

In Medizin und Wissenschaft sind Systeme, die besser entscheiden als wir, ein Geschenk. Eine durchoptimierte Existenz dagegen klingt effizient und ziemlich leer.

Fiele der Ball von Wembley heute, wüssten die Kameras es in unter einer Sekunde. Korrekt, gerecht, vorbei. Kein Rätsel, keine sechzig Jahre Streit, keine Legende. Vielleicht ist das Ungelöste nicht das, was wir aus der Welt schaffen sollten, sondern das, was sie erst erzählenswert macht.
