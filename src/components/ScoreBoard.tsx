
import React from 'react';
import { cn } from '@/lib/utils';

interface ScoreBoardProps {
  currentPlayer: number;
  players: {
    score: number;
    name: string;
  }[];
  gamesWon: number[];
  currentGame: number;
}

const ScoreBoard = ({ currentPlayer, players, gamesWon, currentGame }: ScoreBoardProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-accent p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold">Current Game</h2>
          <p className="text-3xl">{currentGame} / 5</p>
        </div>
        
        <div className="flex gap-8">
          {players.map((player, index) => (
            <div 
              key={index} 
              className={cn(
                "flex flex-col items-center p-3 rounded-lg transition-colors",
                currentPlayer === index ? "bg-primary text-primary-foreground" : "bg-white shadow-sm"
              )}
            >
              <div className="text-lg font-semibold">{player.name}</div>
              <div className="flex gap-2 items-center">
                <span className="text-xl font-bold">{player.score}</span>
                <span className="text-xs">matches</span>
              </div>
              <div className="mt-1 flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "w-2 h-2 rounded-full",
                      gamesWon[i] === index ? "bg-green-500" : 
                      gamesWon[i] !== undefined ? "bg-red-500" : "bg-gray-200"
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold">Series</h2>
          <div className="flex gap-2">
            {players.map((player, index) => (
              <div key={index} className="text-center">
                <p className="text-xs">{player.name}</p>
                <p className="text-2xl font-bold">{gamesWon.filter(winner => winner === index).length}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
