import { View, Text, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';
import { Colors } from '../../../constants';

type IProps = {
  icon: React.FC<SvgProps>;
  label: string;
  amount: number;
};

export const TransactionItem = (props: IProps) => {
  const { theme } = useTheme();
  const cleanText = () => {
    const substring = props.label.substring(0, 25);
    if (props.label.length > 25) {
      return substring.substring(0, 25) + '...';
    }
    return props.label;
  };
  return (
    <View style={theme.bank.container.justifiedItems}>
      <View style={theme.bank.container.leftItems}>
        <props.icon />
        <View style={styles.textContainer}>
          <Text style={theme.bank.text.grey}>{cleanText()}</Text>
        </View>
      </View>
      {props.amount >= 0 && (
        <Text style={[theme.bank.text.boldGrey, styles.amountPositive]}>
          {'+' + props.amount.toString().replace('.', ',') + ' €G'}
        </Text>
      )}
      {props.amount < 0 && (
        <Text style={[theme.bank.text.boldGrey, styles.amountNegative]}>
          {props.amount.toString().replace('.', ',') + ' €G'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginLeft: 10,
  },
  amountPositive: {
    textAlign: 'right',
    color: Colors.bank.primary.lightGreen,
  },
  amountNegative: {
    textAlign: 'right',
    color: Colors.bank.primary.grey,
  },
});
