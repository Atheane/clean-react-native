import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, ImageSourcePropType } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useFeatureFlag, User as ConfigCatUser } from 'configcat-react';

import { DomainEventManager } from '@clean-rn/ddd';
import { FOOTPRINT_EVENTS } from '@clean-rn/footprint/domain';
import {
  Colors,
  LongCardIcon,
  Carbon,
  RightChevron,
  LoaderSplashScreen,
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
  GraphCO2,
  useReduxOverStorageValue,
  SafeScrollingView,
} from '@clean-rn/ui-mobile';
import { IBANKCategories } from '@clean-rn/footprint/domain';

import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { IFootprintStackPages, IRoutes } from '../../../shared/presentation/types';
import { CardPremium, CardCarbonFootPrint } from '../../../shared/presentation/assets/svg';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { getHouse, getTransport, getFootprint } from '../../../footprint/application/commands';

export const MenuFootprint = () => {
  const { t } = useTranslation();

  const { email } = useSelector((state: IRootState) => state.auth);
  const handlePressNavigation = (route: IRoutes) => {
    navigation.navigate(route as never);
  };

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const handleMenuPrimeum = () => {
    dispatch(getHouse());
    dispatch(getTransport());
    dispatch(getFootprint());
    setLoading(true);
  };

  const navigation = useNavigation();

  const [eventsReceived, setEventsReceived] = useState<{ [key in FOOTPRINT_EVENTS]?: boolean }>({
    [FOOTPRINT_EVENTS.HOUSE_CREATED]: false,
    [FOOTPRINT_EVENTS.TRANSPORT_CREATED]: false,
    [FOOTPRINT_EVENTS.FOOTPRINT_CREATED]: false,
  });

  const handleDomainEvents = useCallback((eventType: FOOTPRINT_EVENTS) => {
    setEventsReceived((prev) => ({
      ...prev,
      [eventType]: true,
    }));
  }, []);

  useEffect(() => {
    if (
      eventsReceived[FOOTPRINT_EVENTS.HOUSE_CREATED] &&
      eventsReceived[FOOTPRINT_EVENTS.TRANSPORT_CREATED]
    ) {
      setLoading(false);
      navigation.navigate(IFootprintStackPages.MENU_PRIMEUM as never);
      setEventsReceived({
        [FOOTPRINT_EVENTS.HOUSE_CREATED]: false,
        [FOOTPRINT_EVENTS.TRANSPORT_CREATED]: false,
        [FOOTPRINT_EVENTS.FOOTPRINT_CREATED]: false,
      });
    }
  }, [eventsReceived, navigation]);

  useEffect(() => {
    const domainEventManager = DomainEventManager.getInstance();
    const handleHouseCreated = () => handleDomainEvents(FOOTPRINT_EVENTS.HOUSE_CREATED);
    const handleTransportCreated = () => handleDomainEvents(FOOTPRINT_EVENTS.TRANSPORT_CREATED);
    const handleFootprintCreated = () => handleDomainEvents(FOOTPRINT_EVENTS.FOOTPRINT_CREATED);

    domainEventManager.on(FOOTPRINT_EVENTS.HOUSE_CREATED, handleHouseCreated);
    domainEventManager.on(FOOTPRINT_EVENTS.TRANSPORT_CREATED, handleTransportCreated);
    domainEventManager.on(FOOTPRINT_EVENTS.FOOTPRINT_CREATED, handleFootprintCreated);

    return () => {
      domainEventManager.off(FOOTPRINT_EVENTS.HOUSE_CREATED, handleHouseCreated);
      domainEventManager.off(FOOTPRINT_EVENTS.TRANSPORT_CREATED, handleTransportCreated);
      domainEventManager.off(FOOTPRINT_EVENTS.FOOTPRINT_CREATED, handleFootprintCreated);
    };
  }, [handleDomainEvents]);

  let userConfigCat: ConfigCatUser | undefined;
  if (!email) {
    userConfigCat = undefined;
  } else {
    userConfigCat = new ConfigCatUser(email.value, email.value);
  }

  const { loading: loadingLegacy } = useFeatureFlag('bank-legacy', false, userConfigCat);

  // totalEmissions
  //storage
  const {
    house: { footprint: houseEmissionsFromStorage },
    transport: { footprint: transportEmissionsFromStorage },
    food: { footprint: foodEmissionsFromStorage },
    fly: { footprint: flyEmissionsFromStorage },
  } = useSelector((state: IRootState) => state.initialization.carbon);

  // house
  const { footprint: houseEmissionsFromRedux } = useSelector(
    (state: IRootState) => state.footprint.estimate.house,
  );
  const houseEmissions = useReduxOverStorageValue(houseEmissionsFromStorage, houseEmissionsFromRedux);

  // transport
  const { footprint: transportEmissionsFromRedux } = useSelector(
    (state: IRootState) => state.footprint.estimate.transport,
  );
  const transportEmissions = useReduxOverStorageValue(
    transportEmissionsFromStorage,
    transportEmissionsFromRedux,
  );

  // food
  const { footprint: foodEmissionsFromRedux } = useSelector(
    (state: IRootState) => state.footprint.estimate.food,
  );
  const foodEmissions = useReduxOverStorageValue(foodEmissionsFromStorage, foodEmissionsFromRedux);

  // fly
  const { footprint: flyEmissionsFromRedux } = useSelector(
    (state: IRootState) => state.footprint.estimate.fly,
  );
  const flyEmissions = useReduxOverStorageValue(flyEmissionsFromStorage, flyEmissionsFromRedux);

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

  return loading || loadingLegacy ? (
    <LoaderSplashScreen />
  ) : (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={styles.row}>
            <LongCardIcon
              text={t('screens.menu-footprint.2min')}
              leftIcon={() => (
                <Carbon
                  color={Colors.primary.lightGreen}
                  startColor={Colors.primary.grey}
                  endColor={Colors.primary.grey}
                />
              )}
              rightIcon={() => <RightChevron color={Colors.primary.lightGreen} />}
              onPress={() => handlePressNavigation(IFootprintStackPages.FOOTPRINT_ESTIMATION)}
              children={
                totalEmissions !== undefined ? (
                  <GraphCO2
                    small
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
                ) : undefined
              }
            />
          </View>
          <View style={styles.row}>
            <LongCardIcon
              text={t('screens.menu-footprint.my-reward')}
              leftIcon={() => <CardPremium />}
              rightIcon={() => <RightChevron color={Colors.primary.lightGreen} />}
              onPress={handleMenuPrimeum}
            />
          </View>
          <View style={styles.row}>
            <LongCardIcon
              text={t('screens.menu-footprint.my-emissions')}
              leftIcon={() => <CardCarbonFootPrint />}
              rightIcon={() => <RightChevron color={Colors.primary.lightGreen} />}
              onPress={() => handlePressNavigation(IFootprintStackPages.EVOLUTION_FOOTPRINT)}
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
    marginBottom: 100,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
});
