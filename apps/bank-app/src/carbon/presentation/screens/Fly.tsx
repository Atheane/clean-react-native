import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { FlyForm } from '@carbon/presentation/components';
import { CO2 } from '@carbon/presentation/assets';

import { PrimaryButton } from '@shared/presentation/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import airports from '@carbon/domain/constants/airports.json';
import { useFlyFormData } from '@carbon/presentation/hooks';
import { FlightI } from '@bank/carbon-weight/dist';
import { computeFlyEmissions } from '@carbon/infrastructure/redux';
import { useRef } from 'react';

const formattedAirports = airports.map((airport) => ({
  key: airport.IATA,
  value: airport.IATA + ' ' + airport.name,
}));

export const Fly = () => {
  const { t } = useTranslation();

  const { flight, flights, handleChangeField, handleOnAddFlight, handleRemoveFlight } = useFlyFormData();

  const dispatch = useDispatch();
  const handleOnPress = () => {
    dispatch(computeFlyEmissions(flights as FlightI[]));
  };

  const scrollViewRef = useRef<null | KeyboardAwareScrollView>(null);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} ref={scrollViewRef}>
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
          pressed={false}
          onPress={handleOnPress}
          iconOne={CO2}
          disabled={false}
          fixedSize
        />
      </View>
    </KeyboardAwareScrollView>
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
