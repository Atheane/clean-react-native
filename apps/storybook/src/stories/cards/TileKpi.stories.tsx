import type { Meta, StoryObj } from '@storybook/react';
import { TileKpi, Temperature, Humidity, CO2Output, Colors } from '@clean-rn/ui-mobile';
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
    icon: () => <Temperature width={31} height={31} />,
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
    icon: () => <Humidity width={31} height={31} />,
    data: {
      kpi: '63',
      unit: '%',
      legend: 'Salon',
    },
  },
};

export const CO2: Story = {
  args: {
    icon: () => <CO2Output width={31} height={31} />,
    data: {
      kpi: '1235',
      unit: 'ppm',
      legend: 'Salon',
    },
  },
};
