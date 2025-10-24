import type { Pokemon } from "@/types/pokemon";
import { Card, CardContent } from "./ui/card";

interface GameOverProps {
    pokemon: Pokemon | null;
}

export function GameOver({ pokemon }: GameOverProps) {
    return (
        <Card className="border-red-500 bg-red-50 dark:bg-red-950">
          <CardContent className="p-4 text-center">
            <div className="text-red-600 dark:text-red-400">
              <div className="text-2xl font-bold mb-2">😞 Game Over</div>
              <div>Le Pokemon était <strong>{pokemon?.frenchName}</strong></div>
            </div>
          </CardContent>
        </Card>
    );
}