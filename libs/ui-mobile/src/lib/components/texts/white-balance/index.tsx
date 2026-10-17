import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

import { IAccount, IAccountType } from '@clean-rn/account/domain';

import { RightChevron, GreenEuro } from '../../../assets';
import { Colors, FontNames } from '../../../constants';
import { LinkButtonColors } from '../../../types';

import { LinkButton } from '../../buttons/link-button';

type IProps = {
  divider?: boolean;
  title?: string;
  account: IAccount;
  onPress?: () => void;
};

export const WhiteBalance = (props: IProps) => {
  const { t } = useTranslation();

  const title = (accountType: IAccountType) => {
    switch (accountType) {
      case IAccountType.MAIN:
        return t('screens.home.balance.main');
      case IAccountType.RESTOFLASH:
        return t('screens.home.balance.restoflash');
      case IAccountType.WEFLO:
        return t('screens.home.balance.weflo');
      default:
        return t('screens.account.balance');
    }
  };

  return (
    <View>
      <Text style={styles.title}>{props.title ?? title(props.account.accountType)}</Text>
      <View style={styles.widget}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balance}>{props.account.authorizedBalance.toString().replace('.', ',')}</Text>
          <GreenEuro />
        </View>
        {props.onPress && (
          <LinkButton
            iconOne={() => <RightChevron style={{ color: Colors.text.white }} />}
            colorOption={LinkButtonColors.WHITE}
            pressed={false}
            onPress={props.onPress}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  widget: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.9,
  },
  title: {
    color: Colors.text.white,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: FontNames.MartelSans_700Bold,
    marginTop: 0,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balance: {
    color: Colors.text.white,
    fontSize: 38,
    fontWeight: 'bold',
    fontFamily: FontNames.MartelSans_700Bold,
    marginTop: -6,
  },
});
