import { StyleProp, ViewStyle } from 'react-native';

import type { Meta, StoryObj } from '@storybook/react';
import { TextInput, Love, Colors, GreenEuroAmount } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Inputs/TextInput',
  component: TextInput,
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
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextPinkLabel: Story = {
  args: {
    label: 'Label',
    lowerCase: false,
    IconLeft: () => (
      <Love width={27} height={27} style={{ color: Colors.primary.lightGreen } as StyleProp<ViewStyle>} />
    ),
    short: false,
  },
};

export const TextGreyLabel: Story = {
  args: {
    label: 'Label',
    labelColor: Colors.primary.grey,
    lowerCase: false,
    IconLeft: () => (
      <Love width={27} height={27} style={{ color: Colors.primary.lightGreen } as StyleProp<ViewStyle>} />
    ),
    short: false,
  },
};

export const NumericPinkLabel: Story = {
  args: {
    label: 'Label',
    numeric: true,
    labelColor: Colors.secondary.pink,
    lowerCase: false,
    IconLeft: () => (
      <Love width={27} height={27} style={{ color: Colors.primary.lightGreen } as StyleProp<ViewStyle>} />
    ),
    short: false,
  },
};

export const GreenEuroAmountPinkLabel: Story = {
  args: {
    label: 'Amount',
    numeric: true,
    labelColor: Colors.primary.grey,
    lowerCase: false,
    short: true,
    IconRight: () => (
      <GreenEuroAmount
        width={27}
        height={27}
        style={{ color: Colors.primary.lightGreen } as StyleProp<ViewStyle>}
      />
    ),
  },
};
