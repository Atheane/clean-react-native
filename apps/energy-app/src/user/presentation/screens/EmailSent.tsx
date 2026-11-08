import { useEffect } from 'react';
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IconMailCode } from '../assets/images';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IStoreKey } from '../../../shared/application/types';
import { Colors } from '../../../shared/presentation/constants';

const HEIGHT = Dimensions.get('window').height;

export const EmailSent = () => {
  // translations
  const { t } = useTranslation();

  const { email } = useSelector((state: IRootState) => state.user);

  useEffect(() => {
    if (!email) {
      return;
    }
    AsyncStorage.setItem(IStoreKey.USER_EMAIL, email.value)
      .then(() => {
        console.log('EMAIL SAVED!!!!!!!');
      })
      .catch(console.log);
  }, [email]);

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
            <Text style={[theme.text.darkBlue, styles.text]}>{t('screens.email-sent.text')}</Text>
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
    backgroundColor: Colors.primary.white,
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
