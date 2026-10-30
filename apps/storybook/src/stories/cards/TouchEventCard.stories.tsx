import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '@rneui/themed';
import { View } from 'react-native';
import { TouchEventCard, LoanHeater } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Cards/TouchEventCard',
  component: TouchEventCard,
  argTypes: {
    onPress: { action: 'onPress' },
    onDelete: { action: 'onDelete' },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} satisfies Meta<typeof TouchEventCard>;

export default meta;

type Story = StoryObj<typeof meta>;

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
