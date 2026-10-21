import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { Delivery } from '../assets/images';

const HEIGHT = Dimensions.get('window').height;

export const CardSent = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <Text style={[styles.title, theme.bank.text.boldDarkBlue]}>{t('screens.kyc.card-sent.title')}</Text>
          <View style={styles.subContainer}>
            <Image source={Delivery} style={{ width: 229, height: 86 }} />
          </View>
          <Text style={[styles.instruction, theme.bank.text.grey, styles.subContainer]}>
            {t('screens.kyc.card-sent.text')}
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
  subContainer: {
    marginTop: 80,
  },
});
