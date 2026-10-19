import { useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import {
  Meeting,
  Tree,
  TopRightFlowersBg,
  Banner,
  CardScroller,
  TopDownBackground,
  ScrollBackground,
  WhiteBalanceList,
  BannerColors,
} from '@clean-rn/ui-mobile';
import { IAccount } from '@clean-rn/account/domain';
import { listAccounts } from '../../application/commands/list-accounts';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
// import { fetchTransactions } from '@account/infrastructure/redux';

//todo change with api
const fakeEventsData = [
  {
    icon: Tree,
    text: 'Éteindre les veilleuses',
    uid: 'ajkzhrei1',
  },
  { icon: Meeting, text: 'Éteignez en sortant d’une pièce.', uid: 'ajkzhrei2' },
  {
    icon: Tree,
    text: 'Eteindre les lumières inutiles',
    uid: 'ajkzhrei3',
  },
  {
    icon: Meeting,
    text: 'Privilégier le programme « Eco »',
    uid: 'ajkzhrei4',
  },
  {
    icon: Tree,
    text: 'Raccourcir les programmes',
    uid: 'ajkzhrei5',
  },
  {
    icon: Meeting,
    text: 'Couvrez les poêles et casseroles',
    uid: 'ajkzhrei6',
  },
  {
    icon: Tree,
    text: 'Limiter la taille et la luminosité de la TV',
    uid: 'ajkzhrei7',
  },
  {
    icon: Meeting,
    text: 'Débrancher les ordinateurs',
    uid: 'ajkzhrei8',
  },
];

export const Home = () => {
  // translation
  const { t } = useTranslation();

  const { accounts, pending } = useSelector((state: IRootState) => state.account.accounts);
  console.log('accounts', accounts);
  console.log('pending', pending);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAccounts());
  }, [dispatch]);

  // const { error: transactionsError } = useSelector((state: IRootState) => state.account.transactions);
  const transactionsError: Error = null;
  const handleOnPressAccount = useCallback(
    (account: IAccount) => {
      // dispatch(fetchTransactions({ account }));
    },
    [dispatch],
  );

  return (
    <ErrorBoundary t={t}>
      {/* {accountsError && (
        <Banner title={accountsError.message} colorBanner={BannerColors.PINK} rightIcon={false} />
      )} */}
      {/* {transactionsError && (
        <Banner title={transactionsError.message} colorBanner={BannerColors.PINK} rightIcon={false} />
      )} */}
      <View style={styles.container}>
        <ScrollBackground background={TopDownBackground} initialScroll={-20} window={1.2}>
          <View style={styles.cardScroller}>
            <CardScroller data={fakeEventsData} height={200} />
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
