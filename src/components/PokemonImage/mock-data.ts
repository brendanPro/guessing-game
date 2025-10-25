import type { Pokemon } from '@/types/pokemon';

export const mockPikachu: Pokemon = {
  id: 25,
  name: 'pikachu',
  frenchName: 'Pikachu',
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',
    front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png',
    back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png',
  },
  types: [
    {
      type: {
        name: 'electric',
      },
    },
  ],
  height: 4,
  weight: 60,
  stats: [
    {
      base_stat: 35,
      stat: {
        name: 'hp',
      },
    },
  ],
};

export const mockCharizard: Pokemon = {
  id: 6,
  name: 'charizard',
  frenchName: 'Dracaufeu',
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png',
    front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/6.png',
    back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/6.png',
  },
  types: [
    {
      type: {
        name: 'fire',
      },
    },
    {
      type: {
        name: 'flying',
      },
    },
  ],
  height: 17,
  weight: 905,
  stats: [
    {
      base_stat: 78,
      stat: {
        name: 'hp',
      },
    },
  ],
};

export const mockMewtwo: Pokemon = {
  id: 150,
  name: 'mewtwo',
  frenchName: 'Mewtwo',
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/150.png',
    front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/150.png',
    back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/150.png',
  },
  types: [
    {
      type: {
        name: 'psychic',
      },
    },
  ],
  height: 20,
  weight: 1220,
  stats: [
    {
      base_stat: 106,
      stat: {
        name: 'hp',
      },
    },
  ],
};

export const mockGyarados: Pokemon = {
  id: 130,
  name: 'gyarados',
  frenchName: 'Léviator',
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png',
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/130.png',
    front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/130.png',
    back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/130.png',
  },
  types: [
    {
      type: {
        name: 'water',
      },
    },
    {
      type: {
        name: 'flying',
      },
    },
  ],
  height: 65,
  weight: 2350,
  stats: [
    {
      base_stat: 95,
      stat: {
        name: 'hp',
      },
    },
  ],
};

