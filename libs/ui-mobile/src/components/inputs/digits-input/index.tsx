import { useRef, useState } from 'react';
import { View, StyleSheet, Pressable, TextInput, Text, SafeAreaView, Platform } from 'react-native';
import { useTheme } from '@rneui/themed';
import { Colors } from '../../../constants';

type Props = {
  value: string;
  numberDigits: number;
  onChange: (code: string) => void;
  onFocus: () => void;
  onFullfill?: () => void;
  defaultValue?: string;
};

export const DigitsInput = (props: Props) => {
  const { theme } = useTheme();
  const [code, setCode] = useState(props.defaultValue || '');
  const codeDigitsArray = new Array(props.numberDigits).fill('');
  const [containerIsFocused, setContainerIsFocused] = useState(false);

  const ref = useRef<TextInput>(null);

  const handleOnPress = () => {
    setContainerIsFocused(true);
    ref.current?.focus();
  };

  const handleOnBlur = () => {
    setContainerIsFocused(false);
  };

  const toDigitInput = (_value: string, idx: number) => {
    const emptyInputChar = '';
    const digit = code[idx] || emptyInputChar;

    const isCurrentDigit = idx === code.length;
    const isLastDigit = idx === props.numberDigits - 1;
    const isCodeFull = code.length === props.numberDigits;

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const containerStyle =
      containerIsFocused && isFocused
        ? { ...styles.inputContainer, ...styles.inputContainerFocused }
        : styles.inputContainer;
    return (
      <View key={idx} style={containerStyle}>
        <Text style={theme.bank.text.inputNumber}>{digit}</Text>
      </View>
    );
  };

  const onChangeText = (text: string) => {
    setCode(text);
    props.onChange(text);
    if (text.length === props.numberDigits && props?.onFullfill) {
      props.onFullfill(); // Déclencher la soumission automatique
    }
  };

  return (
    <SafeAreaView>
      <Pressable
        style={[styles.inputsContainer, theme.bank.container.justifiedItems]}
        onPress={handleOnPress}
      >
        {codeDigitsArray.map(toDigitInput)}
      </Pressable>
      <TextInput
        ref={ref}
        value={props.value}
        onChangeText={onChangeText}
        onSubmitEditing={handleOnBlur}
        keyboardType={'phone-pad'}
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={props.numberDigits}
        style={styles.hiddenCodeInput}
        onFocus={props.onFocus}
        defaultValue={props.defaultValue}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: 43,
    height: 56,
    backgroundColor: Colors.bank.primary.lightGrey,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.bank.primary.grey,
    padding: Platform.OS === 'ios' ? 8 : 5,
    marginHorizontal: 7,
  },
  inputContainerFocused: {
    width: 43,
    height: 56,
    backgroundColor: Colors.bank.primary.lightGrey,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.bank.secondary.pink,
  },
  inputsContainer: {
    width: '50%',
  },
  hiddenCodeInput: {
    height: 1, // not 0, 0 won't work on Android
    width: 1, // not 0, 0 won't work on Android
    opacity: 0,
  },
});
