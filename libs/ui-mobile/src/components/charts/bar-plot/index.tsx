import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { ECharts } from 'react-native-echarts-wrapper';
import ReactECharts from 'echarts-for-react';

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
      top: Platform.OS === 'web' ? 0 : -12,
    },
    xAxis: {
      type: 'category',
      data: props.xLabels,
    },
    yAxis: {
      type: 'value',
      name: props.yAxisLabel,
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

  if (Platform.OS === 'web') {
    return <ReactECharts option={option} style={{ height: '50vh', width: '100%' }} />;
  }

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
