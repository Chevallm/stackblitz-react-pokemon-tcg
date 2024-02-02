import { FC, useState } from 'react';
import { CardType } from './definition/Card';

export const Card: FC<{ card: CardType }> = ({ card }) => {

  const [style, setStyle] = useState<Record<string, string>>({});

  function moveCard(event): void {
    let rect = event.target.getBoundingClientRect();
    const valueY = -(event.target.width/2) + event.clientX - rect.x;
    const valueX = -(event.target.height/2) + event.clientY - rect.y;
    let Y = valueY * 25 / 120;
    let X = valueX * 25 / 120;
    setStyle({
      transform: `rotateY(${-Y}deg) rotateX(${-X}deg)`
    });
  }

  function resetCard() {
    setStyle({
      transform: `rotate(0)`
    })
  }

  return (
  <section>
    <img className="card" style={style} crossOrigin="anonymous" src={card.images.small} onMouseMove={moveCard} onMouseLeave={resetCard}/>
  </section>
  );
};
