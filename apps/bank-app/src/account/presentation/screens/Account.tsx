import { useCallback } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Sentry from '@sentry/react-native';

import { RootState } from '@shared/infrastructure/redux/reducers';
import { navigateTo } from '@shared/infrastructure/redux/actions';
import { LinkButton } from '@shared/presentation/components';
import { LinkButtonColors } from '@shared/presentation/types';
import { BannerColors, HOME_STACK_PAGES } from '@account/presentation/types';

import { Bic as BicIcon, ExportPdf, Iban as IbanIcon, Oups } from '@account/presentation/assets';
import {
  TopBackground,
  Banner,
  CopyValueClipboard,
  TransactionsCardsList,
  ViewBackground,
  WhiteBalance,
} from '@account/presentation/components';
import { IAccount } from '@account/domain/entities';
import { Colors, FontNames } from '@shared/presentation/constants';

const Top = ({ currentAccount }: { currentAccount?: IAccount }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleOnPressPdf = useCallback(() => {
    dispatch(navigateTo({ route: HOME_STACK_PAGES.ACCOUNT_STATEMENTS }));
  }, []);

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
          <CopyValueClipboard value={currentAccount.iban} icon={IbanIcon} />
          <CopyValueClipboard value={currentAccount.bic} icon={BicIcon} />
        </View>
      )}
    </ScrollView>
  );
};

export const Account = () => {
  const { accounts, error: errorAccount } = useSelector((state: RootState) => state.account.accounts);

  const { transactions, error: errorTransactions } = useSelector(
    (state: RootState) => state.account.transactions,
  );

  const hasTransactions = transactions && transactions?.length > 0;
  const hasAccounts = accounts && accounts?.length > 0;

  if (!hasAccounts) {
    // this is captured by usecase getAccounts layer so this should not happen here
    Sentry.captureException(new Error('User has no account'));
  }

  return (
    <View>
      {errorAccount && <Banner title={errorAccount.message} color={BannerColors.PINK} rightIcon={false} />}
      {!hasAccounts && <Banner title={'User has no account'} color={BannerColors.PINK} rightIcon={false} />}
      {errorTransactions && (
        <Banner title={errorTransactions.message} color={BannerColors.PINK} rightIcon={false} />
      )}
      {!hasTransactions && hasAccounts && (
        <ViewBackground background={TopBackground}>
          <View style={styles.top}>
            <Top currentAccount={accounts[0]} />
          </View>
          <View style={styles.content}>
            <ContentNoTransactions currentAccount={accounts[0]} />
          </View>
        </ViewBackground>
      )}
      {hasTransactions && hasAccounts && (
        <ViewBackground background={TopBackground}>
          <View style={styles.top}>
            <Top currentAccount={accounts[0]} />
          </View>
          <View style={styles.content}>
            <TransactionsCardsList data={transactions} />
          </View>
        </ViewBackground>
      )}
    </View>
  );
};

const OUPS_SIZE = {
  width: 250,
  height: 250,
};

const styles = StyleSheet.create({
  top: {
    position: 'absolute',
    top: 10,
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
    fontName: FontNames.Roboto_400Regular,
    color: Colors.text.darkBlue,
    textAlign: 'center',
    lineHeight: 29,
  },
  content: {
    marginTop: 200,
  },
  scrollNoTransactions: {
    alignItems: 'center',
  },
});
