import type { Meta, StoryObj } from '@storybook/react';

import { EmailInput } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Inputs/EmailInput',
  component: EmailInput,
  argTypes: {
    onEdit: { action: 'onEdit' },
    onChange: {
      action: 'onChange',
    },
    onFocus: {
      action: 'onFocus',
    },
  },
  args: {
    email: 'shortemail@gmail.com',
    filled: true,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof EmailInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ShortEmail: Story = {
  args: {
    email: 'shortemail@gmail.com',
    filled: true,
  },
};

export const LongEmail: Story = {
  args: {
    email: 'thisisaveryveryveryverylongemail@gmail.com',
    filled: true,
  },
};
