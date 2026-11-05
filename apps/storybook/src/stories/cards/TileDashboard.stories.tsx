import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import { TileDashboard, TileKpi, Colors, Temperature, Humidity, CO2Output } from '@clean-rn/ui-mobile';
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

const TilesWhiteBackground = () => {
  return (
    <View style={styles.rowContainer}>
      <TileKpi
        icon={() => <Temperature width={31} height={31} />}
        data={DATA[0]}
        backgroundColor={Colors.primary.white}
      />
      <TileKpi
        icon={() => <Humidity width={31} height={31} />}
        data={DATA[1]}
        backgroundColor={Colors.primary.white}
      />
      <TileKpi
        icon={() => <CO2Output width={31} height={31} />}
        data={DATA[2]}
        backgroundColor={Colors.primary.white}
      />
    </View>
  );
};

const TilesGreyBackground = () => {
  return (
    <View style={styles.rowContainer}>
      <TileKpi icon={() => <Temperature width={31} height={31} />} data={DATA[0]} />
      <TileKpi icon={() => <Humidity width={31} height={31} />} data={DATA[1]} />
      <TileKpi icon={() => <CO2Output width={31} height={31} />} data={DATA[2]} />
    </View>
  );
};

export const Internal: Story = {
  args: {
    text: 'Price comfort: ',
    kpi: '1577',
    title: 'Intérieur',
    children: <TilesGreyBackground />,
  },
};

export const External: Story = {
  args: {
    text: 'Price comfort: ',
    kpi: '1577',
    title: 'Extérieur',
    children: <TilesWhiteBackground />,
    external: true,
  },
};
