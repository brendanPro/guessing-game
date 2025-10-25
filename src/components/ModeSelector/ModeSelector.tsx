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
import { GameMode } from '@/types/pokemon';

interface ModeSelectorProps {
  currentMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  disabled?: boolean;
  className?: string;
}

const MODE_NAMES: Record<GameMode, string> = {
  [GameMode.BLUR]: 'Mode Flou',
  [GameMode.ZOOM]: 'Mode Zoom',
};

const MODE_DESCRIPTIONS: Record<GameMode, string> = {
  [GameMode.BLUR]: 'L\'image devient plus claire à chaque tentative',
  [GameMode.ZOOM]: 'L\'image se dézoome à chaque tentative',
};

const MODES = [GameMode.BLUR, GameMode.ZOOM];

export function ModeSelector({ 
  currentMode, 
  onModeChange, 
  disabled = false,
  className 
}: ModeSelectorProps) {
  const handleValueChange = (value: string) => {
    const mode = MODES.find(m => m === value);
    if (mode) {
      onModeChange(mode);
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="space-y-2">
        <Label htmlFor="mode-select">Mode de Jeu</Label>
        <Select
          value={currentMode}
          onValueChange={handleValueChange}
          disabled={disabled}
        >
          <SelectTrigger id="mode-select" className="w-full">
            <SelectValue placeholder="Choisissez un mode" />
          </SelectTrigger>
          <SelectContent>
            {MODES.map((mode) => (
              <SelectItem key={mode} value={mode}>
                <div className="flex flex-col items-start gap-1">
                  <span className="font-medium">{MODE_NAMES[mode]}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="p-3 bg-muted rounded-lg text-sm">
        <div className="font-semibold">
          {MODE_NAMES[currentMode]}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {MODE_DESCRIPTIONS[currentMode]}
        </div>
      </div>
    </div>
  );
}

