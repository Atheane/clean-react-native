import type { Meta, StoryObj } from '@storybook/react';

import { SwitchButton } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Buttons/SwitchButton',
  component: SwitchButton,
  argTypes: {
    onToggle: { action: 'onToggle' },
  },
  decorators: [(Story: any) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} satisfies Meta<typeof SwitchButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Label',
    options: [
      { key: 'opt1', value: 'Option 1' },
      { key: 'opt2', value: 'Option 2' },
    ],
  },
};
export const NoLabel: Story = {
  args: {
    options: [
      { key: 'opt1', value: 'Option 1' },
      { key: 'opt2', value: 'Option 2' },
    ],
  },
};
