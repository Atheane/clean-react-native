import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EarnedAmountBanner } from '../../src/components/banners/earned-amount';

const meta = {
  title: 'Banners/EarnedAmount',
  component: EarnedAmountBanner,
  argTypes: {
    onPressRightIcon: { action: 'onPressRightIcon' },
  },
  decorators: [
    (Story) => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
} satisfies Meta<typeof EarnedAmountBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const GreenEuros: Story = {
  args: {
    label: 'Gagnez des €G grâce à\nnotre Quizz !',
    amount: 10,
    currency: '€G',
  },
};
