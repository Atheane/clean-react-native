import { useCallback } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { IAccount } from '@clean-rn/account/domain';
import {
  LinkButton,
  LinkButtonColors,
  Bic as BicIcon,
  ExportPdf,
  Iban as IbanIcon,
  TopBackground,
  CopyValueClipboard,
  TransactionsCardsList,
  WhiteBalance,
  Colors,
  FontNames,
} from '@clean-rn/ui-mobile';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IHomeStackPages } from '../../../shared/presentation/types';
import { Oups } from '../assets/images';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

const Top = ({ currentAccount }: { currentAccount?: IAccount }) => {
  const { t } = useTranslation();

  const navigation = useNavigation();

  const handleOnPressPdf = useCallback(() => {
    navigation.navigate(IHomeStackPages.ACCOUNT_STATEMENTS, { account: currentAccount });
  }, [navigation, currentAccount]);

  return (
    <View style={styles.row}>
      <View style={styles.whiteBalance}>
        {currentAccount && <WhiteBalance account={currentAccount} title={t('screens.account.balance')} />}
      </View>
      <View style={styles.pdf}>
        <LinkButton
          pressed={false}
          onPress={handleOnPressPdf}
          iconOne={ExportPdf}
          colorOption={LinkButtonColors.WHITE}
        />
      </View>
    </View>
  );
};

const ContentNoTransactions = ({ currentAccount }: { currentAccount?: IAccount }) => {
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.scrollNoTransactions} showsVerticalScrollIndicator={false}>
      <Image source={Oups} style={styles.oupsImage} />
      <View style={styles.textContainer}>
        <Text style={styles.oupsText}>{t('screens.account.oups')}</Text>
      </View>
      {currentAccount && (
        <View>
          <CopyValueClipboard value={currentAccount.iban.value} icon={IbanIcon} />
          <CopyValueClipboard value={currentAccount.bic.value} icon={BicIcon} />
        </View>
      )}
    </ScrollView>
  );
};

export const Transactions = () => {
  const { transactions } = useSelector((state: IRootState) => state.account.transactions);
  const hasTransactions = transactions && transactions?.length > 0;
  const { t } = useTranslation();

  const {
    params: { account },
  } = useRoute() as { params: { account: IAccount } };

  return (
    <ErrorBoundary t={t}>
      {!hasTransactions && (
        <>
          <SafeScrollingView fixedHeight>
            <View style={styles.noContent}>
              <ContentNoTransactions currentAccount={account} />
            </View>
          </SafeScrollingView>
          <TopBackground />
          <View style={styles.top}>
            <Top currentAccount={account} />
          </View>
        </>
      )}
      {hasTransactions && (
        <>
          <SafeAreaView style={styles.container}>
            <View style={styles.content}>
              <TransactionsCardsList data={transactions} />
            </View>
          </SafeAreaView>
          <TopBackground />
          <View style={styles.top}>
            <Top currentAccount={account} />
          </View>
        </>
      )}
    </ErrorBoundary>
  );
};

const OUPS_SIZE = {
  width: 250,
  height: 250,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bank.primary.white,
  },
  top: {
    position: 'absolute',
    top: 0,
    left: -30,
  },
  row: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  whiteBalance: {
    position: 'relative',
    top: 30,
    left: 50,
  },
  pdf: {
    position: 'relative',
    top: 0,
    right: 40,
  },
  textContainer: {
    position: 'relative',
    marginTop: -20,
  },
  oupsImage: {
    ...OUPS_SIZE,
  },
  oupsText: {
    width: Dimensions.get('window').width * 0.8,
    fontSize: 22,
    fontFamily: FontNames.Roboto_400Regular,
    color: Colors.bank.primary.darkBlue,
    textAlign: 'center',
    lineHeight: 29,
  },
  noContent: {
    marginTop: 100,
  },
  content: {
    marginTop: 60,
  },
  scrollNoTransactions: {
    alignItems: 'center',
  },
});
