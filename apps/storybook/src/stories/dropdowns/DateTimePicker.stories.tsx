import type { Meta, StoryObj } from '@storybook/react';

import { DateTimePicker } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Dropdowns/DateTimePicker',
  component: DateTimePicker,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof DateTimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'test',
    format: 'DD/MM/YYYY',
    placeholder: 'placeholder',
  },
};
