import { useCallback, useEffect, useState, useMemo } from 'react';
import { View, StyleSheet, Dimensions, Linking, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { checkVersion } from 'react-native-check-version';
import { getLocales } from 'expo-localization';

import {
  TopRightFlowersBg,
  CardScroller,
  TopDownBackground,
  ScrollBackground,
  BalanceList,
  Banner,
  BannerColors,
  LoaderSplashScreen,
  useDevice,
  Colors,
} from '@clean-rn/ui-mobile';
import { useNotification } from '../../../shared/presentation/hooks';
import { IAccount, IAccountType } from '@clean-rn/account/domain';
import { IKycState } from '@clean-rn/kyc/domain';

import { ErrorBoundary } from '../../../shared/presentation/hoc';
import {
  IKycStackPages,
  ISharedStackPages,
  ITransactionStackPages,
} from '../../../shared/presentation/types';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { fetchRegisterDevice } from '../../../device/application/commands';

import { listAccounts } from '../../application/commands/accounts';
import { listTransactions } from '../../../transaction/application/commands';
import { deleteEventCard } from '../../application/commands/event-cards';

import {
  APPLE_STORE_LINK,
  GOOGLE_PLAY_LINK,
  eventsCardsContent,
} from '../../../shared/presentation/constants';

const locale = getLocales()[0]?.languageCode || 'fr';

export const Home = () => {
  // translation
  const { t } = useTranslation();
  const { pending: loginPending } = useSelector((state: IRootState) => state.auth);

  const { accounts, pending: accountPending } = useSelector((state: IRootState) => state.account.accounts);
  const { deletedCards } = useSelector((state: IRootState) => state.account.deletedEventCards);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAccounts());
  }, [dispatch, loginPending]);

  const navigation = useNavigation();

  const handleOnPressAccount = useCallback(
    (data: { uid: string; value: number; title: string; color: string }) => {
      const account = accounts?.find((account: IAccount) => account.accountId === parseInt(data.uid));
      if (!account) return;
      dispatch(listTransactions({ account }));
      navigation.navigate(ITransactionStackPages.MENU, { screens: [ITransactionStackPages.TRANSACTIONS] });
    },
    [dispatch, navigation, accounts],
  );

  const handleOnPressCard = useCallback(
    (uid: string) => {
      navigation.navigate(ISharedStackPages.MODAL_WEBVIEW, { uid });
    },
    [navigation],
  );

  const handlePressBanner = useCallback(() => {
    navigation.navigate(IKycStackPages.MENU as never);
  }, [navigation]);

  const handleOnDeleteCard = useCallback(
    (uid: string) => {
      dispatch(deleteEventCard({ uid }));
    },
    [dispatch],
  );

  const { firebaseToken, notificationEnabled } = useNotification();
  const { deviceId, brand, model, os, osVersion } = useDevice();

  useEffect(() => {
    if (
      deviceId !== '' &&
      brand &&
      model &&
      os !== '' &&
      osVersion &&
      ((notificationEnabled && firebaseToken) || notificationEnabled === false)
    ) {
      dispatch(
        fetchRegisterDevice({
          deviceId,
          firebaseId: firebaseToken,
          brand,
          model,
          os,
          osVersion,
          appVersion: process.env.EXPO_PUBLIC_APP_VERSION || '1.0.8',
        }),
      );
    }
  }, [firebaseToken, notificationEnabled, deviceId, brand, model, os, osVersion, dispatch]);

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

  // show identity banner if customer not validated and if no card
  const { customer, pending: kycPending } = useSelector((state: IRootState) => state.kyc.customer);

  const dataEventCards = useMemo(
    () =>
      eventsCardsContent
        .filter((item: { image: any; text: string; uid: string }) => {
          if (!deletedCards.includes(item.uid)) {
            return item;
          }
        })
        .map((item) => ({
          ...item,
          text: t('screens.account.cards.' + item.uid),
        })),
    [deletedCards, t],
  );

  const dataBalance = accounts?.map((item: IAccount) => ({
    uid: item.accountId.toString(),
    value: item.authorizedBalance,
    title: item.accountType === IAccountType.MAIN ? t('screens.home.balance.main') : '',
    unit: '€G',
  }));

  return accountPending || kycPending ? (
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
      {customer &&
        (customer.properties.kyc?.state === IKycState.INIT ||
          customer.properties.kyc?.state === IKycState.INCOMPLETE ||
          customer.properties.kyc?.state === IKycState.REFUSED) && (
          <Banner
            title={t('screens.home.banner.validation-identity')}
            colorBanner={
              customer.properties.kyc?.state === IKycState.REFUSED ? BannerColors.PINK : BannerColors.PURPLE
            }
            rightIcon
            onPressRightIcon={handlePressBanner}
          />
        )}
      <View style={styles.container}>
        <ScrollBackground background={TopDownBackground} initialScroll={-20} window={1.2}>
          <View style={styles.cardScroller}>
            <CardScroller
              data={dataEventCards}
              height={260}
              onPress={handleOnPressCard}
              onDelete={handleOnDeleteCard}
            />
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
    top: 60,
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
});
