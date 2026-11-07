import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { RenovateHouse, SafeScrollingView, Colors, FontNames, RenovationCard } from '@clean-rn/ui-mobile';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import {
  COOLING_DAYS_IN_A_YEAR,
  DECAY_CONSUMPTIONS_AFTER_WORKS,
  HEATING_DAYS_IN_A_YEAR,
  IWorks,
} from '@clean-rn/energy/domain';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary } from '../../../shared/presentation/hoc';

export const SavingsAfterRenovation = () => {
  const { t } = useTranslation();

  const {
    params: { choice },
  } = useRoute() as { params: { choice: IWorks } };

  const { energy } = useSelector((state: IRootState) => state.energy);

  const [priceWinter, setPriceWinter] = useState<string>('...');
  const [kwhWinter, setKwhWinter] = useState<string>('...');
  const [priceWinterAfter, setPriceWinterAfter] = useState<string>('...');
  const [kwhWinterAfter, setKwhWinterAfter] = useState<string>('...');

  const [priceSummer, setPriceSummer] = useState<string>('...');
  const [kwhSummer, setKwhSummer] = useState<string>('...');
  const [priceSummerAfter, setPriceSummerAfter] = useState<string>('...');
  const [kwhSummerAfter, setKwhSummerAfter] = useState<string>('...');

  const [kwhYear, setKwhYear] = useState<string>('...');
  const [priceYear, setPriceYear] = useState<string>('...');

  useEffect(() => {
    if (energy?.properties.heatingPriceComfort?.value && energy?.properties.coolingPriceComfort?.value) {
      const incrementalConso = parseInt(energy.properties.heatingPriceComfort.value.incremental);
      const incrementalConsoAfter = incrementalConso * (1 - DECAY_CONSUMPTIONS_AFTER_WORKS[choice]);
      setKwhWinter(`${incrementalConso.toFixed(2)} kWh`);
      setKwhWinterAfter(`${incrementalConsoAfter.toFixed(2)} kWh`);
      const incrementalPrice = (incrementalConso * 0.15 * 365) / 12;
      const incrementalPriceAfter = (incrementalConsoAfter * 0.15 * 365) / 12;
      setPriceWinter(`${incrementalPrice.toFixed(2)}€`);
      setPriceWinterAfter(`${incrementalPriceAfter.toFixed(2)}€`);

      const incrementalConsoSummer = parseInt(energy.properties.coolingPriceComfort.value.incremental);
      const incrementalConsoAfterSummer =
        incrementalConsoSummer * (1 - DECAY_CONSUMPTIONS_AFTER_WORKS[choice]);
      setKwhSummer(`${incrementalConsoSummer.toFixed(2)} kWh`);
      setKwhSummerAfter(`${incrementalConsoAfterSummer.toFixed(2)} kWh`);
      const incrementalPriceSummer = (incrementalConsoSummer * 0.15 * 365) / 12;
      const incrementalPriceAfterSummer = (incrementalConsoAfterSummer * 0.15 * 365) / 12;
      setPriceSummer(`${incrementalPriceSummer.toFixed(2)}€`);
      setPriceSummerAfter(`${incrementalPriceAfterSummer.toFixed(2)}€`);

      const kwhYear =
        (incrementalConso - incrementalConsoAfter) * HEATING_DAYS_IN_A_YEAR +
        incrementalConsoSummer * COOLING_DAYS_IN_A_YEAR;
      setKwhYear(`${kwhYear.toFixed(2)}`);

      const priceYear = kwhYear * 0.15;
      setPriceYear(`${priceYear.toFixed(2)}€`);
    }
  }, [energy?.properties.heatingPriceComfort, energy?.properties.coolingPriceComfort]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView backgroundColor={Colors.primary.white}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <RenovateHouse />
            <Text style={styles.headerText}>{t('screens.energy.savings-after-renovation.header')}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{t(`screens.energy.savings-after-renovation.${choice}`)}</Text>
          </View>
          <View style={styles.cardsContainer}>
            <RenovationCard
              season={'winter'}
              textHeader={t('screens.energy.savings-after-renovation.winter')}
              textTagLeft={t('screens.energy.savings-after-renovation.before')}
              textTagRight={t('screens.energy.savings-after-renovation.after')}
              textkWhLeft={kwhWinter}
              textPriceLeft={priceWinter}
              textGranularity={t('screens.energy.savings-after-renovation.by-month')}
              textkWhRight={kwhWinterAfter}
              textPriceRight={priceWinterAfter}
            />
            <RenovationCard
              season={'summer'}
              textHeader={t('screens.energy.savings-after-renovation.summer')}
              textTagLeft={t('screens.energy.savings-after-renovation.before')}
              textTagRight={t('screens.energy.savings-after-renovation.after')}
              textkWhLeft={kwhSummer}
              textPriceLeft={priceSummer}
              textGranularity={t('screens.energy.savings-after-renovation.by-month')}
              textkWhRight={kwhSummerAfter}
              textPriceRight={priceSummerAfter}
              footerText={
                t('screens.energy.savings-after-renovation.footer-one') +
                kwhYear +
                t('screens.energy.savings-after-renovation.footer-two') +
                priceYear +
                t('screens.energy.savings-after-renovation.footer-three')
              }
              style={{ position: 'relative', top: -10 }}
            />
          </View>
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationTitle}>
              {t('screens.energy.savings-after-renovation.explanation-title')}
            </Text>
            <Text style={styles.explanationText}>
              {t('screens.energy.savings-after-renovation.explanation')}
            </Text>
          </View>
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
    marginLeft: 40,
    marginTop: 20,
    width: '70%',
  },
  headerText: {
    fontSize: 28,
    fontFamily: FontNames.MartelSans_800ExtraBold,
    fontWeight: '600',
    color: Colors.secondary.black,
    textAlign: 'left',
    marginLeft: 20,
  },
  tag: {
    alignSelf: 'center',
    marginTop: 40,
    backgroundColor: Colors.primary.darkBlue,
    padding: 10,
    paddingRight: 24,
    borderRadius: 50,
  },
  tagText: {
    fontSize: 20,
    fontFamily: FontNames.MartelSans_800ExtraBold,
    fontWeight: '700',
    color: Colors.primary.white,
    textAlign: 'center',
    marginLeft: 20,
  },
  cardsContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  explanationContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginLeft: 20,
    marginBottom: 100,
  },
  explanationTitle: {
    fontSize: 19,
    fontFamily: FontNames.MartelSans_600SemiBold,
    color: Colors.primary.darkGrey,
    textAlign: 'left',
    paddingBottom: 20,
  },
  explanationText: {
    fontSize: 16,
    fontFamily: FontNames.MartelSans_400Regular,
    color: Colors.primary.darkGrey,
    textAlign: 'left',
  },
});
