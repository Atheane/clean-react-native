import type { Meta, StoryObj } from '@storybook/react';
import { PhoneSecurityPinInput } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Inputs/PhoneSecurityPinInput',
  component: PhoneSecurityPinInput,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof PhoneSecurityPinInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
