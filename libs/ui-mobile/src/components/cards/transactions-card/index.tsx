import { StyleSheet, Text, View } from 'react-native';
import { Card, Divider } from '@rneui/base';
import { useTheme } from '@rneui/themed';

import { ITransaction, ITransactionCategory, TransactionCategory } from '@clean-rn/account/domain';

import { Restaurant, Cart } from '../../../assets';

import { TransactionItem } from '../../others/transaction-item';

type IProps = {
  date: string;
  data: ITransaction[];
};

const getIcon = (category: TransactionCategory) => {
  switch (category.value) {
    case ITransactionCategory.NUTRITION:
      return Restaurant;
    case ITransactionCategory.PROCUREMENT:
      return Cart;
  }
  return Restaurant;
};

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
              <TransactionItem icon={getIcon(data.category)} label={data.label} amount={data.amount.value} />
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
