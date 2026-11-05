import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { SvgProps } from 'react-native-svg';
import { useTranslation } from 'react-i18next';
import {
  Colors,
  FontNames,
  SwitchButton,
  Winter,
  Summer,
  WinterHouse,
  SummerHouse,
  TemperatureCard,
  InfoCard,
  SnowFlake,
  AdaptTemperatureCard,
} from '@clean-rn/ui-mobile';
import { ErrorBoundary } from '../../../shared/presentation/hoc/ErrorBoundary';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
type IData = { key: string; value: string; icon?: React.ComponentType<SvgProps> };

export const AdaptTemperature = () => {
  const { t } = useTranslation();

  const { energy } = useSelector((state: IRootState) => state.energy);

  const [selectedOption, setSelectedOption] = useState<IData>({
    key: 'winter',
    value: t('screens.energy.adapt-temperature.winter'),
  });

  const handleOnToggle = (option: IData) => {
    setSelectedOption(option);
  };

  const [degree, setDegree] = useState(1);
  const [price, setPrice] = useState<number | null>(null);
  const [priceComfort, setPriceComfort] = useState<number | null>(null);
  const [kwh, setKwh] = useState<number | null>(null);

  const handleOnPlusPress = () => {
    setDegree(degree + 1);
  };

  const handleOnMinusPress = () => {
    setDegree(degree - 1);
  };

  useEffect(() => {
    if (selectedOption?.key === 'winter' && energy?.properties.heatingPriceComfort?.value) {
      setPriceComfort(energy.properties.heatingPriceComfort.value.average);
      setKwh(energy.properties.heatingPriceComfort.value.incremental);
      setPrice(energy.properties.heatingPriceComfort.value.incremental * 0.15);
    } else if (selectedOption?.key === 'summer' && energy?.properties.coolingPriceComfort?.value) {
      setPriceComfort(energy.properties.coolingPriceComfort.value.average);
      setKwh(energy.properties.coolingPriceComfort.value.incremental);
      setPrice(energy.properties.coolingPriceComfort.value.incremental * 0.15);
    } else {
      setPriceComfort(null);
      setKwh(null);
      setPrice(null);
    }
  }, [energy, selectedOption, degree]);

  return (
    <ErrorBoundary t={t}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.contentContainer}>
            <View style={styles.switchButtonContainer}>
              <SwitchButton
                options={[
                  {
                    key: 'winter',
                    value: t('screens.energy.adapt-temperature.winter'),
                    icon: Winter as React.ComponentType<SvgProps>,
                  },
                  {
                    key: 'summer',
                    value: t('screens.energy.adapt-temperature.summer'),
                    icon: Summer as React.ComponentType<SvgProps>,
                  },
                ]}
                onToggle={handleOnToggle}
              />
            </View>
            <View
              style={[
                styles.titleContainer,
                selectedOption?.key === 'winter' ? { marginTop: 40 } : { marginTop: 20 },
              ]}
            >
              {selectedOption?.key === 'winter' && <WinterHouse style={{ marginBottom: 10 }} />}
              {selectedOption?.key === 'summer' && <SummerHouse style={{ marginLeft: 20, marginTop: 20 }} />}
              <Text style={[styles.title, selectedOption?.key === 'summer' && { marginRight: 20 }]}>
                {selectedOption?.key === 'winter'
                  ? t('screens.energy.adapt-temperature.title-winter')
                  : t('screens.energy.adapt-temperature.title-summer')}
              </Text>
            </View>
            <View style={[styles.kpiContainer, selectedOption?.key === 'winter' && { marginTop: 0 }]}>
              <Text style={styles.kpi}>{priceComfort === null ? '...' : priceComfort}</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{t('screens.energy.adapt-temperature.description')}</Text>
            </View>
            <View style={styles.temperatureCardContainer}>
              <TemperatureCard
                kwh={kwh}
                price={price}
                legend={t('screens.energy.adapt-temperature.legend') + '*'}
              />
            </View>
            <View style={styles.infoCardContainer}>
              <InfoCard
                title={t('screens.energy.adapt-temperature.info-card.title')}
                text={t('screens.energy.adapt-temperature.info-card.text')}
              />
            </View>
            <View style={styles.snowflakeContainer}>
              <SnowFlake />
              <Text style={styles.snowflakeText}>{t('screens.energy.adapt-temperature.snowflake')}</Text>
            </View>
            <View style={styles.adaptTemperatureCardContainer}>
              <AdaptTemperatureCard
                text={
                  degree > 0
                    ? t('screens.energy.adapt-temperature.adapt-card.text-positive-part-one') +
                      degree +
                      t('screens.energy.adapt-temperature.adapt-card.text-positive-part-two')
                    : t('screens.energy.adapt-temperature.adapt-card.text-negative-part-one') +
                      degree +
                      t('screens.energy.adapt-temperature.adapt-card.text-negative-part-two')
                }
                comment={t('screens.energy.adapt-temperature.adapt-card.comment')}
                price={price}
                kwh={kwh}
                onPlusPress={handleOnPlusPress}
                onMinusPress={handleOnMinusPress}
                degree={degree}
              />
            </View>
            <View style={styles.explanationContainer}>
              <View style={styles.explanationTitleContainer}>
                <Text style={styles.explanationTitle}>
                  {t('screens.energy.adapt-temperature.explanation.title')}
                </Text>
              </View>
              <View style={styles.explanationTextContainer}>
                <Text style={styles.explanationText}>
                  {t('screens.energy.adapt-temperature.explanation.text')}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1,
  },
  contentContainer: {},
  switchButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  titleContainer: {
    width: Dimensions.get('window').width * 0.85,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.primary.darkBlue,
    fontFamily: FontNames.MartelSans_700Bold,
    lineHeight: 40,
    marginLeft: 20,
  },
  kpiContainer: {
    width: Dimensions.get('window').width * 0.85,
    alignItems: 'center',
    marginTop: -20,
  },
  kpi: {
    fontSize: 90,
    fontWeight: 'bold',
    marginLeft: 40,
    color: Colors.primary.darkBlue,
    fontFamily: FontNames.MartelSans_700Bold,
  },
  descriptionContainer: {
    width: Dimensions.get('window').width * 0.85,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: -10,
  },
  description: {
    fontSize: 16,
    color: Colors.primary.darkGrey,
    fontFamily: FontNames.MartelSans_400Regular,
    textAlign: 'left',
  },
  snowflakeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
    marginTop: 20,
    alignSelf: 'center',
  },
  snowflakeText: {
    fontSize: 28,
    color: Colors.primary.darkBlue,
    fontFamily: FontNames.MartelSans_700Bold,
    textAlign: 'left',
    lineHeight: 40,
  },
  adaptTemperatureContainer: {
    width: Dimensions.get('window').width * 0.85,
    alignItems: 'center',
    marginTop: 20,
  },
  temperatureCardContainer: {
    marginTop: 2,
    zIndex: 1,
  },
  infoCardContainer: {
    marginTop: 30,
  },
  adaptTemperatureCardContainer: {
    marginTop: 20,
  },
  explanationContainer: {
    marginTop: 20,
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
  },
  explanationTitleContainer: {
    marginBottom: 30,
  },
  explanationTitle: {
    fontSize: 19,
    color: Colors.primary.darkGrey,
    fontFamily: FontNames.MartelSans_600SemiBold,
    textAlign: 'left',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 50,
  },
  explanationTextContainer: {
    marginTop: 10,
    width: Dimensions.get('window').width * 0.85,
    alignSelf: 'center',
  },
  explanationText: {
    fontSize: 14,
    color: Colors.primary.darkGrey,
    fontFamily: FontNames.MartelSans_400Regular,
    textAlign: 'left',
  },
});
