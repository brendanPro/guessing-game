import React from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  const handleValueChange = (value: string) => {
    const generation = POKEMON_GENERATIONS.find(gen => gen.id.toString() === value);
    if (generation) {
      onGenerationChange(generation);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="space-y-2">
        <Label htmlFor="generation-select">Génération Pokémon</Label>
        <Select
          value={selectedGeneration.id.toString()}
          onValueChange={handleValueChange}
          disabled={disabled}
        >
          <SelectTrigger id="generation-select" className="w-full">
            <SelectValue placeholder="Choisissez une génération" />
          </SelectTrigger>
          <SelectContent>
            {POKEMON_GENERATIONS.map((gen) => (
              <SelectItem key={gen.id} value={gen.id.toString()}>
                <div className="flex items-center justify-between w-full gap-2">
                  <span className="font-medium">{gen.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {gen.region} (#{gen.startId}-{gen.endId})
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="p-3 bg-muted rounded-lg text-sm">
        <div className="font-semibold">
          {selectedGeneration.name} - {selectedGeneration.region}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {selectedGeneration.description}
        </div>
      </div>
    </div>
  );
}
