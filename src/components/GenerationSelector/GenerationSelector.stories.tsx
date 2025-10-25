import "@/index.css"
import type { Meta, StoryObj } from '@storybook/react';
import { GenerationSelector } from './GenerationSelector';
import { POKEMON_GENERATIONS } from '@/data/pokemonGenerations';
import { fn } from '@storybook/test';
import { useState } from 'react';

const meta = {
  title: 'Game/GenerationSelector',
  component: GenerationSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selectedGeneration: {
      control: 'object',
      description: 'The currently selected generation',
    },
    onGenerationChange: {
      action: 'generation changed',
      description: 'Callback when a generation is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the selector is disabled',
    },
  },
  args: {
    onGenerationChange: fn(),
  },
} satisfies Meta<typeof GenerationSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GenerationI: Story = {
  args: {
    selectedGeneration: POKEMON_GENERATIONS[0],
    disabled: false,
  },
};

export const GenerationII: Story = {
  args: {
    selectedGeneration: POKEMON_GENERATIONS[1],
    disabled: false,
  },
};

export const GenerationV: Story = {
  args: {
    selectedGeneration: POKEMON_GENERATIONS[4],
    disabled: false,
  },
};

export const GenerationIX: Story = {
  args: {
    selectedGeneration: POKEMON_GENERATIONS[8],
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    selectedGeneration: POKEMON_GENERATIONS[0],
    disabled: true,
  },
};

export const Interactive: Story = {
  args: {
    selectedGeneration: POKEMON_GENERATIONS[0],
    disabled: false,
  },
  render: (args) => {
    const [selected, setSelected] = useState(args.selectedGeneration);
    
    return (
      <div className="w-full max-w-4xl">
        <GenerationSelector
          {...args}
          selectedGeneration={selected}
          onGenerationChange={(gen) => {
            setSelected(gen);
            args.onGenerationChange?.(gen);
          }}
        />
        <div className="mt-4 p-4 bg-muted rounded-lg text-center">
          <p className="text-sm">
            <strong>Selected:</strong> {selected.name} ({selected.region})
          </p>
          <p className="text-xs text-muted-foreground">
            Pokémon #{selected.startId} - #{selected.endId}
          </p>
        </div>
      </div>
    );
  },
};

export const AllGenerations: Story = {
  args: {
    selectedGeneration: POKEMON_GENERATIONS[0],
    disabled: false,
  },
  render: (args) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">All 9 Generations</h3>
      <GenerationSelector {...args} />
    </div>
  ),
};

export const WithCustomWidth: Story = {
  args: {
    selectedGeneration: POKEMON_GENERATIONS[0],
    disabled: false,
  },
  render: (args) => (
    <div className="w-[600px]">
      <GenerationSelector {...args} />
    </div>
  ),
};

export const MobileView: Story = {
  args: {
    selectedGeneration: POKEMON_GENERATIONS[0],
    disabled: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const TabletView: Story = {
  args: {
    selectedGeneration: POKEMON_GENERATIONS[0],
    disabled: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

