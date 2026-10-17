import { FC, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme, Theme, Button } from '@rneui/themed';

import { Colors, FontNames } from '../../constants';

type IData = { key: string; value: string };

type IProps = {
  label?: string;
  options: [IData, IData];
  onToggle: (option: IData) => void;
};

export const SwitchButton: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();

  const [toggle, setToggle] = useState(true);

  const handleOnPress = (position: 0 | 1) => {
    setToggle(!toggle);
    props.onToggle(props.options[position]);
  };

  return (
    <View>
      {props.label && <Text style={styles(toggle, theme).inputLabel}>{props.label.toLocaleUpperCase()}</Text>}
      <View style={styles(toggle, theme).container}>
        <LinearGradient
          // Button Linear Gradient
          colors={[theme.linearGradient.start, theme.linearGradient.end]}
          start={[0, 1]}
          end={[1, 0]}
          style={styles(toggle, theme).container}
        >
          <Button buttonStyle={[styles(toggle, theme).button]} onPress={() => handleOnPress(0)}>
            <Text style={styles(toggle, theme).text}>{props.options[0].value}</Text>
          </Button>

          <Button buttonStyle={[styles(!toggle, theme).button]} onPress={() => handleOnPress(1)}>
            <Text style={styles(!toggle, theme).text}>{props.options[1].value}</Text>
          </Button>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = (toggle: boolean, theme: Theme) =>
  StyleSheet.create({
    container: {
      width: 309,
      height: 55,
      shadowColor: theme.shadow.color, // IOS
      shadowOffset: theme.shadow.offset, // IOS
      shadowOpacity: theme.shadow.opacity,
      shadowRadius: theme.shadow.radius,
      elevation: 1, // android,
      borderRadius: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    inputLabel: {
      color: Colors.input.pink,
      fontFamily: FontNames.Roboto_700Bold,
      fontSize: 18,
      lineHeight: 24,
      marginBottom: 16,
    },
    button: {
      position: 'relative',
      width: 141,
      height: 42,
      backgroundColor: toggle ? Colors.background.white : Colors.background.transparent,
    },
    text: {
      color: toggle ? Colors.text.darkGrey : Colors.text.darkWhite,
      fontFamily: FontNames.MartelSans_600SemiBold,
      fontSize: 14,
    },
  });
