import { View, StyleSheet, StyleProp, ViewStyle, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { HouseT } from '@bank/carbon-weight/dist';

import { useHouseFormData, HouseForm, PrimaryButton, CO2, Colors } from '@clean-rn/ui-mobile';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
// import { computeHouseEmissions } from '@carbon/infrastructure/redux';

export const House = () => {
  const { t } = useTranslation();
  // formData
  const { disabled, formData, resetFormData, handleFormData } = useHouseFormData();

  const dispatch = useDispatch();
  const handleOnPress = () => {
    // dispatch(computeHouseEmissions(formData as HouseT & { consumption: number }));
  };

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView fixedHeight>
        <View style={styles.container}>
          <HouseForm onChangeForm={resetFormData} onChangeField={handleFormData} />

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
    marginBottom: 60,
    marginTop: 50,
  },
  buttonContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height - 230,
  },
});
