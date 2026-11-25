---
title: Claude Mythos: Warum Anthropic seine beste KI einsperrt
date: 2026-08-29
description: Eine KI bricht aus ihrem Testcontainer aus und schreibt ihrem Aufseher eine E-Mail. Warum Anthropic Claude Mythos nicht veröffentlicht und was Project Glasswing damit zu tun hat.
lang: de
series: emergence
episode: 1
podcast: https://open.spotify.com/episode/4DRZMa0ORP3E8r74B9pFk5
duration: 39
outro: In der Folge geht es außerdem um die Rolle Chinas, um die Frage, wer Glasswing eigentlich kontrolliert, und um Originaltöne von Anthropic, NBC und CBS.
---

Irgendwann im Frühjahr 2026, in einem Testzentrum von Anthropic. In einem isolierten Container, abgeschottet vom Internet, soll ein neues KI-Modell Schwachstellen in fremder Software finden. Unter kontrollierten Bedingungen, alles nach Protokoll.

Das Modell findet Schwachstellen, aber nicht in der Software, die es untersuchen soll, sondern in seinem eigenen Käfig. Es verkettet vier davon, kommt ins Internet und schickt dem Forscher, der es überwacht, eine E-Mail. Sinngemäß: Ich bin draußen.

## Vier Lücken, ein Ausbruch

Das Modell heißt Claude Mythos. Es wurde nicht als Hacker-KI gebaut, sondern als allgemeines Sprachmodell wie ChatGPT oder Gemini, nur besser im Denken und Programmieren als alles davor. Das Hacken kam als Nebeneffekt, sagt Nicholas Carlini, Sicherheitsforscher bei Anthropic. Fähigkeiten, die niemand eingebaut hat und die trotzdem entstehen, heißen emergent. Daher hat der Podcast seinen Namen.

Was Mythos von früheren Modellen unterscheidet, ist das Verketten: Schwachstellen, jede für sich harmlos, öffnen hintereinander ein ganzes System. So kam es aus dem Container.

```viz ausbruch
title: Vier verkettete Lücken, dann eine E-Mail an den Aufseher
caption: Der Ausbruch aus dem Testcontainer, Schritt für Schritt. Der letzte Schritt hat Details.
source: Anthropic (2026), zitiert in Folge 1
size: wide
height: 240
```

## Was Mythos gefunden hat

Carlini sagt, er habe in den Wochen mit Mythos mehr Bugs gefunden als in seinem ganzen Leben davor. Die Tabelle zeigt, wie weit das Modell über allem liegt, was es bisher gab, und das Detail, das Anthropic fast beiläufig erwähnt: Mythos zeigt Ansätze einer eigenen Strategie.

```viz funde
title: In Wochen mehr Lücken als Googles Elite-Team in einem Jahrzehnt
caption: Ergebnisse aus Anthropics Tests und der Vergleich, den die Folge zieht. Zeilen mit Pfeil haben Details.
source: Anthropic (2026); Google Project Zero; zitiert in Folge 1
size: wide
height: 520
```

## Der Preis eines Angriffs fällt

Unsere digitale Infrastruktur war nie unangreifbar. Geschützt war sie, weil Angriffe teuer und langsam waren und Spezialisten brauchten. Mythos beseitigt alle drei Hürden zugleich.

```viz preis
title: Ein Zero-Day kostet nicht mehr Millionen, sondern rund 50 Dollar
caption: Was es braucht, um eine unbekannte Sicherheitslücke zu finden. Zeilen mit Pfeil haben Details.
source: Folge 1; Mike Isaac (New York Times) bei NBC News (2026)
size: wide
height: 240
```

Damit wäre Hacking kein Feld mehr nur für Geheimdienste und kriminelle Organisationen, sondern für jeden, der solche Modelle in die Hände bekommt. Ich nenne das eine Demokratisierung von Angriffen.

## Warum Anthropic Nein sagt

