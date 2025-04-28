
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import GameBoard from '@/components/GameBoard';
import ScoreBoard from '@/components/ScoreBoard';
import GameControls from '@/components/GameControls';
import { CardType } from '@/components/Card';

const Index = () => {
  const { toast } = useToast();
  const [cards, setCards] = useState<CardType[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [disableCards, setDisableCards] = useState(false);
  const [players, setPlayers] = useState([
    { name: 'Player 1', score: 0 },
    { name: 'Player 2', score: 0 },
  ]);
  const [gamesWon, setGamesWon] = useState<number[]>([]);
  const [currentGame, setCurrentGame] = useState(1);
  const [gameActive, setGameActive] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Initialize game
  useEffect(() => {
    initializeGame();
    setIsInitialLoad(false);
  }, []);

  // Check for game completion
  useEffect(() => {
    if (!isInitialLoad && matchedPairs === 15 && gameActive) {
      handleGameComplete();
    }
  }, [matchedPairs, gameActive]);

  // Handle flipped cards logic
  useEffect(() => {
    if (flippedCards.length === 2) {
      setDisableCards(true);
      checkForMatch();
    }
  }, [flippedCards]);

  const initializeGame = () => {
    // Create array of pairs (values 0-14, each value appearing twice)
    const cardValues = Array.from({ length: 15 }, (_, i) => [i, i]).flat();
    // Shuffle the array
    const shuffled = [...cardValues].sort(() => Math.random() - 0.5);
    
    // Create card objects
    const newCards = shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setGameActive(true);
    
    // Reset scores for new game
    setPlayers(players.map(player => ({ ...player, score: 0 })));
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length < 2) {
      setCards(cards.map(card => 
        card.id === id ? { ...card, isFlipped: true } : card
      ));
      setFlippedCards([...flippedCards, id]);
    }
  };

  const checkForMatch = () => {
    const [firstId, secondId] = flippedCards;
    const firstCard = cards.find(card => card.id === firstId);
    const secondCard = cards.find(card => card.id === secondId);

    if (firstCard && secondCard && firstCard.value === secondCard.value) {
      // It's a match!
      setCards(cards.map(card => 
        card.id === firstId || card.id === secondId ? { ...card, isMatched: true } : card
      ));
      
      // Update player score
      setPlayers(players.map((player, idx) => 
        idx === currentPlayer ? { ...player, score: player.score + 1 } : player
      ));

      setMatchedPairs(matchedPairs + 1);
      setFlippedCards([]);
      setDisableCards(false);
      
      toast({
        title: "Match!",
        description: `${players[currentPlayer].name} found a match!`,
        duration: 1500,
      });
    } else {
      // Not a match - flip cards back after a delay
      setTimeout(() => {
        setCards(cards.map(card => 
          card.id === firstId || card.id === secondId ? { ...card, isFlipped: false } : card
        ));
        setFlippedCards([]);
        setDisableCards(false);
        
        // Switch player turn
        setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
      }, 1000);
    }
  };

  const handleGameComplete = () => {
    setGameActive(false);
    
    // Determine winner of the current game
    const winner = players[0].score > players[1].score ? 0 : 
                  players[1].score > players[0].score ? 1 : 
                  null;
    
    // Copy and update games won array
    const newGamesWon = [...gamesWon];
    newGamesWon[currentGame - 1] = winner !== null ? winner : Math.floor(Math.random() * 2); // random tiebreaker
    setGamesWon(newGamesWon);
    
    // Show winner toast
    if (winner !== null) {
      toast({
        title: "Game Complete!",
        description: `${players[winner].name} wins game ${currentGame}!`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Game Complete!",
        description: "It's a tie!",
        duration: 3000,
      });
    }

    // Check if all 5 games have been played
    if (currentGame === 5) {
      const player1Wins = newGamesWon.filter(win => win === 0).length;
      const player2Wins = newGamesWon.filter(win => win === 1).length;
      
      setTimeout(() => {
        toast({
          title: "Series Complete!",
          description: player1Wins > player2Wins 
            ? "Player 1 wins the series!" 
            : player2Wins > player1Wins 
            ? "Player 2 wins the series!" 
            : "The series ended in a tie!",
          duration: 5000,
        });
      }, 1000);
    }
  };

  const handleNewGame = () => {
    if (currentGame < 5) {
      setCurrentGame(currentGame + 1);
    } else {
      // If already played 5 games, stay at game 5 but reset the current game
      toast({
        title: "Series Complete",
        description: "You've played all 5 games. Reset all to start a new series.",
        duration: 3000,
      });
    }
    initializeGame();
  };

  const handleResetAll = () => {
    setGamesWon([]);
    setCurrentGame(1);
    initializeGame();
    toast({
      title: "All Games Reset",
      description: "Starting a new series of games",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-primary">Memory Game</h1>
        
        <ScoreBoard 
          currentPlayer={currentPlayer} 
          players={players} 
          gamesWon={gamesWon} 
          currentGame={currentGame} 
        />

        <GameBoard 
          cards={cards} 
          onCardClick={handleCardClick}
          disableCards={disableCards} 
        />

        <GameControls 
          onNewGame={handleNewGame}
          onResetAll={handleResetAll}
        />
      </div>
    </div>
  );
};

export default Index;
