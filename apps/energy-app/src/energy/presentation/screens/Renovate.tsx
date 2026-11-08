import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { IWorks } from '@clean-rn/energy/domain';
import {
  RenovateHouse,
  SafeScrollingView,
  Colors,
  FontNames,
  MultipleOptionsCheckBox,
  PrimaryButton,
  RightChevron,
} from '@clean-rn/ui-mobile';

import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { IEnergyStackPages } from '../../../shared/presentation/types';

export const Renovate = () => {
  const { t } = useTranslation();
  const [selectedWork, setSelectedWork] = useState<IWorks>(IWorks.ISOLATION_ANTICS);

  const navigation = useNavigation();

  const onAnswerSelected = (choice: string) => {
    setSelectedWork(IWorks[choice as keyof typeof IWorks]);
  };

  const handleOnPress = () => {
    console.log('NAV TO SavingsAfterRenovation');
    navigation.navigate(IEnergyStackPages.SAVINGS_AFTER_RENOVATION, { choice: selectedWork });
    return;
  };

  const choices = [
    t('screens.energy.renovate.isolation-antics'),
    t('screens.energy.renovate.heat-pump'),
    t('screens.energy.renovate.isolation-windows'),
    t('screens.energy.renovate.global-renovation'),
  ];

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView backgroundColor={Colors.primary.white}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <RenovateHouse />
            <Text style={styles.headerText}>{t('screens.energy.renovate.header')}</Text>
          </View>
          <View style={styles.instruction}>
            <Text style={styles.instructionText}>{t('screens.energy.renovate.instruction')}</Text>
          </View>
          <View style={styles.choicesContainer}>
            <MultipleOptionsCheckBox
              optionsTitle={choices}
              optionsValues={[
                IWorks.ISOLATION_ANTICS,
                IWorks.HEAT_PUMP,
                IWorks.ISOLATION_WINDOWS,
                IWorks.GLOBAL_RENOVATION,
              ]}
              onChange={onAnswerSelected}
              vertical={true}
            />
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={t('screens.energy.renovate.button')}
              iconRight={() => <RightChevron color={Colors.primary.white} />}
              onPress={handleOnPress}
            />
          </View>
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationText}>{t('screens.energy.renovate.explanation')}</Text>
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
  instruction: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: 40,
    marginLeft: 20,
  },
  instructionText: {
    fontSize: 16,
    fontFamily: FontNames.MartelSans_400Regular,
    color: Colors.primary.darkGrey,
    textAlign: 'left',
  },
  choicesContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  explanationContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginLeft: 20,
    marginBottom: 100,
  },
  explanationText: {
    fontSize: 16,
    fontFamily: FontNames.MartelSans_400Regular,
    color: Colors.primary.darkGrey,
    textAlign: 'left',
  },
});
