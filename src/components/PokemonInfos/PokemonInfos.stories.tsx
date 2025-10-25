import "@/index.css"
import type { Meta, StoryObj } from '@storybook/react';
import { PokemonInfos } from './PokemonInfos';
import { mockCharizard, mockGyarados, mockMewtwo, mockPikachu } from "./mock-data";


const meta = {
  title: 'Game/PokemonInfos',
  component: PokemonInfos,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    pokemon: {
      control: 'object',
      description: 'The Pokemon to display information about',
    },
  },
} satisfies Meta<typeof PokemonInfos>;

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

export const WithGyarados: Story = {
  args: {
    pokemon: mockGyarados,
  },
};

export const WithSingleType: Story = {
  args: {
    pokemon: mockPikachu,
  },
};

export const WithDualType: Story = {
  args: {
    pokemon: mockCharizard,
  },
};

export const WithLongName: Story = {
  args: {
    pokemon: {
      ...mockCharizard,
      frenchName: 'Tortank-Méga-X',
    },
  },
};

export const WithHeavyPokemon: Story = {
  args: {
    pokemon: mockGyarados,
  },
};

export const WithLightPokemon: Story = {
  args: {
    pokemon: {
      ...mockPikachu,
      height: 2,
      weight: 30,
    },
  },
};

