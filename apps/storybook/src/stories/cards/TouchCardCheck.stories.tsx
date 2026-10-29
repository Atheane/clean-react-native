import type { Meta, StoryObj } from '@storybook/react';

import {
  TouchCardCheck,
  HouseGradient,
  HeatGradient,
  CarGradient,
  FamilyGradient,
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
    icon: () => <HouseGradient />,
    text: 'Lorem ipsum',
  },
};

export const HouseChecked: Story = {
  args: {
    icon: () => <HouseGradient />,
    text: 'Lorem ipsum',
    checked: true,
  },
};

export const Heat: Story = {
  args: {
    icon: () => <HeatGradient />,
    text: 'Lorem ipsum',
  },
};

export const HeatChecked: Story = {
  args: {
    icon: () => <HeatGradient />,
    text: 'Lorem ipsum',
    checked: true,
  },
};

export const Car: Story = {
  args: {
    icon: () => <HeatGradient />,
    text: 'Lorem ipsum',
  },
};

export const CarChecked: Story = {
  args: {
    icon: () => <HeatGradient />,
    text: 'Lorem ipsum',
    checked: true,
  },
};

export const Family: Story = {
  args: {
    icon: () => <FamilyGradient />,
    text: 'Lorem ipsum',
  },
};

export const FamilyChecked: Story = {
  args: {
    icon: () => <FamilyGradient />,
    text: 'Lorem ipsum',
    checked: true,
  },
};
