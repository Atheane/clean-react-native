import { View, Text, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';
import { Colors } from '../../../constants';

type IProps = {
  icon: React.FC<SvgProps>;
  label?: string;
  amount: number;
};

export const TransactionItem = (props: IProps) => {
  const { theme } = useTheme();
  const cleanText = () => {
    if (!props.label) {
      return '';
    }
    const substring = props.label.substring(0, 25);
    if (props.label.length > 22) {
      return substring.substring(0, 22) + '...';
    }
    return props.label;
  };
  return (
    <View style={[theme.container.justifiedItems]}>
      <View style={theme.container.leftItems}>
        <props.icon />
        <View style={styles.textContainer}>
          <Text style={theme.text.grey}>{cleanText()}</Text>
        </View>
      </View>
      {props.amount >= 0 && (
        <Text style={[theme.text.boldGrey, styles.amountPositive]}>
          {'+' + props.amount.toString().replace('.', ',') + ' €G'}
        </Text>
      )}
      {props.amount < 0 && (
        <Text style={[theme.text.boldGrey, styles.amountNegative]}>
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
    color: Colors.primary.lightGreen,
  },
  amountNegative: {
    textAlign: 'right',
    color: Colors.primary.grey,
  },
});
