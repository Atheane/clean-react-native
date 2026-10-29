import { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ECharts } from 'react-native-echarts-wrapper';

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
    // Rendre la deuxième série (index 1) draggable
    draggable: index === 1,
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
      data: props.yLabels,
    },
    yAxis: {
      type: 'value',
      name: props.yAxisLabel, // Ajoute le label sur l'axe Y
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

  const additionalCode = `
    chart.on('click', function(param) {
        var obj = {
        type: 'touch',
        name: param.seriesName,
        value: param.value
        };
        sendData(JSON.stringify(obj));
    });
    chart.on('dragend', function(param) {
        var obj = {
        type: 'drag',
        name: param.seriesName,
        value: param.value
        };
        sendData(JSON.stringify(obj));
    });
    `;

  const [selectedPoint, setSelectedPoint] = useState<IDataPoint>();
  const chartRef = useRef<typeof ECharts>(null);

  const onChartEvent = (param: string) => {
    const obj = JSON.parse(param);
    if (obj.name === props.labels[0]) {
      return;
    }
    if (obj.type === 'touch') {
      console.log('Point clicked: ', obj.value);
      setSelectedPoint(obj.value);
    } else if (obj.type === 'dragend' && selectedPoint !== null) {
      console.log('Point dragged: ', obj.value);
      const newData = [...props.data[1]];
      newData[1] = obj.value; //new Y value
      chartRef.current?.setOption({
        series: series.map((s, i) => (i === 1 ? { ...s, data: newData } : s)),
      });
      console.log('Data should be changed: ', newData);
    }
  };

  return (
    <View style={styles.chartContainer}>
      <ECharts ref={chartRef} option={option} additionalCode={additionalCode} onData={onChartEvent} />
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
