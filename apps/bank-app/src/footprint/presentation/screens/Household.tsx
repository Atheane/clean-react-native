import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import {
  Colors,
  StepsIndicator,
  LoaderSplashScreen,
  SelectNumber,
  Group2,
  SubmitButton,
} from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

export const Household = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const STEPS = [
    t('screens.heat-primeum.step-one'),
    t('screens.heat-primeum.step-two'),
    t('screens.heat-primeum.step-three'),
  ];

  const changeStep = (position: number) =>
    console.log('Navigation set to: ' + position + ' - ' + STEPS[position - 1]);

  const { user, pending } = useSelector((state: IRootState) => state.user);
  const navigation = useNavigation();

  // const [formData, setFormData] = useState<Partial<IHouseholdProps>>();

  const handleChangeForm = (value: number) => {
    // const newFormData = { ...formData, usage: HEATER_USAGE.MAIN, [key]: value };
    console.log(value);
    // setFormData(newFormData);
    // dispatch(initializeFootprint());
  };

  const handleOnSubmit = () => {
    console.log('dispatch(createHousehold(formData))');
  };

  return pending ? (
    <LoaderSplashScreen />
  ) : (
    <ErrorBoundary t={t}>
      <SafeScrollingView backgroundColor={Colors.primary.darkWhite}>
        <View>
          <View style={[styles.whiteContainer]}>
            <StepsIndicator currentPosition={1} labels={STEPS} onCirclePress={changeStep} />
          </View>

          <View style={[styles.darkWhiteContainer]}>
            <View style={styles.subtitleContainer}>
              <Text style={theme.text.boldDarkBlue}>{t('screens.household-primeum.subtitle')}</Text>
              <Text
                style={theme.text.lightBlue}
              >{`${user?.properties.address?.str} ${user?.properties.address?.zip} ${user?.properties.address?.city}`}</Text>
            </View>
          </View>
          <View style={[styles.rowContainer, { marginTop: 100 }]}>
            <SelectNumber
              label={t('screens.household-primeum.adults')}
              icon={Group2}
              onChange={handleChangeForm}
            />
          </View>
          <View style={styles.rowContainer}>
            <SelectNumber
              label={t('screens.household-primeum.minors')}
              icon={Group2}
              onChange={handleChangeForm}
            />
          </View>
          <View style={[styles.rowContainer, { marginTop: 50, marginBottom: 300 }]}>
            <SubmitButton title={t('screens.household-primeum.submit')} onSubmit={handleOnSubmit} />
          </View>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  whiteContainer: {
    flex: 1,
    backgroundColor: Colors.primary.darkWhite,
  },
  darkWhiteContainer: {
    flex: 1,
    backgroundColor: Colors.primary.darkWhite,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'center',
    marginVertical: 20,
  },
});
