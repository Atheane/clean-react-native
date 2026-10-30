import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { DomainEventManager } from '@clean-rn/ddd';
import { Footprint, FOOTPRINT_EVENTS, IFootprintErrorCodes } from '@clean-rn/footprint/domain';

import {
  Colors,
  StepsIndicator,
  LoaderSplashScreen,
  SelectNumber,
  Group2,
  SubmitButton,
  ErrorMessage,
} from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { createFootprint, initializeFootprint } from '../../application/commands';
import { IFootprintProps } from '../types';
import { IFootprintStackPages } from '../../../shared/presentation/types';

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

  const { user, pending: pendingUser } = useSelector((state: IRootState) => state.user);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState<Partial<IFootprintProps>>({
    adultNumber: 1,
    childNumber: 0,
  });

  const handleChangeAdult = (value: number) => {
    const newFormData = { ...formData, adultNumber: value };
    setFormData(newFormData);
    dispatch(initializeFootprint());
  };

  const handleChangeChild = (value: number) => {
    const newFormData = { ...formData, childNumber: value };
    setFormData(newFormData);
    dispatch(initializeFootprint());
  };

  const handleOnSubmit = () => {
    dispatch(createFootprint(formData as IFootprintProps));
  };

  const handleFootprintCreated = useCallback(
    (footprint: Footprint) => {
      console.log(footprint);
      navigation.navigate(IFootprintStackPages.MENU_PRIMEUM as never);
    },
    [navigation],
  );

  useEffect(() => {
    const domainEventManager = DomainEventManager.getInstance();
    domainEventManager.on(FOOTPRINT_EVENTS.FOOTPRINT_CREATED, handleFootprintCreated);
    return () => {
      domainEventManager.off(FOOTPRINT_EVENTS.FOOTPRINT_CREATED, handleFootprintCreated);
    };
  }, [handleFootprintCreated]);

  const { pending: pendingFootprint, error: domainError } = useSelector(
    (state: IRootState) => state.footprint,
  );

  return pendingUser && pendingFootprint ? (
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
              icon={() => <Group2 />}
              onChange={handleChangeAdult}
              value={formData.adultNumber}
            />
          </View>
          {domainError && domainError.code === IFootprintErrorCodes.INVALID_ADULT_NUMBER && (
            <View style={styles.rowContainer}>
              <ErrorMessage
                error={domainError}
                errorMessage={t(`errors.domain-error.footprint.${domainError?.code}`)}
                genericErrorMessage={t('errors.other')}
              />
            </View>
          )}
          <View style={styles.rowContainer}>
            <SelectNumber
              label={t('screens.household-primeum.minors')}
              icon={() => <Group2 />}
              onChange={handleChangeChild}
              value={formData.childNumber}
            />
          </View>
          {domainError && domainError.code === IFootprintErrorCodes.INVALID_CHILD_NUMBER && (
            <View style={styles.rowContainer}>
              <ErrorMessage
                error={domainError}
                errorMessage={t(`errors.domain-error.footprint.${domainError?.code}`)}
                genericErrorMessage={t('errors.other')}
              />
            </View>
          )}
          {domainError && domainError.code === IFootprintErrorCodes.HOUSEHOLD_ALDREADY_DECLARED && (
            <View style={styles.rowContainer}>
              <ErrorMessage
                error={domainError}
                errorMessage={t(`errors.domain-error.footprint.${domainError?.code}`)}
                genericErrorMessage={t('errors.other')}
              />
            </View>
          )}
          <View style={[styles.rowContainer, { marginTop: 50, marginBottom: 300 }]}>
            <SubmitButton
              title={t('screens.household-primeum.submit')}
              onSubmit={handleOnSubmit}
              uppercase={false}
            />
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
