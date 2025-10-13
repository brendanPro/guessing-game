import React from 'react';
import { type Pokemon } from '@/types/pokemon';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PokemonImageProps {
  pokemon: Pokemon | null;
  blurLevel: number; // 0-5, where 0 is fully blurred, 5 is clear
  gameOver?: boolean;
  className?: string;
}

export function PokemonImage({ pokemon, blurLevel, gameOver = false, className }: PokemonImageProps) {
  if (!pokemon) {
    return (
      <Card className={cn("w-64 h-64 mx-auto", className)}>
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-muted-foreground">Loading Pokemon...</div>
        </CardContent>
      </Card>
    );
  }

  // Calculate blur intensity (0-20px blur)
  // If game is over, remove all blur
  const blurIntensity = gameOver ? 0 : Math.max(0, 20 - (blurLevel * 4));
  

  return (
    <Card className={cn("w-full max-w-xs sm:max-w-sm mx-auto aspect-square overflow-hidden", className)}>
      <CardContent className="p-4 h-full flex items-center justify-center">
        <div className="relative w-full h-full">
          <img
            src={pokemon.sprites.front_default}
            alt="Pokemon to guess"
            className={cn(
              "w-full h-full object-contain transition-all duration-500",
              "filter"
            )}
            style={{
              filter: `blur(${blurIntensity}px)`,
            }}
          />
          
        </div>
      </CardContent>
    </Card>
  );
}
