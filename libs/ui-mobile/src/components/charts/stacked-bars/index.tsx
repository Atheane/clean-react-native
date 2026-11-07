import { useRef, useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { ECharts } from 'react-native-echarts-wrapper';
import ReactECharts from 'echarts-for-react';
import { arrayIsEmpty } from '@clean-rn/utils';

import { Colors } from '../../../constants';

type IProps = {
  categories: string[];
  labels: string[];
  actual: number[];
  expected: number[];
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

  // Utiliser useMemo pour recalculer l'option quand les props changent
  const option = useMemo(
    () => ({
      barWidth: 16,
      xAxis: {
        type: 'category',
        data: props.labels,
        axisLabel: {
          interval: 0,
          rotate: 0,
        },
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      series: [
        {
          name: props.categories[1],
          type: 'bar',
          stack: 'one',
          data: props.expected,
          color: Colors.secondary.darkBlue,
        },
        {
          name: props.categories[0],
          type: 'bar',
          stack: 'one',
          data: props.actual,
          color: Colors.primary.green,
        },
      ],
      legend: {
        data: props.categories,
        bottom: 0,
        left: 'center',
        itemGap: 20,
        padding: [20, 0, 0, 0],
        textStyle: {
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
    }),
    [props.categories, props.labels, props.actual, props.expected, tooltipData],
  );

  // useEffect pour mettre à jour le graphique quand les données changent
  useEffect(() => {
    if (chartRef.current) {
      if (Platform.OS === 'web') {
        // Pour ReactECharts (web)
        chartRef.current.getEchartsInstance()?.setOption(option, true);
      } else {
        // Pour react-native-echarts-wrapper (mobile)
        chartRef.current.setOption(option, true);
      }
    }
  }, [option]);

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
    labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
    actual={[4, 3, 3, 4, 1, 1.2, 0.6, 5, 4, 1, 2, 1.5]}
    expected={[0.1, 0.1, 0.1, 0.2, 0.3, 0.4, 0.2, 0.1, 0.2, 0.3, 0.7, 0.5]}
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
