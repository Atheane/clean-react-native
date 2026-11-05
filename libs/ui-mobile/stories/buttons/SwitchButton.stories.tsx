import type { Meta, StoryObj } from '@storybook/react';
import { Winter, Summer } from '../../src/assets/svg';
import { SwitchButton } from '../../src/components/buttons/switch-button';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Buttons/SwitchButton',
  component: SwitchButton,
  argTypes: {
    onToggle: { action: 'onToggle' },
  },
  decorators: [WithCenterView],
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
export const WithIcon: Story = {
  args: {
    options: [
      { key: 'opt1', value: 'Option 1', icon: Winter },
      { key: 'opt2', value: 'Option 2', icon: Summer },
    ],
  },
};
