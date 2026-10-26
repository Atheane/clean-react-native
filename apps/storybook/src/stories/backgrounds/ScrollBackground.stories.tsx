import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';

import { TopBackground, TopDownBackground, ScrollBackground } from '@clean-rn/ui-mobile';

const meta = {
  title: 'Backgrounds/ScrollBackground',
  component: ScrollBackground,
  argTypes: {},
} satisfies Meta<typeof ScrollBackground>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {
    background: TopBackground,
    initialScroll: 10,
    window: 1.2,
    children: <View />,
  },
};

export const TopDown: Story = {
  args: {
    background: TopDownBackground,
    initialScroll: 10,
    window: 1.2,
    children: <View />,
  },
};
