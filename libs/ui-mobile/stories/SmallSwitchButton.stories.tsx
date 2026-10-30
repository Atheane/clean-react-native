import type { Meta, StoryObj } from '@storybook/react';

import { SmallSwitchButton } from '../src/components/buttons/small-switch-button';

// import { WithCenterView } from '../wrappers';

const meta = {
  title: 'Buttons/SmallSwitchButton',
  component: SmallSwitchButton,
  argTypes: {
    onToggle: { action: 'onToggle' },
  },
  // decorators: [WithCenterView],
} satisfies Meta<typeof SmallSwitchButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    checked: false,
  },
};
