import { useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import {
  TopRightFlowersBg,
  CardScroller,
  TopDownBackground,
  ScrollBackground,
  WhiteBalanceList,
  ICardType,
} from '@clean-rn/ui-mobile';
import { IAccount } from '@clean-rn/account/domain';

import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { ISharedStackPages } from '../../../shared/presentation/types';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { listAccounts } from '../../application/commands/account';
import { listTransactions } from '../../application/commands/transactions';

import { eventsCardsContent } from '../constants';

export const Accounts = () => {
  // translation
  const { t } = useTranslation();

  const { accounts, pending } = useSelector((state: IRootState) => state.account.accounts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAccounts());
  }, [dispatch]);

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

  return pending ? (
    <Text>Loading ...</Text> // todo replace with loading gif
  ) : (
    <ErrorBoundary t={t}>
      <View style={styles.container}>
        <ScrollBackground background={TopDownBackground} initialScroll={-20} window={1.2}>
          <View style={styles.cardScroller}>
            <CardScroller
              data={eventsCardsContent.map((item) => ({
                ...item,
                text: t('screens.account.cards.' + item.uid),
              }))}
              height={200}
              onPress={handleOnPressCard}
              cardType={ICardType.TOUCH_EVENT_CARD}
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
    top: 110,
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
