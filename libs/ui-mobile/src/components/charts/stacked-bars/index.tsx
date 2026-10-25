import { useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ECharts } from 'react-native-echarts-wrapper';
import { Colors } from '../../../constants';

type IProps = {
  categories: string[];
  labels: string[];
  transport: number[];
  housing: number[];
  savings: number[];
};

export const StackedBars = (props: IProps) => {
  const additionalCode = `
    chart.on('click', function(param) {
      var obj = {
        type: 'event_clicked',
        name: param.seriesName,
        value: param.value
      };
      sendData(JSON.stringify(obj));
    });
  `;

  const onData = (param: string) => {
    const obj = JSON.parse(param);
    if (obj.type === 'event_clicked') {
      const { name, value } = obj;
      const tooltipData = {
        seriesName: name,
        value: value,
      };
      setTooltipData(tooltipData);
    }
  };

  const setTooltipData = (data: any) => {
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: function (params: any) {
          return `${data.seriesName}: ${data.value}`;
        },
      },
    };
    setOption(option);
  };

  const option = {
    xAxis: {
      type: 'category',
      data: props.labels,
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
        color: Colors.bank.secondary.pink,
      },
      {
        name: props.categories[0],
        type: 'bar',
        stack: 'one',
        data: props.transport,
        color: Colors.bank.primary.grey,
      },
      {
        name: props.categories[2],
        type: 'bar',
        stack: 'one',
        data: props.savings,
        color: Colors.bank.primary.lightGreen,
      },
    ],
    legend: {
      data: props.categories,
      bottom: 0,
      left: 'center',
      itemGap: 20,
      textStyle: {
        color: Colors.bank.primary.darkGrey,
        fontSize: 12,
      },
    },
  };
  const setOption = (newOption: any) => {
    const mergedOption = { ...option, ...newOption };
    chartRef.current?.setOption(mergedOption);
  };

  const chartRef = useRef<any>(null);

  return (
    <View style={styles.chartContainer}>
      <ECharts ref={chartRef} additionalCode={additionalCode} onData={onData} option={option} />
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
