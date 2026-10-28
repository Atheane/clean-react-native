import { StyleProp, ViewStyle } from 'react-native';

import type { Meta, StoryObj } from '@storybook/react';
import { Colors, SelectNumber, Surface } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Inputs/SelectNumber',
  component: SelectNumber,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  args: {
    label: 'Surface',
    icon: () => <Surface style={{ color: Colors.primary.lightGreen } as StyleProp<ViewStyle>} />,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof SelectNumber>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    label: 'Surface',
    icon: () => <Surface style={{ color: Colors.primary.lightGreen } as StyleProp<ViewStyle>} />,
  },
};

export const NoIcon: Story = {
  args: {
    label: 'Surface',
    icon: undefined,
  },
};
