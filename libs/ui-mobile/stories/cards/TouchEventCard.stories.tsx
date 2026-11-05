import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '@rneui/themed';
import { View } from 'react-native';
import { TouchEventCard } from '../../src/components/cards/touch-event-card';
import { LoanHeater, Quiz } from '../../src/assets';
import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Cards/TouchEventCard',
  component: TouchEventCard,
  argTypes: {
    onPress: { action: 'onPress' },
    onDelete: { action: 'onDelete' },
  },
  decorators: [WithCenterView],
} satisfies Meta<typeof TouchEventCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: {
    uid: 'unique-uid1',
    vertical: true,
    icon: () => <Quiz width={100} height={100} />,
    text: 'Lorem ipsum delatus',
  },
};

export const ImgWithDelete: Story = {
  args: {
    uid: 'unique-uid1',
    title: '',
    image: LoanHeater,
    text: 'Lorem ipsum delatus',
  },
};

export const ImgNoDelete: Story = {
  args: {
    uid: 'unique-uid1',
    title: '',
    image: LoanHeater,
    text: 'Lorem ipsum delatus',
    onDelete: undefined,
  },
};

export const IconWithDelete: Story = {
  args: {
    uid: 'unique-uid1',
    title: '',
    icon: () => (
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Icon type="feather" name="help-circle" color={'#000'} />
      </View>
    ),
    text: 'Lorem ipsum delatus',
  },
};

export const IconNoDelete: Story = {
  args: {
    uid: 'unique-uid1',
    title: '',
    icon: () => (
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Icon type="feather" name="help-circle" color={'#000'} />
      </View>
    ),
    text: 'Lorem ipsum delatus',
    onDelete: undefined,
  },
};
