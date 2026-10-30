import type { Meta, StoryObj } from '@storybook/react';

import { BeneficiaryCardList } from '../../src/components/lists/beneficiary-card-list';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Lists/BeneficiaryCardList',
  component: BeneficiaryCardList,
  argTypes: {
    onPress: { action: 'onPress' },
    onDelete: { action: 'onDelete' },
  },
  decorators: [WithCenterView],
} as Meta<typeof BeneficiaryCardList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OnPress: Story = {
  args: {
    data: [
      {
        isActive: true,
        accountId: 1,
        beneficiaryId: 1,
        name: 'John Doe',
        iban: 'ES6621000418450200051331',
        bic: 'BCIRESMMXXX',
      },
      {
        isActive: true,
        beneficiaryId: 2,
        name: 'Marie Jeanne',
        iban: 'FR4621000418450200051332',
        bic: 'BCIRESMMXXX',
      },
      {
        isActive: true,
        accountId: 2,
        beneficiaryId: 3,
        name: 'Jeanne Durut',
        iban: 'FR4621000418450200051333',
        bic: 'BCIRESMMXXX',
      },
    ],
    onDelete: undefined,
  },
};

export const OnDelete: Story = {
  args: {
    data: [
      {
        isActive: true,
        accountId: 1,
        beneficiaryId: 1,
        name: 'John Doe',
        iban: 'ES6621000418450200051331',
        bic: 'BCIRESMMXXX',
      },
      {
        isActive: true,
        beneficiaryId: 2,
        name: 'Marie Jeanne',
        iban: 'FR4621000418450200051332',
        bic: 'BCIRESMMXXX',
      },
      {
        isActive: true,
        accountId: 2,
        beneficiaryId: 3,
        name: 'Jeanne Durut',
        iban: 'FR4621000418450200051333',
        bic: 'BCIRESMMXXX',
      },
    ],
    onPress: undefined,
  },
};

export const Disabled: Story = {
  args: {
    data: [
      {
        isActive: true,
        accountId: 1,
        beneficiaryId: 1,
        name: 'John Doe',
        iban: 'ES6621000418450200051331',
        bic: 'BCIRESMMXXX',
      },
      {
        isActive: true,
        beneficiaryId: 2,
        name: 'Marie Jeanne',
        iban: 'FR4621000418450200051332',
        bic: 'BCIRESMMXXX',
      },
      {
        isActive: true,
        accountId: 2,
        beneficiaryId: 3,
        name: 'Jeanne Durut',
        iban: 'FR4621000418450200051333',
        bic: 'BCIRESMMXXX',
      },
    ],
    onPress: undefined,
    onDelete: undefined,
  },
};
