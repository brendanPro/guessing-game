import "@/index.css"
import type { Meta, StoryObj } from '@storybook/react';
import { GuessInput } from './GuessInput';
import { fn } from '@storybook/test';

const meta = {
  title: 'Game/GuessInput',
  component: GuessInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: {
      action: 'submitted',
      description: 'Callback when a guess is submitted',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    maxLength: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Maximum length of the input',
    },
  },
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof GuessInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
    maxLength: 7,
  },
};

export const ShortName: Story = {
  args: {
    disabled: false,
    maxLength: 3,
  },
};

export const MediumName: Story = {
  args: {
    disabled: false,
    maxLength: 8,
  },
};

export const LongName: Story = {
  args: {
    disabled: false,
    maxLength: 12,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    maxLength: 7,
  },
};

export const NoMaxLength: Story = {
  args: {
    disabled: false,
    maxLength: undefined,
  },
};

export const Interactive: Story = {
  args: {
    disabled: false,
    maxLength: 7,
  },
  render: (args) => (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Try typing "pikachu" (7 letters) to enable the submit button
        </p>
        <GuessInput {...args} />
      </div>
    </div>
  ),
};

export const WithDifferentMaxLengths: Story = {
  args: {
    disabled: false,
    onSubmit: fn(),
  },
  render: (args) => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <p className="text-sm font-semibold mb-2">Max Length: 3 (e.g., "Mew")</p>
        <GuessInput {...args} maxLength={3} />
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Max Length: 7 (e.g., "Pikachu")</p>
        <GuessInput {...args} maxLength={7} />
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Max Length: 12 (e.g., "Tortank-Méga")</p>
        <GuessInput {...args} maxLength={12} />
      </div>
    </div>
  ),
};

export const DisabledState: Story = {
  args: {
    disabled: true,
    maxLength: 7,
  },
  render: (args) => (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Input is disabled (game over or loading)
        </p>
        <GuessInput {...args} />
      </div>
    </div>
  ),
};

