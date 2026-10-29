import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { HouseT } from '@bank/carbon-weight/dist';

import { PrimaryButton, CO2, Colors } from '@clean-rn/ui-mobile';

import { useHouseFormData } from '../hooks';
import { HeaterFootprintEstimationForm } from './forms';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { computeHouseEmissions } from '../../application/commands';

export const Works = () => {
  const { t } = useTranslation();

  // init values with previous stored values
  const { data } = useSelector((state: IRootState) => state.carbon.house);
  // formData
  const { disabled, formData, resetFormData, handleFormData } = useHouseFormData(data);

  const dispatch = useDispatch();
  const handleOnPress = () => {
    dispatch(computeHouseEmissions(formData as HouseT & { consumption: number } & { builtYear: number }));
  };

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container]}>
          <HeaterFootprintEstimationForm
            initialValues={data}
            onChangeForm={resetFormData}
            onChangeField={handleFormData}
          />

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={t('screens.carbon.compute')}
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 400,
  },
  buttonContainer: {
    marginTop: 140,
  },
});
