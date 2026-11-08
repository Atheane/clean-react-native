import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { FoodConsumptionT } from '@bank/carbon-weight/dist';

import { PrimaryButton, CO2 } from '@clean-rn/ui-mobile';
import { FoodFootprintEstimationForm } from './forms';
import { useFoodFormData } from '../hooks';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { computeFoodEmissions } from '../../application/commands';

import { Colors } from '../../../shared/presentation/constants';

export const FoodFootprintEstimation = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // init values with previous stored values
  const { data } = useSelector((state: IRootState) => state.footprint.estimate.food);
  // formData
  const { disabled, formData, handleFormData } = useFoodFormData(data);

  const dispatch = useDispatch();
  const handleOnPress = () => {
    dispatch(computeFoodEmissions(formData as FoodConsumptionT));
  };

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.container.centeredItem]}>
          <FoodFootprintEstimationForm initialValues={data} onChangeForm={handleFormData} />

          <View style={styles.buttonContainer}>
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
          </View>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  buttonContainer: {
    marginVertical: 100,
  },
});
