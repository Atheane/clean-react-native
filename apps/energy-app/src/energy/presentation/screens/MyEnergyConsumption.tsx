import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  SafeScrollingView,
  Colors,
  EnergyConsumption,
  FontNames,
  Dropdown,
  StackedBars,
  TableConsumption,
} from '@clean-rn/ui-mobile';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary } from '../../../shared/presentation/hoc';
import {
  DECAY_CONSUMPTIONS_AFTER_WORKS,
  IEnergyConsumption,
  IWorks,
  PriceComfortVO,
} from '@clean-rn/energy/domain';

const monthsMap = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const YEARS = [
  { key: '1', value: '2023' },
  { key: '2', value: '2024' },
  { key: '3', value: '2025' },
];

const formatMonthlyConsumptions = (inputData: IEnergyConsumption[], selectedYear: string): number[] => {
  const consos: number[] = [];
  const consoSelectedYear = inputData.filter((conso: IEnergyConsumption) => {
    return conso.year === parseInt(selectedYear);
  });
  if (consoSelectedYear.length === 0) {
    return [];
  }

  // Initialize array with 12 zeros
  for (let i = 0; i < 12; i++) {
    consos[i] = 0;
  }
  // Fill with actual consumption values where available
  consoSelectedYear.forEach((conso: IEnergyConsumption) => {
    const monthIndex = monthsMap[conso.month as keyof typeof monthsMap];
    if (monthIndex !== undefined) {
      consos[monthIndex] = conso.value;
    }
  });

  return consos;
};

const formatConsumptionTableData = (
  actualConsumptions: number[],
  targetConsumptions: number[],
  referenceConsumptions: number[],
  savings: number[],
): string[][] => {
  const formatValue = (value: number): string => {
    return value === 0 ? '-' : Math.round(value).toString();
  };

  const formatPercentage = (value: number): string => {
    return value === 0 ? '-' : `${value.toFixed(0)} %`;
  };

  const data: string[][] = [];

  for (let i = 0; i < 12; i++) {
    const row = [
      formatValue(referenceConsumptions[i] || 0),
      formatValue(targetConsumptions[i] || 0),
      formatValue(actualConsumptions[i] || 0),
      formatPercentage(savings[i] || 0),
    ];
    data.push(row);
  }

  return data;
};

const formatMonthlyPricesComfort = (inputData: PriceComfortVO[], selectedYear: string): number[] => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const pcAverageSelectedYear: number[] = [];
  const pcSelectedYear = inputData.filter((pc: PriceComfortVO) => {
    const startDate = new Date(pc.startDate);
    const year = startDate.getFullYear();
    return year === parseInt(selectedYear);
  });
  if (pcSelectedYear.length === 0) {
    return [];
  }
  // Initialize array with 12 zeros
  for (let i = 0; i < 12; i++) {
    pcAverageSelectedYear[i] = 0;
  }
  // Fill with actual consumption values where available
  pcSelectedYear.forEach((pc: PriceComfortVO) => {
    const startDate = new Date(pc.startDate);
    const month = monthNames[startDate.getMonth()];
    const monthIndex = monthsMap[month as keyof typeof monthsMap];

    if (monthIndex !== undefined) {
      try {
        pcAverageSelectedYear[monthIndex] = parseFloat(pc.value.average);
      } catch (e: unknown) {
        pcAverageSelectedYear[monthIndex] = 0;
      }
    }
  });

  return pcAverageSelectedYear;
};

const formatTagsData = (baselinePC: number[], targetPC: number[], actualPC: number[]): string[][] => {
  const tags: string[][] = [];

  for (let i = 0; i < 12; i++) {
    tags.push([
      baselinePC[i] === 0 ? '-' : baselinePC[i].toString(),
      targetPC[i] === 0 ? '-' : targetPC[i]?.toString(),
      actualPC[i] === 0 ? '-' : actualPC[i]?.toString(),
    ]);
  }

  return tags;
};

