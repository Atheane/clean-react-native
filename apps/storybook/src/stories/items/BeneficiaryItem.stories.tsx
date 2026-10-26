import type { Meta, StoryObj } from '@storybook/react';
import { BeneficiaryItem, BankLogoCA } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Items/BeneficiaryItem',
  component: BeneficiaryItem,
  argTypes: {
    onDelete: { action: 'onDelete' },
    onPress: { action: 'onPress' },
  },
  args: {
    icon: BankLogoCA,
    name: 'John Doe',
    iban: 'ES6621000418450200051332',
    beneficiaryId: 0,
    disabled: false,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof BeneficiaryItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    icon: BankLogoCA,
    name: 'John Doe',
    iban: 'ES6621000418450200051332',
    beneficiaryId: 0,
    disabled: false,
    onDelete: undefined,
    onPress: undefined,
  },
};

export const Delete: Story = {
  args: {
    icon: BankLogoCA,
    name: 'John Doe',
    iban: 'ES6621000418450200051332',
    beneficiaryId: 0,
    disabled: false,
    onPress: undefined,
  },
};

export const Chevron: Story = {
  args: {
    icon: BankLogoCA,
    name: 'John Doe',
    iban: 'ES6621000418450200051332',
    beneficiaryId: 0,
    disabled: false,
    onDelete: undefined,
  },
};

export const DisabledChevron: Story = {
  args: {
    icon: BankLogoCA,
    name: 'John Doe',
    iban: 'ES6621000418450200051332',
    beneficiaryId: 0,
    disabled: true,
    onDelete: undefined,
  },
};

export const DisabledDelete: Story = {
  args: {
    icon: BankLogoCA,
    name: 'John Doe',
    iban: 'ES6621000418450200051332',
    beneficiaryId: 0,
    disabled: true,
    onPress: undefined,
  },
};
