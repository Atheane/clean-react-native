import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { ECharts } from 'react-native-echarts-wrapper';
import ReactECharts from 'echarts-for-react';

type IRegression = {
  label: string;
  data: number[][];
  labelPosition: number[];
};

type IProps = {
  title: string;
  subtitle?: string;
  data: {
    [key: string]: number[][];
  };
  labels: string[];
  colors: string[];
  regression?: IRegression[];
  xLabel: string;
  yLabel: string;
};

export const ScatterPlot = (props: IProps) => {
  const series = props.labels.map((label: string, index: number) => ({
    name: label,
    type: 'scatter',
    data: props.data[label],
    symbolSize: 8,
    color: props.colors[index],
  }));

  if (props.regression && props.regression.length > 0) {
    props.regression.forEach((regression: IRegression, index: number) => {
      series.push({
        type: 'line',
        symbol: 'none',
        data: regression.data,
        color: props.colors[index],
        label: {
          show: true,
          formatter: regression.label,
          color: props.colors[index],
          position: 'top',
          distance: 10,
          fontSize: 12,
          backgroundColor: 'rgba(255,255,255,0.7)',
          padding: [4, 8],
          borderRadius: 4,
        },
        emphasis: {
          label: {
            show: true,
          },
        },
        labelLayout: {
          moveOverlap: 'shiftY',
        },
        markPoint: {
          symbol: 'circle',
          symbolSize: 1,
          label: {
            show: true,
            formatter: regression.label,
            position: 'left',
            distance: 10,
            fontSize: 12,
            color: props.colors[index],
            backgroundColor: 'rgba(255,255,255,0.7)',
            padding: [4, 8],
            borderRadius: 4,
          },
          data: [{ coord: regression.labelPosition }],
        },
      });
    });
  }

  const option = {
    grid: {
      left: 60,
      right: 80,
      top: 60,
      bottom: 60,
    },
    xAxis: {
      type: 'value',
      name: props.xLabel,
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    yAxis: {
      type: 'value',
      name: props.yLabel,
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    legend: {
      data: props.labels,
      bottom: 10,
    },
    title: {
      text: props.title,
      subtext: props.subtitle ?? '',
      left: 'center',
      top: Platform.OS === 'web' ? 0 : -12,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    series: series,
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.chartContainer}>
        <ReactECharts option={option} style={{ height: '50vh', width: '100%' }} />
      </View>
    );
  }

  return (
    <View style={styles.chartContainer}>
      <ECharts option={option} />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    width: Platform.OS === 'web' ? '100%' : Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5,
    marginLeft: Platform.OS === 'web' ? 0 : 16,
  },
});
