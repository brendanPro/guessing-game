import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { type LetterState } from '@/types/pokemon';

interface AttemptDisplayProps {
  attempts: string[];
  targetPokemon: string;
  className?: string;
}

export function AttemptDisplay({ attempts, targetPokemon, className }: AttemptDisplayProps) {
  const getLetterStates = (guess: string): LetterState[] => {
    const result: LetterState[] = new Array(targetPokemon.length).fill('absent');
    const targetLetters = targetPokemon.toLowerCase().split('');
    const guessLetters = guess.toLowerCase().split('');
    
    // First pass: mark correct letters
    for (let i = 0; i < Math.min(guessLetters.length, targetLetters.length); i++) {
      if (guessLetters[i] === targetLetters[i]) {
        result[i] = 'correct';
        targetLetters[i] = ''; // Mark as used
      }
    }
    
    // Second pass: mark present letters
    for (let i = 0; i < Math.min(guessLetters.length, targetLetters.length); i++) {
      if (result[i] === 'correct') continue;
      
      const targetIndex = targetLetters.indexOf(guessLetters[i]);
      if (targetIndex !== -1) {
        result[i] = 'present';
        targetLetters[targetIndex] = ''; // Mark as used
      }
    }
    
    return result;
  };

  const getLetterClassName = (state: LetterState) => {
    switch (state) {
      case 'correct':
        return 'bg-green-500 text-white';
      case 'present':
        return 'bg-yellow-500 text-white';
      case 'absent':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  // Always show 5 rows, even if no attempts yet
  const totalRows = 5;
  const targetLength = targetPokemon.length;

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardContent className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-center">Vos Tentatives</h3>
        <div className="space-y-2">
          {Array.from({ length: totalRows }, (_, rowIndex) => {
            const attempt = attempts[rowIndex];
            const letterStates = attempt ? getLetterStates(attempt) : new Array(targetLength).fill('absent');
            
            return (
              <div key={rowIndex} className="flex gap-1 sm:gap-1 justify-center">
                {Array.from({ length: targetLength }, (_, letterIndex) => {
                  const letter = attempt ? attempt[letterIndex] : '';
                  const state = letterStates[letterIndex];
                  
                  return (
                    <div
                      key={letterIndex}
                      className={cn(
                        "w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded font-bold text-sm sm:text-xs border-2",
                        "touch-manipulation", // Improves touch responsiveness
                        getLetterClassName(state),
                        !attempt && "border-gray-300"
                      )}
                    >
                      {letter ? letter.toUpperCase() : ''}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
