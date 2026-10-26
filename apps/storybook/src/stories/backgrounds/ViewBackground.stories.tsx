import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';

import { TopBackground, TopDownBackground, ViewBackground } from '@clean-rn/ui-mobile';

const meta = {
  title: 'Backgrounds/ViewBackground',
  component: ViewBackground,
  argTypes: {},
} satisfies Meta<typeof ViewBackground>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TopDown: Story = {
  args: {
    background: TopDownBackground,
    children: <View />,
  },
};

export const Top: Story = {
  args: {
    background: TopBackground,
    children: <View />,
  },
};
