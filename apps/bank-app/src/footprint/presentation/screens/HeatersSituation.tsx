import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { useNavigation } from '@react-navigation/native';
import { DomainEventManager, IDomainError } from '@clean-rn/ddd';
import {
  HEATER_TYPE,
  HEATER_USAGE,
  IFootprintErrorCodes,
  FOOTPRINT_EVENTS,
  IFootprintErrorMessage,
} from '@clean-rn/footprint/domain';

import {
  Dropdown,
  MultipleOptionsCheckBox,
  SubmitButton,
  Colors,
  StepsIndicator,
  LoaderSplashScreen,
} from '@clean-rn/ui-mobile';

import { addHeaters, initializeFootprint } from '../../application/commands';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IHeaterProps } from '../types';
import { IFootprintStackPages } from '../../../shared/presentation/types';
import { mapHeaterPropsToDomain } from '../../../footprint/application/mappers';

const Header = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const STEPS = [
    t('screens.menu-primeum.step-one'),
    t('screens.menu-primeum.step-two'),
    t('screens.menu-primeum.step-three'),
  ];

  const changeStep = (position: number) =>
    console.log('Navigation set to: ' + position + ' - ' + STEPS[position - 1]);

  const { user, pending } = useSelector((state: IRootState) => state.user);

  return pending ? (
    <LoaderSplashScreen />
  ) : (
    <View style={styles.header}>
      <View style={styles.whiteContainer}>
        <StepsIndicator currentPosition={1} labels={STEPS} onCirclePress={changeStep} />
      </View>

      <View style={styles.blueContainer}>
        <View style={styles.subtitleContainer}>
          <Text style={theme.text.boldDarkBlue}>{t('screens.transport-situation.subtitle')}</Text>
          <Text
            style={theme.text.lightBlue}
          >{`${user?.properties.address?.str} ${user?.properties.address?.zip} ${user?.properties.address?.city}`}</Text>
        </View>
      </View>
    </View>
  );
};

export const HeatersSituation = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // STATIC DATA in FORM
  const dataHeating = Object.entries(HEATER_TYPE).map(([key, value]) => ({
    key,
    value: t('screens.heaters-situation.dropdown-heat-type.' + value),
  }));

  const dataYears = Array.from({ length: new Date().getFullYear() - 2010 }, (_, index) => {
    const year = 2010 + index;
    if (index === 0) return { key: '2010', value: t('screens.menu-primeum.dropdown-years.before-2011') };
    return { key: year.toString(), value: year.toString() };
  });

  const OPTIONS = [
    t('screens.heaters-situation.has-changed-no'),
    t('screens.heaters-situation.has-changed-yes'),
  ];

  // HANDLE DISABLED RULES
  const [formData, setFormData] = useState<Partial<IHeaterProps>>();
  const [domainError, setDomainError] =
    useState<IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>>();

  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    (async () => {
      if (formData) {
        try {
          await mapHeaterPropsToDomain(formData as IHeaterProps);
          setDisabled(false);
        } catch (e: unknown) {
          console.log(e);
          setDisabled(true);
          setDomainError(e as IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>);
        }
      }
    })();
  }, [formData]);

  // HANDLE CHANGE FORM DATA
  const dispatch = useDispatch();

  const handleChangeForm = ({ key, value }: { key: string; value: string | number }) => {
    const newFormData = { ...formData, usage: HEATER_USAGE.MAIN, [key]: value };
    if (key === 'installationYear' && value === 2011 && newFormData.previousHeatType) {
      newFormData.previousHeatType = undefined;
    }
    setFormData(newFormData);
    dispatch(initializeFootprint());
  };

  const [hasBeenChanged, setHasBeenChanged] = useState(false);
  const handleOptionsChange = (option: string) => {
    setHasBeenChanged(option === '1');
    setFormData({ ...formData, hasBeenChanged: option === '1' });
  };

  // HANDLE SUBMIT FORM DATA
  const [loading, setLoading] = useState(false);
  const handleOnSubmit = async () => {
    setLoading(true);
    dispatch(addHeaters(formData as IHeaterProps));
  };

  const navigation = useNavigation();

  const handleHeatersAdded = useCallback(() => {
    setLoading(false);
    navigation.navigate(IFootprintStackPages.MENU_PRIMEUM as never);
  }, [navigation]);

  useEffect(() => {
    const domainEventManager = DomainEventManager.getInstance();
    domainEventManager.on(FOOTPRINT_EVENTS.HEATERS_ADDED, handleHeatersAdded);
    return () => {
      domainEventManager.off(FOOTPRINT_EVENTS.HEATERS_ADDED, handleHeatersAdded);
    };
  }, [handleHeatersAdded]);

  return (
    <ErrorBoundary t={t}>
      <Header />
      <View style={styles.formContainer}>
        <SafeScrollingView>
          <View>
            <View style={styles.rowContainer}>
              <View style={styles.textContainer}>
                <Text style={theme.text.grey}>{t('screens.heaters-situation.instruction-heat-type')}</Text>
              </View>
            </View>
            <Dropdown
              placeholder={t('screens.heaters-situation.placeholder')}
              data={dataHeating}
              value={formData?.heatType}
              onSelect={({ key }) => handleChangeForm({ key: 'heatType', value: key })}
            />
            <View style={[styles.rowContainer, { marginTop: 30 }]}>
              <MultipleOptionsCheckBox
                subtitle={t('screens.heaters-situation.has-changed')}
                optionsTitle={OPTIONS}
                optionsValues={['0', '1']}
                onChange={handleOptionsChange}
                defaultValue={'0'}
              />
            </View>
            {hasBeenChanged && (
              <View>
                <View style={styles.rowContainer}>
                  <View style={styles.textContainer}>
                    <Text style={theme.text.grey}>
                      {t('screens.heaters-situation.instruction-heat-type-installation-date')}
                    </Text>
                  </View>
                </View>
                <Dropdown
                  placeholder={t('screens.heaters-situation.placeholder')}
                  data={dataYears}
                  value={formData?.installationYear?.toString()}
                  onSelect={({ key }) => handleChangeForm({ key: 'installationYear', value: parseInt(key) })}
                />
              </View>
            )}
            {hasBeenChanged && formData?.installationYear && formData.installationYear >= 2011 && (
              <View>
                <View style={styles.rowContainer}>
                  <View style={styles.textContainer}>
                    <Text style={theme.text.grey}>
                      {t('screens.heaters-situation.instruction-heat-type-old')}
                    </Text>
                  </View>
                </View>
                <Dropdown
                  placeholder={t('screens.heaters-situation.placeholder')}
                  data={dataHeating}
                  value={formData?.previousHeatType}
                  onSelect={({ key }) => handleChangeForm({ key: 'previousHeatType', value: key })}
                />
              </View>
            )}
            <View style={[styles.rowContainer, { marginTop: 80, marginBottom: 80 }]}>
              <SubmitButton
                title={t('screens.heaters-situation.next-step')}
                disabled={disabled}
                uppercase
                loading={loading}
                onSubmit={handleOnSubmit}
              />
            </View>
          </View>
        </SafeScrollingView>
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0.75,
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  blueContainer: {
    flex: 0.75,
    backgroundColor: Colors.secondary.lightBlue,
    justifyContent: 'center',
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  formContainer: {
    flex: 2,
    width: Dimensions.get('screen').width,
    backgroundColor: Colors.primary.white,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  textContainer: {
    marginVertical: 20,
    width: Dimensions.get('screen').width * 0.75,
  },
  errorContainer: {
    marginTop: 16,
  },
});
