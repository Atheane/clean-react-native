import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { navigateTo } from '@shared/infrastructure/redux/actions';
import { RootState } from '@shared/infrastructure/redux/reducers';
import { useHideBottomBar, useReduxOverStorageValue } from '@shared/presentation/hooks';
import { Colors, FontNames } from '@shared/presentation/constants';
import { Routes } from '@shared/presentation/types';

import { CARBON_STACK_PAGES } from '@carbon/presentation/types';
import { TouchCardKpi, GraphCO2, TouchCardText } from '@carbon/presentation/components';
import { Car, Food, House, Plane } from '@carbon/presentation/assets';
import { PrimaryButton } from '@shared/presentation/components';

export const Carbon = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handlePressNavigation = (route: Routes) => {
    dispatch(navigateTo({ route }));
  };

  useHideBottomBar();

  //storage
  const {
    houseEmissions: houseEmissionsFromStorage,
    averageHouseEmissions: averageHouseEmissionsFromStorage,
    transportEmissions: transportEmissionsFromStorage,
    averageTransportEmissions: averageTransportEmissionsFromStorage,
    foodEmissions: foodEmissionsFromStorage,
    averageFoodEmissions: averageFoodEmissionsFromStorage,
    flyEmissions: flyEmissionsFromStorage,
    averageFlyEmissions: averageFlyEmissionsFromStorage,
  } = useSelector((state: RootState) => state.storage);

  // house
  const { footprint: houseEmissionsFromRedux, average: averageHouseEmissionsFromRedux } = useSelector(
    (state: RootState) => state.carbon.house,
  );
  const houseEmissions = useReduxOverStorageValue(houseEmissionsFromStorage, houseEmissionsFromRedux);
  const averageHouseEmissions = useReduxOverStorageValue(
    averageHouseEmissionsFromStorage,
    averageHouseEmissionsFromRedux,
  );

  // transport
  const { footprint: transportEmissionsFromRedux, average: averageTransportEmissionsFromRedux } = useSelector(
    (state: RootState) => state.carbon.transport,
  );
  const transportEmissions = useReduxOverStorageValue(
    transportEmissionsFromStorage,
    transportEmissionsFromRedux,
  );
  const averageTransportEmissions = useReduxOverStorageValue(
    averageTransportEmissionsFromStorage,
    averageTransportEmissionsFromRedux,
  );

  // food
  const { footprint: foodEmissionsFromRedux, average: averageFoodEmissionsFromRedux } = useSelector(
    (state: RootState) => state.carbon.food,
  );
  const foodEmissions = useReduxOverStorageValue(foodEmissionsFromStorage, foodEmissionsFromRedux);
  const averageFoodEmissions = useReduxOverStorageValue(
    averageFoodEmissionsFromStorage,
    averageFoodEmissionsFromRedux,
  );

  // fly
  const { footprint: flyEmissionsFromRedux, average: averageFlyEmissionsFromRedux } = useSelector(
    (state: RootState) => state.carbon.fly,
  );
  const flyEmissions = useReduxOverStorageValue(flyEmissionsFromStorage, flyEmissionsFromRedux);
  const averageFlyEmissions = useReduxOverStorageValue(
    averageFlyEmissionsFromStorage,
    averageFlyEmissionsFromRedux,
  );

  // totalEmissions
  const [totalEmissions, setTotalEmissions] = useState<number>();
  useEffect(() => {
    if (
      houseEmissions === undefined &&
      transportEmissions === undefined &&
      foodEmissions === undefined &&
      flyEmissions === undefined
    ) {
      return;
    }
    const total =
      (houseEmissions ?? 0) + (transportEmissions ?? 0) + (foodEmissions ?? 0) + (flyEmissions ?? 0);
    setTotalEmissions(total);
  }, [houseEmissions, transportEmissions, foodEmissions, flyEmissions]);

  // UI text
  const toPct = (value: number) => {
    if (!totalEmissions) {
      return '0 %';
    }
    return `${((value * 100) / totalEmissions).toFixed(0)} %`;
  };

  const toCO2 = (value: number) => {
    return `${(value / 1000).toFixed(2).replace('.', ',')} tCO2`;
  };

  const toLegend = (value: number) => {
    return `${t('screens.carbon.average')}: ${(value / 1000).toFixed(2).replace('.', ',')} ${
      value > 1 ? t('screens.carbon.tons') : t('screens.carbon.ton')
    }`;
  };

  return (
    <ScrollView>
      <View>
        {totalEmissions === undefined ? (
          <View style={styles.textContainer}>
            <Text style={styles.instructionText}>{t('screens.carbon.instruction')}</Text>
            <Text style={styles.kpiText}>{t('screens.carbon.zeroCarbon')}</Text>
          </View>
        ) : (
          <View style={styles.graphContainer}>
            <GraphCO2 emissions={totalEmissions} />
          </View>
        )}

        <View style={styles.cardContainer}>
          <View style={styles.row}>
            {houseEmissions !== undefined && averageHouseEmissions !== undefined ? (
              <TouchCardKpi
                icon={House}
                onPress={() => handlePressNavigation(CARBON_STACK_PAGES.HOUSE)}
                data={{
                  pct: toPct(houseEmissions),
                  co2: toCO2(houseEmissions),
                  legend: toLegend(averageHouseEmissions),
                }}
              />
            ) : (
              <TouchCardKpi icon={House} onPress={() => handlePressNavigation(CARBON_STACK_PAGES.HOUSE)} />
            )}
            {transportEmissions !== undefined && averageTransportEmissions !== undefined ? (
              <TouchCardKpi
                icon={Car}
                onPress={() => handlePressNavigation(CARBON_STACK_PAGES.TRANSPORT)}
                data={{
                  pct: toPct(transportEmissions),
                  co2: toCO2(transportEmissions),
                  legend: toLegend(averageTransportEmissions),
                }}
              />
            ) : (
              <TouchCardKpi icon={Car} onPress={() => handlePressNavigation(CARBON_STACK_PAGES.TRANSPORT)} />
            )}
          </View>
          <View style={styles.row}>
            {foodEmissions !== undefined && averageFoodEmissions !== undefined ? (
              <TouchCardKpi
                icon={Food}
                onPress={() => handlePressNavigation(CARBON_STACK_PAGES.WARNING_FOOD)} //todo replace with FOOD
                data={{
                  pct: toPct(foodEmissions),
                  co2: toCO2(foodEmissions),
                  legend: toLegend(averageFoodEmissions),
                }}
              />
            ) : (
              <TouchCardKpi
                icon={Food}
                onPress={() => handlePressNavigation(CARBON_STACK_PAGES.WARNING_FOOD)}
              />
            )}
            {flyEmissions !== undefined && averageFlyEmissions !== undefined ? (
              <TouchCardKpi
                icon={Plane}
                onPress={() => handlePressNavigation(CARBON_STACK_PAGES.FLY)} //todo replace with FOOD
                data={{
                  pct: toPct(flyEmissions),
                  co2: toCO2(flyEmissions),
                  legend: toLegend(averageFlyEmissions),
                }}
              />
            ) : (
              <TouchCardKpi icon={Plane} onPress={() => handlePressNavigation(CARBON_STACK_PAGES.FLY)} />
            )}
          </View>
        </View>
      </View>
      {totalEmissions !== undefined && (
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title={t('screens.carbon.share')}
            pressed={false}
            onPress={() => {
              return;
            }}
            fixedSize
          />
        </View>
      )}
      {totalEmissions !== undefined && (
        <View style={styles.row}>
          <TouchCardText
            text={t('screens.carbon.reward')}
            onPress={() => {
              return;
            }}
          />
          <TouchCardText
            text={t('screens.carbon.method')}
            onPress={() => {
              return;
            }}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: FontNames.MartelSans_400Regular,
    color: Colors.text.darkBlue,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  kpiText: {
    fontFamily: FontNames.Roboto_400Regular,
    color: Colors.text.darkBlue,
    fontSize: 48,
    lineHeight: 63,
    textAlign: 'center',
  },
  textContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  graphContainer: {
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  cardContainer: {
    marginTop: -20,
  },
  buttonContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
});
