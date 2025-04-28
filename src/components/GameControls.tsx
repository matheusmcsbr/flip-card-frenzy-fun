
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface GameControlsProps {
  onNewGame: () => void;
  onResetAll: () => void;
}

const GameControls = ({ onNewGame, onResetAll }: GameControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-6">
      <Button 
        onClick={onNewGame} 
        className="flex gap-2 items-center"
      >
        <RefreshCw className="h-4 w-4" />
        New Game
      </Button>
      <Button 
        onClick={onResetAll} 
        variant="outline" 
        className="flex gap-2 items-center"
      >
        Reset All Games
      </Button>
    </div>
  );
};

export default GameControls;
