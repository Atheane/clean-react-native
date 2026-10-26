import type { Meta, StoryObj } from '@storybook/react';
import { PasswordInput } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

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
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    secured: true,
  },
};
