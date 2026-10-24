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
} from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { ICardStackPages, IProfileStackPages, ISharedStackPages } from '../../../shared/presentation/types';

import { GradientCO2Card } from '../../../user/presentation/assets';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { APPLE_STORE_LINK, GOOGLE_PLAY_LINK } from '../../../shared/presentation/constants';
import { firstLetterCapitalize } from '@clean-rn/utils';
import { KYC_REVIEW } from '@clean-rn/user/domain';

export const Profile = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();

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
    navigation.navigate(IProfileStackPages.APPLICATION_SETTINGS as never);
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

  const onPressDeleteAccount = useCallback(() => {
    navigation.navigate(IProfileStackPages.DELETE_ACCOUNT as never);
  }, [navigation]);

  const { user } = useSelector((state: IRootState) => state.user);
  const { email } = useSelector((state: IRootState) => state.auth);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={[styles.rowContainer, { marginTop: 40 }]}>
            <Text style={[theme.bank.text.boldDarkBlue, { fontSize: 16 }]}>
              {t('screens.profile.menu.personal-info')}
            </Text>
          </View>
          <View style={[styles.rowContainer, { marginTop: 28, marginLeft: 44 }]}>
            {user?.properties.identity && (
              <Text
                style={[theme.bank.text.darkBlue]}
              >{`${firstLetterCapitalize(user.properties.identity.firstName)} ${user.properties.identity.lastName.toUpperCase()}`}</Text>
            )}
          </View>
          <View style={[styles.rowContainer, { marginTop: 28 }]}>
            <View style={styles.iconContainer}>
              <BlueGradientMail />
            </View>
            {email && (
              <View style={styles.textContainer}>
                <Text style={[theme.bank.text.darkBlue]}>{email.value}</Text>
              </View>
            )}
            {!email && user?.properties.email && (
              <View style={styles.textContainer}>
                <Text style={[theme.bank.text.darkBlue]}>{user.properties.email?.value}</Text>
              </View>
            )}
          </View>
          <View style={[styles.rowContainer, { marginTop: 28 }]}>
            <View style={styles.iconContainer}>
              <PhoneBlueGradient />
            </View>
            {user?.properties.phone && (
              <View style={styles.textContainer}>
                <Text style={[theme.bank.text.darkBlue]}>{user?.properties.phone.valueInternational}</Text>
              </View>
            )}
          </View>
          <View style={[styles.rowContainer, { marginTop: 50 }]}>
            <Text style={[theme.bank.text.boldDarkBlue, { fontSize: 16 }]}>
              {t('screens.profile.menu.my-parameters')}
            </Text>
          </View>
          <View style={[styles.rowContainer, { marginTop: 12, marginBottom: -8 }]}>
            <LinkButton
              iconLeft={() => <GradientCO2Card style={{ marginRight: 14 }} />}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.profile.menu.card-settings')}
              onPress={handlePressCardParameters}
            />
          </View>
          <View style={[styles.rowContainer, { marginVertical: -8 }]}>
            <LinkButton
              iconLeft={PhoneBlueGradient}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.profile.menu.app-settings')}
              onPress={handlePressAppParameters}
            />
          </View>
          <View style={[styles.rowContainer, { marginVertical: -8 }]}>
            <LinkButton
              iconLeft={LoveBlueGradient}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.profile.menu.love')}
              onPress={handlePressLove}
            />
          </View>
          <View style={[styles.rowContainer, { marginVertical: -8 }]}>
            <LinkButton
              iconLeft={BlueGradientMail}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.profile.menu.contact-us')}
              onPress={handlePressContact}
            />
          </View>
          <View style={[styles.rowContainer, { marginVertical: -8 }]}>
            <LinkButton
              iconLeft={CertificateBlueGradient}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.profile.menu.legal')}
              onPress={onPressLegal}
            />
          </View>
          <View style={[styles.rowContainer, { marginVertical: -8, marginLeft: 72 }]}>
            <LinkButton
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.profile.menu.cgu')}
              onPress={onPressCgu}
            />
          </View>
          <View style={[styles.rowContainer, { marginVertical: -8, marginLeft: 72 }]}>
            <LinkButton
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.profile.menu.cgu-kyc-provider')}
              onPress={onPressCguKycProvider}
            />
          </View>
          <View style={[styles.rowContainer, { marginTop: 50 }]}>
            <LinkButton
              iconLeft={RedCross}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.profile.menu.delete-account')}
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
    marginVertical: 10,
  },
});
