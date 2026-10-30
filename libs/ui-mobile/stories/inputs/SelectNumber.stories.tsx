import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Colors } from '../../src/constants';
import { SelectNumber } from '../../src/components/inputs/select-number';
import { Surface } from '../../src/assets';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Inputs/SelectNumber',
  component: SelectNumber,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  args: {
    label: 'Surface',
    icon: () => <Surface color={Colors.primary.lightGreen} />,
  },
  decorators: [WithCenterView],
} as Meta<typeof SelectNumber>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Surface',
    icon: () => <Surface color={Colors.primary.lightGreen} />,
  },
};

export const NoIcon: Story = {
  args: {
    label: 'Surface',
    icon: undefined,
  },
};
