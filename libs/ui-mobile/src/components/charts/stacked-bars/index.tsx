import { View, StyleSheet, Dimensions } from 'react-native';
import { ECharts } from 'react-native-echarts-wrapper';
import { Colors } from '../../../constants';

type IProps = {
  labels: string[];
  consumption: number[];
  savings: number[];
};

export const StackedBars = (props: IProps) => {
  return (
    <View style={styles.chartContainer}>
      <ECharts
        option={{
          xAxis: {
            type: 'category',
            data: props.labels,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: 'consumption',
              type: 'bar',
              stack: 'one',
              data: props.consumption,
              color: '#EE6666',
            },
            {
              name: 'savings',
              type: 'bar',
              stack: 'one',
              data: props.savings,
              color: Colors.bank.primary.lightGreen,
            },
          ],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});
