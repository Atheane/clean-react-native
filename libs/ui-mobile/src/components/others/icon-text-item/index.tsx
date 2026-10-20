import { useTheme } from '@rneui/themed';
import { FC } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';

type IProps = {
  icon: FC<SvgProps>;
  text: string;
  onPress: () => void;
};

export const IconTextItem = (props: IProps) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[theme.bank.container.leftItems, styles.container]}>
        <View style={styles.iconContainer}>
          <props.icon />
        </View>
        <View style={styles.textContainer}>
          <Text style={[theme.bank.text.darkBlue, styles.text]}>{props.text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.7,
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    marginLeft: 10,
    marginTop: 5,
  },
  text: {},
});
