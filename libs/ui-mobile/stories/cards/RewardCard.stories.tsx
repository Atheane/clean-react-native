import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Reward } from '../../src/components/cards/reward';

const meta = {
  title: 'Cards/Reward',
  component: Reward,
} satisfies Meta<typeof Reward>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    reward: 100,
  },
};
