import type { Meta, StoryObj } from '@storybook/react';

import { TouchEventCard } from '@clean-rn/ui-mobile';

import { LoanHeater } from '../../../assets/images';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Cards/TouchEventCard',
  component: TouchEventCard,
  argTypes: {
    onPress: { action: 'onPress' },
    onDelete: { action: 'onDelete' },
  },
  args: {
    image: LoanHeater,
    text: 'Lorem ipsum delatus',
  },
  decorators: [(Story: any) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} satisfies Meta<typeof TouchEventCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithDelete: Story = {
  args: {
    uid: 'unique-uid1',
    image: LoanHeater,
    text: 'Lorem ipsum delatus',
  },
};

export const NoDelete: Story = {
  args: {
    uid: 'unique-uid1',
    image: LoanHeater,
    text: 'Lorem ipsum delatus',
    onDelete: undefined,
  },
};
