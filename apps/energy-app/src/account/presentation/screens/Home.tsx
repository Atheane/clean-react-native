import { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Linking, Platform, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { checkVersion } from 'react-native-check-version';
import { getLocales } from 'expo-localization';
import { IAccount, IAccountType } from '@clean-rn/account/domain';

import {
  TopRightFlowersBg,
  TopDownBackground,
  ScrollBackground,
  BalanceList,
  Banner,
  BannerColors,
  LoaderSplashScreen,
  Colors,
  EnergyAppLogo,
  FontNames,
  LongCardIcon,
  Carbon,
  RightChevron,
} from '@clean-rn/ui-mobile';
import { useDevice } from '../../../shared/presentation/hooks/useDevice';
import { fetchRegisterDevice } from '../../../device/application/commands';
import { ErrorBoundary } from '../../../shared/presentation/hoc';
import {
  IFootprintStackPages,
  IRootStackParamList,
  ISharedStackParamList,
  ITransactionStackPages,
} from '../../../shared/presentation/types';
import { useNotification } from '../../../shared/presentation/hooks';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { listAccounts } from '../../application/commands/accounts';
import { listTransactions } from '../../../transaction/application/commands';

import { APPLE_STORE_LINK, GOOGLE_PLAY_LINK } from '../../../shared/presentation/constants';

const locale = getLocales()[0]?.languageCode || 'fr';

type NavigationProp = NativeStackNavigationProp<IRootStackParamList & ISharedStackParamList>;

export const Home = () => {
  // translation
  const { t } = useTranslation();
  const { pending: loginPending } = useSelector((state: IRootState) => state.auth);

  const { accounts, pending: accountPending } = useSelector((state: IRootState) => state.account);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAccounts());
  }, [dispatch, loginPending]);

  const navigation = useNavigation<NavigationProp>();

  const handleOnPressAccount = useCallback(
    (data: { uid: string; value: number; title: string; color: string }) => {
      const account = accounts?.find((account: IAccount) => account.accountId === parseInt(data.uid));
      if (!account) return;
      dispatch(listTransactions({ account }));
      navigation.navigate(ITransactionStackPages.MENU, {
        screens: [ITransactionStackPages.TRANSACTIONS],
      } as never);
    },
    [dispatch, navigation, accounts],
  );

  const handlePressBanner = useCallback(() => {
    console.log('handlePressBanner');
  }, [navigation]);

  const { expoPushToken, notificationEnabled } = useNotification();

  const { deviceId, brand, model, os, osVersion } = useDevice();
  // Add a state to track if the call has already been made
  const [deviceRegistered, setDeviceRegistered] = useState(false);

  useEffect(() => {
    // Check if expoSDK has finished fetching the notificationEnabled status and the expoPushToekn
    // Check if  deviceId, brand, model, os and osVersion are defined
    // and if the call has not yet been made
    if (
      deviceRegistered === true ||
      notificationEnabled === undefined ||
      deviceId === '' ||
      !brand ||
      !model ||
      !os ||
      !osVersion
    ) {
      return;
    }

    dispatch(
      fetchRegisterDevice({
        deviceId,
        firebaseId: expoPushToken,
        brand,
        model,
        os,
        osVersion,
        appVersion: process.env.EXPO_PUBLIC_APP_VERSION || '',
      }),
    );
    // Mark the call as done
    setDeviceRegistered(true);
  }, [expoPushToken, notificationEnabled, deviceId, brand, model, os, osVersion, dispatch, deviceRegistered]);

  const [appNeedUpdate, setAppNeedUpdate] = useState(false);
  useEffect(() => {
    checkVersion({
      currentVersion: process.env.EXPO_PUBLIC_APP_VERSION,
      bundleId: process.env.EXPO_PUBLIC_BUNDLE_IDENTIFIER,
      country: locale,
    }).then((version) => {
      if (version.needsUpdate !== undefined || version.needsUpdate !== null) {
        setAppNeedUpdate(version.needsUpdate);
      }
    });
  }, []);

  const handleUpdateNeeded = useCallback(() => {
    Linking.openURL(Platform.OS === 'ios' ? APPLE_STORE_LINK : GOOGLE_PLAY_LINK);
  }, []);

  const dataBalance = accounts?.map((item: IAccount) => ({
    uid: item.accountId.toString(),
    value: item.authorizedBalance,
    title: item.accountType === IAccountType.MAIN ? t('screens.home.balance.main') : '',
    unit: '€G',
  }));

  const handlePressCO2 = () => {
    navigation.navigate(IFootprintStackPages.FOOTPRINT_ESTIMATION as never);
  };

  return accountPending ? (
    <LoaderSplashScreen />
  ) : (
    <ErrorBoundary t={t}>
      {appNeedUpdate && (
        <Banner
          title={t('screens.home.banner.update-needed')}
          colorBanner={BannerColors.PINK}
          rightIcon
          onPressRightIcon={handleUpdateNeeded}
        />
      )}
      <View style={styles.container}>
        <ScrollBackground background={TopDownBackground} initialScroll={-20} window={1.2}>
          <View style={styles.cardScroller}>
            <View style={styles.row}>
              <LongCardIcon
                text={t('screens.menu-footprint.2min')}
                leftIcon={() => (
                  <Carbon
                    color={Colors.primary.lightGreen}
                    startColor={Colors.primary.grey}
                    endColor={Colors.primary.grey}
                  />
                )}
                rightIcon={() => <RightChevron color={Colors.primary.lightGreen} />}
                onPress={handlePressCO2}
              />
            </View>
          </View>

          <View style={styles.decoration}>
            <TopRightFlowersBg />
          </View>
          {accounts && accounts.length > 0 && (
            <View style={styles.accountList}>
              <BalanceList
                data={dataBalance || []}
                onPress={handleOnPressAccount}
                noDataLabel={t('screens.home.balance.noaccounts')}
                color={Colors.primary.white}
              />
            </View>
          )}
          <View style={styles.energy-appContainer}>
            <View style={styles.row}>
              <EnergyAppLogo />
              <Text style={styles.textEnergyApp}>{t('screens.home.energy-app')}</Text>
            </View>
          </View>
        </ScrollBackground>
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  cardScroller: {
    flex: 1,
    position: 'relative',
    top: 120,
    width: Dimensions.get('window').width,
  },
  decoration: {
    position: 'absolute',
    top: 20,
    right: -40,
  },
  accountList: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.6,
    left: 20,
  },
  energy-appContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.75,
    left: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.75,
    gap: 10,
  },
  textEnergyApp: {
    color: Colors.primary.white,
    fontSize: 13,
    fontFamily: FontNames.MartelSans_400Regular,
    paddingHorizontal: 5,
  },
});
