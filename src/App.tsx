import { FC, useState } from 'react';
import { Card } from './Card';

import './style.css';
import { CardType } from './definition/Card';

const cache: Record<string, CardType[]> = {};

const searchCard = (q: string): Promise<CardType[]> => {
  return fetch(`https://api.pokemontcg.io/v2/cards?q=${q}&page=1&pageSize=10`, {
    headers: {
      'X-Api-Key': 'af8464da-97f3-4838-a061-74ef2f248d2a',
    },
  }).then(async(res) => {
    return (await res.json()).data as CardType[];
  });
};

let debounceTimeout;

export const App: FC<{}> = ({}) => {

  const [cards, setCards] = useState<CardType[]>([]);
  const [search, setSearch] = useState<string>('');

  function getQuery(query: string): string {
    return `name:${query}*`;
  }

  function handleOnChange(event) {
    clearTimeout(debounceTimeout);

    setSearch(getQuery(event.target.value));

    debounceTimeout = setTimeout(() => {
      searchCard(getQuery(event.target.value)).then((cards) => {
        setCards(cards);
      });
    }, 300);
  }

  //TODO: Improve HTML/CSS
  return (
    <div className="app-wrapper">

      <h1>Pokémon Cards Explorer</h1>
      <input type="search" onChange={handleOnChange} />
      
      <section className="gallery">
        {cards.map((card) => (
          <Card card={card}></Card>
        ))}
      </section>
    </div>
  );
};
