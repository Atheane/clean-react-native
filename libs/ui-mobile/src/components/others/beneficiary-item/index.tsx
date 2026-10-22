import { View, Text, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';
import { Colors, FontNames } from '../../../constants';

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
      <View style={theme.bank.container.leftItems}>{props.icon && <props.icon />}</View>

      <View style={styles.textContainer}>
        <Text style={styles.textName}>{cleanText()}</Text>
        <Text style={styles.textIban}>{props.iban}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 25,
  },
  textName: {
    fontFamily: FontNames.Roboto_700Bold,
    fontSize: 18,
    color: Colors.bank.primary.darkGrey,
  },
  textIban: {
    color: Colors.bank.primary.grey,
    fontSize: 14,
    marginTop: 5,
  },
});
