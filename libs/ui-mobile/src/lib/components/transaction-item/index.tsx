import { View, Text, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Colors, FontNames } from '../../constants';

type IProps = {
  icon: React.FC<SvgProps>;
  label: string;
  amount: number;
};

export const TransactionItem = (props: IProps) => {
  const cleanText = () => {
    const substring = props.label.substring(0, 25);
    if (props.label.length > 25) {
      return substring.substring(0, 25) + '...';
    }
    return props.label;
  };
  return (
    <View style={styles.row}>
      <View style={styles.leftContainer}>
        <props.icon />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{cleanText()}</Text>
        </View>
      </View>
      {props.amount >= 0 && (
        <View style={styles.amountContainer}>
          <Text style={{ ...styles.amount, ...styles.amountPositive }}>
            {'+' + props.amount.toString().replace('.', ',') + ' €G'}
          </Text>
        </View>
      )}
      {props.amount < 0 && (
        <View style={styles.amountContainer}>
          <Text style={{ ...styles.amount, ...styles.amountNegative }}>
            {props.amount.toString().replace('.', ',') + ' €G'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textContainer: {
    marginLeft: 10,
  },
  text: {
    fontSize: 13,
    fontFamily: FontNames.MartelSans_400Regular,
    textAlign: 'left',
    color: Colors.text.darkGrey,
  },
  amountContainer: {},
  amount: {
    fontFamily: FontNames.MartelSans_700Bold,
    textAlign: 'right',
    color: Colors.text.lightGrey,
    fontWeight: 'bold',
  },
  amountPositive: {
    color: Colors.text.lightGreen,
  },
  amountNegative: {
    color: Colors.text.lightGrey,
  },
});
