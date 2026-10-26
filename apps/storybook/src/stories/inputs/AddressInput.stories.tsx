import type { Meta, StoryObj } from '@storybook/react';
import { AddressInput } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Inputs/AddressInput',
  component: AddressInput,
  argTypes: {
    onAddressSelect: { action: 'onAddressSelect' },
    setDisabled: { action: 'setDisabled' },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof AddressInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: 'Placeholder',
    language: 'fr',
  },
};
