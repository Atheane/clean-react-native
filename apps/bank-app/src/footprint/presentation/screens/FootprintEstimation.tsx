import { useEffect, useState, useCallback, useRef } from 'react';
import { StyleSheet, View, Text, ImageSourcePropType, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getLocales } from 'expo-localization';
import { useTheme } from '@rneui/themed';

import {
  Car,
  Food,
  HouseCarbon,
  Plane,
  TouchCardKpi,
  GraphCO2,
  Colors,
  FontNames,
  useReduxOverStorageValue,
  PrimaryButton,
  NEEDS_SMALL_TEXT,
} from '@clean-rn/ui-mobile';
import { IBANKCategories } from '@clean-rn/footprint/domain';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRoutes, IFootprintStackPages, ISharedStackPages } from '../../../shared/presentation/types';
import { CardPremium, CardCarbonFootPrint } from '../../../shared/presentation/assets/svg';
import { SUPPORTED_LANGUAGES_WEBSITE } from '../../../shared/presentation/constants';

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

import { URL_CO2_COMPUTATION_FR, URL_CO2_COMPUTATION_EN, URL_CO2_REWARD } from '../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const locales = getLocales();
const HEIGHT = Dimensions.get('window').height;

export const FootprintEstimation = () => {
  const { theme } = useTheme();

  const { t } = useTranslation();

  const navigation = useNavigation();
  const handlePressNavigation = (route: IRoutes) => {
    navigation.navigate(route as never);
  };

  //storage
  const {
    house: { footprint: houseEmissionsFromStorage, average: averageHouseEmissionsFromStorage },
    transport: { footprint: transportEmissionsFromStorage, average: averageTransportEmissionsFromStorage },
    food: { footprint: foodEmissionsFromStorage, average: averageFoodEmissionsFromStorage },
    fly: { footprint: flyEmissionsFromStorage, average: averageFlyEmissionsFromStorage },
  } = useSelector((state: IRootState) => state.initialization.carbon);

  // house
  const { footprint: houseEmissionsFromRedux, average: averageHouseEmissionsFromRedux } = useSelector(
    (state: IRootState) => state.footprint.estimate.house,
  );
  const houseEmissions = useReduxOverStorageValue(houseEmissionsFromStorage, houseEmissionsFromRedux);
  const averageHouseEmissions = useReduxOverStorageValue(
    averageHouseEmissionsFromStorage,
    averageHouseEmissionsFromRedux,
  );

  // transport
  const { footprint: transportEmissionsFromRedux, average: averageTransportEmissionsFromRedux } = useSelector(
    (state: IRootState) => state.footprint.estimate.transport,
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
    (state: IRootState) => state.footprint.estimate.food,
  );
  const foodEmissions = useReduxOverStorageValue(foodEmissionsFromStorage, foodEmissionsFromRedux);
  const averageFoodEmissions = useReduxOverStorageValue(
    averageFoodEmissionsFromStorage,
    averageFoodEmissionsFromRedux,
  );

  // fly
  const { footprint: flyEmissionsFromRedux, average: averageFlyEmissionsFromRedux } = useSelector(
    (state: IRootState) => state.footprint.estimate.fly,
  );
  const flyEmissions = useReduxOverStorageValue(flyEmissionsFromStorage, flyEmissionsFromRedux);
  const averageFlyEmissions = useReduxOverStorageValue(
    averageFlyEmissionsFromStorage,
    averageFlyEmissionsFromRedux,
  );

  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  // scroll to top
  useFocusEffect(
    useCallback(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToPosition(0, 0, true);
      }
    }, []),
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

  //handle premium
  const handleOnPressPremium = useCallback(() => {
    navigation.navigate(ISharedStackPages.MODAL_WEBVIEW, { uid: URL_CO2_REWARD });
  }, [navigation]);
  // handle learn more

  let lng = locales[0]?.languageCode ?? 'fr';
  if (!SUPPORTED_LANGUAGES_WEBSITE.includes(lng)) {
    lng = 'fr';
  }

  const handleOnPressLearnMore = useCallback(() => {
    navigation.navigate(ISharedStackPages.MODAL_WEBVIEW, {
      uid: lng === 'en' ? URL_CO2_COMPUTATION_EN : URL_CO2_COMPUTATION_FR, //todo when other lng are displayed, update this
    });
  }, [navigation, lng]);

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
    return `${t('screens.footprint-estimation.average')}: ${(value / 1000).toFixed(2).replace('.', ',')} ${
      value > 1 ? t('screens.footprint-estimation.tons') : t('screens.footprint-estimation.ton')
    }`;
  };

  const CardHouse = () => {
    return houseEmissions !== undefined && averageHouseEmissions !== undefined ? (
      <TouchCardKpi
        icon={HouseCarbon}
        onPress={() => handlePressNavigation(IFootprintStackPages.HEATER_FOOTPRINT_ESTIMATION)}
        data={{
          pct: toPct(houseEmissions),
          co2: toCO2(houseEmissions),
          legend: toLegend(averageHouseEmissions),
        }}
      />
    ) : (
      <TouchCardKpi
        icon={HouseCarbon}
        onPress={() => handlePressNavigation(IFootprintStackPages.HEATER_FOOTPRINT_ESTIMATION)}
      />
    );
  };

  const CardTransport = () => {
    return transportEmissions !== undefined && averageTransportEmissions !== undefined ? (
      <TouchCardKpi
        icon={Car}
        onPress={() => handlePressNavigation(IFootprintStackPages.TRANSPORT_FOOTPRINT_ESTIMATION)}
        data={{
          pct: toPct(transportEmissions),
          co2: toCO2(transportEmissions),
          legend: toLegend(averageTransportEmissions),
        }}
      />
    ) : (
      <TouchCardKpi
        icon={Car}
        onPress={() => handlePressNavigation(IFootprintStackPages.TRANSPORT_FOOTPRINT_ESTIMATION)}
      />
    );
  };

  const CardFood = () => {
    return foodEmissions !== undefined && averageFoodEmissions !== undefined ? (
      <TouchCardKpi
        icon={Food}
        onPress={() => handlePressNavigation(IFootprintStackPages.FOOD_FOOTPRINT_ESTIMATION)} //todo replace with FOOD
        data={{
          pct: toPct(foodEmissions),
          co2: toCO2(foodEmissions),
          legend: toLegend(averageFoodEmissions),
        }}
      />
    ) : (
      <TouchCardKpi
        icon={Food}
        onPress={() => handlePressNavigation(IFootprintStackPages.WARNING_FOOD_FOOTPRINT_ESTIMATION)}
      />
    );
  };

  const CardFly = () => {
    return flyEmissions !== undefined && averageFlyEmissions !== undefined ? (
      <TouchCardKpi
        icon={Plane}
        onPress={() => handlePressNavigation(IFootprintStackPages.FLY_FOOTPRINT_ESTIMATION)} //todo replace with FOOD
        data={{
          pct: toPct(flyEmissions),
          co2: toCO2(flyEmissions),
          legend: toLegend(averageFlyEmissions),
        }}
      />
    ) : (
      <TouchCardKpi
        icon={Plane}
        onPress={() => handlePressNavigation(IFootprintStackPages.FLY_FOOTPRINT_ESTIMATION)}
      />
    );
  };

  const Cards = () => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.row}>
          <CardHouse />
          <CardTransport />
        </View>
        <View style={styles.row}>
          <CardFood />
          <CardFly />
        </View>
      </View>
    );
  };

  if (totalEmissions === undefined) {
    return (
      <ErrorBoundary t={t}>
        <SafeScrollingView ref={scrollViewRef}>
          <View style={[styles.container, theme.container.centeredItem, { height: HEIGHT, marginTop: -80 }]}>
            <View style={styles.textContainer}>
              <Text style={theme.text.darkBlue}>{t('screens.footprint-estimation.instruction')}</Text>
              <View style={styles.kpiContainer}>
                <Text style={styles.kpiText}>{t('screens.footprint-estimation.zero-carbon')}</Text>
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
      <SafeScrollingView ref={scrollViewRef}>
        <View style={[styles.container, theme.container.centeredItem]}>
          <View collapsable={false}>
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
            <View style={[styles.row, { marginVertical: 40 }]}>
              <PrimaryButton
                long
                title={t('screens.footprint-estimation.take-action')}
                onPress={() => handlePressNavigation(IFootprintStackPages.MENU_PRIMEUM)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <TouchCardKpi
              data={{
                text: t('screens.footprint-estimation.reward'),
              }}
              icon={() => (
                <View style={{ margin: -15 }}>
                  <CardPremium width={60} height={60} />
                </View>
              )}
              onPress={handleOnPressPremium}
            />
            <TouchCardKpi
              data={{
                text: t('screens.footprint-estimation.method'),
              }}
              icon={() => (
                <View style={{ margin: -15 }}>
                  <CardCarbonFootPrint width={60} height={60} />
                </View>
              )}
              onPress={handleOnPressLearnMore}
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
    backgroundColor: Colors.primary.white,
  },
  instructionText: {
    fontFamily: FontNames.MartelSans_400Regular,
    color: Colors.primary.darkBlue,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  kpiText: {
    fontFamily: FontNames.Roboto_400Regular,
    color: Colors.primary.darkBlue,
    fontSize: NEEDS_SMALL_TEXT ? 40 : 48,
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
  titleContainer: {
    alignItems: 'center',
  },
  shareTitle: {
    fontFamily: FontNames.MartelSans_600SemiBold,
    color: Colors.primary.darkBlue,
    fontSize: 24,
  },
});
