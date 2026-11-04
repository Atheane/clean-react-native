import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { SecondaryButton } from '../../src/components/buttons/secondary-button';
import { Logout } from '../../src/assets';
import { Colors } from '../../src/constants';

const meta = {
  title: 'Buttons/SecondaryButton',
  component: SecondaryButton,
  argTypes: {
    onPress: { action: 'pressed the button' },
    iconLeft: { table: { disable: true } },
  },
} satisfies Meta<typeof SecondaryButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Short: Story = {
  args: {
    long: false,
    uppercase: true,
    title: 'Short',
  },
};

export const Long: Story = {
  args: {
    long: true,
    uppercase: true,
    title: 'Long',
  },
};

export const Icon: Story = {
  args: {
    long: true,
    uppercase: true,
    title: 'Icon',
    iconLeft: (props) => <Logout width={27} height={27} color={Colors.primary.lightGreen as string} />,
  },
};

export const LongText: Story = {
  args: {
    long: true,
    uppercase: false,
    title: 'This is a Button with long text',
    iconLeft: (props) => <Logout width={27} height={27} color={Colors.primary.lightGreen as string} />,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    long: true,
    uppercase: false,
    title: 'This is a Button with long text',
    iconLeft: (props) => <Logout width={27} height={27} color={Colors.primary.lightGreen as string} />,
  },
};
