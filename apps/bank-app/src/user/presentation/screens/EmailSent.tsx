import { StyleSheet, View, Image, Text, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { Colors } from '@clean-rn/ui-mobile';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IconMailCode } from '../assets/images';

const HEIGHT = Dimensions.get('window').height;

export const EmailSent = () => {
  // translations
  const { t } = useTranslation();

  // css theme
  const { theme } = useTheme();
  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bank.primary.white,
  },
  imageContainer: {
    marginTop: -160,
  },
  textContainer: {
    marginTop: 80,
    width: '75%',
  },
  text: {
    textAlign: 'justify',
  },
});
