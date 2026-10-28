import { FC, useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, useTheme } from '@rneui/themed';

import { Colors, FontNames, NEEDS_SMALL_TEXT } from '../../../constants';

type IData = { key: string; value: string };

type IProps = {
  label?: string;
  options: [IData, IData];
  onToggle: (option: IData) => void;
};

export const SwitchButton: FC<IProps> = (props: IProps) => {
  const [toggle, setToggle] = useState(true);

  const { theme } = useTheme();

  const handleOnPress = (position: 0 | 1) => {
    setToggle(!toggle);
    props.onToggle(props.options[position]);
  };

  return (
    <View>
      {props.label && (
        <View style={styles.labelContainer}>
          <Text style={[theme.text.label, { color: Colors.secondary.pink }]}>
            {props.label.toLocaleUpperCase()}
          </Text>
        </View>
      )}
      <View style={[theme.container.button.long, theme.container.centeredItems, theme.shadow.button]}>
        <LinearGradient
          // Button Linear Gradient
          colors={[Colors.greenGradient.lightGreen, Colors.greenGradient.darkGreen]}
          start={[0, 1]}
          end={[1, 0]}
          style={[
            theme.container.button.long,
            theme.container.centeredItems,
            theme.shadow.button,
            {
              height: 55,
            },
          ]}
        >
          <Button
            buttonStyle={[
              styles.button,
              { backgroundColor: toggle ? Colors.primary.white : Colors.transparent },
            ]}
            onPress={() => handleOnPress(0)}
          >
            <Text
              style={[styles.text, { color: toggle ? Colors.primary.darkGrey : Colors.primary.lightGrey }]}
            >
              {props.options[0].value}
            </Text>
          </Button>

          <Button
            buttonStyle={[
              styles.button,
              { backgroundColor: toggle ? Colors.transparent : Colors.primary.white },
            ]}
            onPress={() => handleOnPress(1)}
          >
            <Text
              style={[styles.text, { color: toggle ? Colors.primary.lightGrey : Colors.primary.darkGrey }]}
            >
              {props.options[1].value}
            </Text>
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    marginBottom: 16,
  },
  button: {
    position: 'relative',
    width: (Dimensions.get('window').width * 0.75) / 2 - 10,
    height: 46,
    borderRadius: 28,
  },
  text: {
    fontFamily: FontNames.MartelSans_600SemiBold,
    fontSize: NEEDS_SMALL_TEXT ? 12 : 14,
  },
});
