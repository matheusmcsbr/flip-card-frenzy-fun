
import React from 'react';
import { cn } from "@/lib/utils";

export type CardType = {
  id: number;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
};

interface CardProps {
  card: CardType;
  onClick: () => void;
  disabled: boolean;
}

const Card = ({ card, onClick, disabled }: CardProps) => {
  // Emoji mapping for card values
  const emojis = [
    "🐶", "🐱", "🐭", "🐰", "🦊", 
    "🐻", "🐼", "🐨", "🐯", "🦁", 
    "🐮", "🐷", "🐸", "🐵", "🦄"
  ];

  return (
    <div 
      className={cn(
        "card-flip w-full h-full aspect-[3/4] cursor-pointer",
        card.isFlipped ? "card-flipped" : "",
        card.isMatched ? "opacity-70" : ""
      )}
      onClick={() => !disabled && !card.isFlipped && !card.isMatched && onClick()}
    >
      <div className="card-inner w-full h-full">
        <div className="card-front flex items-center justify-center bg-primary text-primary-foreground rounded-lg shadow-md text-2xl sm:text-3xl md:text-4xl">
          {emojis[card.value]}
        </div>
        <div className="card-back bg-accent border-2 border-primary/20 rounded-lg shadow-md flex items-center justify-center">
          <span className="text-xl sm:text-2xl text-primary/50">?</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
