import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, StyleProp, ViewStyle, Dimensions } from 'react-native';
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

export const InitKyc = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleOnPress = useCallback(() => {
    navigation.navigate(IKycStackPages.KYC as never);
  }, [navigation]);

  const { customer } = useSelector((state: IRootState) => state.kyc.customer);

  const [stepsCount, setStepsCount] = useState(2);
  useEffect(() => {
    if (customer?.properties.kyc) {
      const stepsCount = customer.properties.kyc.stepsCount;
      setStepsCount(stepsCount);
    }
  }, [customer]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.bank.container.centeredItem]}>
          <Image source={InitKycImg} style={{ width: 250, height: 250 }} />
          <View style={styles.instructionContainer}>
            <Text style={theme.bank.text.lightGrey}>{`${stepsCount} ${t('screens.kyc.init.steps')}`}</Text>
            <Text style={theme.bank.text.lightGrey}>{t('screens.kyc.init.step1')}</Text>
            <Text style={theme.bank.text.lightGrey}>{t('screens.kyc.init.step2')}</Text>
            {stepsCount > 2 && <Text style={theme.bank.text.lightGrey}>{t('screens.kyc.init.step3')}</Text>}
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              long
              title={t('screens.kyc.init.check-identity')}
              iconOne={() => (
                <View style={styles.iconContainer}>
                  <Add style={{ color: Colors.bank.primary.white } as StyleProp<ViewStyle>} />
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
