import { FC } from 'react';
import { CardType } from './definition/Card';

export const Card: FC<{ card: CardType }> = ({ card }) => {
  return <img crossOrigin="anonymous" src={card.images.small}/>;
};
