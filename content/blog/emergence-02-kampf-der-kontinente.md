---
title: Kampf der Kontinente: Warum Strom das KI-Rennen entscheidet
date: 2026-09-03
description: Wer gewinnt das KI-Rennen? Nicht unbedingt, wer das beste Modell baut. Von Edisons Glühbirne über den DeepSeek-Schock bis Three Mile Island: Am Ende geht es um Strom.
lang: de
series: emergence
episode: 2
podcast: https://open.spotify.com/episode/15Wzy2trdVjrQ9rKEeo6kO
duration: 51
outro: In der Folge geht es außerdem um Ashburns Strompreise, Huaweis eigene Chips und die Straße von Hormus als Stresstest für die KI.
---

21. Oktober 1879, Menlo Park. Thomas Edison legt den Schalter um, und in seinem Glaskolben glüht ein Faden aus verkohltem Bambus. 1882 eröffnet er in Lower Manhattan das erste kommerzielle Kraftwerk der Welt, mit Gleichstrom.

Doch in Pittsburgh baut George Westinghouse keine bessere Glühbirne, sondern besseren Strom: Wechselstrom, der weit trägt, wo Gleichstrom nach ein, zwei Kilometern versiegt. Zehn Jahre später hat Edison seine eigene Firma verloren. Die Geschichte ist zugespitzt, aber sie zeigt: Manchmal gewinnt nicht das hellste Licht, sondern das, was es am Brennen hält.

## Wer hat das beste Modell?

Gewinnt jetzt Anthropic, nach Claude Mythos? Vor einem halben Jahr hätte ich Google gesagt, vor einem Jahr OpenAI. Ich wollte Kriterien statt Gefühl. Das erste sind die Nutzer, und die ergeben je nach Markt einen anderen Sieger: Bei Privatleuten führt ChatGPT, während Gemini über Google-Suche und Android aufholt. In Unternehmen führt Claude mit rund 40 % des Markts. Das zweite Kriterium sind Benchmarks, die Schulnoten für KI.

```viz benchmarks
title: Die Spitzenmodelle liegen dicht beieinander und weit über den Fachleuten
caption: Richtige Antworten in Prozent, April 2026. Zeilen mit Pfeil nennen die Modellversion.
source: Vellum, Artificial Analysis, Scale AI (2026); Rein et al. (2023)
size: wide
height: 300
```

Google führt bei den Wissenstests, Anthropic beim Programmieren, OpenAI ist überall gut und nirgends vorn. Einen klaren Sieger gibt es nicht.

## Das Rezept: Geld, Chips, Geheimnisse

Eine Schicht tiefer: Was braucht ein Spitzenmodell? Geld, denn die Trainingskosten verdoppeln sich seit 2020 etwa alle sieben Monate. Chips, je 25.000 bis 40.000 Dollar für eine Nvidia H100, zu Hunderttausenden. Und Geheimhaltung der Modellgewichte. Das spricht für Amerika. Oder?

## Der Tag, an dem Nvidia 589 Milliarden verlor

Am 20. Januar 2025 stellt ein chinesisches Start-up DeepSeek R1 online, offen unter MIT-Lizenz, frei zum Herunterladen und Verkaufen. Sechs Tage später steht die App in 52 Ländern auf Platz eins im App Store. Am Montag darauf, dem 27. Januar, verliert Nvidia 589 Mrd. Dollar Börsenwert, der größte Tagesverlust der US-Börsengeschichte. Ausgelöst hat das ein Team von 160 Leuten ohne externe Investoren.

In den Benchmarks war R1 nicht besser als OpenAIs bestes Modell o1, sondern gleichauf. Der Schock waren die Kosten.

```viz trainingskosten
title: DeepSeeks letzter Trainingslauf kostete weniger als ein Achtzehntel von GPT-4
caption: Kosten eines Trainings in Mio. Dollar. Zeilen mit Pfeil haben Details.
source: DeepSeek-V3 Technical Report (2024); Stanford AI Index; Epoch AI
size: wide
height: 260
```

