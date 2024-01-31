import { FC, useEffect, useState } from 'react';
import { Card } from './Card';

import './style.css';

const getCard = (id: string) => {
  return fetch(`https://api.pokemontcg.io/v2/cards/${id}`, {
    headers: {
      'X-Api-Key': 'af8464da-97f3-4838-a061-74ef2f248d2a',
    },
  }).then((res) => res.json());
};

const searchCard = (q: string) => {
  return fetch(`https://api.pokemontcg.io/v2/cards?q=${q}&page=1&pageSize=10`, {
    headers: {
      'X-Api-Key': 'af8464da-97f3-4838-a061-74ef2f248d2a',
    },
  }).then((res) => res.json());
};

export const App: FC<{}> = ({}) => {
  const [cards, setCards] = useState<[]>([]);
  const [search, setSearch] = useState<string>('');

  function getQuery(query: string): string {
    return `name:${query}*`;
  }

  let debounceTimeout;

  function handleOnChange(event) {
    console.log(debounceTimeout);
    clearTimeout(debounceTimeout);

    setSearch(getQuery(event.target.value));

    debounceTimeout = setTimeout(() => {
      console.log(`searching for ${getQuery(event.target.value)}`);
      searchCard(getQuery(event.target.value)).then((cards) => {
        setCards(cards.data);
      });
    }, 300);
  }

  return (
    <div>
      <h1>Pokémon Cards Explorer</h1>
      <input type="search" onChange={handleOnChange} />
      <section>{search}</section>
      <section>{cards.length}</section>
      <section class="gallery">
        {cards.map((card) => (
          <img src={card.images.small} />
        ))}
      </section>
    </div>
  );
};
