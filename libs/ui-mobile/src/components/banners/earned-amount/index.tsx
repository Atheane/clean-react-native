import { StyleSheet, Text, View } from 'react-native';

type IProps = {
  label: string;
  amount: number;
  currency?: string;
};

export const EarnedAmountBanner = ({ label, amount, currency = '€G' }: IProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.amount}>
        {amount.toFixed(2)} {currency}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F1FF',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});
