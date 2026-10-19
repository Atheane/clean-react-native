import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { VehicleConsumptionT } from '@bank/carbon-weight/dist';

import { useTransportFormData } from '@carbon/presentation/hooks';
import { TransportForm } from '@carbon/presentation/components';
import { PrimaryButton } from '@shared/presentation/components';
import { CO2 } from '@carbon/presentation/assets';
import { computeTransportEmissions } from '@carbon/infrastructure/redux';

export const Transport = () => {
  const { t } = useTranslation();
  // formData
  const { disabled, formData, resetFormData, handleFormData } = useTransportFormData();

  const dispatch = useDispatch();
  const handleOnPress = () => {
    dispatch(computeTransportEmissions(formData as VehicleConsumptionT));
  };

  return (
    <View style={styles.container}>
      <TransportForm onChangeForm={resetFormData} onChangeField={handleFormData} />

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title={t('screens.carbon.compute')}
          pressed={false}
          onPress={handleOnPress}
          iconOne={CO2}
          fixedSize
          disabled={disabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 50,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
