import { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { IAccount } from '@clean-rn/account/domain';
import { FormTransfer, ITransferFormData, TransferCard, useCleanErrorOnFocus } from '@clean-rn/ui-mobile';

import { firstLetterCapitalize } from '@clean-rn/utils';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { BankLogoCO2, BankLogoGeneric } from '../assets/images';
import { Decoration } from '../assets/svg';
import {
  fetchPayout,
  fetchTransactionWaiting,
  fetchTransfer,
} from '../../../transaction/application/commands';
import { Amount, ITransactionType } from '@clean-rn/transaction/domain';
import { useRoute } from '@react-navigation/native';
import { Phone } from '@clean-rn/contact/domain';
import { Logger } from '@clean-rn/logger';

type IData = {
  key: string;
  value: string;
};

const HEIGHT = Dimensions.get('window').height;

export const Transfer = () => {
  const { t } = useTranslation();

  // select beneficiary
  const {
    params: { beneficiaryId, beneficiaryName, phoneNumber, beneficiaryAccountId },
  } = useRoute() as {
    params: {
      beneficiaryId?: number;
      beneficiaryName?: string;
      phoneNumber?: string;
      beneficiaryAccountId?: number;
    };
  };

  // select account
  const { accounts } = useSelector((state: IRootState) => state.account.accounts);

  const [data, setData] = useState<IData[]>([]);
  useEffect(() => {
    if (!accounts) {
      return;
    }
    const data = accounts.map((account: IAccount) => {
      const accountName = t(`screens.transfer.${account.accountType}`);

      return {
        key: account.accountType as string,
        value: `${accountName}\n ${account.authorizedBalance} €` as string,
      };
    });
    setData(data);
  }, [t, accounts]);

  const user = useSelector((state: IRootState) => state.user.user);

  const [userName, setUserName] = useState('');
  useEffect(() => {
    if (!user?.properties.identity?.firstName || !user?.properties.identity?.lastName) {
      return;
    }
    const name =
      firstLetterCapitalize(user.properties.identity.firstName) +
      '\n' +
      firstLetterCapitalize(user.properties.identity.lastName);
    setUserName(name);
  }, [user]);

  const { pending, error } = useSelector((state: IRootState) => state.transaction);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ITransferFormData>();

  const [selectedAccount, setSelectedAccount] = useState<IAccount | undefined>(
    (accounts && accounts.length > 0 && accounts[0]) || undefined,
  );
  const handleOnSelect = useCallback(
    (item: IData) => {
      const account = accounts?.find((account) => account.accountType === item.key);
      if (!account) {
        return;
      }
      setSelectedAccount(account);
    },
    [accounts],
  );

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (formData: ITransferFormData) => {
      if (!selectedAccount) {
        return;
      }
      // api call for transfer
      if (beneficiaryAccountId) {
        dispatch(
          fetchTransfer({
            accountId: selectedAccount.accountId,
            beneficiaryAccountId: beneficiaryAccountId,
            amount: new Amount(formData.amount, ITransactionType.TRANSFER_OUT),
            label: formData.label,
          }),
        );
        return;
      }
      // api call for payout
      if (beneficiaryId) {
        dispatch(
          fetchPayout({
            accountId: selectedAccount.accountId,
            beneficiaryId,
            amount: new Amount(formData.amount, ITransactionType.TRANSFER_OUT),
            label: formData.label,
          }),
        );
        return;
      }
      // api call for transactionWaiting
      if (phoneNumber) {
        dispatch(
          fetchTransactionWaiting({
            accountId: selectedAccount.accountId,
            phone: new Phone(phoneNumber),
            amount: new Amount(formData.amount, ITransactionType.TRANSFER_OUT),
            label: formData.label,
          }),
        );
        return;
      }
    },
    [dispatch, selectedAccount, beneficiaryId, phoneNumber, beneficiaryAccountId],
  );

  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <View style={styles.subContainer}>
            <View style={styles.itemContainer}>
              <TransferCard
                arrow={true}
                text={userName}
                image={BankLogoCO2}
                data={data}
                onSelect={handleOnSelect}
              />
            </View>
            {beneficiaryName && (
              <View style={styles.itemContainer}>
                <TransferCard
                  arrow={false}
                  text={beneficiaryName}
                  image={beneficiaryAccountId ? BankLogoCO2 : BankLogoGeneric}
                />
              </View>
            )}
            <View style={styles.decorationContainer}>
              <Decoration />
            </View>
            <View style={styles.formContainer}>
              <FormTransfer
                loading={pending}
                control={control}
                errors={errors}
                error={domainError}
                onSubmit={handleSubmit(onSubmit)}
                onFocus={onFocus}
              />
            </View>
          </View>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  formContainer: {
    marginTop: 0,
    width: Dimensions.get('screen').width * 0.85,
    alignItems: 'center',
  },
  itemContainer: {
    marginTop: 20,
  },
  decorationContainer: {
    position: 'absolute',
    top: 180,
    right: -20,
  },
  labelContainer: {
    marginTop: 40,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '25%',
  },
});
