import type { Meta, StoryObj } from '@storybook/react';
import { PhoneSecurityPinInput } from '../../src/components/inputs/phone-security-pin-input';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Inputs/PhoneSecurityPinInput',
  component: PhoneSecurityPinInput,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  decorators: [WithCenterView],
} as Meta<typeof PhoneSecurityPinInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
