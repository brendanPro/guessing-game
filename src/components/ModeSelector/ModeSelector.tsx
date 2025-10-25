import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GameMode } from '@/types/pokemon';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

const MODES = [GameMode.BLUR, GameMode.ZOOM];

export function ModeSelector({ 
  currentMode, 
  onModeChange, 
  disabled = false,
  className 
}: ModeSelectorProps) {
  const currentIndex = MODES.indexOf(currentMode);

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? MODES.length - 1 : currentIndex - 1;
    onModeChange(MODES[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex === MODES.length - 1 ? 0 : currentIndex + 1;
    onModeChange(MODES[newIndex]);
  };

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={disabled}
            className="shrink-0"
            aria-label="Mode précédent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 text-center">
            <span className="text-sm sm:text-base font-semibold">
              {MODE_NAMES[currentMode]}
            </span>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={disabled}
            className="shrink-0"
            aria-label="Mode suivant"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