export const MyEnergyConsumption = () => {
  const { t } = useTranslation();

  const { energy } = useSelector((state: IRootState) => state.energy);
  const [selectedYear, setSelectedYear] = useState<string>('2023');

  const handleChangeYear = (selectedOption: { key: string; value: string }) => {
    console.log('Selected year:', selectedOption.value);
    setSelectedYear(selectedOption.value);
  };

  const [actualConsumptions, setActualConsumptions] = useState<number[]>([]);
  const [targetConsumptions, setTargetConsumptions] = useState<number[]>([]);
  const [referenceConsumptions, setReferenceConsumptions] = useState<number[]>([]);
  const [savings, setSavings] = useState<number[]>([]);
  const [baselinePC, setBaselinePC] = useState<number[]>([]);
  const [targetPC, setTargetPC] = useState<number[]>([]);
  const [actualPC, setActualPC] = useState<number[]>([]);

  useEffect(() => {
    if (!energy?.properties.consumptions || energy.properties.consumptions.length === 0) {
      return;
    }
    const actualConsumptions = formatMonthlyConsumptions(energy.properties.consumptions, selectedYear);
    setActualConsumptions(actualConsumptions);
  }, [energy?.properties.consumptions, selectedYear]);

  useEffect(() => {
    if (!energy?.properties.targetConsumptions || energy.properties.targetConsumptions.length === 0) {
      return;
    }
    const targetConsumptions = formatMonthlyConsumptions(energy.properties.targetConsumptions, selectedYear);
    setTargetConsumptions(targetConsumptions);
  }, [energy?.properties.targetConsumptions, selectedYear]);

  useEffect(() => {
    if (!energy?.properties.referenceConsumptions || energy.properties.referenceConsumptions.length === 0) {
      return;
    }
    setReferenceConsumptions(energy.properties.referenceConsumptions);
  }, [energy?.properties.referenceConsumptions, selectedYear]);

  useEffect(() => {
    if (actualConsumptions.length === 0) {
      return;
    }
    if (targetConsumptions.length === 0) {
      return;
    }
    const savings = targetConsumptions.map((conso: number, index: number) => {
      if (conso === 0 || actualConsumptions[index] === 0) {
        return 0;
      }
      const s = 100 * (1 - conso / actualConsumptions[index]);
      return parseFloat(s.toFixed(2));
    });

    setSavings(savings);
  }, [actualConsumptions, targetConsumptions]);

  useEffect(() => {
    if (!energy?.properties.globalPriceComfort) {
      return;
    }
    const baselinePC = Array(12).fill([energy.properties.globalPriceComfort.value.average]);
    console.log('baselinePC', baselinePC);
    setBaselinePC(baselinePC);
  }, [energy?.properties.globalPriceComfort]);

  useEffect(() => {
    if (!energy?.properties.priceComfortMonthly) {
      return;
    }
    console.log('energy.properties.priceComfortMonthly', energy.properties.priceComfortMonthly);
    const actualPC = formatMonthlyPricesComfort(energy.properties.priceComfortMonthly, selectedYear);
    console.log('actualPC', actualPC);

    setActualPC(actualPC);
    const targetPC = actualPC.map((pc) =>
      Math.round((1 - DECAY_CONSUMPTIONS_AFTER_WORKS[IWorks.GLOBAL_RENOVATION]) * pc),
    );

    console.log('targetPC', targetPC);
    setTargetPC(targetPC);
  }, [energy?.properties.priceComfortMonthly, selectedYear]);

  const hasValidData =
    actualConsumptions.length > 0 &&
    targetConsumptions.length > 0 &&
    referenceConsumptions.length > 0 &&
    savings.length > 0;

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView backgroundColor={Colors.primary.white}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <EnergyConsumption color={Colors.primary.darkBlue} />
            <Text style={styles.headerText}>{t('screens.energy.my-energy-consumption.header')}</Text>
          </View>
          <View style={styles.dropdownContainer}>
            <Dropdown
              data={YEARS}
              onSelect={handleChangeYear}
              defaultValue={selectedYear}
              placeholder={t('screens.energy.my-energy-consumption.dropdown.placeholder')}
              short
              shortWidth={styles.dropdownContainer.width}
            />
          </View>
          {hasValidData ? (
            <View>
              <View style={styles.chartContainer}>
                <StackedBars
                  categories={[
                    t('screens.energy.my-energy-consumption.chart.green'),
                    t('screens.energy.my-energy-consumption.chart.blue'),
                  ]}
                  labels={[
                    t('screens.energy.my-energy-consumption.chart.labels.jan'),
                    t('screens.energy.my-energy-consumption.chart.labels.feb'),
                    t('screens.energy.my-energy-consumption.chart.labels.mar'),
                    t('screens.energy.my-energy-consumption.chart.labels.apr'),
                    t('screens.energy.my-energy-consumption.chart.labels.may'),
                    t('screens.energy.my-energy-consumption.chart.labels.jun'),
                    t('screens.energy.my-energy-consumption.chart.labels.jul'),
                    t('screens.energy.my-energy-consumption.chart.labels.aug'),
                    t('screens.energy.my-energy-consumption.chart.labels.sep'),
                    t('screens.energy.my-energy-consumption.chart.labels.oct'),
                    t('screens.energy.my-energy-consumption.chart.labels.nov'),
                    t('screens.energy.my-energy-consumption.chart.labels.dec'),
                  ]}
                  actual={actualConsumptions}
                  expected={targetConsumptions}
                />
              </View>

              <View style={styles.consumptionTableContainer}>
                <Text style={styles.simpleText}>{t('screens.energy.my-energy-consumption.know-more')}</Text>
                <TableConsumption
                  head={[
                    t('screens.energy.my-energy-consumption.header-table.month'),
                    t('screens.energy.my-energy-consumption.header-table.conso-ref'),
                    t('screens.energy.my-energy-consumption.header-table.conso-target'),
                    t('screens.energy.my-energy-consumption.header-table.conso'),
                    t('screens.energy.my-energy-consumption.header-table.savings'),
                  ]}
                  data={formatConsumptionTableData(
                    actualConsumptions,
                    targetConsumptions,
                    referenceConsumptions,
                    savings,
                  )}
                  tags={formatTagsData(baselinePC, targetPC, actualPC)}
                  tagHeader={t('screens.energy.my-energy-consumption.price-comfort')}
                  rowLabels={[
                    t('screens.energy.my-energy-consumption.chart.labels.jan'),
                    t('screens.energy.my-energy-consumption.chart.labels.feb'),
                    t('screens.energy.my-energy-consumption.chart.labels.mar'),
                    t('screens.energy.my-energy-consumption.chart.labels.apr'),
                    t('screens.energy.my-energy-consumption.chart.labels.may'),
                    t('screens.energy.my-energy-consumption.chart.labels.jun'),
                    t('screens.energy.my-energy-consumption.chart.labels.jul'),
                    t('screens.energy.my-energy-consumption.chart.labels.aug'),
                    t('screens.energy.my-energy-consumption.chart.labels.sep'),
                    t('screens.energy.my-energy-consumption.chart.labels.oct'),
                    t('screens.energy.my-energy-consumption.chart.labels.nov'),
                    t('screens.energy.my-energy-consumption.chart.labels.dec'),
                  ]}
                  onPress={() => console.log('Table row pressed')}
                />
              </View>
            </View>
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataMessage}>
                {t('screens.energy.my-energy-consumption.no-data-modal.message')}
              </Text>
            </View>
          )}
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 20,
    marginTop: 20,
    width: '90%',
  },
  headerText: {
    fontSize: 28,
    fontFamily: FontNames.MartelSans_800ExtraBold,
    fontWeight: '600',
    color: Colors.secondary.black,
    textAlign: 'left',
    marginLeft: -10,
  },
  dropdownContainer: {
    marginTop: 24,
    marginLeft: 40,
    width: 200,
  },
  chartContainer: {
    marginLeft: -16,
  },
  consumptionTableContainer: {
    marginTop: 24,
    marginLeft: 16,
    marginRight: 16,
    flex: 1,
  },
  simpleText: {
    fontSize: 16,
    fontFamily: FontNames.MartelSans_600SemiBold,
    color: Colors.primary.darkGrey,
    marginBottom: 16,
    marginLeft: 16,
  },
  noDataContainer: {
    backgroundColor: Colors.primary.white,
    borderRadius: 12,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 400,
  },
  noDataMessage: {
    fontSize: 16,
    fontFamily: FontNames.MartelSans_400Regular,
    color: Colors.primary.darkGrey,
    textAlign: 'left',
    lineHeight: 22,
    marginTop: 20,
  },
});
