import { useCallback } from 'react';
import { View, Text, StyleSheet, Image, StyleProp, ViewStyle, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { PrimaryButton, Colors, Add } from '@clean-rn/ui-mobile';
import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { InitKyc as InitKycImg } from '../assets/images';

const HEIGHT = Dimensions.get('window').height;

export const InitKyc = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleOnPress = useCallback(() => {
    navigation.navigate(IKycStackPages.KYC as never);
  }, [navigation]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.bank.container.centeredItem]}>
          <Image source={InitKycImg} style={{ width: 250, height: 250 }} />
          <View style={styles.instructionContainer}>
            <Text style={theme.bank.text.lightGrey}>{t('screens.kyc.init.instruction')}</Text>
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
