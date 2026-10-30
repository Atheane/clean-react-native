import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  TouchCardCheck,
  Car as CarGradient,
  House as HouseGradient,
  Heat as HeatGradient,
  Family as FamilyGradient,
  Colors,
} from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Cards/TouchCardCheck',
  component: TouchCardCheck,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
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

export const Heat: Story = {
  args: {
    icon: () => <HeatGradient startColor={Colors.secondary.pink} endColor={Colors.primary.darkBlue} />,
    text: 'Lorem ipsum',
  },
};

export const HeatChecked: Story = {
  args: {
    icon: () => <HeatGradient startColor={Colors.secondary.pink} endColor={Colors.primary.darkBlue} />,
    text: 'Lorem ipsum',
    checked: true,
  },
};

export const Car: Story = {
  args: {
    icon: () => <CarGradient startColor={Colors.secondary.pink} endColor={Colors.primary.darkBlue} />,
    text: 'Lorem ipsum',
  },
};

export const CarChecked: Story = {
  args: {
    icon: () => <CarGradient startColor={Colors.secondary.pink} endColor={Colors.primary.darkBlue} />,
    text: 'Lorem ipsum',
    checked: true,
  },
};

export const Family: Story = {
  args: {
    icon: () => <FamilyGradient startColor={Colors.secondary.pink} endColor={Colors.primary.darkBlue} />,
    text: 'Lorem ipsum',
  },
};

export const FamilyChecked: Story = {
  args: {
    icon: () => <FamilyGradient startColor={Colors.secondary.pink} endColor={Colors.primary.darkBlue} />,
    text: 'Lorem ipsum',
    checked: true,
  },
};
