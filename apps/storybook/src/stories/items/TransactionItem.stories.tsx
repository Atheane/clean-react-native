import { StyleProp, ViewStyle } from 'react-native';

import type { Meta, StoryObj } from '@storybook/react';

import { Colors, Love, TransactionItem } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Items/TransactionItem',
  component: TransactionItem,
  args: {
    icon: () => (
      <Love
        width={23}
        height={23}
        style={{ color: Colors.bank.primary.lightGreen } as StyleProp<ViewStyle>}
      />
    ),
    amount: 131,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof TransactionItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PositiveAmount: Story = {
  args: {
    label: 'Transfer Marie Dupond',
    icon: () => (
      <Love
        width={23}
        height={23}
        style={{ color: Colors.bank.primary.lightGreen } as StyleProp<ViewStyle>}
      />
    ),
    amount: 131,
  },
};

export const NegativeAmount: Story = {
  args: {
    label: 'Transfer Marie Dupond',
    icon: () => (
      <Love
        width={23}
        height={23}
        style={{ color: Colors.bank.primary.lightGreen } as StyleProp<ViewStyle>}
      />
    ),
    amount: -49,
  },
};
