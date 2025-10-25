import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ModeSelector } from '@/components/ModeSelector';
import { GenerationSelector } from '@/components/GenerationSelector';
import { GameMode } from '@/types/pokemon';
import { type PokemonGeneration } from '@/data/pokemonGenerations';

interface GameMenuProps {
  gameMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  selectedGeneration: PokemonGeneration;
  onGenerationChange: (generation: PokemonGeneration) => void;
  disabled?: boolean;
}

export function GameMenu({
  gameMode,
  onModeChange,
  selectedGeneration,
  onGenerationChange,
  disabled = false,
}: GameMenuProps) {
  return (
    <div className="space-y-6">
      {/* Game Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🎮 À propos du jeu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Devinez le Pokémon en 5 tentatives maximum!</p>
          <p>Chaque tentative révèle progressivement l'image.</p>
          <p>Les lettres correctes apparaissent en vert, les lettres présentes mais mal placées en jaune.</p>
        </CardContent>
      </Card>

      {/* Mode Selector */}
      <div>
        <h3 className="text-sm font-semibold mb-3 px-1">Mode de jeu</h3>
        <ModeSelector
          currentMode={gameMode}
          onModeChange={onModeChange}
          disabled={disabled}
        />
      </div>

      {/* Generation Selector */}
      <div>
        <h3 className="text-sm font-semibold mb-3 px-1">Génération</h3>
        <GenerationSelector
          selectedGeneration={selectedGeneration}
          onGenerationChange={onGenerationChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

