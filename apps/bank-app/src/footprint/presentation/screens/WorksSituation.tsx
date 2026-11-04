import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { DomainEventManager, IDomainError } from '@clean-rn/ddd';
import {
  FOOTPRINT_EVENTS,
  HOUSE_WORK_TYPE,
  IFootprintErrorCodes,
  IFootprintErrorMessage,
} from '@clean-rn/footprint/domain';
import {
  Colors,
  StepsIndicator,
  LoaderSplashScreen,
  DropdownMulti,
  Dropdown,
  SubmitButton,
} from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IWorksProps } from '../../presentation/types';
import { addWorks, initializeFootprint } from '../../application/commands';
import { mapWorkPropsToDomain } from '../../application/mappers';
import { useNavigation } from '@react-navigation/native';
import { IFootprintStackPages } from 'apps/bank-app/src/shared/presentation/types';

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
          <Text style={theme.text.boldDarkBlue}>{t('screens.works-situation.subtitle')}</Text>
          <Text
            style={theme.text.lightBlue}
          >{`${user?.properties.address?.str} ${user?.properties.address?.zip} ${user?.properties.address?.city}`}</Text>
        </View>
      </View>
    </View>
  );
};

export const WorksSituation = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // STATIC DATA in FORM
  const dataWorkTypes = Object.entries(HOUSE_WORK_TYPE).map(([key, value]) => ({
    key,
    value: t('screens.works-situation.dropdown-work-type.' + value),
  }));

  const dataYears = Array.from({ length: new Date().getFullYear() - 2010 }, (_, index) => {
    const year = 2010 + index;
    if (index === 0) return { key: '2010', value: t('screens.menu-primeum.dropdown-years.before-2011') };
    return { key: year.toString(), value: year.toString() };
  });

  // HANDLE DISABLED RULES
  const [formData, setFormData] = useState<Partial<IWorksProps>>({ worksType: [] });
  const [domainError, setDomainError] =
    useState<IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>>();

  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        await mapWorkPropsToDomain(formData as IWorksProps);
        setDisabled(false);
      } catch (e: unknown) {
        console.log(e);
        setDisabled(true);
        setDomainError(e as IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>);
      }
    })();
  }, [formData]);

  // HANDLE CHANGE FORM DATA
  const dispatch = useDispatch();
  const [hasWorks, setHasWorks] = useState(false);

  const handleChangeWorkTypes = (selectedItems: { key: string; value: string }[]) => {
    const newFormData = { ...formData, worksType: selectedItems.map((item) => item.key as HOUSE_WORK_TYPE) };
    if (newFormData.worksType.length > 0) {
      setHasWorks(true);
    }
    setFormData(newFormData);
    dispatch(initializeFootprint());
  };

  const handleChangeWorkDate = ({ key, value }: { key: string; value: number }) => {
    const newFormData = { ...formData, [key]: value };
    setFormData(newFormData);
    dispatch(initializeFootprint());
  };

  // HANDLE SUBMIT FORM DATA
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async () => {
    setLoading(true);
    dispatch(addWorks(formData as IWorksProps));
  };

  const navigation = useNavigation();

  const handleWorksAdded = useCallback(() => {
    setLoading(false);
    navigation.navigate(IFootprintStackPages.MENU_PRIMEUM as never);
  }, [navigation]);

  useEffect(() => {
    const domainEventManager = DomainEventManager.getInstance();
    domainEventManager.on(FOOTPRINT_EVENTS.WORKS_ADDED, handleWorksAdded);
    return () => {
      domainEventManager.off(FOOTPRINT_EVENTS.WORKS_ADDED, handleWorksAdded);
    };
  }, [handleWorksAdded]);

  return (
    <ErrorBoundary t={t}>
      <Header />
      <View style={styles.formContainer}>
        <SafeScrollingView>
          <View>
            <View style={styles.rowContainer}>
              <View style={styles.textContainer}>
                <Text style={theme.text.grey}>{t('screens.works-situation.instruction-works-type')}</Text>
              </View>
            </View>
            <DropdownMulti
              placeholder={t('screens.works-situation.dropdown-placeholder')}
              data={dataWorkTypes}
              onSelect={handleChangeWorkTypes}
            />
            {hasWorks && (
              <View>
                <View style={styles.rowContainer}>
                  <View style={styles.textContainer}>
                    <Text style={theme.text.grey}>{t('screens.works-situation.instruction-works-date')}</Text>
                  </View>
                </View>
                <Dropdown
                  placeholder={t('screens.heaters-situation.placeholder')}
                  data={dataYears}
                  value={formData?.workDate?.toString()}
                  onSelect={({ key }) => handleChangeWorkDate({ key: 'workDate', value: parseInt(key) })}
                />
              </View>
            )}
            <View style={[styles.rowContainer, { marginTop: 80, marginBottom: 300 }]}>
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
    marginTop: 20,
    width: Dimensions.get('screen').width * 0.75,
  },
  errorContainer: {
    marginTop: 16,
  },
});
