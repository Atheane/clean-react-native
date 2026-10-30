import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { DynamicBarPlot, TableReward, Dropdown, ShareScreen, Question } from '@clean-rn/ui-mobile';
import { Colors } from '../constants';
import { ErrorBoundary, SafeScrollingView } from '../hoc';
import { ISharedStackPages } from '../types';

// Importez toutes les données au début
import plotData2019 from '../../demo/generated_data_2019.json';
import plotData2020 from '../../demo/generated_data_2020.json';
import plotData2021 from '../../demo/generated_data_2021.json';
import plotData2022 from '../../demo/generated_data_2022.json';
import plotData2023 from '../../demo/generated_data_2023.json';
import plotData2024 from '../../demo/generated_data_2024.json';

import { tableData as tableData2019, rowLabels as rowLabels2019 } from '../../demo/table_data_2019.json';
import { tableData as tableData2020, rowLabels as rowLabels2020 } from '../../demo/table_data_2020.json';
import { tableData as tableData2021, rowLabels as rowLabels2021 } from '../../demo/table_data_2021.json';
import { tableData as tableData2022, rowLabels as rowLabels2022 } from '../../demo/table_data_2022.json';
import { tableData as tableData2023, rowLabels as rowLabels2023 } from '../../demo/table_data_2023.json';
import { tableData as tableData2024, rowLabels as rowLabels2024 } from '../../demo/table_data_2024.json';

const years = ['2019', '2020', '2021', '2022', '2023', '2024'];

const dataByYear = {
  '2019': { plot: plotData2019, table: tableData2019, rowLabels: rowLabels2019 },
  '2020': { plot: plotData2020, table: tableData2020, rowLabels: rowLabels2020 },
  '2021': { plot: plotData2021, table: tableData2021, rowLabels: rowLabels2021 },
  '2022': { plot: plotData2022, table: tableData2022, rowLabels: rowLabels2022 },
  '2023': { plot: plotData2023, table: tableData2023, rowLabels: rowLabels2023 },
  '2024': { plot: plotData2024, table: tableData2024, rowLabels: rowLabels2024 },
};

const DynamicBarPlotWithCapture = ({ onCapture, ...props }) => {
  const viewShotRef = useRef(null);
  return (
    <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.8 }}>
      <View pointerEvents={'auto'}>
        <DynamicBarPlot {...props} />
      </View>
    </ViewShot>
  );
};

export const Dashboard = () => {
  const [chartUri, setChartUri] = useState(null);

  const { theme } = useTheme();
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState('2023');
  const [currentData, setCurrentData] = useState(dataByYear['2023']);
  const [key, setKey] = useState(0); // Utilisé pour forcer la mise à jour du DynamicBarPlot

  useEffect(() => {
    setCurrentData(dataByYear[selectedYear]);
    setKey((prevKey) => prevKey + 1); // Force la mise à jour du DynamicBarPlot
  }, [selectedYear]);

  const updateTableData = useCallback((newData) => {
    const newTableData = newData.map(([label, consumption]) => {
      const kWh = parseFloat(consumption).toFixed(2);
      const comfortPrice = Math.round(consumption * 12);
      const eG = (consumption * 0.035).toFixed(1);
      return [kWh, comfortPrice.toString(), `${eG} €G`];
    });
    const newRowLabels = newData.map(([label]) => label);
    setCurrentData((prevData) => ({
      ...prevData,
      table: newTableData,
      rowLabels: newRowLabels,
    }));
  }, []);

  const handleYearSelect = ({ value }) => {
    setSelectedYear(value.toString());
  };

  const handleChartCapture = (uri) => {
    setChartUri(uri);
  };

  const navigation = useNavigation();

  const handleOnPressHelp = useCallback(
    (uid: string) => {
      navigation.navigate(ISharedStackPages.MODAL_HELP, { uid });
    },
    [navigation],
  );

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={theme.text.title}>{t('screens.dashboard.title')}</Text>
          </View>
          <View style={styles.yearSelectorContainer}>
            <Dropdown
              label="Year"
              placeholder="Select Year"
              data={years.map((year) => ({ key: year, value: year }))}
              onSelect={handleYearSelect}
              defaultValue={selectedYear}
            />
          </View>
          <ShareScreen
            handleError={(error) => console.log(error)}
            message={'Dashboard'}
            buttonTitle={'Save report'}
          >
            <View>
              <View style={[styles.chartContainer]}>
                <DynamicBarPlotWithCapture
                  key={key}
                  initialData={currentData.plot[0]}
                  allData={currentData.plot}
                  color={Colors.primary.grey}
                  yAxisLabel="kWh"
                  onDataChange={updateTableData}
                  onCapture={handleChartCapture}
                />
              </View>
              {chartUri && <Image source={{ uri: chartUri }} style={styles.capturedChart} />}
              <View style={styles.tabHeaders}>
                <View style={styles.tabCell}>
                  <Text style={theme.text.boldDarkBlue}> </Text>
                </View>
                <View style={styles.tabCell}>
                  <Text style={theme.text.boldDarkBlue}>{'            kWh'}</Text>
                </View>
                <TouchableOpacity onPress={() => handleOnPressHelp('comfort-price')} style={styles.tabCell}>
                  <Text style={theme.text.boldDarkBlue}>{'    Comfort\n    price'}</Text>
                  <Question
                    width={16}
                    height={16}
                    color={Colors.primary.darkBlue}
                    style={{ marginBottom: 8, marginLeft: -16 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOnPressHelp('co2')} style={styles.tabCell}>
                  <Text style={theme.text.boldDarkBlue}>{'Green\neuros'}</Text>
                  <Question
                    width={16}
                    height={16}
                    color={Colors.primary.darkBlue}
                    style={{ marginBottom: 8, marginLeft: 0 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.tabContainer]}>
                <TableReward
                  tableHead={[]}
                  tableData={currentData.table}
                  rowLabels={currentData.rowLabels}
                  onPress={() => {
                    return;
                  }}
                  buttonTitle=""
                  tagText=""
                />
              </View>
            </View>
          </ShareScreen>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabCell: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  tabHeaders: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 0,
    margin: 0,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    marginTop: 80,
    alignItems: 'center',
  },
  yearSelectorContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  chartContainer: {
    marginTop: 32,
  },
  tabContainer: {
    // marginTop: -50,
  },
  capturedChart: {
    width: '100%',
    height: 300,
  },
});
