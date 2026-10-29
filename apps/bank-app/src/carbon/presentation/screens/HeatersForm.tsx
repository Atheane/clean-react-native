import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { Colors, Tabs, StepsIndicator } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { MainHeatForm, SanitaryHeatForm, SecondaryHeatForm } from './forms';
import {
  Heater,
  IHeaterProps,
  Heaters,
  ICarbonErrorCodes,
  ICarbonErrorMessage,
} from '@clean-rn/carbon/domain';
import { IDomainError } from '@clean-rn/ddd';

export const HeatersForm = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const STEPS = [
    t('screens.heat-primeum.step-one'),
    t('screens.heat-primeum.step-two'),
    t('screens.heat-primeum.step-three'),
  ];

  const changeStep = (position: number) =>
    console.log('Navigation set to: ' + position + ' - ' + STEPS[position - 1]);
  const changeTab = () => {
    console.log('Tab changed');
  };

  const [heatersProps, setHeatersProps] = useState<IHeaterProps[]>([]);
  const [mainHeatFormData, setMainHeatForData] = useState<IHeaterProps>();
  const [mainFormError, setMainFormError] = useState<IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>>();
  const changeMainHeatForm = ({ key, value }: { key: string; value: string | number }) => {
    const newFormData = { ...mainHeatFormData, [key]: value, usage: 'MAIN' };
    if (key === 'installationYear' && value === 2009 && newFormData.previousHeatType) {
      newFormData.previousHeatType = undefined;
    }
    const otherHeatersProps = heatersProps.filter((heater: IHeaterProps) => heater.usage !== 'MAIN');
    console.log('newFormData', newFormData);
    try {
      setMainHeatForData(newFormData);
      new Heater(newFormData as IHeaterProps);
      setHeatersProps([...otherHeatersProps, newFormData] as IHeaterProps[]);
      setMainFormError(undefined);
    } catch (error) {
      console.log(error);
      setMainFormError(error as IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>);
      setHeatersProps(otherHeatersProps);
    }
  };

  const [sanitaryHeatFormData, setSanitaryHeatFormData] = useState<IHeaterProps>();
  const [sanitaryFormError, setSanitaryFormError] =
    useState<IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>>();
  const changeSanitaryHeatForm = ({ key, value }: { key: string; value: string | number }) => {
    const newFormData = { ...sanitaryHeatFormData, [key]: value, usage: 'SANITARY' };
    if (key === 'installationYear' && value === 2009 && newFormData.previousHeatType) {
      newFormData.previousHeatType = undefined;
    }
    const otherHeatersProps = heatersProps.filter((heater: IHeaterProps) => heater.usage !== 'SANITARY');
    try {
      setSanitaryHeatFormData(newFormData);
      new Heater(newFormData as IHeaterProps);
      setHeatersProps([...otherHeatersProps, newFormData] as IHeaterProps[]);
      setSanitaryFormError(undefined);
    } catch (error) {
      console.log(error);
      setSanitaryFormError(error as IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>);
      setHeatersProps(otherHeatersProps);
    }
  };

  const [secondaryHeatFormData, setSecondaryHeatFormData] = useState<IHeaterProps>();
  const [secondaryFormError, setSecondaryFormError] =
    useState<IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>>();
  const changeSecondaryHeatForm = ({ key, value }: { key: string; value: string }) => {
    const newFormData = { ...secondaryHeatFormData, [key]: value, usage: 'SECONDARY' };
    const otherHeatersProps = heatersProps.filter((heater: IHeaterProps) => heater.usage !== 'SECONDARY');
    try {
      setSecondaryHeatFormData(newFormData);
      setHeatersProps([...otherHeatersProps, newFormData] as IHeaterProps[]);
      setSecondaryFormError(undefined);
    } catch (error) {
      console.log(error);
      setSecondaryFormError(error as IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>);
      setHeatersProps(otherHeatersProps);
    }
  };

  const dispatch = useDispatch();

  const handleSubmit = () => {
    try {
      const heaters = new Heaters({ heaters: heatersProps });
      console.log('dispatch(fetchHeatPrimeum(heaters))');
    } catch (error) {
      console.log(error);
    }
  };

  // console.log('heatersProps', heatersProps);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView backgroundColor={Colors.primary.darkWhite}>
        <View>
          <View style={[styles.whiteContainer]}>
            <StepsIndicator currentPosition={1} labels={STEPS} onCirclePress={changeStep} />
          </View>

          <View style={[styles.darkWhiteContainer]}>
            <View style={styles.subtitleContainer}>
              <Text style={theme.text.boldDarkBlue}>{t('screens.heat-primeum.subtitle')}</Text>
            </View>
            <Tabs
              tabsCount={3}
              color={Colors.primary.darkBlue}
              colorInactive={Colors.primary.grey}
              icons={[]}
              titles={[]}
              backgroundColor={Colors.primary.darkWhite}
              contents={[
                <View style={styles.tabPageContainer}>
                  <MainHeatForm
                    heatType={mainHeatFormData?.heatType}
                    installationYear={mainHeatFormData?.installationYear}
                    previousHeatType={mainHeatFormData?.previousHeatType}
                    handleChangeForm={changeMainHeatForm}
                    domainError={mainFormError}
                  />
                </View>,
                <View style={styles.tabPageContainer}>
                  <SanitaryHeatForm
                    heatType={sanitaryHeatFormData?.heatType}
                    installationYear={sanitaryHeatFormData?.installationYear}
                    previousHeatType={sanitaryHeatFormData?.previousHeatType}
                    handleChangeForm={changeSanitaryHeatForm}
                    domainError={sanitaryFormError}
                  />
                </View>,
                <View style={styles.tabPageContainer}>
                  <SecondaryHeatForm
                    heatType={secondaryHeatFormData?.heatType}
                    handleChangeForm={changeSecondaryHeatForm}
                    domainError={secondaryFormError}
                  />
                </View>,
              ]}
              changeTab={changeTab}
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
  tabPageContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.primary.darkWhite,
  },
  textContainer: {
    width: '90%',
    marginVertical: 20,
  },
  domainErrorContainer: {
    marginTop: 16,
  },
});
