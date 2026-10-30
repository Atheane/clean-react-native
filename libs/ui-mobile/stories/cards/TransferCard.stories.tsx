import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TransferCard } from '../../src/components/cards/transfer-card';
import { BankLogoCA, BankAltLogo, PhoneBg } from '../../src/assets';
import { Colors } from '../../src/constants';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Cards/TransferCard',
  component: TransferCard,
  argTypes: {
    onSelect: { action: 'onSelect' },
  },
  decorators: [WithCenterView],
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
    icon: () => <BankAltLogo />,
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
    icon: () => <BankAltLogo />,
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
    icon: () => <BankLogoCA />,
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
    icon: () => <BankAltLogo />,
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
    icon: () => (
      <PhoneBg
        backgroundColor={Colors.primary.white}
        startColor={Colors.secondary.pink}
        endColor={Colors.primary.darkBlue}
      />
    ),
  },
};
