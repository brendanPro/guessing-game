import "@/index.css"
import type { Meta, StoryObj } from '@storybook/react';
import { ModeSelector } from './ModeSelector';
import { GameMode } from '@/types/pokemon';
import { fn } from '@storybook/test';
import { useState } from 'react';

const meta = {
  title: 'Game/ModeSelector',
  component: ModeSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentMode: {
      control: 'select',
      options: [GameMode.BLUR, GameMode.ZOOM],
      description: 'The currently selected game mode',
    },
    onModeChange: {
      action: 'mode changed',
      description: 'Callback when mode is changed',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the selector is disabled',
    },
  },
  args: {
    onModeChange: fn(),
  },
} satisfies Meta<typeof ModeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BlurMode: Story = {
  args: {
    currentMode: GameMode.BLUR,
    disabled: false,
  },
};

export const ZoomMode: Story = {
  args: {
    currentMode: GameMode.ZOOM,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    currentMode: GameMode.BLUR,
    disabled: true,
  },
};

export const Interactive: Story = {
  args: {
    currentMode: GameMode.BLUR,
    disabled: false,
  },
  render: (args) => {
    const [mode, setMode] = useState(args.currentMode);
    
    return (
      <div className="space-y-4">
        <ModeSelector
          {...args}
          currentMode={mode}
          onModeChange={(newMode) => {
            setMode(newMode);
            args.onModeChange?.(newMode);
          }}
        />
        <div className="text-center p-4 bg-muted rounded-lg">
          <p className="text-sm">
            <strong>Current Mode:</strong> {mode === GameMode.BLUR ? 'Mode Flou' : 'Mode Zoom'}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Use the dropdown to switch between modes
          </p>
        </div>
      </div>
    );
  },
};

export const ModeSwitching: Story = {
  args: {
    currentMode: GameMode.BLUR,
    disabled: false,
  },
  render: (args) => {
    const [mode, setMode] = useState(args.currentMode);
    
    return (
      <div className="space-y-4 w-full max-w-md">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold mb-2">Mode Selector Demo</h3>
          <p className="text-sm text-muted-foreground">
            Use the dropdown to select between Blur and Zoom modes
          </p>
        </div>
        <ModeSelector
          {...args}
          currentMode={mode}
          onModeChange={(newMode) => {
            setMode(newMode);
            args.onModeChange?.(newMode);
          }}
        />
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className={`p-4 rounded-lg border-2 ${mode === GameMode.BLUR ? 'border-primary bg-primary/10' : 'border-border'}`}>
            <p className="font-semibold">Mode Flou</p>
            <p className="text-xs text-muted-foreground mt-1">Image progressively unblurs</p>
          </div>
          <div className={`p-4 rounded-lg border-2 ${mode === GameMode.ZOOM ? 'border-primary bg-primary/10' : 'border-border'}`}>
            <p className="font-semibold">Mode Zoom</p>
            <p className="text-xs text-muted-foreground mt-1">Image progressively zooms out</p>
          </div>
        </div>
      </div>
    );
  },
};

