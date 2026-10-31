import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { TouchCardCheck } from '../../src/components/cards/touch-card-check';
import { House as HouseGradient } from '../../src/assets';
import { Colors } from '../../src/constants';
import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Cards/TouchCardCheck',
  component: TouchCardCheck,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  decorators: [WithCenterView],
} satisfies Meta<typeof TouchCardCheck>;

export default meta;

type Story = StoryObj<typeof meta>;

export const House: Story = {
  args: {
    icon: () => <HouseGradient startColor={Colors.secondary.pink} endColor={Colors.primary.darkBlue} />,
    text: 'Lorem ipsum',
  },
};

export const HouseChecked: Story = {
  args: {
    icon: () => <HouseGradient startColor={Colors.secondary.pink} endColor={Colors.primary.darkBlue} />,
    text: 'Lorem ipsum',
    checked: true,
  },
};
