import type { Meta, StoryObj } from '@storybook/react';

import { GreenBackButton } from '../../src/components/buttons/green-back-button';

const meta = {
  title: 'Buttons/GreenBackButton',
  component: GreenBackButton,
  argTypes: {
    onPress: { action: 'onPress' },
  },
} satisfies Meta<typeof GreenBackButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Validate',
  },
};
