import { useCallback } from 'react';
import { View, StyleSheet, Text, Platform, Linking } from 'react-native';
import * as ExpoLinking from 'expo-linking';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';

import {
  LinkButton,
  LinkButtonColors,
  BlueGradientMail,
  PhoneBlueGradient,
  LoveBlueGradient,
  CertificateBlueGradient,
  RedCross,
  ProfileBlueGradient,
} from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import {
  ICardStackPages,
  IParametersStackPages,
  ISharedStackPages,
} from '../../../shared/presentation/types';

import { GradientCO2Card } from '../assets';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { APPLE_STORE_LINK, GOOGLE_PLAY_LINK } from '../../../shared/presentation/constants';
import { KYC_REVIEW } from '@clean-rn/user/domain';

export const Parameters = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { card } = useSelector((state: IRootState) => state.card);
  const { customer } = useSelector((state: IRootState) => state.kyc.customer);

  const handlePressCardParameters = useCallback(() => {
    // it won't happen
    if (!customer) {
      return;
    }
    if (!card) {
      if (customer.properties.status !== KYC_REVIEW.VALIDATED) {
        navigation.navigate(ICardStackPages.MENU, { screen: ICardStackPages.KYC_MISSING });
      } else {
        navigation.navigate(ICardStackPages.MENU, { screen: ICardStackPages.WAITING_CARD });
      }
    } else {
      navigation.navigate(ICardStackPages.MENU as never);
    }
  }, [navigation, customer, card]);

  const handlePressAppParameters = useCallback(() => {
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

  const onPressCguKycProvider = useCallback(() => {
    navigation.navigate(ISharedStackPages.CGU_KYC_PROVIDER as never);
  }, [navigation]);

  const onPressProfile = useCallback(() => {
    navigation.navigate(IParametersStackPages.PROFILE as never);
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
              iconLeft={() => <GradientCO2Card style={{ marginRight: 14 }} />}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.parameters.menu.card-settings')}
              onPress={handlePressCardParameters}
            />
          </View>
          <View style={styles.rowContainer}>
            <LinkButton
              iconLeft={PhoneBlueGradient}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.parameters.menu.app-settings')}
              onPress={handlePressAppParameters}
            />
          </View>
          <View style={styles.rowContainer}>
            <LinkButton
              iconLeft={LoveBlueGradient}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.parameters.menu.love')}
              onPress={handlePressLove}
            />
          </View>
          <View style={styles.rowContainer}>
            <LinkButton
              iconLeft={BlueGradientMail}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.parameters.menu.contact-us')}
              onPress={handlePressContact}
            />
          </View>
          <View style={styles.rowContainer}>
            <LinkButton
              iconLeft={CertificateBlueGradient}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.parameters.menu.legal')}
              onPress={onPressLegal}
            />
          </View>
          <View style={[styles.rowContainer, { marginLeft: 72 }]}>
            <LinkButton
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.parameters.menu.cgu')}
              onPress={onPressCgu}
            />
          </View>
          <View style={[styles.rowContainer, { marginLeft: 72 }]}>
            <LinkButton
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.parameters.menu.cgu-kyc-provider')}
              onPress={onPressCguKycProvider}
            />
          </View>
          {/* <View style={[styles.rowContainer, { marginLeft: 36 }]}>
            <LinkButton
              iconLeft={ProfileBlueGradient}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.parameters.menu.profile')}
              onPress={onPressProfile}
            />
          </View> */}
          <View style={[styles.rowContainer, { marginTop: 50 }]}>
            <LinkButton
              iconLeft={RedCross}
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
