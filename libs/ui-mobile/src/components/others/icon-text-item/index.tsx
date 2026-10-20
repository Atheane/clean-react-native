import { useTheme } from '@rneui/themed';
import { FC } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Checked } from '../../../assets';

type IProps = {
  icon: FC<SvgProps>;
  text: string;
  onPress: () => void;
  validated?: boolean;
};

export const IconTextItem = (props: IProps) => {
  const { theme } = useTheme();
  return !props.validated ? (
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
  ) : (
    <View style={theme.bank.container.centeredItems}>
      <TouchableOpacity onPress={props.onPress} disabled style={{ opacity: 0.5 }}>
        <View style={[theme.bank.container.leftItems, styles.container]}>
          <View style={styles.iconContainer}>
            <props.icon />
          </View>
          <View style={styles.textContainer}>
            <Text style={[theme.bank.text.darkBlue, styles.text]}>{props.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Checked />
    </View>
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
