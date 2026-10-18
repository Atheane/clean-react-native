import { FC, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@rneui/themed';

import { Colors, FontNames } from '../../../constants';

type IData = { key: string; value: string };

type IProps = {
  label?: string;
  options: [IData, IData];
  onToggle: (option: IData) => void;
};

export const SwitchButton: FC<IProps> = (props: IProps) => {
  const [toggle, setToggle] = useState(true);

  const handleOnPress = (position: 0 | 1) => {
    setToggle(!toggle);
    props.onToggle(props.options[position]);
  };

  return (
    <View>
      {props.label && <Text style={styles.inputLabel}>{props.label.toLocaleUpperCase()}</Text>}
      <View style={styles.container}>
        <LinearGradient
          // Button Linear Gradient
          colors={[Colors.bank.greenGradient.lightGreen, Colors.bank.greenGradient.darkGreen]}
          start={[0, 1]}
          end={[1, 0]}
          style={styles.container}
        >
          <Button
            buttonStyle={[
              styles.button,
              { backgroundColor: toggle ? Colors.bank.primary.white : Colors.bank.background.transparent },
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
              { backgroundColor: toggle ? Colors.bank.background.transparent : Colors.bank.primary.white },
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
  container: {
    width: 309,
    height: 55,
    shadowColor: Colors.shadow.bold, // iOS
    shadowOffset: { width: 5, height: 15 }, // iOS
    shadowOpacity: 0.34, // iOS
    shadowRadius: 20, // iOS
    elevation: 10, // android,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputLabel: {
    color: Colors.bank.secondary.pink,
    fontFamily: FontNames.Roboto_700Bold,
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 16,
  },
  button: {
    position: 'relative',
    width: 141,
    height: 42,
  },
  text: {
    fontFamily: FontNames.MartelSans_600SemiBold,
    fontSize: 14,
  },
});
