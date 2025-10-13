import React, { useState } from 'react';
import { usePokemonGame } from '@/hooks/usePokemonGame';
import { PokemonImage } from './PokemonImage';
import { GuessInput } from './GuessInput';
import { AttemptDisplay } from './AttemptDisplay';
import { GenerationSelectorButton } from './GenerationSelectorButton';
import { CongratulationsModal } from './CongratulationsModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function PokemonGame() {
  const {
    gameState,
    selectedGeneration,
    loading,
    error,
    submitGuess,
    updateCurrentAttempt,
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
  React.useEffect(() => {
    if (gameState.won && gameState.gameOver) {
      setShowCongratulations(true);
    }
  }, [gameState.won, gameState.gameOver]);

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
        gameOver={gameState.gameOver}
      />

      {/* Game Over Status (only for lose) */}
      {gameState.gameOver && !gameState.won && (
        <Card className="border-red-500 bg-red-50 dark:bg-red-950">
          <CardContent className="p-4 text-center">
            <div className="text-red-600 dark:text-red-400">
              <div className="text-2xl font-bold mb-2">😞 Game Over</div>
              <div>Le Pokemon était <strong>{gameState.targetPokemon?.frenchName}</strong></div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Attempt Display */}
      <AttemptDisplay 
        attempts={gameState.attempts}
        targetPokemon={gameState.targetPokemon?.frenchName || ''}
      />

      {/* Guess Input */}
      {!gameState.gameOver && (
        <GuessInput 
          onSubmit={handleGuessSubmit}
          disabled={gameState.gameOver}
          maxLength={gameState.targetPokemon?.frenchName.length}
        />
      )}

      {/* Game Controls */}
      <div className="flex justify-center gap-4">
        {gameState.gameOver && (
          <Button onClick={restartGame} variant="default" size="lg">
            Play Again
          </Button>
        )}
        
        {!gameState.gameOver && (
          <div className="text-center text-muted-foreground">
            Attempts: {gameState.attempts.length}/5
          </div>
        )}
      </div>

      {/* Pokemon Info (shown when game is over) */}
      {gameState.gameOver && gameState.targetPokemon && (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Pokemon Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Basic Info</h4>
                <p><strong>Name:</strong> {gameState.targetPokemon.frenchName}</p>
                <p><strong>Height:</strong> {gameState.targetPokemon.height / 10}m</p>
                <p><strong>Weight:</strong> {gameState.targetPokemon.weight / 10}kg</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Types</h4>
                <div className="flex gap-2">
                  {gameState.targetPokemon.types.map((type, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-primary text-primary-foreground rounded text-sm"
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
