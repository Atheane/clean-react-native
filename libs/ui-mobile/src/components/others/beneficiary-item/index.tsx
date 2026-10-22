import { View, Text, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';
import { Colors } from '../../../constants';

type IProps = {
  icon?: React.FC<SvgProps>;
  name: string;
  iban: string;
};

export const BeneficiaryItem = (props: IProps) => {
  const { theme } = useTheme();
  const cleanText = () => {
    if (!props.name) {
      return '';
    }
    const substring = props.name.substring(0, 25);
    if (props.name.length > 25) {
      return substring.substring(0, 25) + '...';
    }
    return props.name;
  };

  return (
    <View style={theme.bank.container.justifiedItems}>
      <View style={theme.bank.container.leftItems}>
        {props.icon && <props.icon />}
        <View style={styles.textContainer}>
          <Text style={theme.bank.text.grey}>{cleanText()}</Text>
        </View>
      </View>

      <Text style={[theme.bank.text.boldGrey]}>{props.iban}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginLeft: 0,
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
