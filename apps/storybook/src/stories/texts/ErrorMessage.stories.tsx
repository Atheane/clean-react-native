import type { Meta, StoryObj } from '@storybook/react';

import { ErrorMessage } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus } from '../../wrappers';
import { UserError } from '@clean-rn/user/domain';

const meta = {
  title: 'Texts/ErrorMessage',
  component: ErrorMessage,
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
} as Meta<typeof ErrorMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AuthErrorInvalid6Digits: Story = {
  args: {
    error: new UserError.ValidatePhoneIncorrectPhoneCode(),
  },
};
