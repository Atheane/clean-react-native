import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useFeatureFlag, User as ConfigCatUser } from 'configcat-react';

import { DomainEventManager } from '@clean-rn/ddd';
import { FOOTPRINT_EVENTS } from '@clean-rn/footprint/domain';
import { Colors, LongCardIcon, Carbon, RightChevron, LoaderSplashScreen } from '@clean-rn/ui-mobile';

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

  return loading || loadingLegacy ? (
    <LoaderSplashScreen />
  ) : (
    <ErrorBoundary t={t}>
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
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    justifyContent: 'space-around',
    paddingVertical: 80,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 16,
  },
  titleContainer: {
    marginTop: 16,
  },
});
