import type { Meta, StoryObj } from '@storybook/react';
import { AddressInput } from '../../src/components/inputs/address-input';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Inputs/AddressInput',
  component: AddressInput,
  argTypes: {
    onAddressSelect: { action: 'onAddressSelect' },
    setDisabled: { action: 'setDisabled' },
  },
  decorators: [WithCenterView],
} as Meta<typeof AddressInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: 'Placeholder',
    language: 'fr',
  },
};
