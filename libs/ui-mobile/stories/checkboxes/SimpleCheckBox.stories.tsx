import type { Meta, StoryObj } from '@storybook/react';
import { SimpleCheckBox } from '../../src/components/checkboxes/simple-checkbox';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Checkboxes/SimpleCheckBox',
  component: SimpleCheckBox,
  argTypes: {
    toggleCheckbox: { action: 'toggleCheckbox' },
  },
  decorators: [WithCenterView],
} as Meta<typeof SimpleCheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Title',
    checked: true,
  },
};
