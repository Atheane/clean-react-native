import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import { TileDashboard } from '../../src/components/cards/tile-dashboard';
import { TileKpi } from '../../src/components/cards/tile-kpi';
import { HomeWhiteCircle, Temperature, Humidity, CO2Output } from '../../src/assets/svg';
import { Colors } from '../../src/constants';
import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Cards/TileDashboard',
  component: TileDashboard,
  decorators: [WithCenterView],
} satisfies Meta<typeof TileDashboard>;

export default meta;

type Story = StoryObj<typeof meta>;

const DATA = [
  {
    kpi: '20',
    unit: 'C°',
    color: Colors.primary.grey,
    legend: 'Moyenne',
  },
  {
    kpi: '63',
    unit: '%',
    legend: 'Salon',
  },
  {
    kpi: '1235',
    unit: 'ppm',
    legend: 'Salon',
  },
];

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
});

const Tiles = () => {
  return (
    <View style={styles.rowContainer}>
      <TileKpi icon={() => <Temperature width={54} height={54} />} data={DATA[0]} />
      <TileKpi icon={() => <Humidity width={54} height={54} />} data={DATA[1]} />
      <TileKpi icon={() => <CO2Output width={54} height={54} />} data={DATA[2]} />
    </View>
  );
};

export const Basic: Story = {
  args: {
    text: 'Price comfort: ',
    kpi: 1577,
    children: <Tiles />,
  },
};