Dazu kamen die Chips. Seit Oktober 2022 dürfen Nvidias beste Chips nicht mehr nach China. DeepSeek trainierte auf der H800, einer Exportversion mit 55 % weniger Bandbreite. Gerade diese Bremse zwang das Team zu sparsameren Algorithmen. Gewinnt also, wer am effizientesten ist? Fast.

## Was alles am Brennen hält

Auch das effizienteste Modell läuft in Rechenzentren, und deren Strombedarf wächst seit dem KI-Boom um 12 bis 15 % im Jahr. Selbst die vorsichtigste Prognose sieht für 2030 mehr als eine Verdopplung.

```viz stromhunger
title: Bis 2030 brauchen Rechenzentren das 2,3- bis 3,4-Fache an Strom
caption: Stromverbrauch aller Rechenzentren weltweit in Terawattstunden, 2024 und vier Prognosen für 2030.
source: IEA, Energy and AI (2025); Gartner (2025); Goldman Sachs; McKinsey
size: wide
height: 280
```

In Ashburn, Virginia, dem größten Rechenzentrumsstandort der Welt, verbrauchen Rechenzentren schon 26 % des Stroms des Bundesstaats. Der Versorger Dominion Energy kann die Nachfrage nicht mehr decken, das US-Energieministerium warnt bis 2030 vor über 400 Stunden Stromausfall im Jahr.

```pull
Wer heute kein Kraftwerk unter Vertrag hat, wird morgen kein Frontier-Modell mehr trainieren können.
— Paul in Folge 2
```

Die Tech-Konzerne setzen auf Atomkraft, Microsoft ausgerechnet auf Three Mile Island, den Ort des schlimmsten Atomunfalls der USA. Meta allein hat sich bis zu 7,2 Gigawatt gesichert, fast so viel, wie alle deutschen Kernkraftwerke zusammen hatten. Der Haken ist die Zeit, und die Größenordnung.

```viz reaktoren
title: Alle neuen Reaktoren zusammen decken nicht einmal ein Zehntel des Zusatzbedarfs
caption: Neue und wiederbelebte Reaktoren der US-Tech-Konzerne in Megawatt, verglichen mit dem Zusatzbedarf der US-Rechenzentren. Zeilen mit Pfeil haben Details.
source: Ankündigungen der Konzerne und Anbieter (2023–2026); Bloom Energy (2026)
size: wide
height: 440
```

Bis die Reaktoren laufen, verbrennt Amerika Gas: Weltweit sind 38 Gigawatt neue Gaskraftwerke geplant, die direkt Rechenzentren versorgen sollen.

## Zwei Strategien, ein Ziel

China geht einen anderen Weg. In der Provinz Qinghai steht Alibabas Rechenzentrum direkt neben Solar- und Windparks, mitten in der Wüste. Der Unterschied zu Amerika liegt weniger in der Technik als darin, wer baut und wie schnell.

```viz usa-china
title: Amerika hat Modelle und Kapital, China baut das Stromnetz
caption: Beide Länder Ebene für Ebene, 2025/26. Zeilen mit Pfeil haben Details.
source: Stanford AI Index 2026; IEA; Folge 2
size: wide
height: 420
```

Wie verwundbar dieses Fundament ist, zeigt der Konflikt mit dem Iran: Durch die blockierte Straße von Hormus floss rund ein Fünftel des weltweit gehandelten Flüssigerdgases, und Anfang März 2026 trafen iranische Drohnen Rechenzentren von Amazon am Golf, der erste gezielte Angriff auf Rechenzentren.

Das KI-Rennen wird nicht im Benchmark entschieden und nicht im App Store, sondern in Atomkraftwerken, auf Solarfeldern und an Meerengen. Wer am Ende gewinnt, weiß niemand. Aber 150 Jahre nach Edison gilt wieder: Manchmal gewinnt nicht das hellste Licht, sondern das, was es am Brennen hält.
