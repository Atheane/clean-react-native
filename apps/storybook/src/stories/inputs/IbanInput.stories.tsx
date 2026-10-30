import { StyleProp, ViewStyle } from 'react-native';

import type { Meta, StoryObj } from '@storybook/react';
import { IbanInput, Colors, Love } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

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
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
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
