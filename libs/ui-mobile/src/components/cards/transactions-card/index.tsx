import { StyleSheet, Text, View } from 'react-native';
import { Card, Divider } from '@rneui/base';
import { useTheme } from '@rneui/themed';
import { SvgProps } from 'react-native-svg';

import { ITransaction, ITransactionCategory, TransactionCategory } from '@clean-rn/account/domain';

import {
  ALCOHOL,
  ART,
  ASSURANCES,
  BANK,
  BAR,
  CLOTHING,
  CULTURE,
  DIVERSE,
  ENDOWMENT,
  FUEL,
  HEALTH,
  HIGHT_TECH,
  HOUSING,
  LEGAL,
  LEISURE,
  NUMERIC,
  NURSING,
  NUTRITION,
  PRO,
  PROCUREMENT,
  RESTAURANTS,
  SCHOOLING,
  SUBSCRIPTIONS,
  TRANSPORT,
  TRAVEL,
  VEHICLES,
} from '../../../assets';

import { TransactionItem } from '../../others/transaction-item';

type IProps = {
  date: string;
  data: ITransaction[];
};

const TransactionIcons = {
  [ITransactionCategory.ALCOHOL]: ALCOHOL,
  [ITransactionCategory.ART]: ART,
  [ITransactionCategory.ASSURANCES]: ASSURANCES,
  [ITransactionCategory.BANK]: BANK,
  [ITransactionCategory.BAR]: BAR,
  [ITransactionCategory.CLOTHING]: CLOTHING,
  [ITransactionCategory.CULTURE]: CULTURE,
  [ITransactionCategory.DIVERSE]: DIVERSE,
  [ITransactionCategory.ENDOWMENT]: ENDOWMENT,
  [ITransactionCategory.FUEL]: FUEL,
  [ITransactionCategory.HEALTH]: HEALTH,
  [ITransactionCategory.HIGHT_TECH]: HIGHT_TECH,
  [ITransactionCategory.HOUSING]: HOUSING,
  [ITransactionCategory.LEGAL]: LEGAL,
  [ITransactionCategory.LEISURE]: LEISURE,
  [ITransactionCategory.NUMERIC]: NUMERIC,
  [ITransactionCategory.NURSING]: NURSING,
  [ITransactionCategory.NUTRITION]: NUTRITION,
  [ITransactionCategory.PRO]: PRO,
  [ITransactionCategory.PROCUREMENT]: PROCUREMENT,
  [ITransactionCategory.RESTAURANTS]: RESTAURANTS,
  [ITransactionCategory.SCHOOLING]: SCHOOLING,
  [ITransactionCategory.SUBSCRIPTIONS]: SUBSCRIPTIONS,
  [ITransactionCategory.TRANSPORT]: TRANSPORT,
  [ITransactionCategory.TRAVEL]: TRAVEL,
  [ITransactionCategory.VEHICLES]: VEHICLES,
} as { [key: string]: React.FC<SvgProps> };

export const TransactionsCard = (props: IProps) => {
  const { theme } = useTheme();
  return (
    <Card containerStyle={[theme.bank.container.card.long, theme.bank.shadow.card]}>
      <View>
        <Text style={theme.bank.text.boldDarkBlue}>{props.date}</Text>
      </View>
      <View style={styles.transactionsContainer}>
        {props.data.map((data: ITransaction, index: number) => {
          return (
            <View key={data.id}>
              <TransactionItem
                icon={TransactionIcons[data.category.value]}
                label={data.label}
                amount={data.amount.value}
              />
              {index !== props.data.length - 1 && (
                <View style={styles.divider}>
                  <Divider />
                </View>
              )}
            </View>
          );
        })}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  transactionsContainer: {
    marginTop: 16,
  },
  divider: {
    marginVertical: 10,
  },
});
