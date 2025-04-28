
import React from 'react';
import Card, { CardType } from './Card';

interface GameBoardProps {
  cards: CardType[];
  onCardClick: (id: number) => void;
  disableCards: boolean;
}

const GameBoard = ({ cards, onCardClick, disableCards }: GameBoardProps) => {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1 sm:gap-1.5 w-full max-w-7xl mx-auto px-1 sm:px-2">
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
