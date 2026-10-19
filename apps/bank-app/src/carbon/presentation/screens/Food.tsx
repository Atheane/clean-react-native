import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { FoodConsumptionT } from '@bank/carbon-weight/dist';

import { useFoodFormData } from '@carbon/presentation/hooks';
import { FoodForm } from '@carbon/presentation/components';
import { PrimaryButton } from '@shared/presentation/components';
import { CO2 } from '@carbon/presentation/assets';
import { computeFoodEmissions } from '@carbon/infrastructure/redux';
import { useSelector } from 'react-redux';
import { RootState } from '@shared/infrastructure/redux/reducers';

export const Food = () => {
  const { t } = useTranslation();

  // init values with previous stored values
  const { payload } = useSelector((state: RootState) => state.carbon.food);

  // formData
  const { disabled, formData, handleFormData } = useFoodFormData(payload);

  const dispatch = useDispatch();
  const handleOnPress = () => {
    dispatch(computeFoodEmissions(formData as FoodConsumptionT));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <FoodForm initialValues={payload} onChangeForm={handleFormData} />

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 60,
  },
  buttonContainer: {
    marginTop: 40,
  },
});
