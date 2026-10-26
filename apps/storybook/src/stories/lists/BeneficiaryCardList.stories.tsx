import type { Meta, StoryObj } from '@storybook/react';

import { BeneficiaryCardList } from '@clean-rn/ui-mobile';

import { ValidationStatus, WithCenterView, WithStatus } from '../../wrappers';

const meta = {
  title: 'Lists/BeneficiaryCardList',
  component: BeneficiaryCardList,
  argTypes: {
    onPress: { action: 'onPress' },
    onDelete: { action: 'onDelete' },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
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
