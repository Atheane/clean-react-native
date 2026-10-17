import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Card, Divider } from '@rneui/base';

import { ITransaction, ITransactionCategory, TransactionCategory } from '@clean-rn/account/domain';

import { Restaurant, Cart } from '../../../assets';
import { Colors, FontNames } from '../../../constants';

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
  return (
    <Card containerStyle={styles.container}>
      <View>
        <Text style={styles.date}>{props.date}</Text>
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
  container: {
    width: Dimensions.get('window').width * 0.9,
    margin: 16,
    borderRadius: 10,
    borderWidth: 0,
    shadowColor: Colors.shadow.bold,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  date: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.text.darkBlue,
    textAlign: 'left',
    fontFamily: FontNames.MartelSans_700Bold,
  },
  transactionsContainer: {
    marginTop: 16,
  },
  divider: {
    marginVertical: 10,
  },
});
