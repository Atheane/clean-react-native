import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { HouseT } from '@bank/carbon-weight/dist';

import { useHouseFormData } from '@carbon/presentation/hooks';
import { HouseForm } from '@carbon/presentation/components';
import { PrimaryButton } from '@shared/presentation/components';
import { CO2 } from '@carbon/presentation/assets';
import { computeHouseEmissions } from '@carbon/infrastructure/redux';

export const House = () => {
  const { t } = useTranslation();
  // formData
  const { disabled, formData, resetFormData, handleFormData } = useHouseFormData();

  const dispatch = useDispatch();
  const handleOnPress = () => {
    dispatch(computeHouseEmissions(formData as HouseT & { consumption: number }));
  };

  return (
    <View style={styles.container}>
      <HouseForm onChangeForm={resetFormData} onChangeField={handleFormData} />

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
