import { useRef } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, SafeAreaView, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from '@rneui/themed';

import { FlightI } from '@bank/carbon-weight/dist';

import { airports } from '@clean-rn/carbon/domain';
import { FlyForm, CO2, PrimaryButton, useFlyFormData, Colors } from '@clean-rn/ui-mobile';

import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { computeFlyEmissions } from '../../application/commands';

const formattedAirports = airports.map((airport) => ({
  key: airport.IATA,
  value: airport.IATA + ' ' + airport.name,
}));

export const Fly = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // init values with previous stored values
  const { data } = useSelector((state: IRootState) => state.carbon.fly);

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
          <View style={theme.bank.container.centeredItem}>
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
    backgroundColor: Colors.bank.primary.white,
  },
  buttonContainer: {
    marginVertical: 50,
    alignItems: 'center',
  },
});
