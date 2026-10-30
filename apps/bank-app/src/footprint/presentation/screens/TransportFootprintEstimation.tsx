import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { VehicleConsumptionT } from '@bank/carbon-weight/dist';

import { PrimaryButton, CO2, Colors } from '@clean-rn/ui-mobile';
import { TransportFootprintEstimationForm } from './forms';
import { useTransportFormData } from '../hooks';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { computeTransportEmissions } from '../../application/commands';

export const TransportFootprintEstimation = () => {
  const { t } = useTranslation();

  // init values with previous stored values
  const { data } = useSelector((state: IRootState) => state.carbon.transport);

  // formData
  const { disabled, formData, resetFormData, handleFormData } = useTransportFormData(data);

  const dispatch = useDispatch();
  const handleOnPress = () => {
    dispatch(computeTransportEmissions(formData as VehicleConsumptionT));
  };

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container]}>
          <TransportFootprintEstimationForm
            initialValues={data}
            onChangeForm={resetFormData}
            onChangeField={handleFormData}
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
              disabled={disabled}
            />
          </View>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 400,
  },
  buttonContainer: {
    marginTop: 140,
  },
});
