import "@/index.css"
import type { Meta, StoryObj } from '@storybook/react';
import { PokemonImage } from './PokemonImage';
import { mockCharizard, mockGyarados, mockMewtwo, mockPikachu } from "./mock-data";

const meta = {
  title: 'Game/PokemonImage',
  component: PokemonImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    pokemon: {
      control: 'object',
      description: 'The Pokemon to display',
    },
    blurLevel: {
      control: { type: 'range', min: 0, max: 5, step: 1 },
      description: 'Blur level from 0 (fully blurred) to 5 (clear)',
    },
    gameOver: {
      control: 'boolean',
      description: 'Whether the game is over (removes all blur)',
    },
  },
} satisfies Meta<typeof PokemonImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullyBlurred: Story = {
  args: {
    pokemon: mockPikachu,
    blurLevel: 0,
    gameOver: false,
  },
};

export const SlightlyBlurred: Story = {
  args: {
    pokemon: mockPikachu,
    blurLevel: 1,
    gameOver: false,
  },
};

export const HalfBlurred: Story = {
  args: {
    pokemon: mockPikachu,
    blurLevel: 2,
    gameOver: false,
  },
};

export const MostlyVisible: Story = {
  args: {
    pokemon: mockPikachu,
    blurLevel: 4,
    gameOver: false,
  },
};

export const FullyVisible: Story = {
  args: {
    pokemon: mockPikachu,
    blurLevel: 5,
    gameOver: false,
  },
};

export const GameOverClear: Story = {
  args: {
    pokemon: mockPikachu,
    blurLevel: 0,
    gameOver: true,
  },
};

export const WithCharizard: Story = {
  args: {
    pokemon: mockCharizard,
    blurLevel: 2,
    gameOver: false,
  },
};

export const WithMewtwo: Story = {
  args: {
    pokemon: mockMewtwo,
    blurLevel: 3,
    gameOver: false,
  },
};

export const WithGyarados: Story = {
  args: {
    pokemon: mockGyarados,
    blurLevel: 1,
    gameOver: false,
  },
};

export const LoadingState: Story = {
  args: {
    pokemon: null,
    blurLevel: 0,
    gameOver: false,
  },
};

export const BlurProgression: Story = {
  args: {
    pokemon: mockPikachu,
    blurLevel: 0,
    gameOver: false,
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <p className="text-sm font-semibold mb-2">Blur Level 0 (Fully Blurred)</p>
        <PokemonImage {...args} blurLevel={0} />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold mb-2">Blur Level 2</p>
        <PokemonImage {...args} blurLevel={2} />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold mb-2">Blur Level 5 (Clear)</p>
        <PokemonImage {...args} blurLevel={5} />
      </div>
    </div>
  ),
};

