import type { Meta, StoryObj } from '@storybook/react';
import { DigitsInput } from '../../src/components/inputs/digits-input';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Inputs/DigitsInput',
  component: DigitsInput,
  argTypes: {
    onChange: { action: 'onChange' },
    onFocus: { action: 'onFocus' },
    onFullfill: { action: 'onFullfill' },
  },
  decorators: [WithCenterView],
} as Meta<typeof DigitsInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SixDigits: Story = {
  args: {
    numberDigits: 6,
  },
};

export const FourDigits: Story = {
  args: {
    numberDigits: 4,
  },
};
