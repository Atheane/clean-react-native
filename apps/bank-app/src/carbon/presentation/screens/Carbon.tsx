import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ImageSourcePropType } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import {
  Car,
  Food,
  HouseCarbon,
  Plane,
  PrimaryButton,
  TouchCardKpi,
  GraphCO2,
  TouchCardText,
  Colors,
  FontNames,
  useHideBottomBar,
  useReduxOverStorageValue,
} from '@clean-rn/ui-mobile';
import { IBANKCategories } from '@clean-rn/carbon/domain';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRoutes, ICarbonStackPages } from '../../../shared/presentation/types';

import {
  HeaderBad,
  HeaderChampion,
  HeaderCop21,
  HeaderFrance,
  BilanBadFR,
  BilanBadEN,
  BilanChampionFR,
  BilanChampionEN,
  BilanCop21FR,
  BilanCop21EN,
  BilanFranceFR,
  BilanFranceEN,
} from '../assets/images';

export const Carbon = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const handlePressNavigation = (route: IRoutes) => {
    navigation.navigate(route as never);
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
  } = useSelector((state: IRootState) => state.initialization);

  // house
  const { footprint: houseEmissionsFromRedux, average: averageHouseEmissionsFromRedux } = useSelector(
    (state: IRootState) => state.carbon.house,
  );
  const houseEmissions = useReduxOverStorageValue(houseEmissionsFromStorage, houseEmissionsFromRedux);
  const averageHouseEmissions = useReduxOverStorageValue(
    averageHouseEmissionsFromStorage,
    averageHouseEmissionsFromRedux,
  );

  // transport
  const { footprint: transportEmissionsFromRedux, average: averageTransportEmissionsFromRedux } = useSelector(
    (state: IRootState) => state.carbon.transport,
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
    (state: IRootState) => state.carbon.food,
  );
  const foodEmissions = useReduxOverStorageValue(foodEmissionsFromStorage, foodEmissionsFromRedux);
  const averageFoodEmissions = useReduxOverStorageValue(
    averageFoodEmissionsFromStorage,
    averageFoodEmissionsFromRedux,
  );

  // fly
  const { footprint: flyEmissionsFromRedux, average: averageFlyEmissionsFromRedux } = useSelector(
    (state: IRootState) => state.carbon.fly,
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

  const Cards = () => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.row}>
          {houseEmissions !== undefined && averageHouseEmissions !== undefined ? (
            <TouchCardKpi
              icon={HouseCarbon}
              onPress={() => handlePressNavigation(ICarbonStackPages.HOUSE)}
              data={{
                pct: toPct(houseEmissions),
                co2: toCO2(houseEmissions),
                legend: toLegend(averageHouseEmissions),
              }}
            />
          ) : (
            <TouchCardKpi icon={HouseCarbon} onPress={() => handlePressNavigation(ICarbonStackPages.HOUSE)} />
          )}
          {transportEmissions !== undefined && averageTransportEmissions !== undefined ? (
            <TouchCardKpi
              icon={Car}
              onPress={() => handlePressNavigation(ICarbonStackPages.TRANSPORT)}
              data={{
                pct: toPct(transportEmissions),
                co2: toCO2(transportEmissions),
                legend: toLegend(averageTransportEmissions),
              }}
            />
          ) : (
            <TouchCardKpi icon={Car} onPress={() => handlePressNavigation(ICarbonStackPages.TRANSPORT)} />
          )}
        </View>
        <View style={styles.row}>
          {foodEmissions !== undefined && averageFoodEmissions !== undefined ? (
            <TouchCardKpi
              icon={Food}
              onPress={() => handlePressNavigation(ICarbonStackPages.WARNING_FOOD)} //todo replace with FOOD
              data={{
                pct: toPct(foodEmissions),
                co2: toCO2(foodEmissions),
                legend: toLegend(averageFoodEmissions),
              }}
            />
          ) : (
            <TouchCardKpi icon={Food} onPress={() => handlePressNavigation(ICarbonStackPages.WARNING_FOOD)} />
          )}
          {flyEmissions !== undefined && averageFlyEmissions !== undefined ? (
            <TouchCardKpi
              icon={Plane}
              onPress={() => handlePressNavigation(ICarbonStackPages.FLY)} //todo replace with FOOD
              data={{
                pct: toPct(flyEmissions),
                co2: toCO2(flyEmissions),
                legend: toLegend(averageFlyEmissions),
              }}
            />
          ) : (
            <TouchCardKpi icon={Plane} onPress={() => handlePressNavigation(ICarbonStackPages.FLY)} />
          )}
        </View>
      </View>
    );
  };

  if (totalEmissions === undefined) {
    return (
      <ErrorBoundary t={t}>
        <SafeScrollingView fixedHeight>
          <View>
            <View style={styles.textContainer}>
              <Text style={styles.instructionText}>{t('screens.carbon.instruction')}</Text>
              <View style={styles.kpiContainer}>
                <Text style={styles.kpiText}>{t('screens.carbon.zero-carbon')}</Text>
              </View>
            </View>
            <Cards />
          </View>
        </SafeScrollingView>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <>
          <View>
            <View style={styles.graphContainer}>
              <GraphCO2
                headers={
                  {
                    [IBANKCategories.BAD]: HeaderBad as ImageSourcePropType,
                    [IBANKCategories.FRANCE]: HeaderFrance as ImageSourcePropType,
                    [IBANKCategories.CHAMPION]: HeaderChampion as ImageSourcePropType,
                    [IBANKCategories.COP21]: HeaderCop21 as ImageSourcePropType,
                  } as { [key: string]: ImageSourcePropType }
                }
                bilans={{
                  FR: {
                    [IBANKCategories.BAD]: BilanBadFR as ImageSourcePropType,
                    [IBANKCategories.FRANCE]: BilanFranceFR as ImageSourcePropType,
                    [IBANKCategories.CHAMPION]: BilanChampionFR as ImageSourcePropType,
                    [IBANKCategories.COP21]: BilanCop21FR as ImageSourcePropType,
                  } as { [key: string]: ImageSourcePropType },
                  GB: {
                    [IBANKCategories.BAD]: BilanBadEN as ImageSourcePropType,
                    [IBANKCategories.FRANCE]: BilanFranceEN as ImageSourcePropType,
                    [IBANKCategories.CHAMPION]: BilanChampionEN as ImageSourcePropType,
                    [IBANKCategories.COP21]: BilanCop21EN as ImageSourcePropType,
                  } as { [key: string]: ImageSourcePropType },
                  US: {
                    [IBANKCategories.BAD]: BilanBadEN as ImageSourcePropType,
                    [IBANKCategories.FRANCE]: BilanFranceEN as ImageSourcePropType,
                    [IBANKCategories.CHAMPION]: BilanChampionEN as ImageSourcePropType,
                    [IBANKCategories.COP21]: BilanCop21EN as ImageSourcePropType,
                  } as { [key: string]: ImageSourcePropType },
                }}
                emissions={totalEmissions}
              />
            </View>

            <Cards />
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={t('screens.carbon.share')}
              onPress={() => {
                return;
              }}
              long
            />
          </View>

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
        </>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: FontNames.MartelSans_400Regular,
    color: Colors.bank.primary.darkBlue,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  kpiText: {
    fontFamily: FontNames.Roboto_400Regular,
    color: Colors.bank.primary.darkBlue,
    fontSize: 48,
    lineHeight: 63,
    textAlign: 'center',
  },
  textContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  kpiContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  graphContainer: {
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 15,
  },
  cardContainer: {
    marginTop: -20,
  },
  buttonContainer: {
    marginVertical: 40,
    alignItems: 'center',
  },
});
