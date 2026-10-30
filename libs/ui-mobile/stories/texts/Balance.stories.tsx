import type { Meta, StoryObj } from '@storybook/react';

import { Balance } from '../../src/components/texts/balance';
import { Colors } from '../../src/constants';

const meta = {
  title: 'Texts/Balance',
  component: Balance,
  argTypes: {
    onPress: { action: 'onPress' },
  },
} as Meta<typeof Balance>;

export default meta;

type Story = StoryObj<typeof meta>;

export const White: Story = {
  args: {
    value: 2354.58,
    title: 'My Balance',
    color: '#fff',
    unit: '€G',
  },
};

export const Grey: Story = {
  args: {
    value: 9.8,
    title: 'Monthly price for 1 DD',
    color: Colors.primary.darkGrey,
  },
};