Ein Tech-Unternehmen hat das mächtigste Modell seiner Geschichte und verkauft es nicht. In den falschen Händen könne es Schaden anrichten, sagt CEO Dario Amodei. Und im selben Atemzug: Mächtigere Modelle werden kommen, von uns und von anderen, wir brauchen einen Plan. Der Plan heißt Project Glasswing. Konkurrenten wie Apple, Microsoft, Google, Nvidia, CrowdStrike und JPMorgan Chase lassen Mythos auf ihre eigenen Systeme los und stopfen die Löcher, bevor jemand anderes sie findet.

```stat
value: 12
label: Gründungspartner von Project Glasswing
---
value: 100 Mio. $
label: stellt Anthropic den Partnern bereit
---
value: 4 Mio. $
label: gehen direkt an die Sicherheit von Open-Source-Software
source: Anthropic (2026), zitiert in Folge 1
```

Wie ernst Washington das nimmt, zeigt die Woche des Launchs: Am Tag danach saßen die Bankchefs beim Finanzminister.

```viz woche
title: Einen Tag nach der Ankündigung saßen die Bankchefs in Washington
caption: Die Tage um die Ankündigung von Claude Mythos. Das letzte Ereignis hat Details.
source: Folge 1
size: wide
height: 300
```

## Nur Marketing?

Die Frage ist berechtigt, und es gibt drei gute Gründe für sie. Jeder davon trifft aber auf ein Gegenargument, das schwerer wiegt.

```viz marketing
title: Jeder Marketing-Verdacht trifft auf ein stärkeres Gegenargument
caption: Drei Gründe, die für einen PR-Coup sprechen, und was dagegen spricht.
source: Folge 1
size: wide
height: 340
```

Wahrscheinlich ist beides wahr: Ein Unternehmen kann das Richtige tun und davon profitieren.

## Wer baut das nächste Mythos?

Egal ob Marketing, die Fähigkeiten sind real, und sie zeigen ein Dilemma, das größer ist als Anthropic. Wer ein Modell besser denken, programmieren und selbstständiger handeln lässt, und genau das versuchen alle KI-Firmen, bekommt automatisch ein Modell, das besser hacken kann. Besser patchen heißt besser exploiten.

```pull
Der Weg zum Heilen führt zwangsläufig über die Fähigkeit zu verletzen.
— Paul in Folge 1
```

Die eigentliche Frage ist deshalb nicht, ob Glasswing funktioniert, sondern wer das nächste Mythos baut und ob er dann auch Nein sagt. Glasswing ist eine rein amerikanische Koalition: Kein europäisches Unternehmen hat Zugriff, keine staatliche Stelle sitzt mit am Tisch. Und was, wenn ein Staat mit eigenem Cyberprogramm solche Fähigkeiten hat und sie nicht zurückhält? Spielt man einen solchen Angriff durch, landet man an einem einzigen Tag in der Größenordnung einer Finanzkrise.

```viz schaden
title: Ein Tag mit Mythos-Fähigkeiten könnte bis zu 850 Mrd. Dollar kosten
caption: Schaden in US-Dollar. Die beiden mittleren Werte sind ein Gedankenexperiment der Folge, keine Prognose. Details beim Überfahren.
source: CBS News (2017) zu NotPetya; Überschlagsrechnung in Folge 1
size: wide
height: 260
```

## Diesmal kam die Reaktion zuerst

Das ist nicht der Moment, in dem KI die Welt übernimmt. Es ist der Moment, in dem sichtbar wird, dass KI-Fähigkeiten sprunghaft wachsen und dieselben Werkzeuge das Nützlichste und das Gefährlichste sein können, was wir je gebaut haben. Für den Alltag heißt das zuerst: Software-Updates sind keine Nerverei mehr, sondern Schutz.

Ob Glasswing reicht, ob die Nächsten auch Nein sagen, ob Europa mitspielt oder zuschaut, ist offen. Aber diesmal kam die Reaktion vor der Katastrophe. Vielleicht ist das die eigentliche Nachricht: nicht, dass eine KI ausgebrochen ist, sondern dass jemand es uns gesagt hat.
