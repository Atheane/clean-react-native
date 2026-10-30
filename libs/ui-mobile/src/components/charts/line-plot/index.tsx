import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { ECharts } from 'react-native-echarts-wrapper';
import ReactECharts from 'echarts-for-react';

type IProps = {
  title: string;
  subtitle?: string;
  labels: string[];
  colors: string[];
  data: number[][];
  yLabels: string[];
  yAxisLabel: string;
};

type IDataPoint = { seriesIndex: number; dataIndex: number };

export const LinePlot = (props: IProps) => {
  const [selectedPoint, setSelectedPoint] = useState<IDataPoint>();
  const chartRef = useRef<any>(null);

  const series = props.labels.map((label: string, index: number) => ({
    name: label,
    type: 'line',
    data: props.data[index],
    color: props.colors[index],
    smooth: true,
    emphasis: {
      itemStyle: {
        borderColor: '#000',
        borderWidth: 2,
      },
    },
    draggable: index === 1,
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
      data: props.yLabels,
    },
    yAxis: {
      type: 'value',
      name: props.yAxisLabel,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      data: props.labels,
      bottom: 10,
    },
    series,
  };

  const onChartEvent = (param: any) => {
    if (param.seriesName !== props.labels[0]) {
      if (param.type === 'click') {
        setSelectedPoint(param.value);
      }
    }
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.chartContainer}>
        <ReactECharts
          ref={chartRef}
          option={option}
          style={{ height: '50vh', width: '100%' }}
          onEvents={{
            click: onChartEvent,
          }}
        />
      </View>
    );
  }

  const additionalCode = `
    chart.on('click', function(param) {
      var obj = {
        type: 'click',
        seriesName: param.seriesName,
        value: param.value
      };
      sendData(JSON.stringify(obj));
    });
  `;

  console.log('Selected point: ', selectedPoint);

  return (
    <View style={styles.chartContainer}>
      <ECharts
        ref={chartRef}
        option={option}
        additionalCode={additionalCode}
        onData={(param) => onChartEvent(JSON.parse(param))}
      />
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
