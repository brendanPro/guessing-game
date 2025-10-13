import React from 'react';
import { Button } from '@/components/ui/button';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription } from '@/components/ui/modal';
import { GenerationSelector } from './GenerationSelector';
import { type PokemonGeneration } from '@/data/pokemonGenerations';

interface GenerationSelectorButtonProps {
  selectedGeneration: PokemonGeneration;
  onGenerationChange: (generation: PokemonGeneration) => void;
  disabled?: boolean;
  className?: string;
}

export function GenerationSelectorButton({ 
  selectedGeneration, 
  onGenerationChange, 
  disabled = false,
  className 
}: GenerationSelectorButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        disabled={disabled}
        className={className}
      >
        ⚙️ {selectedGeneration.name}
      </Button>

      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Choisissez une Génération</ModalTitle>
            <ModalDescription>
              Sélectionnez la génération de Pokémon pour votre partie
            </ModalDescription>
          </ModalHeader>
          
          <GenerationSelector
            selectedGeneration={selectedGeneration}
            onGenerationChange={(generation) => {
              onGenerationChange(generation);
              setIsOpen(false);
            }}
            disabled={disabled}
          />
        </ModalContent>
      </Modal>
    </>
  );
}
