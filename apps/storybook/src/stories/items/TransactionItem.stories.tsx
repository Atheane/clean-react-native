import type { Meta, StoryObj } from '@storybook/react';

import { Colors, Love, TransactionItem } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Items/TransactionItem',
  component: TransactionItem,
  args: {
    icon: () => <Love width={23} height={23} color={Colors.primary.lightGreen} />,
    amount: 131,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof TransactionItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PositiveAmount: Story = {
  args: {
    label: 'Transfer Marie Dupond',
    icon: () => <Love width={23} height={23} color={Colors.primary.lightGreen} />,
    amount: 131,
  },
};

export const NegativeAmount: Story = {
  args: {
    label: 'Transfer Marie Dupond',
    icon: () => <Love width={23} height={23} color={Colors.primary.lightGreen} />,
    amount: -49,
  },
};
