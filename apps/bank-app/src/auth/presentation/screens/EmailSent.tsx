import { StyleSheet, View, Image, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IconMailCode } from '../assets/images';

export const EmailSent = () => {
  /// translations
  const { t } = useTranslation();

  const { theme } = useTheme();
  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={{ width: 100, height: 100 }} source={IconMailCode} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[theme.bank.text.darkBlue, styles.text]}>{t('screens.email-sent.text')}</Text>
          </View>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 100,
  },
  textContainer: {
    marginTop: 80,
    width: '80%',
  },
  text: {
    textAlign: 'justify',
  },
});
