import { View, StyleSheet, StyleProp, ViewStyle, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { HouseT } from '@bank/carbon-weight/dist';

import { useHouseFormData, HouseForm, PrimaryButton, CO2, Colors } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { computeHouseEmissions } from '../../application/commands';

const HEIGHT = Dimensions.get('window').height;

export const House = () => {
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
        <View style={[styles.container, { height: HEIGHT }]}>
          <HouseForm initialValues={data} onChangeForm={resetFormData} onChangeField={handleFormData} />

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
    alignItems: 'center',
    marginTop: 50,
  },
  buttonContainer: {
    position: 'relative',
    bottom: '25%',
  },
});
