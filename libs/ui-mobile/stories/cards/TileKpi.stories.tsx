import type { Meta, StoryObj } from '@storybook/react';
import { TileKpi } from '../../src/components/cards/tile-kpi';
import { Temperature, Humidity, CO2Output } from '../../src/assets';
import { Colors } from '../../src/constants';
import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Cards/TileKpi',
  component: TileKpi,
  decorators: [WithCenterView],
} satisfies Meta<typeof TileKpi>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Temp: Story = {
  args: {
    icon: () => <Temperature width={90} height={90} />,
    data: {
      kpi: '20',
      unit: 'C°',
      color: Colors.primary.grey,
      legend: 'Moyenne',
    },
  },
};

export const Hum: Story = {
  args: {
    icon: () => <Humidity width={90} height={90} />,
    data: {
      kpi: '63',
      unit: '%',
      legend: 'Salon',
    },
  },
};

export const CO2: Story = {
  args: {
    icon: () => <CO2Output width={90} height={90} />,
    data: {
      kpi: '1235',
      unit: 'ppm',
      legend: 'Salon',
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    icon: () => <Temperature width={90} height={90} />,
    data: {
      kpi: '20',
      unit: 'C°',
      legend: 'Moyenne',
    },
  },
};
