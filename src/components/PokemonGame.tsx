import { useState, useEffect } from 'react';
import { usePokemonGame } from '@/hooks/usePokemonGame';
import { GameStatus, GameMode } from '@/types/pokemon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Drawer } from '@/components/ui/drawer';
import { GameMenu } from '@/components/GameMenu';
import { CongratulationsModal } from './CongratulationsModal';
import { AttemptDisplay } from './AttemptDisplay';
import { PokemonImage } from './PokemonImage';
import { GuessInput } from './GuessInput';
import { GameOver } from './GameOver';
import { PokemonInfos } from './PokemonInfos';
import { Menu } from 'lucide-react';

export function PokemonGame() {
  const {
    gameState,
    effectLevel,
    selectedGeneration,
    gameMode,
    loading,
    error,
    submitGuess,
    restartGame,
    handleGenerationChange,
    handleModeChange,
  } = usePokemonGame();

  const [showCongratulations, setShowCongratulations] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Compact Header with Menu Button */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg sm:text-xl font-bold">🎮 Pokémon Guessing</h1>
            <div className="w-9" /> {/* Spacer for centering */}
          </div>
        </CardContent>
      </Card>

      {/* Drawer Menu */}
      <Drawer open={menuOpen} onOpenChange={setMenuOpen} side="left">
        <GameMenu
          gameMode={gameMode}
          onModeChange={(mode) => {
            handleModeChange(mode);
            setMenuOpen(false);
          }}
          selectedGeneration={selectedGeneration}
          onGenerationChange={(gen) => {
            handleGenerationChange(gen);
            setMenuOpen(false);
          }}
          disabled={loading}
        />
      </Drawer>

      {/* Pokemon Image */}
      <PokemonImage 
        pokemon={gameState.targetPokemon} 
        effectLevel={effectLevel}
        gameMode={gameMode}
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
