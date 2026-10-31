import type { Meta, StoryObj } from '@storybook/react';

import { SmallSwitchButton } from '../../src/components/buttons/small-switch-button';

const meta = {
  title: 'Buttons/SmallSwitchButton',
  component: SmallSwitchButton,
  argTypes: {
    onToggle: { action: 'onToggle' },
  },
} satisfies Meta<typeof SmallSwitchButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    checked: false,
  },
};
