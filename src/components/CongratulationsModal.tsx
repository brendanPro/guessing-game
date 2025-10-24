import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { type Pokemon } from '@/types/pokemon';

interface CongratulationsModalProps {
  open: boolean;
  onClose: () => void;
  pokemon: Pokemon | null;
  attempts: number;
  onPlayAgain: () => void;
}

export function CongratulationsModal({ 
  open, 
  onClose, 
  pokemon, 
  attempts,
  onPlayAgain 
}: CongratulationsModalProps) {
  if (!pokemon) return null;

  return (
    <Modal open={open} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle className="text-center text-xl sm:text-2xl">
            🎉 Félicitations!
          </ModalTitle>
          <ModalDescription className="text-center text-sm sm:text-base">
            Vous avez deviné le Pokémon en {attempts} tentative{attempts > 1 ? 's' : ''}!
          </ModalDescription>
        </ModalHeader>

        <div className="text-center space-y-4">
          {/* Pokemon Image */}
          <div className="flex justify-center">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.frenchName}
              className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
            />
          </div>

          {/* Pokemon Name */}
          <div className="text-2xl sm:text-3xl font-bold text-primary">
            {pokemon.frenchName}
          </div>

          {/* Pokemon Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
            <div>
              <strong>Hauteur:</strong> {pokemon.height / 10}m
            </div>
            <div>
              <strong>Poids:</strong> {pokemon.weight / 10}kg
            </div>
          </div>

          {/* Types */}
          <div>
            <strong>Types:</strong>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {pokemon.types.map((type, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs sm:text-sm"
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ModalFooter>
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button onClick={onPlayAgain}>
            Rejouer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
