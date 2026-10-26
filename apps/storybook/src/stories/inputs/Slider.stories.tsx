import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Inputs/Slider',
  component: Slider,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'consumption',
    minValue: 0,
    maxValue: 100,
    value: 50,
  },
};

export const Units: Story = {
  args: {
    label: 'consumption',
    minValue: 0,
    maxValue: 20,
    value: 8,
    unit: ' L / 100 km',
  },
};

export const Steps500: Story = {
  args: {
    label: 'consumption',
    minValue: 0,
    maxValue: 20000,
    step: 500,
    value: 10000,
    unit: ' km / year',
  },
};

export const Short: Story = {
  args: {
    label: 'Red meat',
    minValue: 0,
    maxValue: 14,
    value: 7,
    unit: ' times / week',
    short: true,
  },
};
