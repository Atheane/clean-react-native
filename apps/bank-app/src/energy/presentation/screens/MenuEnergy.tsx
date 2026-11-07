import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getLocales } from 'expo-localization';
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
  EnergyConsumptionBg,
  TotalReward,
  TileKpi,
  Temperature,
  Humidity,
  CO2Output,
  TileDashboard,
  SafeScrollingView,
} from '@clean-rn/ui-mobile';

import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { IEnergyStackPages, ISharedStackPages, IRoutes } from '../../../shared/presentation/types';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { getQuiz, getConsumptions } from '../../../energy/application/commands';

const getCO2Color = (co2: number) => {
  return co2 > 6000
    ? Colors.secondary.darkRed
    : co2 > 2500
      ? Colors.secondary.red
      : co2 > 1000
        ? Colors.secondary.orange
        : co2 > 800
          ? Colors.secondary.yellow
          : co2 > 600
            ? Colors.primary.lightGreen
            : Colors.primary.darkGreen;
};

const InternalTiles = (props: {
  data: { kpi?: string; unit: string; color?: string; legend: string; loading?: boolean }[];
}) => {
  const navigation = useNavigation();
  const lang = getLocales()[0]?.languageCode || 'en';

  const url =
    lang === 'fr'
      ? 'https://www.example.com/article/bien-etre-dans-son-logement-trois-indicateurs-a-surveiller'
      : 'https://www.example.com/en/article/feeling-good-in-your-home-three-indicators-to-keep-an-eye-on';

  const { data } = props;
  if (!data || data.length === 0) {
    return <View style={styles.rowContainer} />;
  }

  const handlePressTemperature = () => {
    navigation.navigate(ISharedStackPages.MODAL_WEBVIEW as never, {
      url,
    });
  };
  const handlePressHumidity = () => {
    navigation.navigate(ISharedStackPages.MODAL_WEBVIEW as never, {
      url,
    });
  };
  const handlePressCO2 = () => {
    navigation.navigate(ISharedStackPages.MODAL_WEBVIEW as never, {
      url,
    });
  };
  return (
    <View style={styles.rowContainer}>
      <TileKpi
        icon={() => <Temperature width={31} height={31} />}
        data={{
          kpi: data[0].kpi?.toString() ?? '...',
          unit: data[0].unit,
          color: data[0].color,
          legend: data[0].legend,
        }}
        loading={data[0].loading}
        onPress={handlePressTemperature}
      />
      <TileKpi
        icon={() => <Humidity width={31} height={31} />}
        data={{
          kpi: data[1].kpi?.toString() ?? '...',
          unit: data[1].unit,
          color: data[1].color,
          legend: data[1].legend,
        }}
        loading={data[1].loading}
        onPress={handlePressHumidity}
      />
      <TileKpi
        icon={() => <CO2Output width={31} height={31} />}
        data={{
          kpi: data[2].kpi?.toString() ?? '...',
          unit: data[2].unit,
          color: data[2].color,
          legend: data[2].legend,
        }}
        loading={data[2].loading}
        onPress={handlePressCO2}
      />
    </View>
  );
};

