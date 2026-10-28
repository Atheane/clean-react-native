import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { DynamicBarPlot, TabCO2Reward } from '@clean-rn/ui-mobile';
import { Colors } from '../constants';
import { ErrorBoundary, SafeScrollingView } from '../hoc';

import plotData from '../../demo/generated_data_2023.json';
import { tableHead, tableData, rowLabels } from '../../demo/table_data_2023.json';

const parentData = plotData[0];

export const Dashboard = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={theme.text.title}>{t('screens.dashboard.title')}</Text>
          </View>
          <View style={styles.chartContainer}>
            <DynamicBarPlot
              initialData={parentData}
              allData={plotData}
              color={Colors.primary.grey}
              yAxisLabel="kWh"
            />
          </View>
          <View style={styles.tabContainer}>
            <TabCO2Reward
              tableHead={tableHead}
              tableData={tableData}
              rowLabels={rowLabels}
              onPress={() => {
                return;
              }}
              buttonTitle=""
              tagText=""
            />
          </View>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    marginTop: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chartContainer: {
    marginTop: 32,
  },
  tabContainer: {
    marginTop: -20,
  },
});
