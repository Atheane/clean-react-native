import { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { IAccount } from '@clean-rn/account/domain';
import {
  Colors,
  GreenEuroAmount,
  PrimaryButton,
  TextInput,
  TransferCard,
  Validate,
  firstLetterCapitalize,
} from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { ITransferStackPages } from '../../../shared/presentation/types';

import { BankLogoCO2 } from '../assets/images';
import { Decoration } from '../assets/svg';

type IData = {
  key: string;
  value: string;
};

const HEIGHT = Dimensions.get('window').height;

export const Transfer = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

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

  const handleOnPress = useCallback(() => {
    navigation.navigate(ITransferStackPages.TRANSFER_SUCCESS as never);
  }, [navigation]);

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
                text={'Ali\nDupond'} //todo from react navigation
                image={BankLogoCO2}
              />
            </View>
            <View style={styles.decorationContainer}>
              <Decoration />
            </View>
            <View style={styles.amountContainer}>
              <TextInput
                numeric
                placeholder={t('screens.transfer.amount')}
                label={t('screens.transfer.amount')}
                labelColor={Colors.bank.primary.grey}
                short
                IconRight={GreenEuroAmount}
              />
            </View>
            <View style={styles.labelContainer}>
              <TextInput
                placeholder={t('screens.transfer.placeholder')}
                label={t('screens.transfer.label')}
                labelColor={Colors.bank.primary.grey}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={t('screens.transfer.button')}
              onPress={handleOnPress}
              iconOne={Validate}
              long
              uppercase
            />
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
  itemContainer: {
    marginTop: 20,
  },
  decorationContainer: {
    position: 'absolute',
    top: 180,
    right: -20,
  },
  amountContainer: {
    marginTop: 80,
  },
  labelContainer: {
    marginTop: 40,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '25%',
  },
});
