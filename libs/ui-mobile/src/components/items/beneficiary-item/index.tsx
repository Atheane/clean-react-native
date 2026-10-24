import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';

import { RightChevronGradient, RightChevron, Trash, TrashGradient } from '../../../assets';
import { Colors, FontNames } from '../../../constants';

type IProps = {
  icon?: React.FC<SvgProps>;
  name: string;
  iban: string;
  beneficiaryId: number;
  disabled?: boolean;
  onDelete?: (beneficiaryId: number) => void;
  onPress?: (beneficiaryId: number) => void;
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
    <View style={[theme.bank.container.leftItems, { width: Dimensions.get('window').width, height: 72 }]}>
      <View style={[theme.bank.container.leftItems, { marginLeft: 20 }]}>{props.icon && <props.icon />}</View>

      <View style={styles.textContainer}>
        <Text style={styles.textName}>{cleanText()}</Text>
        <Text style={styles.textIban}>{props.iban}</Text>
      </View>
      <View style={styles.btnContainer}>
        {props.onDelete && !props.disabled && <TrashGradient width={18} height={18} />}
        {props.onDelete && props.disabled && (
          <Trash width={18} height={18} color={Colors.bank.primary.grey} />
        )}
        {props.onPress && !props.disabled && <RightChevronGradient width={18} height={18} />}
        {props.onPress && props.disabled && (
          <RightChevron width={18} height={18} color={Colors.bank.primary.grey} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'flex-start',
    marginLeft: 30,
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
  btnContainer: {
    position: 'absolute',
    right: 16,
  },
});
