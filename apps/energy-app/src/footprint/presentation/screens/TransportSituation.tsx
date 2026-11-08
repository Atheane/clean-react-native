import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Text, Dimensions, ScrollView, Platform } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import SelectDropdown from 'react-native-select-dropdown';

import { DomainEventManager, IDomainError } from '@clean-rn/ddd';
import {
  Colors,
  StepsIndicator,
  LoaderSplashScreen,
  SubmitButton,
  LicensePlateInput,
  CarBorder,
  SimpleCheckBox,
  Dropdown,
  MultipleOptionsCheckBox,
  SecondaryButton,
  Add,
  CardScroller,
  Car,
} from '@clean-rn/ui-mobile';
import {
  FOOTPRINT_EVENTS,
  IFootprintErrorCodes,
  IFootprintErrorMessage,
  VEHICLE_STATUS,
  VehicleVO,
} from '@clean-rn/footprint/domain';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { mapVehiclePropsToDomain } from '../../application/mappers';
import { IFootprintStackPages } from '../../../shared/presentation/types';
import { ErrorMessage } from '../../../shared/presentation/components/error-message';

import { addVehicles, initializeFootprint } from '../../application/commands';
import { IVehicleProps, IVehiclesProps } from '../types';

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

export const TransportSituation = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const { user, pending } = useSelector((state: IRootState) => state.user);
  const { error } = useSelector((state: IRootState) => state.footprint);

  const [domainError, setDomainError] =
    useState<IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>>();

  useEffect(() => {
    if (error) {
      setDomainError(error);
    }
  }, [error]);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(initializeFootprint());
      };
    }, [dispatch]),
  );

  // STATIC DATA in FORM
  const dataYears = Array.from({ length: new Date().getFullYear() - 2010 }, (_, index) => {
    const year = 2010 + index;
    if (index === 0) return { key: '2010', value: t('screens.menu-primeum.dropdown-years.before-2011') };
    return { key: year.toString(), value: year.toString() };
  });

  const OPTIONS = [
    t('screens.transport-situation.has-changed-no'),
    t('screens.transport-situation.has-changed-yes'),
  ];

  // HANDLE CHANGE FORM DATA
  const initTouchedFields = {
    licensePlate: false,
    acquisitionYear: false,
    oldLicensePlate: false,
    consent: false,
  };
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(initTouchedFields);

  // ne plus mo,trer l'erreur lciense plate sur le premier licensePlate s'il a été validé
  const [licensePlates, setLicensePlates] = useState({
    licensePlate: true,
    oldLicensePlate: true,
  });
  const handleChangeForm = ({ key, value }: { key: string; value: string | number | boolean }) => {
    const newVehicleData = { ...currentVehicle, [key]: value };
    if (user?.id) {
      newVehicleData.userId = parseInt(user.id);
    }
    if (key === 'acquisitionYear') {
      newVehicleData.vehicleStatus = VEHICLE_STATUS.OWNED;
    }
    if (key === 'licensePlate') {
      setLicensePlates({ ...licensePlates, licensePlate: false });
    }
    if (key === 'oldLicensePlate') {
      setLicensePlates({ ...licensePlates, oldLicensePlate: false });
    }
    setCurrentVehicle(newVehicleData);
    setTouchedFields((prev) => ({
      ...prev,
      [key]: true,
    }));
    dispatch(initializeFootprint());
  };

  // HANDLE DISABLED RULES
  const initVehicleData = {
    consent: false,
    licensePlate: '',
    acquisitionYear: undefined,
    hasBeenChanged: false,
    oldLicensePlate: undefined,
  };

  const [currentVehicle, setCurrentVehicle] = useState<Partial<IVehicleProps>>(initVehicleData);

  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    const hasAnyFieldBeenTouched = Object.values(touchedFields).some((touched) => touched);
    console.log('hasAnyFieldBeenTouched', hasAnyFieldBeenTouched);

    if (!hasAnyFieldBeenTouched) {
      return;
    }
    (async () => {
      if (currentVehicle?.licensePlate) {
        try {
          await mapVehiclePropsToDomain(currentVehicle as IVehicleProps);
          setDisabled(false);
          setDomainError(undefined);
          setLicensePlates({
            licensePlate: true,
            oldLicensePlate: !!currentVehicle.hasBeenChanged,
          });
        } catch (e: unknown) {
          console.log(e);
          setDisabled(true);
          setDomainError(e as IDomainError<IFootprintErrorCodes, IFootprintErrorMessage>);
        }
      }
    })();
  }, [currentVehicle, touchedFields]);

  // HANDLE ADD VEHICLE TO VEHICLES
  const [vehicles, setVehicles] = useState<VehicleVO[]>([]);
  const dropdownRef = useRef<SelectDropdown | null>(null);

  const handleAddVehicle = (currentVehicle: Partial<IVehicleProps>) => {
    (async () => {
      const addedVehicles: VehicleVO[] = await mapVehiclePropsToDomain(currentVehicle as IVehicleProps);
      const newVehicles = [...vehicles, ...addedVehicles];
      setVehicles(newVehicles);
      // reinit data
      setCurrentVehicle(initVehicleData);
      setTouchedFields(initTouchedFields);
      if (Platform.OS !== 'web') {
        dropdownRef.current?.reset();
      }
    })();
  };

  const handleDeleteVehicle = (uid: string) => {
    const newVehicles = [...vehicles].filter((vehicleVO: VehicleVO) => vehicleVO.licensePlate !== uid);
    setVehicles(newVehicles);
    setDomainError(undefined);
  };

  const cardScrollRef = useRef<null | ScrollView>(null);

  const mapVehiclesPropsToCards = (vehicles: VehicleVO[]) => {
    if (!vehicles || vehicles.length === 0) {
      return [];
    }
    return vehicles
      .map(({ licensePlate, acquisitionDate, vehicleStatus }: VehicleVO) => {
        const vehicle = t('screens.transport-situation.vehicle');
        const year = new Date(acquisitionDate).getFullYear();
        const inOrBefore =
          year === 2010 ? t('screens.transport-situation.before') : t('screens.transport-situation.in');
        const license = `${licensePlate.slice(0, 2)}-${licensePlate.slice(2, 5)}-${licensePlate.slice(5)}`;
        const status =
          vehicleStatus === VEHICLE_STATUS.OWNED
            ? t('screens.transport-situation.owned')
            : t('screens.transport-situation.sold');
        return {
          uid: `${licensePlate}`,
          title: `${vehicle} ${license}\n${status} ${inOrBefore} ${year}`,
          icon: () => <Car color={Colors.primary.darkBlue} />,
        };
      })
      .filter((value, index, self) => {
        return self.findIndex((v) => v.uid === value.uid) === index;
      });
  };

  // HANDLE SUBMIT FORM DATA
  const [loading, setLoading] = useState(false);
  const handleOnSubmit = async () => {
    setLoading(true);
    dispatch(
      addVehicles({
        vehicles,
      } as IVehiclesProps),
    );
  };

  const navigation = useNavigation();

  const handleVehiclesAdded = useCallback(() => {
    setLoading(false);
    navigation.navigate(IFootprintStackPages.MENU_PRIMEUM as never);
  }, [navigation]);

  useEffect(() => {
    const domainEventManager = DomainEventManager.getInstance();
    domainEventManager.on(FOOTPRINT_EVENTS.VEHICLES_ADDED, handleVehiclesAdded);
    return () => {
      domainEventManager.off(FOOTPRINT_EVENTS.VEHICLES_ADDED, handleVehiclesAdded);
    };
  }, [handleVehiclesAdded]);

  useEffect(() => {
    if (loading && domainError) {
      setLoading(false);
    }
  }, [loading, domainError]);

  return pending ? (
    <LoaderSplashScreen />
  ) : (
    <ErrorBoundary t={t}>
      <Header />
      <View style={styles.formContainer}>
        <SafeScrollingView>
          <View>
            <View style={[styles.rowContainer]}>
              <View style={styles.textContainer}>
                <Text style={theme.text.grey}>
                  {t('screens.transport-situation.instruction-license-plate')}
                </Text>
              </View>
            </View>
            <View style={[styles.rowContainer]}>
              <LicensePlateInput
                value={currentVehicle?.licensePlate} // used for reinitialization after handleAddVehicle
                onChange={(value: string) => handleChangeForm({ key: 'licensePlate', value })}
                IconLeft={() => <CarBorder />}
                placeholder={t('screens.transport-situation.placeholder-license-plate')}
              />
            </View>
            {!licensePlates.licensePlate &&
              domainError &&
              domainError.code === IFootprintErrorCodes.INVALID_LICENSE_PLATE && (
                <View style={styles.errorContainer}>
                  <ErrorMessage
                    error={domainError}
                    errorMessage={t(`errors.domain-error.footprint.${domainError?.code}`)}
                    genericErrorMessage={t('errors.other')}
                  />
                </View>
              )}
            <View style={[styles.rowContainer]}>
              <SimpleCheckBox
                title={t('screens.transport-situation.checkbox')}
                checked={currentVehicle?.consent as boolean} // used for reinitialization after handleAddVehicle
                toggleCheckbox={(value: boolean) => handleChangeForm({ key: 'consent', value })}
              />
            </View>
            <View>
              <View style={styles.rowContainer}>
                <View style={styles.textContainer}>
                  <Text style={theme.text.grey}>
                    {t('screens.transport-situation.instruction-acquisition-date')}
                  </Text>
                </View>
              </View>
              <View style={[styles.rowContainer]}>
                <Dropdown
                  ref={dropdownRef}
                  placeholder={t('screens.transport-situation.acquisition-date-placeholder')}
                  data={dataYears}
                  onSelect={({ key }) => handleChangeForm({ key: 'acquisitionYear', value: parseInt(key) })}
                />
              </View>
            </View>
            {currentVehicle.acquisitionYear && currentVehicle.acquisitionYear > 2010 && (
              <View style={[styles.rowContainer, { marginTop: 30, marginLeft: 16 }]}>
                <MultipleOptionsCheckBox
                  value={currentVehicle?.hasBeenChanged ? '1' : '0'}
                  subtitle={t('screens.transport-situation.has-changed')}
                  optionsTitle={OPTIONS}
                  optionsValues={['0', '1']}
                  onChange={(option: string) =>
                    handleChangeForm({ key: 'hasBeenChanged', value: option === '1' })
                  }
                  defaultValue={'0'}
                />
              </View>
            )}
            {currentVehicle?.hasBeenChanged && (
              <View>
                <View style={[styles.rowContainer]}>
                  <View style={styles.textContainer}>
                    <Text style={theme.text.grey}>
                      {t('screens.transport-situation.instruction-old-license-plate')}
                    </Text>
                  </View>
                </View>
                <View style={[styles.rowContainer]}>
                  <LicensePlateInput
                    value={currentVehicle?.licensePlate}
                    onChange={(value: string) => handleChangeForm({ key: 'oldLicensePlate', value })}
                    IconLeft={() => <CarBorder />}
                    placeholder={t('screens.transport-situation.placeholder-license-plate')}
                  />
                </View>
              </View>
            )}
            {currentVehicle?.hasBeenChanged &&
              !licensePlates.oldLicensePlate &&
              domainError &&
              domainError.code === IFootprintErrorCodes.INVALID_LICENSE_PLATE && (
                <View style={styles.errorContainer}>
                  <ErrorMessage
                    error={domainError}
                    errorMessage={t(`errors.domain-error.footprint.${domainError?.code}`)}
                    genericErrorMessage={t('errors.other')}
                  />
                </View>
              )}
            <View style={[styles.rowContainer, { marginVertical: 40 }]}>
              <SecondaryButton
                title={t('screens.transport-situation.add')}
                onPress={() => handleAddVehicle(currentVehicle)}
                iconLeft={() => <Add />}
                disabled={disabled}
              />
            </View>
            {vehicles && vehicles.length > 0 && (
              <View style={styles.cardScroller}>
                <CardScroller
                  data={mapVehiclesPropsToCards(vehicles)}
                  onDelete={handleDeleteVehicle}
                  height={260}
                  cardScrollRef={cardScrollRef}
                />
              </View>
            )}
            {domainError && domainError.code === IFootprintErrorCodes.VEHICLE_ALREADY_EXISTS && (
              <View style={styles.errorContainer}>
                <ErrorMessage
                  error={domainError}
                  errorMessage={t(`errors.domain-error.footprint.${domainError?.code}`)}
                  genericErrorMessage={t('errors.other')}
                />
              </View>
            )}
            <View style={[styles.rowContainer, { marginBottom: 80, width: Dimensions.get('screen').width }]}>
              <SubmitButton
                title={t('screens.transport-situation.end')}
                disabled={false}
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
    marginBottom: 16,
  },
  cardScroller: {
    marginTop: -60,
    marginBottom: 32,
  },
});
