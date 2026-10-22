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

import { BankLogoCO2 } from '../assets/images';
import { Decoration } from '../assets/svg';

type IData = {
  key: string;
  value: string;
};

const HEIGHT = Dimensions.get('window').height;

export const Transfer = () => {
  const { t } = useTranslation();

  const { selectedBeneficiary } = useSelector((state: IRootState) => state.beneficiary.beneficiaries);

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

  // api call
  const { pending, error } = useSelector((state: IRootState) => state.beneficiary.beneficiaries);

  // internal state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ITransferFormData>({
    defaultValues: {},
  });

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (formData: ITransferFormData) => {
      console.log('onSubmit formData', formData);
      dispatch(fetchTransfer(formData));
    },
    [dispatch],
  );
  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  const handleOnSelect = useCallback((item: IData) => {
    console.log(item);
  }, []);

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
            <View style={styles.itemContainer}>
              <TransferCard
                arrow={false}
                text={selectedBeneficiary?.name as string} //todo from react navigation
                image={BankLogoCO2}
              />
            </View>
            <View style={styles.decorationContainer}>
              <Decoration />
            </View>
            <View>
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
    marginTop: 40,
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
