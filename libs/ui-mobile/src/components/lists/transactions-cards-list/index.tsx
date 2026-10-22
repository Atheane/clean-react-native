import { FlatList, View, StyleSheet } from 'react-native';
import { ITransaction } from '@clean-rn/account/domain';

import { firstLetterCapitalize, toLocalDateString } from '@clean-rn/utils';

import { TransactionsCard } from '../../cards/transactions-card';

type IProps = {
  data: ITransaction[];
};

export const TransactionsCardsList = (props: IProps) => {
  const transactionsByDateObject = props.data
    .map((transaction: ITransaction) => {
      const dateString = toLocalDateString(transaction.date);
      return {
        ...transaction,
        date: dateString ? firstLetterCapitalize(dateString) : null,
      };
    })
    .reduce((acc: { [key: string]: object[] }, item: { date: string | null }) => {
      if (!item || !item.date) {
        return acc;
      }
      if (!acc[item.date]) {
        acc[item.date] = [];
      }
      acc[item.date].push(item);
      return acc;
    }, {});

  const transactionsByDateArray = Object.entries(transactionsByDateObject)
    .map(([localDateString, transactionsByDate]) => ({
      date: localDateString,
      data: transactionsByDate as ITransaction[],
    }))
    .sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return aDate < bDate ? 1 : aDate > bDate ? -1 : 0;
    });

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      pinchGestureEnabled
      data={transactionsByDateArray}
      renderItem={({ item, index }: { item: { date: string; data: ITransaction[] }; index: number }) => (
        <View style={index === 0 ? styles.container : styles.containerNoMargin}>
          <TransactionsCard {...item} />
        </View>
      )}
      keyExtractor={(item: { date: string; data: ITransaction[] }) => item.date}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 140,
  },
  containerNoMargin: {
    marginTop: 0,
  },
});
