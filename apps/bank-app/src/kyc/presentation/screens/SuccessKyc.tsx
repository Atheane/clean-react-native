import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { SuccessKyc as CheckmarkImage } from '../assets/images';

const HEIGHT = Dimensions.get('window').height;

export const SuccessKyc = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <Text style={[styles.title, theme.bank.text.boldDarkBlue]}>{t('screens.kyc.success.title')}</Text>
          <Image source={CheckmarkImage} style={{ width: 150, height: 150 }} />
          <Text style={[styles.instruction, theme.bank.text.grey]}>
            <Text style={[styles.instruction, theme.bank.text.boldGrey]}>
              {t('screens.kyc.success.congrats')}
            </Text>
            {t('screens.kyc.success.instruction-before-card')}
            <Text style={[styles.instruction, theme.bank.text.boldGrey]}>
              {t('screens.kyc.success.instruction-card')}
            </Text>
            {t('screens.kyc.success.instruction-after-card')}
          </Text>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    alignItems: 'center',
  },
  title: {
    margin: 24,
  },
  instruction: {
    textAlign: 'justify',
    width: '80%',
    marginVertical: 24,
  },
});
