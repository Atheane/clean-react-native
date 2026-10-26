import type { Meta, StoryObj } from '@storybook/react';

import { ContactEmail } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Others/ContactEmail',
  component: ContactEmail,
  argTypes: {},
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof ContactEmail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    subject: 'subject',
    body: 'body',
  },
};
