import { useState, useEffect } from 'react';
import { usePokemonGame } from '@/hooks/usePokemonGame';
import { GameStatus } from '@/types/pokemon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CongratulationsModal } from './CongratulationsModal';
import { GenerationSelectorButton } from './GenerationSelectorButton';
import { AttemptDisplay } from './AttemptDisplay';
import { PokemonImage } from './PokemonImage';
import { GuessInput } from './GuessInput';
import { GameOver } from './GameOver';
import { PokemonInfos } from './PokemonInfos';

export function PokemonGame() {
  const {
    gameState,
    selectedGeneration,
    loading,
    error,
    submitGuess,
    restartGame,
    handleGenerationChange,
  } = usePokemonGame();

  const [showCongratulations, setShowCongratulations] = useState(false);

  const handleGuessSubmit = (guess: string) => {
    submitGuess(guess);
  };

  const handlePlayAgain = () => {
    setShowCongratulations(false);
    restartGame();
  };

  // Show congratulations modal when game is won
  useEffect(() => {
    if (gameState.status === GameStatus.WON) {
      setShowCongratulations(true);
    }
  }, [gameState.status]);

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="text-lg">Loading Pokemon...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="text-lg text-destructive mb-4">Error: {error}</div>
          <Button onClick={restartGame} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Game Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              <CardTitle className="text-xl sm:text-2xl">
                🎮 Pokemon Guessing Game
              </CardTitle>
              <p className="text-sm sm:text-base text-muted-foreground">
                Devinez le Pokemon! Vous avez 5 tentatives.
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                L'image devient plus claire à chaque tentative.
              </p>
            </div>
            <div className="flex justify-center sm:justify-end">
              <GenerationSelectorButton
                selectedGeneration={selectedGeneration}
                onGenerationChange={handleGenerationChange}
                disabled={loading}
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Pokemon Image */}
      <PokemonImage 
        pokemon={gameState.targetPokemon} 
        blurLevel={gameState.blurLevel}
        gameOver={gameState.status !== GameStatus.PLAYING}
      />

      {/* Game Over Status (only for lose) */}
      {gameState.status === GameStatus.LOST && (
        <GameOver pokemon={gameState.targetPokemon} />
      )}

      {/* Attempt Display */}
      <AttemptDisplay 
        attempts={gameState.attempts}
        targetPokemon={gameState.targetPokemon?.frenchName || ''}
      />

      {/* Guess Input */}
      {gameState.status === GameStatus.PLAYING && (
        <GuessInput 
          onSubmit={handleGuessSubmit}
          disabled={gameState.status !== GameStatus.PLAYING}
          maxLength={gameState.targetPokemon?.frenchName.length}
        />
      )}

      {/* Game Controls */}
      <div className="flex justify-center gap-4">
        {gameState.status !== GameStatus.PLAYING && (
          <Button onClick={restartGame} variant="default" size="lg">
            Play Again
          </Button>
        )}
        
        {gameState.status === GameStatus.PLAYING && (
          <div className="text-center text-muted-foreground">
            Attempts: {gameState.attempts.length}/5
          </div>
        )}
      </div>

      {/* Pokemon Info (shown when game is over) */}
      {gameState.status !== GameStatus.PLAYING && gameState.targetPokemon && (
        <PokemonInfos pokemon={gameState.targetPokemon} />
      )}

      {/* Congratulations Modal */}
      <CongratulationsModal
        open={showCongratulations}
        onClose={() => setShowCongratulations(false)}
        pokemon={gameState.targetPokemon}
        attempts={gameState.attempts.length}
        onPlayAgain={handlePlayAgain}
      />
    </div>
  );
}
