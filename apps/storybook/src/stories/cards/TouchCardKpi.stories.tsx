import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';

import { TouchCardKpi, House, Colors } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';
import { StyleProp, ViewStyle } from 'react-native';

import { CardCarbonFootPrint } from '../../../assets/svg';

const meta = {
  title: 'Cards/TouchCardKpi',
  component: TouchCardKpi,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} satisfies Meta<typeof TouchCardKpi>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Icon: Story = {
  args: {
    icon: () => <House style={{ color: Colors.primary.darkBlue } as StyleProp<ViewStyle>} />,
  },
};

export const IconData: Story = {
  args: {
    icon: () => <House style={{ color: Colors.primary.darkBlue } as StyleProp<ViewStyle>} />,
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
        <CardCarbonFootPrint width={60} height={60} />
      </View>
    ),
    data: {
      text: 'This is a text with some information in it...',
    },
  },
};
