import { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Linking, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { checkVersion } from 'react-native-check-version';

import {
  TopRightFlowersBg,
  CardScroller,
  TopDownBackground,
  ScrollBackground,
  WhiteBalanceList,
  Banner,
  BannerColors,
  LoaderSplashScreen,
  useNotification,
  useDevice,
} from '@clean-rn/ui-mobile';
import { KYC_REVIEW } from '@clean-rn/user/domain';
import { IAccount } from '@clean-rn/account/domain';
import Constants from 'expo-constants';

import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { IKycStackPages, ISharedStackPages } from '../../../shared/presentation/types';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { fetchRegisterDevice } from '../../../device/application/commands';

import { listAccounts } from '../../application/commands/accounts';
import { listTransactions } from '../../../transaction/application/commands';
import { deleteEventCard } from '../../application/commands/event-cards';

import { eventsCardsContent } from '../constants';
import { APPLE_STORE_LINK, GOOGLE_PLAY_LINK } from '../../../shared/presentation/constants';

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

  const handleOnPressAccount = useCallback(
    (account: IAccount) => {
      dispatch(listTransactions({ account }));
    },
    [dispatch],
  );

  const navigation = useNavigation();

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
          appVersion: Constants.expoConfig?.extra?.APP_VERSION,
        }),
      );
    }
  }, [firebaseToken, notificationEnabled, deviceId, brand, model, os, osVersion, dispatch]);

  const [appNeedUpdate, setAppNeedUpdate] = useState(true);
  useEffect(() => {
    checkVersion().then((version) => {
      if (version?.needsUpdate) {
        setAppNeedUpdate(version.needsUpdate);
      }
    });
  }, []);

  const handleUpdateNeeded = useCallback(() => {
    Linking.openURL(Platform.OS === 'ios' ? APPLE_STORE_LINK : GOOGLE_PLAY_LINK);
  }, []);

  // show identity banner if customer not validated and if no card
  const { customer, pending: kycPending } = useSelector((state: IRootState) => state.kyc.customer);
  const { card, pending: cardPending } = useSelector((state: IRootState) => state.card);

  return accountPending || kycPending || cardPending ? (
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
      {customer && !card && (
        <Banner
          title={
            customer.properties.status === KYC_REVIEW.VALIDATED
              ? t('screens.home.banner.identity-validated')
              : t('screens.home.banner.validation-identity')
          }
          colorBanner={
            customer.properties.status === KYC_REVIEW.REFUSED ? BannerColors.PINK : BannerColors.PURPLE
          }
          rightIcon
          onPressRightIcon={handlePressBanner}
        />
      )}
      <View style={styles.container}>
        <ScrollBackground background={TopDownBackground} initialScroll={-20} window={1.2}>
          <View style={styles.cardScroller}>
            <CardScroller
              data={eventsCardsContent.filter((item: { image: any; text: string; uid: string }) => {
                if (!deletedCards.includes(item.uid)) {
                  return {
                    ...item,
                    text: t('screens.account.cards.' + item.uid),
                  };
                }
              })}
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
              <WhiteBalanceList data={accounts} onPress={handleOnPressAccount} />
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
