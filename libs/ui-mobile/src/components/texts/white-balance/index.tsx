import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

import { IAccount, IAccountType } from '@clean-rn/account/domain';
import { useTheme } from '@rneui/themed';

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
  const { theme } = useTheme();
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
      <View style={[styles.widgetContainer, theme.bank.container.justifiedItems]}>
        <View style={theme.bank.container.centeredItems}>
          <Text style={[theme.bank.text.white, styles.balance]}>
            {props.account.authorizedBalance.toString().replace('.', ',')}
          </Text>
          <GreenEuro />
        </View>
        <View style={styles.linkContainer}>
          {props.onPress && (
            <LinkButton
              iconOne={() => <RightChevron style={{ color: Colors.bank.primary.white }} />}
              colorOption={LinkButtonColors.WHITE}
              pressed={false}
              onPress={props.onPress}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  widgetContainer: {
    width: Dimensions.get('window').width * 0.9,
  },
  linkContainer: {
    marginBottom: 24,
  },
  title: {
    color: Colors.bank.primary.white,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: FontNames.MartelSans_700Bold,
    marginTop: 0,
  },
  balance: {
    fontSize: 38,
    marginTop: -6,
  },
});
