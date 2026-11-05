import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import { TileDashboard } from '../../src/components/cards/tile-dashboard';
import { TileKpi } from '../../src/components/cards/tile-kpi';
import { Temperature, Humidity, CO2Output } from '../../src/assets/svg';
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

const TilesWithWhiteBackground = () => {
  return (
    <View style={styles.rowContainer}>
      <TileKpi
        icon={() => <Temperature width={54} height={54} />}
        data={DATA[0]}
        backgroundColor={Colors.primary.white}
      />
      <TileKpi
        icon={() => <Humidity width={54} height={54} />}
        data={DATA[1]}
        backgroundColor={Colors.primary.white}
      />
      <TileKpi
        icon={() => <CO2Output width={54} height={54} />}
        data={DATA[2]}
        backgroundColor={Colors.primary.white}
      />
    </View>
  );
};

const TilesWithGreyBackground = () => {
  return (
    <View style={styles.rowContainer}>
      <TileKpi
        icon={() => <Temperature width={54} height={54} />}
        data={DATA[0]}
        backgroundColor={Colors.primary.lightGrey}
      />
      <TileKpi
        icon={() => <Humidity width={54} height={54} />}
        data={DATA[1]}
        backgroundColor={Colors.primary.lightGrey}
      />
      <TileKpi
        icon={() => <CO2Output width={54} height={54} />}
        data={DATA[2]}
        backgroundColor={Colors.primary.lightGrey}
      />
    </View>
  );
};

export const Internal: Story = {
  args: {
    text: 'Price comfort: ',
    kpi: '1577',
    title: 'Intérieur',
    children: <TilesWithWhiteBackground />,
  },
};

export const External: Story = {
  args: {
    text: 'Price comfort: ',
    kpi: '1577',
    title: 'Extérieur',
    children: <TilesWithGreyBackground />,
    external: true,
  },
};
