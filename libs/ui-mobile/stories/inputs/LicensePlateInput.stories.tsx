import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LicensePlateInput } from '../../src/components/inputs/license-plate-input';
import { Colors } from '../../src/constants';
import { CarBorder } from '../../src/assets';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Inputs/LicensePlateInput',
  component: LicensePlateInput,
  argTypes: {
    onChange: {
      action: 'onChange',
    },
    onBlur: {
      action: 'onBlur',
    },
    onFocus: {
      action: 'onFocus',
    },
  },
  decorators: [WithCenterView],
} as Meta<typeof LicensePlateInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextPinkLabel: Story = {
  args: {
    label: 'Label',
    lowerCase: false,
    IconLeft: () => <CarBorder />,
    short: false,
  },
};

export const TextGreyLabel: Story = {
  args: {
    label: 'Label',
    labelColor: Colors.primary.grey,
    lowerCase: false,
    IconLeft: () => <CarBorder />,
    short: false,
  },
};
