import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { VehicleConsumptionT } from '@bank/carbon-weight/dist';

import { PrimaryButton, CO2 } from '@clean-rn/ui-mobile';
import { TransportFootprintEstimationForm } from './forms';
import { useTransportFormData } from '../hooks';
import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { Colors } from '../../../shared/presentation/constants';

import { computeTransportEmissions } from '../../application/commands';

export const TransportFootprintEstimation = () => {
  const { t } = useTranslation();

  // init values with previous stored values
  const { data } = useSelector((state: IRootState) => state.footprint.estimate.transport);

  // formData
  const { disabled, formData, resetFormData, handleFormData } = useTransportFormData(data);

  const dispatch = useDispatch();
  const handleOnPress = () => {
    dispatch(computeTransportEmissions(formData as VehicleConsumptionT));
  };

  return (
    <ErrorBoundary t={t}>
      <ScrollView
        style={{ flex: 1, backgroundColor: Colors.primary.white }}
        contentContainerStyle={styles.container}
      >
        <TransportFootprintEstimationForm
          initialValues={data}
          onChangeForm={resetFormData}
          onChangeField={handleFormData}
        />

        <PrimaryButton
          title={t('screens.footprint-estimation.compute')}
          onPress={handleOnPress}
          iconLeft={() => (
            <View style={{ height: 23, justifyContent: 'center' }}>
              <CO2 color={Colors.primary.white} />
            </View>
          )}
          long
          disabled={disabled}
        />
      </ScrollView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary.white,
    marginVertical: 100,
  },
});
