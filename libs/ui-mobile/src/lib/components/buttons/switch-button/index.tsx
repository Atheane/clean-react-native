import { FC, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, useTheme } from '@rneui/themed';

import { Colors, FontNames } from '../../../constants';

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
      {props.label && <Text style={theme.bank.text.pinkLabel}>{props.label.toLocaleUpperCase()}</Text>}
      <View
        style={[
          theme.bank.container.button.long,
          theme.bank.container.centeredItems,
          theme.bank.shadow.button,
        ]}
      >
        <LinearGradient
          // Button Linear Gradient
          colors={[Colors.bank.greenGradient.lightGreen, Colors.bank.greenGradient.darkGreen]}
          start={[0, 1]}
          end={[1, 0]}
          style={[
            theme.bank.container.button.long,
            theme.bank.container.centeredItems,
            theme.bank.shadow.button,
          ]}
        >
          <Button
            buttonStyle={[
              styles.button,
              { backgroundColor: toggle ? Colors.bank.primary.white : Colors.bank.transparent },
            ]}
            onPress={() => handleOnPress(0)}
          >
            <Text
              style={[
                styles.text,
                { color: toggle ? Colors.bank.primary.darkGrey : Colors.bank.primary.lightGrey },
              ]}
            >
              {props.options[0].value}
            </Text>
          </Button>

          <Button
            buttonStyle={[
              styles.button,
              { backgroundColor: toggle ? Colors.bank.transparent : Colors.bank.primary.white },
            ]}
            onPress={() => handleOnPress(1)}
          >
            <Text
              style={[
                styles.text,
                { color: toggle ? Colors.bank.primary.lightGrey : Colors.bank.primary.darkGrey },
              ]}
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
  button: {
    position: 'relative',
    width: 141,
    height: 42,
    borderRadius: 28,
  },
  text: {
    fontFamily: FontNames.MartelSans_600SemiBold,
    fontSize: 14,
  },
});
