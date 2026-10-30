import type { Meta, StoryObj } from '@storybook/react';

import { StepsIndicator } from '../../src/components/others/steps-indicator';

const meta = {
  title: 'Others/StepsIndicator',
  component: StepsIndicator,
  argTypes: {
    onCirclePress: {
      action: 'onCirclePress',
    },
  },
} as Meta<typeof StepsIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Step1: Story = {
  args: {
    currentPosition: 1,
    labels: ['Situation', 'Justificatifs', 'Suivi'],
  },
};

export const Step2: Story = {
  args: {
    currentPosition: 2,
    labels: ['Situation', 'Justificatifs', 'Suivi'],
  },
};

export const Step3: Story = {
  args: {
    currentPosition: 3,
    labels: ['Situation', 'Justificatifs', 'Suivi'],
  },
};

export const Done: Story = {
  args: {
    currentPosition: 4,
    labels: ['Situation', 'Justificatifs', 'Suivi'],
  },
};
