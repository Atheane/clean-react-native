import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LicensePlateInput, Colors, Love } from '@clean-rn/ui-mobile';

import { ValidationStatus, WithCenterView, WithStatus } from '../../wrappers';

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
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
} as Meta<typeof LicensePlateInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextPinkLabel: Story = {
  args: {
    label: 'Label',
    lowerCase: false,
    IconLeft: () => <Love width={27} height={27} color={Colors.primary.lightGreen} />,
    short: false,
  },
};

export const TextGreyLabel: Story = {
  args: {
    label: 'Label',
    labelColor: Colors.primary.grey,
    lowerCase: false,
    IconLeft: () => <Love width={27} height={27} color={Colors.primary.lightGreen} />,
    short: false,
  },
};
