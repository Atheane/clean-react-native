import type { Meta, StoryObj } from '@storybook/react';

import { Balance, Colors } from '@clean-rn/ui-mobile';

import { ValidationStatus, WithBackground, WithStatusBelow } from '../../wrappers';

const meta = {
  title: 'Texts/Balance',
  component: Balance,
  argTypes: {
    onPress: { action: 'onPress' },
  },

  decorators: [(Story) => WithStatusBelow(Story, ValidationStatus.VALIDATED), WithBackground],
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
