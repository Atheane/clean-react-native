import { useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text, Linking, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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
import { IProfileStackPages, ISharedStackPages } from '../../../shared/presentation/types';

import { GradientBell, GradientCO2Card } from '../../../user/presentation/assets';
import { fetchGetCard } from '../../../card/application/commands';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { APPLE_STORE_LINK, GOOGLE_PLAY_LINK } from '../../../shared/presentation/constants';
import { firstLetterCapitalize } from '@clean-rn/utils';

const HEIGHT = Dimensions.get('screen').height;
export const Profile = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const dispatch = useDispatch();

  const handlePressApplicationSettings = useCallback(() => {
    navigation.navigate(IProfileStackPages.NOTIFICATON_SETTINGS as never);
  }, [navigation]);

  const handlePressCardParameters = useCallback(() => {
    dispatch(fetchGetCard());
  }, [dispatch]);

  const handlePressLove = useCallback(() => {
    Linking.openURL(Platform.OS === 'ios' ? APPLE_STORE_LINK : GOOGLE_PLAY_LINK);
  }, []);

  const handlePressContact = useCallback(() => {
    Linking.openURL(
      `mailto:contact@example.com?subject=${t('contact-email.subject.contact')}&body=${t('contact-email.body.contact')}`,
    );
  }, [t]);

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

  const { user, email } = useSelector((state: IRootState) => state.user);

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
          <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
              <BlueGradientMail />
            </View>
            {email && (
              <View style={styles.textContainer}>
                <Text style={[theme.bank.text.darkBlue]}>{email.value}</Text>
              </View>
            )}
          </View>
          <View style={styles.rowContainer}>
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
              iconLeft={GradientCO2Card}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.profile.menu.card-settings')}
              onPress={handlePressCardParameters}
            />
          </View>
          <View style={[styles.rowContainer, { marginVertical: -8, marginLeft: 28 }]}>
            <LinkButton
              iconLeft={GradientBell}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.profile.menu.notifications')}
              onPress={handlePressApplicationSettings}
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
          <View style={[styles.rowContainer, { marginVertical: 50 }]}>
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
