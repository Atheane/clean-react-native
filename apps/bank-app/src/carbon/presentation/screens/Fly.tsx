import { useRef } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FlightI } from '@bank/carbon-weight/dist';

import { airports } from '@clean-rn/carbon/domain';
import { FlyForm, CO2, PrimaryButton, useFlyFormData, Colors } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

// import { computeFlyEmissions } from '@carbon/infrastructure/redux';

const formattedAirports = airports.map((airport) => ({
  key: airport.IATA,
  value: airport.IATA + ' ' + airport.name,
}));

export const Fly = () => {
  const { t } = useTranslation();

  const { flight, flights, handleChangeField, handleOnAddFlight, handleRemoveFlight } = useFlyFormData();

  const dispatch = useDispatch();
  const handleOnPress = () => {
    // dispatch(computeFlyEmissions(flights as FlightI[]));
  };

  const scrollViewRef = useRef<null | KeyboardAwareScrollView>(null);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <FlyForm
            airports={formattedAirports}
            flight={flight}
            flights={flights}
            onChangeField={handleChangeField}
            onAddFlight={handleOnAddFlight}
            onRemoveFlight={handleRemoveFlight}
            scrollViewRef={scrollViewRef}
          />
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={t('screens.carbon.compute')}
              onPress={handleOnPress}
              iconOne={() => (
                <View style={{ height: 23, justifyContent: 'center' }}>
                  <CO2 style={{ color: Colors.bank.primary.white } as StyleProp<ViewStyle>} />
                </View>
              )}
              disabled={false}
              long
            />
          </View>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginVertical: 20,
  },
});
