import { View, StyleSheet, StyleProp, ViewStyle, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { FoodConsumptionT } from '@bank/carbon-weight/dist';

import { useFoodFormData, FoodForm, PrimaryButton, CO2, Colors } from '@clean-rn/ui-mobile';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { computeFoodEmissions } from '../../application/commands';

const HEIGHT = Dimensions.get('window').height;

export const Food = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // init values with previous stored values
  const { data } = useSelector((state: IRootState) => state.carbon.food);
  // formData
  const { disabled, formData, handleFormData } = useFoodFormData(data);

  const dispatch = useDispatch();
  const handleOnPress = () => {
    dispatch(computeFoodEmissions(formData as FoodConsumptionT));
  };

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.bank.container.centeredItem]}>
          <FoodForm initialValues={data} onChangeForm={handleFormData} />

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
