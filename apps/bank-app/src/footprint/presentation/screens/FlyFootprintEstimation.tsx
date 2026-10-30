import { useRef } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '@rneui/themed';

import { FlightI } from '@bank/carbon-weight/dist';

import { airports } from '@clean-rn/footprint/domain';
import { CO2, PrimaryButton } from '@clean-rn/ui-mobile';
import { FlyFootprintEstimationForm } from './forms';
import { useFlyFormData } from '../hooks';

import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { PlaneEmpty } from '../assets/images';
import { computeFlyEmissions } from '../../application/commands';

import { Colors } from '../../../shared/presentation/constants';

const formattedAirports = airports.map((airport) => ({
  key: airport.IATA,
  value: airport.IATA + ' ' + airport.name,
}));

export const FlyFootprintEstimation = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // init values with previous stored values
  const { data } = useSelector((state: IRootState) => state.footprint.estimate.fly);

  const { flight, flights, handleChangeField, handleOnAddFlight, handleRemoveFlight } = useFlyFormData(data);

  const dispatch = useDispatch();
  const handleOnPress = () => {
    dispatch(computeFlyEmissions(flights as FlightI[]));
  };

  const scrollViewRef = useRef<null | KeyboardAwareScrollView>(null);

  return (
    <ErrorBoundary t={t}>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
          <View style={theme.container.centeredItem}>
            <FlyFootprintEstimationForm
              airports={formattedAirports}
              flight={flight}
              flights={flights}
              onChangeField={handleChangeField}
              onAddFlight={handleOnAddFlight}
              onRemoveFlight={handleRemoveFlight}
              scrollViewRef={scrollViewRef}
              planeImage={PlaneEmpty}
            />
            <View style={styles.buttonContainer}>
              <PrimaryButton
                title={t('screens.footprint-estimation.compute')}
                onPress={handleOnPress}
                iconLeft={() => (
                  <View style={{ height: 23, justifyContent: 'center' }}>
                    <CO2 style={{ color: Colors.primary.white } as StyleProp<ViewStyle>} />
                  </View>
                )}
                long
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  buttonContainer: {
    marginVertical: 50,
    alignItems: 'center',
  },
});
