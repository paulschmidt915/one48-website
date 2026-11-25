// Share of negative tweets in VAR scenes vs. all tweets about the same matches, side by side.
// Source: "Video kills the sentiment", PLoS One (2020): 643,251 tweets, 129 Premier League matches;
// 76.2 % of VAR tweets negative vs. 35.4 % of all tweets.

import { SmallMultiples, UnitChart } from '@/viz/_kit'

export default function Jubel() {
  return (
    <SmallMultiples
      min="13rem"
      panels={[
        {
          title: 'Tweets zu Szenen mit Videobeweis',
          value: '76 % negativ',
          content: <UnitChart legend={false} total={100} columns={10} groups={[{ label: 'negativ', value: 76 }]} restLabel="neutral oder positiv" unit=" von 100" />,
        },
        {
          title: 'Alle Tweets zu denselben Spielen',
          value: '35 % negativ',
          content: <UnitChart legend={false} total={100} columns={10} groups={[{ label: 'negativ', value: 35 }]} restLabel="neutral oder positiv" unit=" von 100" />,
        },
      ]}
    />
  )
}
