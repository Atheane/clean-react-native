import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BankLogoCA } from '../../src/assets';
import { BeneficiaryCard } from '../../src/components/cards/beneficiary-card';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Cards/BeneficiaryCard',
  component: BeneficiaryCard,
  argTypes: {
    onDelete: { action: 'onDelete' },
    onPress: { action: 'onPress' },
  },
  decorators: [WithCenterView],
} satisfies Meta<typeof BeneficiaryCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EvenLogo: Story = {
  args: {
    data: {
      isActive: true,
      icon: () => <BankLogoCA />,
      beneficiaryId: 1,
      name: 'John Doe',
      iban: 'ES6621000418450200051332',
      bic: 'BCITESMMXXX',
    },
    idx: 2,
    disabled: false,
    onDelete: undefined,
    onPress: undefined,
  },
};

export const EvenGenericPress: Story = {
  args: {
    data: {
      isActive: true,
      beneficiaryId: 1,
      name: 'John Doe',
      iban: 'ES6621000418450200051332',
      bic: 'BCITESMMXXX',
    },
    idx: 4,
    disabled: false,
    onDelete: undefined,
  },
};

export const EvenCO2Delete: Story = {
  args: {
    data: {
      isActive: true,
      beneficiaryId: 1,
      name: 'John Doe',
      iban: 'ES6621000418450200051332',
      bic: 'BCITESMMXXX',
      accountId: 1,
    },
    idx: 6,
    disabled: false,
    onPress: undefined,
  },
};

export const BeneficiaryCardStory: Story = {
  args: {
    data: {
      isActive: true,
      icon: BankLogoCA,
      beneficiaryId: 1,
      name: 'John Doe',
      iban: 'ES6621000418450200051332',
      bic: 'BCITESMMXXX',
    },
    idx: 1,
    disabled: false,
    onDelete: undefined,
    onPress: undefined,
  },
};

export const OddPress: Story = {
  args: {
    data: {
      isActive: true,
      icon: BankLogoCA,
      beneficiaryId: 1,
      name: 'John Doe',
      iban: 'ES6621000418450200051332',
      bic: 'BCITESMMXXX',
    },
    idx: 3,
    disabled: false,
    onDelete: undefined,
  },
};

export const OddDelete: Story = {
  args: {
    data: {
      isActive: true,
      icon: BankLogoCA,
      beneficiaryId: 1,
      name: 'John Doe',
      iban: 'ES6621000418450200051332',
      bic: 'BCITESMMXXX',
    },
    idx: 5,
    disabled: false,
    onPress: undefined,
  },
};

export const Disabled: Story = {
  args: {
    data: {
      isActive: false,
      icon: BankLogoCA,
      beneficiaryId: 1,
      name: 'John Doe',
      iban: 'ES6621000418450200051332',
      bic: 'BCITESMMXXX',
    },
    idx: 7,
    disabled: true,
    onPress: undefined,
  },
};
