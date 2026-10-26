import type { Meta, StoryObj } from '@storybook/react';

import { SmallSwitchButton } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Buttons/SmallSwitchButton',
  component: SmallSwitchButton,
  argTypes: {
    onToggle: { action: 'onToggle' },
  },
  decorators: [(Story: any) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} satisfies Meta<typeof SmallSwitchButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    checked: false,
  },
};