const ExternalTiles = (props: {
  data: { kpi?: string; unit: string; color?: string; legend: string; loading?: boolean }[];
}) => {
  const { data } = props;
  if (!data || data.length === 0) {
    return <View style={styles.rowContainer} />;
  }
  return (
    <View style={styles.rowContainer}>
      <TileKpi
        icon={() => <Temperature width={31} height={31} />}
        data={{
          kpi: data[0].kpi?.toString() ?? '...',
          unit: data[0].unit,
          color: data[0].color,
          legend: data[0].legend,
        }}
        loading={data[0].loading}
        backgroundColor={Colors.primary.white}
      />
      <TileKpi
        icon={() => <Humidity width={31} height={31} />}
        data={{
          kpi: data[1].kpi?.toString() ?? '...',
          unit: data[1].unit,
          color: data[1].color,
          legend: data[1].legend,
        }}
        loading={data[1].loading}
        backgroundColor={Colors.primary.white}
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

  const internalData = useMemo(() => {
    const hasTemperatureSensor = energy?.properties?.sensors?.some(
      (sensor) => sensor.type === SENSOR_TYPE.TEMPERATURE,
    );
    const hasHumiditySensor = energy?.properties?.sensors?.some(
      (sensor) => sensor.type === SENSOR_TYPE.HUMIDITY,
    );
    const hasCO2Sensor = energy?.properties?.sensors?.some((sensor) => sensor.type === SENSOR_TYPE.CO2);
    if (!hasTemperatureSensor && !hasHumiditySensor && !hasCO2Sensor) {
      return [];
    }
    const temperature = parseFloat(energy?.properties?.measurements?.[SENSOR_TYPE.TEMPERATURE]?.value ?? '0');
    const humidity = parseFloat(energy?.properties?.measurements?.[SENSOR_TYPE.HUMIDITY]?.value ?? '0');
    const co2 = parseFloat(energy?.properties?.measurements?.[SENSOR_TYPE.CO2]?.value ?? '0');
    return [
      {
        kpi: temperature,
        unit: 'C°',
        legend: t('screens.energy.menu.average'),
        color: Colors.primary.grey,
        loading:
          hasTemperatureSensor && energy?.properties?.measurements?.[SENSOR_TYPE.TEMPERATURE] === undefined,
      },
      {
        kpi: humidity,
        unit: '%',
        legend: t('screens.energy.menu.average'),
        color: humidity > 60 ? Colors.secondary.orange : Colors.primary.darkGreen,
        loading: hasHumiditySensor && energy?.properties?.measurements?.[SENSOR_TYPE.HUMIDITY] === undefined,
      },
      {
        kpi: co2,
        unit: 'ppm',
        legend: t('screens.energy.menu.average'),
        color: getCO2Color(co2),
        loading: hasCO2Sensor && energy?.properties?.measurements?.[SENSOR_TYPE.CO2] === undefined,
      },
    ];
  }, [energy?.properties?.sensors, energy?.properties?.measurements, t]);

  const externalData = useMemo(() => {
    const hasTemperatureSensor = energy?.properties?.sensors?.some(
      (sensor) => sensor.type === SENSOR_TYPE.TEMPERATURE_EXT,
    );
    const hasHumiditySensor = energy?.properties?.sensors?.some(
      (sensor) => sensor.type === SENSOR_TYPE.HUMIDITY_EXT,
    );
    const temperature = energy?.properties?.measurements?.[SENSOR_TYPE.TEMPERATURE_EXT]?.value;
    const humidity = energy?.properties?.measurements?.[SENSOR_TYPE.HUMIDITY_EXT]?.value;
    return [
      {
        kpi: temperature,
        unit: 'C°',
        legend: t('screens.energy.menu.average'),
        color: Colors.primary.grey,
        loading:
          hasTemperatureSensor &&
          energy?.properties?.measurements?.[SENSOR_TYPE.TEMPERATURE_EXT] === undefined,
      },
      {
        kpi: humidity,
        unit: '%',
        legend: t('screens.energy.menu.average'),
        color: Colors.primary.grey,
        loading:
          hasHumiditySensor && energy?.properties?.measurements?.[SENSOR_TYPE.HUMIDITY_EXT] === undefined,
      },
    ];
  }, [energy?.properties?.sensors, energy?.properties?.measurements, t]);

  const handleWinGreenEuros = () => {
    dispatch(getQuiz());
    handlePressNavigation(IEnergyStackPages.WIN_GREEN_EUROS);
  };

  const handlePressConsumptions = () => {
    dispatch(getConsumptions());
    handlePressNavigation(IEnergyStackPages.MY_ENERGY_CONSUMPTION);
  };

  return loadingConfigcat ? (
    <LoaderSplashScreen />
  ) : (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={{ marginTop: 30, marginBottom: 8 }}>
            <TileDashboard
              text={t('screens.energy.menu.price-comfort')}
              kpi={
                energy?.properties?.globalPriceComfort === undefined
                  ? '...'
                  : (energy?.properties?.globalPriceComfort?.value?.average?.toString() as string)
              }
              children={externalData.length > 0 ? <ExternalTiles data={externalData} /> : null}
              loading={energy?.properties.globalPriceComfort === null}
              title={t('screens.energy.menu.external')}
              external
            />
          </View>
          <View style={{ marginTop: 30, marginBottom: 8 }}>
            <TileDashboard
              text={t('screens.energy.menu.price-comfort')}
              kpi={
                energy?.properties?.globalPriceComfort === undefined
                  ? '...'
                  : (energy?.properties?.globalPriceComfort?.value?.average?.toString() as string)
              }
              children={internalData.length > 0 ? <InternalTiles data={internalData} /> : null}
              loading={energy?.properties.globalPriceComfort === null}
              title={t('screens.energy.menu.internal')}
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
              leftIcon={() => <EnergyConsumptionBg />}
              rightIcon={() => (
                <RightChevron startColor={Colors.secondary.pink} endColor={Colors.primary.darkBlue} />
              )}
              onPress={handlePressConsumptions}
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
    paddingBottom: 40,
    backgroundColor: Colors.primary.darkWhite,
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
