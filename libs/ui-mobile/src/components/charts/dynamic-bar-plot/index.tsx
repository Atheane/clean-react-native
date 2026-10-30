import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Platform } from 'react-native';
import { ECharts } from 'react-native-echarts-wrapper';
import ReactECharts from 'echarts-for-react';

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
  const chartRef = useRef<any>(null);

  const xLabels = currentData.map((data) => data[0]);

  useEffect(() => {
    if (!currentData) {
      setCurrentData(initialData);
    }
  }, [currentData, initialData]);

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
      return;
    }

    const prevDataIndex = optionStack[optionStack.length - 1];
    setOptionStack((prev) => prev.slice(0, -1));

    if (allData[prevDataIndex]) {
      setCurrentData(allData[prevDataIndex]);
    } else {
      console.error('Previous data not found');
      // Réinitialiser à la donnée initiale si les données précédentes ne sont pas trouvées
      setCurrentData(initialData);
      setOptionStack([]);
    }
  };

  const onChartEvent = (param: any) => {
    if (param.type === 'click') {
      const dataItem = param.data as DataItem;
      if (dataItem[3]) {
        goForward(dataItem[3] as string);
      }
    }
  };

  useEffect(() => {
    if (chartRef.current && Platform.OS !== 'web') {
      chartRef.current.setOption(createOption(currentData));
    }
  }, [currentData]);

  const renderChart = () => {
    if (Platform.OS === 'web') {
      return (
        <ReactECharts
          ref={chartRef}
          option={createOption(currentData)}
          style={{ height: '50vh', width: '100%' }}
          onEvents={{
            click: onChartEvent,
          }}
        />
      );
    } else {
      const additionalCode = `
        chart.on('click', function(params) {
          var obj = {
            type: 'click',
            data: params.data
          };
          sendData(JSON.stringify(obj));
        });`;

      return (
        <ECharts
          ref={chartRef}
          option={createOption(currentData)}
          additionalCode={additionalCode}
          onData={(param) => onChartEvent(JSON.parse(param))}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      {optionStack.length > 0 && (
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      )}
      <View style={styles.chartContainer}>{currentData ? renderChart() : <Text>Loading...</Text>}</View>
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
    marginLeft: Platform.OS === 'web' ? 0 : 16,
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
