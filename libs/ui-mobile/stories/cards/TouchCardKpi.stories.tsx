import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';

import { TouchCardKpi } from '../../src/components/cards/touch-card-kpi';
import { House, CarbonFootprint } from '../../src/assets';
import { Colors } from '../../src/constants';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Cards/TouchCardKpi',
  component: TouchCardKpi,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  decorators: [WithCenterView],
} satisfies Meta<typeof TouchCardKpi>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Icon: Story = {
  args: {
    icon: () => <House color={Colors.primary.darkBlue} />,
  },
};

export const IconData: Story = {
  args: {
    icon: () => <House color={Colors.primary.darkBlue} />,
    data: {
      pct: '100%',
      co2: '6 tCO2',
      legend: 'Average Carbon Footprint: 0,65 t',
    },
  },
};

export const IconText: Story = {
  args: {
    icon: () => (
      <View style={{ margin: -15 }}>
        <CarbonFootprint width={60} height={60} />
      </View>
    ),
    data: {
      text: 'This is a text with some information in it...',
    },
  },
};
