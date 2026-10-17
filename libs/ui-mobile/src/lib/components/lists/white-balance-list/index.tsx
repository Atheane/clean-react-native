import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Divider } from '@rneui/base';

import { IAccount } from '@clean-rn/account/domain';

import { Colors, FontNames } from '../../../constants';

import { WhiteBalance } from '../../texts/white-balance';

type IProps = {
  onPress: (account: IAccount) => void;
  data: IAccount[];
};

export const WhiteBalanceList = (props: IProps) => {
  const { t } = useTranslation();
  return (
    <View>
      {props.data.length > 0 ? (
        props.data.map((item: IAccount) => (
          <View key={item.accountType} style={styles.widgetContainer}>
            <WhiteBalance account={item} onPress={() => props.onPress(item)} divider />
            <View style={styles.divider}>
              <Divider color={'rgba(255, 255, 255, 0.3)'} />
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noAccounts}>{t('screens.home.balance.noaccounts')}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  widgetContainer: {
    marginTop: 8,
  },
  noAccounts: {
    color: Colors.text.white,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: FontNames.MartelSans_700Bold,
  },
  divider: {
    width: '90%',
  },
});
