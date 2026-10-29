import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';

import { Colors, FontNames } from '../../../constants';
import { RightChevronGradient } from '../../../assets';

type IProps = {
  icon?: React.FC<SvgProps>;
  name: string;
  phone: string;
  onPress?: (phoneNumber: string) => void;
};

export const ContactItem = (props: IProps) => {
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
    <View style={[theme.container.leftItems, { width: Dimensions.get('window').width, height: 72 }]}>
      <View style={[theme.container.leftItems, { marginLeft: 20 }]}>{props.icon && <props.icon />}</View>

      <View style={styles.textContainer}>
        <Text style={styles.textName}>{cleanText()}</Text>
        <Text style={styles.textIban}>{props.phone}</Text>
      </View>
      <View style={styles.btnContainer}>
        {props.onPress && <RightChevronGradient width={18} height={18} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginLeft: 30,
  },
  textName: {
    fontFamily: FontNames.Roboto_700Bold,
    fontSize: 18,
    color: Colors.primary.darkGrey,
  },
  textIban: {
    color: Colors.primary.grey,
    fontSize: 14,
    marginTop: 5,
  },
  btnContainer: {
    position: 'absolute',
    right: 16,
  },
});
