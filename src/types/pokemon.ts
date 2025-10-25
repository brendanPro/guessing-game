export interface Pokemon {
  id: number;
  name: string;
  frenchName: string;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}

export interface PokemonSpecies {
  count: number;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export enum GameStatus {
  PLAYING = 'playing',
  WON = 'won',
  LOST = 'lost',
}

export enum GameMode {
  BLUR = 'blur',
  ZOOM = 'zoom',
}

export interface GameState {
  targetPokemon: Pokemon | null;
  attempts: string[];
  currentAttempt: string;
  status: GameStatus;
  blurLevel: number; // 0-5, where 0 is fully blurred/zoomed, 5 is clear/normal
  gameMode: GameMode;
}

export enum LetterState {
  CORRECT = 'correct',
  PRESENT = 'present',
  ABSENT = 'absent',
}
