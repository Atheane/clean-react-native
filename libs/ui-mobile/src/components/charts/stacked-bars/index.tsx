import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { ECharts } from 'react-native-echarts-wrapper';
import ReactECharts from 'echarts-for-react';
import { arrayIsEmpty } from '@clean-rn/utils';

import { Colors } from '../../../constants';

type IProps = {
  categories: string[];
  labels: string[];
  transport: number[];
  housing: number[];
  savings: number[];
  referenceValue?: number;
  labelReferenceValue?: string;
};

const StackedBarsData = (props: IProps) => {
  const [tooltipData, setTooltipData] = useState<any>(null);
  const chartRef = useRef<any>(null);

  const onEvent = (param: any) => {
    if (param.type === 'click') {
      const { seriesName, value } = param;
      setTooltipData({ seriesName, value });
    }
  };

  const option = {
    xAxis: {
      type: 'category',
      data: props.labels,
      axisLabel: {
        interval: 0,
        rotate: 25,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: props.categories[1],
        type: 'bar',
        stack: 'one',
        data: props.housing,
        color: Colors.secondary.pink,
      },
      {
        name: props.categories[0],
        type: 'bar',
        stack: 'one',
        data: props.transport,
        color: Colors.primary.grey,
      },
      {
        name: props.categories[2],
        type: 'bar',
        stack: 'one',
        data: props.savings,
        color: Colors.primary.lightGreen,
      },
      ...(props.referenceValue
        ? [
            {
              type: 'line',
              markLine: {
                silent: true,
                lineStyle: {
                  type: 'dashed',
                  width: 3,
                  color: Colors.primary.darkGrey,
                },
                data: [
                  {
                    yAxis: props.referenceValue,
                    label: {
                      formatter: props.labelReferenceValue,
                      color: Colors.primary.darkGrey,
                      fontSize: 12,
                      position: 'middle',
                      align: 'center',
                      distance: 10,
                    },
                  },
                ],
              },
            },
          ]
        : []),
    ],
    legend: {
      data: props.categories,
      bottom: 0,
      left: 'center',
      itemGap: 20,
      textStyle: {
        color: Colors.primary.darkGrey,
        fontSize: 12,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        if (tooltipData) {
          return `${tooltipData.seriesName}: ${tooltipData.value}`;
        }
        return `${params.seriesName}: ${params.value}`;
      },
    },
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.chartContainer}>
        <ReactECharts
          ref={chartRef}
          option={option}
          style={{ height: '40vh', width: '100%' }}
          onEvents={{
            click: onEvent,
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

  return (
    <View style={styles.chartContainer}>
      <ECharts
        ref={chartRef}
        additionalCode={additionalCode}
        onData={(param) => onEvent(JSON.parse(param))}
        option={option}
      />
    </View>
  );
};

const StackedBarsNoData = (props: IProps) => (
  <StackedBarsData
    categories={props.categories}
    labels={['Année ref.', 'Année 1', 'Année 2', 'Année 3']}
    transport={[3100, 3000, 0, 0]}
    housing={[1100, 1000, 1000, 400]}
    savings={[800, 1000, 4000, 4600]}
  />
);

export const StackedBars = (props: IProps) => {
  if (!arrayIsEmpty(props.labels)) return <StackedBarsData {...props} />;
  else return <StackedBarsNoData {...props} />;
};

const styles = StyleSheet.create({
  chartContainer: {
    width: Platform.OS === 'web' ? '100%' : Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.4,
    marginLeft: Platform.OS === 'web' ? 0 : 16,
  },
});
