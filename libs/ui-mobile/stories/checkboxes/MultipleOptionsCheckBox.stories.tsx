import type { Meta, StoryObj } from '@storybook/react';
import { MultipleOptionsCheckBox } from '../../src/components/checkboxes/multiple-options-checkBox';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Checkboxes/MultipleOptionsCheckBox',
  component: MultipleOptionsCheckBox,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  decorators: [WithCenterView],
} as Meta<typeof MultipleOptionsCheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const YesNo: Story = {
  args: {
    label: 'US Resident',
    subtitle: 'Are you a US person?',
    optionsTitle: ['Yes', 'No'],
    optionsValues: ['0', '1'],
  },
};

export const ThreeTileOptions: Story = {
  args: {
    label: 'US Resident',
    optionsTitle: ['Option 1', 'Option 2', 'Option 3'],
    optionsValues: ['0', '1', '2'],
  },
};
