import type { Meta, StoryObj } from '@storybook/react';

import { GreenCloseButton } from '../../src/components/buttons/green-close-button';

const meta = {
  title: 'Buttons/GreenCloseButton',
  component: GreenCloseButton,
  argTypes: {
    onPress: { action: 'onPress' },
  },
} satisfies Meta<typeof GreenCloseButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Validate',
  },
};
