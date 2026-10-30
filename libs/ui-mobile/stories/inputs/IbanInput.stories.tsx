import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IbanInput } from '../../src/components/inputs/iban-input';
import { Colors } from '../../src/constants';
import { Love } from '../../src/assets';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Inputs/IbanInput',
  component: IbanInput,
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
} as Meta<typeof IbanInput>;

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
