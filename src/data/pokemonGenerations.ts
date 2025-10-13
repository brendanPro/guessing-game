export interface PokemonGeneration {
  id: number;
  name: string;
  startId: number;
  endId: number;
  region: string;
  description: string;
}

export const POKEMON_GENERATIONS: PokemonGeneration[] = [
  {
    id: 1,
    name: "Génération I",
    startId: 1,
    endId: 151,
    region: "Kanto",
    description: "Les 151 premiers Pokémon (Rouge, Bleu, Jaune)"
  },
  {
    id: 2,
    name: "Génération II", 
    startId: 1,
    endId: 251,
    region: "Johto",
    description: "Les 251 premiers Pokémon (Or, Argent, Cristal)"
  },
  {
    id: 3,
    name: "Génération III",
    startId: 1,
    endId: 386,
    region: "Hoenn",
    description: "Les 386 premiers Pokémon (Rubis, Saphir, Émeraude)"
  },
  {
    id: 4,
    name: "Génération IV",
    startId: 1,
    endId: 493,
    region: "Sinnoh",
    description: "Les 493 premiers Pokémon (Diamant, Perle, Platine)"
  },
  {
    id: 5,
    name: "Génération V",
    startId: 1,
    endId: 649,
    region: "Unys",
    description: "Les 649 premiers Pokémon (Noir, Blanc, Noir 2, Blanc 2)"
  },
  {
    id: 6,
    name: "Génération VI",
    startId: 1,
    endId: 721,
    region: "Kalos",
    description: "Les 721 premiers Pokémon (X, Y, Rubis Oméga, Saphir Alpha)"
  },
  {
    id: 7,
    name: "Génération VII",
    startId: 1,
    endId: 809,
    region: "Alola",
    description: "Les 809 premiers Pokémon (Soleil, Lune, Ultra-Soleil, Ultra-Lune)"
  },
  {
    id: 8,
    name: "Génération VIII",
    startId: 1,
    endId: 905,
    region: "Galar",
    description: "Les 905 premiers Pokémon (Épée, Bouclier, Légendes Arceus)"
  },
  {
    id: 9,
    name: "Génération IX",
    startId: 1,
    endId: 1025,
    region: "Paldea",
    description: "Tous les Pokémon (Écarlate, Violet, DLC)"
  }
];

export const DEFAULT_GENERATION = POKEMON_GENERATIONS[0]; // Gen I by default
