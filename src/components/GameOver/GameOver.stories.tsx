import '@/index.css';
import type { Meta, StoryObj } from '@storybook/react';
import { GameOver } from './GameOver';
import {mockCharizard, mockPikachu, mockMewtwo} from './mock-data'


const meta = {
  title: 'Game/GameOver',
  component: GameOver,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    pokemon: {
      control: 'object',
      description: 'The Pokemon that the player failed to guess',
    },
  },
} satisfies Meta<typeof GameOver>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPikachu: Story = {
  args: {
    pokemon: mockPikachu,
  },
};

export const WithCharizard: Story = {
  args: {
    pokemon: mockCharizard,
  },
};

export const WithMewtwo: Story = {
  args: {
    pokemon: mockMewtwo,
  },
};

export const WithLongName: Story = {
  args: {
    pokemon: {
      ...mockCharizard,
      frenchName: 'Tortank-Méga',
    },
  },
};

export const WithShortName: Story = {
  args: {
    pokemon: {
      ...mockPikachu,
      frenchName: 'Mew',
    },
  },
};

export const NullPokemon: Story = {
  args: {
    pokemon: null,
  },
};

