import { useCallback } from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { IAccount } from '@clean-rn/account/domain';
import {
  LinkButton,
  LinkButtonColors,
  ExportPdf,
  TopBackground,
  Balance,
  Colors,
  FontNames,
  LoaderSplashScreen,
  PrimaryButton,
  useCleanErrorOnFocus,
} from '@clean-rn/ui-mobile';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ITransactionStackPages } from '../../../shared/presentation/types';
import { Oups } from '../assets/images';
import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { FormRib, IRibFormData } from './forms';
import { TransactionsCardsList } from '../components/transactions-cards-list';

const Top = ({ currentAccount }: { currentAccount?: IAccount }) => {
  const { t } = useTranslation();

  const navigation = useNavigation();

  const handleOnPressPdf = useCallback(() => {
    navigation.navigate(ITransactionStackPages.ACCOUNT_STATEMENTS, { account: currentAccount } as never);
  }, [navigation, currentAccount]);

  return (
    <View style={styles.row}>
      <View style={styles.whiteBalance}>
        {currentAccount && (
          <Balance
            value={currentAccount.authorizedBalance}
            title={t('screens.account.balance')}
            color={Colors.primary.white}
            unit="€G"
          />
        )}
      </View>
      <View style={styles.pdf}>
        <LinkButton
          onPress={handleOnPressPdf}
          iconRight={() => <ExportPdf color={Colors.primary.white} />}
          colorOption={LinkButtonColors.WHITE}
        />
      </View>
    </View>
  );
};

const ContentNoTransactions = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // todo waiting for API to be ready
  // const { pending, error } = useSelector((state: IRootState) => state.transaction.rib);

  // internal state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRibFormData>({
    defaultValues: {},
  });

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (formData: IRibFormData) => {
      console.log('Submitting RIB form data:', formData);
      // waiting for API to be ready
      // dispatch(registerRib(formData));
    },
    [dispatch],
  );

  // waiting for API to be ready
  const { domainError, onFocus } = useCleanErrorOnFocus(null); // null for now, replace with actual error handling when API is ready

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        alignItems: 'center',
        marginTop: 0,
      }}
    >
      <Image source={Oups} style={styles.oupsImage} />
      <View style={styles.textContainer}>
        <Text style={theme.text.darkBlue}>{t('screens.account.oups')}</Text>
      </View>
      <View style={styles.formContainer}>
        <FormRib
          loading={false} // waiting for API to be ready
          control={control}
          errors={errors}
          error={domainError}
          onSubmit={handleSubmit(onSubmit)}
          onFocus={onFocus}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export const Transactions = () => {
  const { selectedAccount, pending: accountPending } = useSelector((state: IRootState) => state.account);
  const { transactions, pending: transactionPending } = useSelector((state: IRootState) => state.transaction);
  const hasTransactions = transactions && transactions?.length > 0;
  const { t } = useTranslation();

  if (!selectedAccount) {
    return null;
  }

  const handleOnPress = () => {
    console.log('TODO Recevoir ma cagnotte');
  };

  return accountPending || transactionPending ? (
    <LoaderSplashScreen />
  ) : (
    <ErrorBoundary t={t}>
      {!hasTransactions && (
        <View style={styles.scrollNoTransactions}>
          <TopBackground />
          <View style={styles.top}>
            <Top currentAccount={selectedAccount} />
          </View>
          <View style={styles.noContent}>
            <ContentNoTransactions />
          </View>
        </View>
      )}
      {hasTransactions && (
        <View>
          <TopBackground />

          <View style={styles.top}>
            <Top currentAccount={selectedAccount} />
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton title={t('screens.account.button')} onPress={handleOnPress} />
          </View>

          <View style={styles.content}>
            <TransactionsCardsList data={transactions} />
          </View>
        </View>
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
    backgroundColor: Colors.primary.white,
  },
  top: {
    position: 'absolute',
    top: 20,
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
    top: 10,
    right: 10,
  },
  textContainer: {
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
  },
  oupsImage: {
    ...OUPS_SIZE,
  },
  oupsText: {
    fontSize: 22,
    fontFamily: FontNames.Roboto_400Regular,
    color: Colors.primary.darkBlue,
    textAlign: 'center',
  },
  noContent: {
    marginTop: 100,
    height: Dimensions.get('window').height,
  },
  content: {
    marginTop: 24,
  },
  buttonContainer: {
    marginTop: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollNoTransactions: {
    alignItems: 'center',
    backgroundColor: Colors.primary.white,
  },
  formContainer: {},
});
