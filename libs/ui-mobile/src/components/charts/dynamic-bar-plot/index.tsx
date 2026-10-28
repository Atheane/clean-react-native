import { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { ECharts } from 'react-native-echarts-wrapper';

// Définition des types pour les données
type DataItem = (string | number)[];
type DataSet = DataItem[];

// Props du composant
type IProps = {
  initialData: DataSet;
  allData: DataSet[];
  color: string;
  yAxisLabel: string;
};

export const DynamicBarPlot = ({ initialData, allData, color, yAxisLabel }: IProps) => {
  const [currentData, setCurrentData] = useState<DataSet>(initialData);
  const [optionStack, setOptionStack] = useState<number[]>([]);
  const chartRef = useRef<typeof ECharts>(null);

  const xLabels = currentData.map((data) => data[0]);

  const createOption = (data: DataSet) => {
    return {
      xAxis: { type: 'category', data: xLabels },
      yAxis: { minInterval: 0.1, name: yAxisLabel },
      animationDurationUpdate: 500,
      series: {
        type: 'bar',
        dimensions: ['x', 'y', 'groupId', 'childGroupId'],
        encode: {
          x: 'x',
          y: 'y',
          itemGroupId: 'groupId',
          itemChildGroupId: 'childGroupId',
        },
        data: data,
        universalTransition: {
          enabled: true,
          divideShape: 'clone',
        },
        itemStyle: {
          color: color,
          borderRadius: [50, 50, 0, 0],
        },
      },
    };
  };

  const goForward = (childGroupId: string) => {
    const nextDataIndex = allData.findIndex((dataset) => dataset[0][2] === childGroupId);
    if (nextDataIndex !== -1) {
      setOptionStack((prev) => [...prev, allData.indexOf(currentData)]);
      setCurrentData(allData[nextDataIndex]);
    }
  };

  const goBack = () => {
    if (optionStack.length === 0) {
      console.log('Already in root level!');
    } else {
      const prevDataIndex = optionStack[optionStack.length - 1];
      setOptionStack((prev) => prev.slice(0, -1));
      setCurrentData(allData[prevDataIndex]);
    }
  };

  const onChartEvent = (param: string) => {
    const obj = JSON.parse(param);
    if (obj.type === 'click') {
      const dataItem = obj.data as DataItem;
      if (dataItem[3]) {
        goForward(dataItem[3] as string);
      }
    }
  };

  const additionalCode = `
      chart.on('click', function(params) {
        var obj = {
          type: 'click',
          data: params.data
        };
        sendData(JSON.stringify(obj));
      });
    `;

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.setOption(createOption(currentData));
    }
  }, [currentData]);

  return (
    <View style={styles.container}>
      {optionStack.length > 0 && (
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      )}
      <View style={styles.chartContainer}>
        <ECharts
          ref={chartRef}
          option={createOption(currentData)}
          additionalCode={additionalCode}
          onData={onChartEvent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5,
    marginLeft: 16,
    marginBottom: 16,
  },
  backButton: {
    position: 'absolute',
    top: -24,
    left: 24,
    zIndex: 1,
    padding: 10,
    backgroundColor: 'rgba(200, 200, 200, 0.8)',
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: 'black',
  },
});
