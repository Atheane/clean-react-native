import type { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from '../../src/components/inputs/password-input';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Inputs/PasswordInput',
  component: PasswordInput,
  argTypes: {
    onToggleSecurity: { action: 'onToggleSecurity' },
    onChange: { action: 'onChange' },
    onBlur: { action: 'onBlur' },
    onFocus: { action: 'onFocus' },
  },
  args: {
    secured: true,
    placeholder: 'your password',
    label: 'Password',
  },
  decorators: [WithCenterView],
} as Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    secured: true,
  },
};
