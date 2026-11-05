import { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useFeatureFlag, User as ConfigCatUser } from 'configcat-react';
import { SENSOR_TYPE } from '@clean-rn/energy/domain';
import {
  Colors,
  LongCardIcon,
  RightChevron,
  LoaderSplashScreen,
  Quiz,
  AdaptTemperature,
  RenovateHouse,
  EnergyConsumption,
  TotalReward,
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
import { fetchRefresh } from '../../../auth/application/commands';
import { getQuiz } from '../../../energy/application/commands';

const Tiles = (props: {
  data: { kpi?: string; unit: string; color?: string; legend: string; loading: boolean }[];
}) => {
  const { data } = props;
  if (!data || data.length === 0) {
    return <View style={styles.rowContainer} />;
  }

  return (
    <View style={styles.rowContainer}>
      <TileKpi
        icon={() => <Temperature width={31} height={31} />}
        data={{ kpi: data[0].kpi, unit: data[0].unit, color: data[0].color, legend: data[0].legend }}
        loading={data[0].loading}
      />
      <TileKpi
        icon={() => <Humidity width={31} height={31} />}
        data={{ kpi: data[1].kpi, unit: data[1].unit, color: data[1].color, legend: data[1].legend }}
        loading={data[1].loading}
      />
      <TileKpi
        icon={() => <CO2Output width={31} height={31} />}
        data={{ kpi: data[2].kpi, unit: data[2].unit, color: data[2].color, legend: data[2].legend }}
        loading={data[2].loading}
      />
    </View>
  );
};

export const MenuEnergy = () => {
  const { t } = useTranslation();

  const { email } = useSelector((state: IRootState) => state.auth);
  const handlePressNavigation = (route: IRoutes) => {
    navigation.navigate(route as never);
  };

  const navigation = useNavigation();

  let userConfigCat: ConfigCatUser | undefined;
  if (!email) {
    userConfigCat = undefined;
  } else {
    userConfigCat = new ConfigCatUser(email.value, email.value);
  }

  const { loading: loadingConfigcat } = useFeatureFlag('energy-app', false, userConfigCat);
  const { energy } = useSelector((state: IRootState) => state.energy);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRefresh());
  }, [dispatch]);

  const data = useMemo(() => {
    return [
      {
        kpi: energy?.properties?.measurements?.[SENSOR_TYPE.TEMPERATURE]?.value.toString(),
        unit: 'C°',
        legend: t('screens.energy.menu.average'),
        color: Colors.primary.grey,
        loading: energy?.properties?.measurements?.[SENSOR_TYPE.TEMPERATURE] === undefined,
      },
      {
        kpi: energy?.properties?.measurements?.[SENSOR_TYPE.HUMIDITY]?.value.toString(),
        unit: '%',
        legend: t('screens.energy.menu.average'),
        color: Colors.primary.lightGreen,
        loading: energy?.properties?.measurements?.[SENSOR_TYPE.HUMIDITY] === undefined,
      },
      {
        kpi: energy?.properties?.measurements?.[SENSOR_TYPE.CO2]?.value.toString(),
        unit: 'ppm',
        legend: t('screens.energy.menu.average'),
        color: Colors.primary.lightGreen,
        loading: energy?.properties?.measurements?.[SENSOR_TYPE.CO2] === undefined,
      },
    ];
  }, [energy?.properties?.measurements, t]);

  const priceComfort = useMemo(() => {
    return energy?.properties?.globalPriceComfort?.value?.average?.toString() ?? '...';
  }, [energy?.properties?.globalPriceComfort]);

  const handleWinGreenEuros = () => {
    dispatch(getQuiz());
    handlePressNavigation(IEnergyStackPages.WIN_GREEN_EUROS);
  };

  return loadingConfigcat ? (
    <LoaderSplashScreen />
  ) : (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View>
          <View style={{ marginTop: 30, marginBottom: 8 }}>
            <TileDashboard
              text={t('screens.energy.menu.price-comfort')}
              kpi={priceComfort}
              children={<Tiles data={data} />}
            />
          </View>
          <View style={styles.row}>
            <LongCardIcon
              text={t('screens.energy.menu.win-euros')}
              leftIcon={() => <Quiz />}
              rightIcon={() => (
                <RightChevron startColor={Colors.secondary.pink} endColor={Colors.primary.darkBlue} />
              )}
              onPress={handleWinGreenEuros}
              children={
                <TotalReward
                  totalRewards={energy?.properties.totalRewards ?? 0}
                  title={t('screens.energy.menu.total-green-euros')}
                  loading={energy?.properties.totalRewards === undefined}
                />
              }
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
});
