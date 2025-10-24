import { useState, useEffect, useCallback } from 'react';
import { type Pokemon, type GameState, type LetterState, GameStatus } from '@/types/pokemon';
import { type PokemonGeneration, DEFAULT_GENERATION } from '@/data/pokemonGenerations';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

export function usePokemonGame() {
  const [gameState, setGameState] = useState<GameState>({
    targetPokemon: null,
    attempts: [],
    currentAttempt: '',
    status: GameStatus.PLAYING,
    blurLevel: 0,
  });

  const [selectedGeneration, setSelectedGeneration] = useState<PokemonGeneration>(DEFAULT_GENERATION);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get random Pokemon with French name
  const getRandomPokemon = async (): Promise<Pokemon> => {
    try {
      const pokemonCount = selectedGeneration.endId - selectedGeneration.startId + 1;
      const randomId = Math.floor(Math.random() * pokemonCount) + selectedGeneration.startId;
      
      // Fetch Pokemon data
      const pokemonResponse = await fetch(`${POKEAPI_BASE}/pokemon/${randomId}`);
      if (!pokemonResponse.ok) {
        throw new Error('Failed to fetch Pokemon');
      }
      const pokemonData = await pokemonResponse.json();
      
      // Fetch species data for French name
      const speciesResponse = await fetch(`${POKEAPI_BASE}/pokemon-species/${randomId}`);
      if (!speciesResponse.ok) {
        throw new Error('Failed to fetch Pokemon species');
      }
      const speciesData = await speciesResponse.json();
      
      // Find French name
      const frenchName = speciesData.names.find((name: any) => name.language.name === 'fr')?.name || pokemonData.name;
      
      return {
        ...pokemonData,
        frenchName: frenchName
      };
    } catch (err) {
      throw new Error('Failed to fetch random Pokemon');
    }
  };

  // Initialize game
  const initializeGame = useCallback(async () => {
    console.log('🚀 Initializing game...');
    setLoading(true);
    setError(null);
    
    try {
      const pokemon = await getRandomPokemon();
      console.log('✅ Game initialized successfully');
      setGameState({
        targetPokemon: pokemon,
        attempts: [],
        currentAttempt: '',
        status: GameStatus.PLAYING,
        blurLevel: 0,
      });
    } catch (err) {
      console.error('❌ Game initialization failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize game');
    } finally {
      setLoading(false);
    }
  }, [selectedGeneration]);

  // Check if guess is correct
  const checkGuess = (guess: string, target: string): LetterState[] => {
    const result: LetterState[] = new Array(guess.length).fill('absent');
    const targetLetters = target.toLowerCase().split('');
    const guessLetters = guess.toLowerCase().split('');
    
    // First pass: mark correct letters
    for (let i = 0; i < guessLetters.length; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        result[i] = 'correct';
        targetLetters[i] = ''; // Mark as used
      }
    }
    
    // Second pass: mark present letters
    for (let i = 0; i < guessLetters.length; i++) {
      if (result[i] === 'correct') continue;
      
      const targetIndex = targetLetters.indexOf(guessLetters[i]);
      if (targetIndex !== -1) {
        result[i] = 'present';
        targetLetters[targetIndex] = ''; // Mark as used
      }
    }
    
    return result;
  };

  // Submit guess
  const submitGuess = useCallback((guess: string) => {
    if (!gameState.targetPokemon || guess.length === 0) return;
    
    const normalizedGuess = guess.toLowerCase();
    const target = gameState.targetPokemon.frenchName.toLowerCase();
    
    const newAttempts = [...gameState.attempts, guess];
    const isCorrect = normalizedGuess === target;
    
    // Determine game status
    let newStatus = GameStatus.PLAYING;
    if (isCorrect) {
      newStatus = GameStatus.WON;
    } else if (newAttempts.length >= 5) {
      newStatus = GameStatus.LOST;
    }
    
    // Calculate new blur level (0-5, where 5 is clear)
    const newBlurLevel = Math.min(5, newAttempts.length);
    
    setGameState(prev => ({
      ...prev,
      attempts: newAttempts,
      currentAttempt: '',
      status: newStatus,
      blurLevel: newBlurLevel,
    }));
  }, [gameState.targetPokemon, gameState.attempts]);

  // Update current attempt
  const updateCurrentAttempt = useCallback((attempt: string) => {
    setGameState(prev => ({
      ...prev,
      currentAttempt: attempt,
    }));
  }, []);

  // Restart game
  const restartGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Handle generation change
  const handleGenerationChange = useCallback((generation: PokemonGeneration) => {
    setSelectedGeneration(generation);
    // Game will automatically restart due to selectedGeneration dependency
  }, []);

  return {
    gameState,
    selectedGeneration,
    loading,
    error,
    submitGuess,
    updateCurrentAttempt,
    restartGame,
    handleGenerationChange,
    checkGuess,
  };
}
