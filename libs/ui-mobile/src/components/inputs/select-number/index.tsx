import { FC, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';

import { Colors, FontNames } from '../../../constants';

type IProps = {
  label: string;
  icon?: FC<SvgProps>;
  horizontal?: boolean;
  value?: number;
  onChange: (value: number) => void;
};

export const SelectNumber = (props: IProps) => {
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState(props.value?.toString() ?? '0');

  const handleIncrement = () => {
    const newValue = parseInt(inputValue, 10) + 1;
    setInputValue(newValue.toString());
    props.onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = parseInt(inputValue, 10) - 1;
    if (newValue >= 0) {
      setInputValue(newValue.toString());
      props.onChange(newValue);
    }
  };

  return props.horizontal ? (
    <View style={styles.selectContainer}>
      <Text style={[theme.text.label, { color: Colors.secondary.pink }]}>
        {props.label.toLocaleUpperCase()}
      </Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleDecrement}
          disabled={parseInt(inputValue, 10) <= 0}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.inputText}>{inputValue}</Text>
        <TouchableOpacity style={styles.button} onPress={handleIncrement}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View>
      <Text style={[theme.text.label, { color: Colors.secondary.pink }]}>
        {props.label.toLocaleUpperCase()}
      </Text>
      <View style={styles.selectContainer}>
        {props.icon && (
          <View style={styles.leftIconContainer}>
            <props.icon />
          </View>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={handleDecrement}
          disabled={parseInt(inputValue, 10) <= 0}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.inputText}>{inputValue}</Text>
        <TouchableOpacity style={styles.button} onPress={handleIncrement}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    color: Colors.secondary.pink,
    fontFamily: FontNames.Roboto_700Bold,
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 16,
  },
  selectContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.75,
    marginVertical: 16,
    alignItems: 'center',
  },
  leftIconContainer: {
    marginLeft: 8,
    marginRight: 14,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.primary.lightGreen,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  buttonText: {
    color: Colors.primary.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputText: {
    marginHorizontal: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary.darkGrey,
  },
});
