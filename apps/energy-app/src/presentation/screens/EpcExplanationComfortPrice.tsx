import { View, StyleSheet } from 'react-native';

import { ScatterPlot, Colors } from '@clean-rn/ui-mobile';

const FAKE_BASELINE = [
  [50, 101307],
  [75, 126572],
  [100, 167896],
  [125, 210621],
  [150, 233118],
  [175, 260380],
  [200, 303210],
  [225, 367415],
  [250, 374647],
  [275, 437531],
  [300, 494957],
  [325, 548346],
  [350, 579496],
  [375, 624041],
  [400, 653330],
  [425, 706494],
  [450, 718227],
];

const FAKE_VEOLIA = [
  [50, 17103],
  [75, 39698],
  [100, 77305],
  [125, 102147],
  [150, 154787],
  [175, 146247],
  [200, 210170],
  [225, 217497],
  [250, 250836],
  [275, 289682],
  [300, 297216],
  [325, 314370],
  [350, 380431],
  [375, 386580],
  [400, 415278],
  [425, 469784],
  [450, 468545],
];

export const EpcExplanationComfortPrice = () => {
  return (
    <View style={styles.container}>
      <ScatterPlot
        title={'Baseline Pre-Renovations'}
        data={{ Baseline: FAKE_BASELINE, Veolia: FAKE_VEOLIA }}
        labels={['Baseline', 'Veolia']}
        yLabel={'KWH consumption'}
        xLabel={'HDD (18°)'}
        colors={[Colors.primary.darkBlue, Colors.secondary.pink]}
        regression={[
          {
            label: 'y = 1577.4x + 50650',
            labelPosition: [500, 800000],
            data: [
              [0, 50650],
              [600, 1577.4 * 500 + 50650],
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});
