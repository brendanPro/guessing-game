import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type PokemonGeneration, POKEMON_GENERATIONS } from '@/data/pokemonGenerations';

interface GenerationSelectorProps {
  selectedGeneration: PokemonGeneration;
  onGenerationChange: (generation: PokemonGeneration) => void;
  disabled?: boolean;
  className?: string;
}

export function GenerationSelector({ 
  selectedGeneration, 
  onGenerationChange, 
  disabled = false,
  className 
}: GenerationSelectorProps) {

  return (
    <Card className={cn("w-full max-w-4xl mx-auto", className)}>
      <CardHeader>
        <CardTitle className="text-center text-lg">
          🎮 Choisissez une Génération
        </CardTitle>
        <p className="text-center text-sm text-muted-foreground">
          Sélectionnez la génération de Pokémon pour votre partie
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-3">
          {POKEMON_GENERATIONS.map((gen) => (
            <Button
              key={gen.id}
              variant={selectedGeneration.id === gen.id ? "default" : "outline"}
              size="sm"
              onClick={() => onGenerationChange(gen)}
              disabled={disabled}
              className={cn(
                "flex flex-col items-center p-3 h-auto min-h-[80px] sm:min-h-[60px]",
                "hover:scale-105 transition-transform touch-manipulation",
                selectedGeneration.id === gen.id && "ring-2 ring-primary"
              )}
            >
              <div className="font-bold text-xs sm:text-xs">{gen.name}</div>
              <div className="text-xs text-muted-foreground">{gen.startId}-{gen.endId}</div>
              <div className="text-xs text-muted-foreground hidden sm:block">{gen.region}</div>
            </Button>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="text-sm font-semibold">
            {selectedGeneration.name} - {selectedGeneration.region}
          </div>
          <div className="text-xs text-muted-foreground">
            {selectedGeneration.description}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
