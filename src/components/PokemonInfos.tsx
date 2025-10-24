import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { Pokemon } from "@/types/pokemon";

interface PokemonInfosProps {
    pokemon: Pokemon;
}

export function PokemonInfos({pokemon}: PokemonInfosProps) {
    return (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Pokemon Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Basic Info</h4>
                <p><strong>Name:</strong> {pokemon.frenchName}</p>
                <p><strong>Height:</strong> {pokemon.height / 10}m</p>
                <p><strong>Weight:</strong> {pokemon.weight / 10}kg</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Types</h4>
                <div className="flex gap-2">
                  {pokemon.types.map((type, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-primary text-primary-foreground rounded text-sm"
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
    )
}