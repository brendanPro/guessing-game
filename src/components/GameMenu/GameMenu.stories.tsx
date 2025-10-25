import "@/index.css"
import type { Meta, StoryObj } from '@storybook/react';
import { GameMenu } from './GameMenu';
import { GameMode } from '@/types/pokemon';
import { POKEMON_GENERATIONS } from '@/data/pokemonGenerations';
import { fn } from '@storybook/test';

const meta = {
  title: 'Game/GameMenu',
  component: GameMenu,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    gameMode: {
      control: 'select',
      options: [GameMode.BLUR, GameMode.ZOOM],
      description: 'The currently selected game mode',
    },
    onModeChange: {
      action: 'mode changed',
      description: 'Callback when mode is changed',
    },
    selectedGeneration: {
      control: 'object',
      description: 'The currently selected generation',
    },
    onGenerationChange: {
      action: 'generation changed',
      description: 'Callback when generation is changed',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the menu is disabled',
    },
  },
  args: {
    onModeChange: fn(),
    onGenerationChange: fn(),
  },
} satisfies Meta<typeof GameMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gameMode: GameMode.BLUR,
    selectedGeneration: POKEMON_GENERATIONS[0],
    disabled: false,
  },
};

export const ZoomMode: Story = {
  args: {
    gameMode: GameMode.ZOOM,
    selectedGeneration: POKEMON_GENERATIONS[0],
    disabled: false,
  },
};

export const DifferentGeneration: Story = {
  args: {
    gameMode: GameMode.BLUR,
    selectedGeneration: POKEMON_GENERATIONS[4], // Gen V
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    gameMode: GameMode.BLUR,
    selectedGeneration: POKEMON_GENERATIONS[0],
    disabled: true,
  },
};

export const FullMenu: Story = {
  args: {
    gameMode: GameMode.ZOOM,
    selectedGeneration: POKEMON_GENERATIONS[8], // Gen IX
    disabled: false,
  },
  render: (args) => (
    <div className="max-w-sm">
      <GameMenu {...args} />
    </div>
  ),
};

