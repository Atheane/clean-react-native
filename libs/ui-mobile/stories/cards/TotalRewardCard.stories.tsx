import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TotalReward } from '../../src/components/cards/total-reward';
import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Cards/TotalReward',
  component: TotalReward,
  decorators: [WithCenterView],
} satisfies Meta<typeof TotalReward>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    totalRewards: 100,
    title: 'Total Rewards',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    title: 'Total Rewards',
  },
};
