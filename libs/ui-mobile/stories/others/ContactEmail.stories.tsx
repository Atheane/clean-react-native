import type { Meta, StoryObj } from '@storybook/react';

import { ContactEmail } from '../../src/components/others/contact-email';
import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Others/ContactEmail',
  component: ContactEmail,
  argTypes: {},
  decorators: [WithCenterView],
} as Meta<typeof ContactEmail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    subject: 'subject',
    body: 'body',
    label: 'label',
    co2: 'co2',
  },
};
