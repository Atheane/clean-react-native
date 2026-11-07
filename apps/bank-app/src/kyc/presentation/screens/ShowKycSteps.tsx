import { useCallback } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { PrimaryButton, Colors, Add } from '@clean-rn/ui-mobile';
import { InitKyc as InitKycImg } from '../assets/images';

import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

const HEIGHT = Dimensions.get('window').height;

export const ShowKycSteps = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleOnPress = useCallback(() => {
    navigation.navigate(IKycStackPages.KYC as never);
  }, [navigation]);

  const { customer } = useSelector((state: IRootState) => state.customer);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.container.centeredItem]}>
          <Image source={InitKycImg} style={{ width: 250, height: 250 }} />
          <View style={styles.instructionContainer}>
            <Text
              style={theme.text.lightGrey}
            >{`${customer?.properties.numberOfSteps} ${t('screens.kyc.show-kyc-steps.steps')}`}</Text>
            <Text style={theme.text.lightGrey}>{t('screens.kyc.show-kyc-steps.step1')}</Text>
            <Text style={theme.text.lightGrey}>{t('screens.kyc.show-kyc-steps.step2')}</Text>
            <Text style={theme.text.lightGrey}>{t('screens.kyc.show-kyc-steps.step3')}</Text>
            {customer?.properties?.numberOfSteps && customer.properties.numberOfSteps > 3 && (
              <Text style={theme.text.lightGrey}>{t('screens.kyc.show-kyc-steps.step4')}</Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              long
              title={t('screens.kyc.show-kyc-steps.check-identity')}
              iconLeft={() => (
                <View style={styles.iconContainer}>
                  <Add color={Colors.primary.white} />
                </View>
              )}
              onPress={handleOnPress}
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
    height: HEIGHT,
    marginTop: -80,
  },
  iconContainer: { position: 'relative', left: 10, top: 2 },
  instructionContainer: {
    width: '80%',
    marginBottom: 40,
  },
  buttonContainer: {
    marginTop: 0,
  },
});
