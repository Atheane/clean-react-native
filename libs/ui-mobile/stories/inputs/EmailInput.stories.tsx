import type { Meta, StoryObj } from '@storybook/react';

import { EmailInput } from '../../src/components/inputs/email-input';

import { WithCenterView } from '../../wrappers';

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
    label: 'Email',
    placeholder: 'your@email.com',
    filled: true,
  },
  decorators: [WithCenterView],
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
