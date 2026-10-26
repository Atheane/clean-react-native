import type { Meta, StoryObj } from '@storybook/react';
import { TransferCard, BankLogoCA, BankAltLogo, PhoneGradientWhiteBg } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Cards/TransferCard',
  component: TransferCard,
  argTypes: {
    onSelect: { action: 'onSelect' },
  },
  args: {
    icon: BankLogoCA,
    text: 'Mmmmmm\nMmmmmmmmmmm',
    arrow: true,
    data: [
      {
        key: 'key1',
        value: 'value1',
      },
      {
        key: 'key2',
        value: 'value2',
      },
    ],
  },
  decorators: [(Story: any) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
} satisfies Meta<typeof TransferCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TransferFromUniqueAccount: Story = {
  args: {
    text: 'Mmmmmm\nMmmmmmmmmmm',
    arrow: true,
    data: [
      {
        key: 'key1',
        value: 'value1',
      },
      {
        key: 'key2',
        value: 'value2',
      },
    ],
    uniqueAccount: true,
    icon: BankAltLogo,
  },
};

export const TransferFromMultiAccount: Story = {
  args: {
    text: 'Mmmmmm\nMmmmmmmmmmm',
    arrow: true,
    data: [
      {
        key: 'key1',
        value: 'value1',
      },
      {
        key: 'key2',
        value: 'value2',
      },
    ],
    icon: BankAltLogo,
  },
};

export const PayoutOut: Story = {
  args: {
    text: 'Mmmmmm\nMmmmmmmmmmm',
    arrow: false,
    data: [
      {
        key: 'key1',
        value: 'value1',
      },
      {
        key: 'key2',
        value: 'value2',
      },
    ],
    icon: BankLogoCA,
  },
};

export const TransferOut: Story = {
  args: {
    text: 'Mmmmmm\nMmmmmmmmmmm',
    arrow: false,
    data: [
      {
        key: 'key1',
        value: 'value1',
      },
      {
        key: 'key2',
        value: 'value2',
      },
    ],
    icon: BankAltLogo,
  },
};

export const WaitingTransaction: Story = {
  args: {
    text: 'Mmmmmm\nMmmmmmmmmmm',
    arrow: false,
    data: [
      {
        key: 'key1',
        value: 'value1',
      },
      {
        key: 'key2',
        value: 'value2',
      },
    ],
    icon: PhoneGradientWhiteBg,
  },
};
