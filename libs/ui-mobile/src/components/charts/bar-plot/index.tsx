import { View, StyleSheet, Dimensions } from 'react-native';
import { ECharts } from 'react-native-echarts-wrapper';

type IProps = {
  title: string;
  subtitle?: string;
  labels: string[];
  colors: string[];
  data: number[][];
  xLabels: string[];
  yAxisLabel: string;
};

export const BarPlot = (props: IProps) => {
  const series = props.labels.map((label: string, index: number) => ({
    name: label,
    type: 'bar',
    data: props.data[index],
    itemStyle: {
      color: props.colors[index],
      borderRadius: [50, 50, 0, 0],
    },
  }));

  const option = {
    title: {
      text: props.title,
      subtext: props.subtitle ?? '',
      left: 'center',
      top: -12,
    },
    xAxis: {
      type: 'category',
      data: props.xLabels,
    },
    yAxis: {
      type: 'value',
      name: props.yAxisLabel, // Ajoute le label sur l'axe Y
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: props.labels,
      bottom: 10,
    },
    series,
    animation: false,
  };

  return (
    <View style={styles.chartContainer}>
      <ECharts option={option} />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5,
    marginLeft: 16,
  },
});
