import { useState } from 'react';
import { StyleSheet, View, Text, Platform, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useFeatureFlag, User as ConfigCatUser } from 'configcat-react';
import { useTheme } from '@rneui/themed';

import {
  Colors,
  LongCardIcon,
  RightChevron,
  LoaderSplashScreen,
  Quiz,
  AdaptTemperature,
  RenovateHouse,
  EnergyConsumption,
  GreenEuro,
  TileKpi,
  Temperature,
  Humidity,
  CO2Output,
  TileDashboard,
  SafeScrollingView,
} from '@clean-rn/ui-mobile';

import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { IEnergyStackPages, IRoutes } from '../../../shared/presentation/types';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

const FAKE_DATA = [
  {
    kpi: '20',
    unit: 'C°',
    color: Colors.primary.grey,
    legend: 'Moyenne',
  },
  {
    kpi: '63',
    unit: '%',
    legend: 'Salon',
  },
  {
    kpi: '1235',
    unit: 'ppm',
    legend: 'Salon',
  },
];
const GreenEuros = () => {
  const { theme } = useTheme();
  return (
    <View style={styles.greenEurosContainer}>
      <Text style={theme.text.boldDarkBlue}>Total €G won: </Text>
      <Text style={[theme.text.boldDarkBlue, { color: Colors.primary.white }]}>15,82</Text>
      <View style={styles.imgContainer}>
        <Image source={GreenEuro} style={styles.greenEuroImg} />
      </View>
    </View>
  );
};

const Tiles = () => {
  return (
    <View style={styles.rowContainer}>
      <TileKpi icon={() => <Temperature width={31} height={31} />} data={FAKE_DATA[0]} />
      <TileKpi icon={() => <Humidity width={31} height={31} />} data={FAKE_DATA[1]} />
      <TileKpi icon={() => <CO2Output width={31} height={31} />} data={FAKE_DATA[2]} />
    </View>
  );
};

export const MenuEnergy = () => {
  const { t } = useTranslation();

  const { email } = useSelector((state: IRootState) => state.auth);
  const handlePressNavigation = (route: IRoutes) => {
    navigation.navigate(route as never);
  };

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  let userConfigCat: ConfigCatUser | undefined;
  if (!email) {
    userConfigCat = undefined;
  } else {
    userConfigCat = new ConfigCatUser(email.value, email.value);
  }

  const { loading: loadingEnergy } = useFeatureFlag('energy-app', false, userConfigCat);

  return loading || loadingEnergy ? (
    <LoaderSplashScreen />
  ) : (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View>
          <View style={{ marginTop: 30, marginBottom: 8 }}>
            <TileDashboard text={'Price comfort: '} kpi={1577} children={<Tiles />} />
          </View>
          <View style={styles.row}>
            <LongCardIcon
              text={t('screens.energy.menu.win-euros')}
              leftIcon={() => <Quiz />}
              rightIcon={() => (
                <RightChevron startColor={Colors.secondary.pink} endColor={Colors.primary.darkBlue} />
              )}
              onPress={() => handlePressNavigation(IEnergyStackPages.WIN_GREEN_EUROS)}
              children={<GreenEuros />}
            />
          </View>
          <View style={styles.row}>
            <LongCardIcon
              text={t('screens.energy.menu.adapt-temperature')}
              leftIcon={() => <AdaptTemperature />}
              rightIcon={() => (
                <RightChevron startColor={Colors.secondary.pink} endColor={Colors.primary.darkBlue} />
              )}
              onPress={() => handlePressNavigation(IEnergyStackPages.ADAPT_TEMPERATURE)}
            />
          </View>
          <View style={styles.row}>
            <LongCardIcon
              text={t('screens.energy.menu.renovate-my-house')}
              leftIcon={() => <RenovateHouse />}
              rightIcon={() => (
                <RightChevron startColor={Colors.secondary.pink} endColor={Colors.primary.darkBlue} />
              )}
              onPress={() => handlePressNavigation(IEnergyStackPages.RENOVATE_MY_HOUSE)}
            />
          </View>
          <View style={styles.row}>
            <LongCardIcon
              text={t('screens.energy.menu.my-energy-consumption')}
              leftIcon={() => <EnergyConsumption />}
              rightIcon={() => (
                <RightChevron startColor={Colors.secondary.pink} endColor={Colors.primary.darkBlue} />
              )}
              onPress={() => handlePressNavigation(IEnergyStackPages.MY_ENERGY_CONSUMPTION)}
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
    justifyContent: 'space-around',
    paddingVertical: 80,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 4,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  titleContainer: {
    marginTop: 16,
  },
  greenEurosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary.lightPurple,
    width: '90%',
    height: 40,
    marginVertical: 8,
    justifyContent: 'center',
    borderRadius: 8,
    marginLeft: Platform.OS === 'web' ? 20 : 0,
  },
  imgContainer: {
    marginBottom: 10,
  },
  greenEuroImg: {
    marginTop: 8,
    width: 44,
    height: 44,
  },
});
