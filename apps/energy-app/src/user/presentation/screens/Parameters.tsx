import { useCallback } from 'react';
import { View, StyleSheet, Platform, Linking } from 'react-native';
import * as ExpoLinking from 'expo-linking';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import {
  LinkButton,
  LinkButtonColors,
  Email,
  Phone,
  Love,
  CertificateBlueGradient,
  RedCross,
  Profile,
  Colors,
} from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IParametersStackPages, ISharedStackPages } from '../../../shared/presentation/types';

import { APPLE_STORE_LINK, GOOGLE_PLAY_LINK } from '../../../shared/presentation/constants';

export const Parameters = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handlePressAppSettings = useCallback(() => {
    navigation.navigate(IParametersStackPages.APPLICATION_SETTINGS as never);
  }, [navigation]);

  const handlePressLove = useCallback(() => {
    Linking.openURL(Platform.OS === 'ios' ? APPLE_STORE_LINK : GOOGLE_PLAY_LINK);
  }, []);

  const handlePressContact = useCallback(() => {
    if (Platform.OS === 'ios') {
      ExpoLinking.openURL(`mailto:contact@example.com`);
    } else {
      Linking.openURL(`mailto:contact@example.com`);
    }
  }, []);

  const onPressLegal = useCallback(() => {
    navigation.navigate(ISharedStackPages.LEGAL as never);
  }, [navigation]);

  const onPressCgu = useCallback(() => {
    navigation.navigate(ISharedStackPages.CGU as never);
  }, [navigation]);

  const onPressProfile = useCallback(() => {
    navigation.navigate(IParametersStackPages.PROFILE_IDENTITY as never);
  }, [navigation]);

  const onPressDeleteAccount = useCallback(() => {
    navigation.navigate(IParametersStackPages.DELETE_ACCOUNT as never);
  }, [navigation]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <LinkButton
              iconLeft={() => (
                <Phone
                  startColor={Colors.secondary.pink}
                  endColor={Colors.primary.darkBlue}
                  style={{ marginRight: 16 }}
                />
              )}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.parameters.menu.app-settings')}
              onPress={handlePressAppSettings}
            />
          </View>
          <View style={styles.rowContainer}>
            <LinkButton
              iconLeft={() => (
                <Love
                  width={27}
                  height={27}
                  startColor={Colors.secondary.pink}
                  endColor={Colors.primary.darkBlue}
                  style={{ marginRight: 16 }}
                />
              )}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.parameters.menu.love')}
              onPress={handlePressLove}
            />
          </View>
          <View style={styles.rowContainer}>
            <LinkButton
              iconLeft={() => (
                <Email
                  startColor={Colors.secondary.pink}
                  endColor={Colors.primary.darkBlue}
                  style={{ marginRight: 14 }}
                />
              )}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.parameters.menu.contact-us')}
              onPress={handlePressContact}
            />
          </View>
          <View style={styles.rowContainer}>
            <LinkButton
              iconLeft={() => <CertificateBlueGradient style={{ marginRight: 16 }} />}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.parameters.menu.legal')}
              onPress={onPressLegal}
            />
          </View>
          <View style={styles.rowContainer}>
            <LinkButton
              iconLeft={() => <CertificateBlueGradient style={{ marginRight: 16 }} />}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.parameters.menu.cgu')}
              onPress={onPressCgu}
            />
          </View>
          <View style={[styles.rowContainer, { marginLeft: 36 }]}>
            <LinkButton
              iconLeft={() => (
                <Profile
                  startColor={Colors.secondary.pink}
                  endColor={Colors.primary.darkBlue}
                  style={{ marginRight: 16 }}
                />
              )}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.parameters.menu.profile')}
              onPress={onPressProfile}
            />
          </View>
          <View style={[styles.rowContainer, { marginTop: 50 }]}>
            <LinkButton
              iconLeft={() => <RedCross style={{ marginRight: 16 }} />}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.parameters.menu.delete-account')}
              onPress={onPressDeleteAccount}
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
    justifyContent: 'flex-start',
    marginTop: 80,
    marginBottom: 300,
  },
  iconContainer: {
    marginLeft: 8,
    marginRight: 12,
  },
  textContainer: {
    marginTop: 6,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 32,
  },
});
