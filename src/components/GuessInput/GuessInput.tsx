import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GuessInputProps {
  onSubmit: (guess: string) => void;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
}

export function GuessInput({ onSubmit, disabled = false, maxLength, className }: GuessInputProps) {
  const [guess, setGuess] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the input when component mounts or when not disabled
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.trim() && !disabled && maxLength && guess.length === maxLength) {
      onSubmit(guess.trim());
      setGuess('');
      // Re-focus after submission
      setTimeout(() => {
        if (inputRef.current && !disabled) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!maxLength || value.length <= maxLength) {
      setGuess(value);
    }
  };

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardContent className="p-3 sm:p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            ref={inputRef}
            type="text"
            value={guess}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Entrez le nom du Pokemon..."
            disabled={disabled}
            className="flex-1"
            autoComplete="off"
            maxLength={maxLength}
          />
          <Button 
            type="submit" 
            disabled={!guess.trim() || disabled || !maxLength || guess.length !== maxLength}
            variant="default"
          >
            Deviner
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
