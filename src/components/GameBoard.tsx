
import React from 'react';
import Card, { CardType } from './Card';

interface GameBoardProps {
  cards: CardType[];
  onCardClick: (id: number) => void;
  disableCards: boolean;
}

const GameBoard = ({ cards, onCardClick, disableCards }: GameBoardProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-4 w-full max-w-5xl mx-auto">
      {cards.map((card) => (
        <div key={card.id} className="aspect-[3/4]">
          <Card 
            card={card} 
            onClick={() => onCardClick(card.id)} 
            disabled={disableCards}
          />
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
