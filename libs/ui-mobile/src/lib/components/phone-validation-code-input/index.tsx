import { useRef, useState } from 'react';
import { View, StyleSheet, Pressable, TextInput, Text, SafeAreaView, Platform } from 'react-native';
import { Colors, FontNames } from '../../constants';

const CODE_LENGTH = 6;

type Props = {
  value: string;
  onChange: (code: string) => void;
  onFocus: () => void;
};

export const PhoneValidationCodeInput = (props: Props) => {
  const [code, setCode] = useState('');
  const codeDigitsArray = ['', '', '', '', '', ''];
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
    const isLastDigit = idx === CODE_LENGTH - 1;
    const isCodeFull = code.length === CODE_LENGTH;

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const containerStyle =
      containerIsFocused && isFocused
        ? { ...styles.inputContainer, ...styles.inputContainerFocused }
        : styles.inputContainer;
    return (
      <View key={idx} style={containerStyle}>
        <Text style={styles.inputText}>{digit}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Pressable style={styles.inputsContainer} onPress={handleOnPress}>
        {codeDigitsArray.map(toDigitInput)}
      </Pressable>
      <TextInput
        ref={ref}
        value={props.value}
        onChangeText={(text: string) => {
          setCode(text);
          props.onChange(text);
        }}
        onSubmitEditing={handleOnBlur}
        keyboardType={'phone-pad'}
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={CODE_LENGTH}
        style={styles.hiddenCodeInput}
        onFocus={props.onFocus}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputText: {
    color: Colors.input.pink,
    fontFamily: FontNames.Roboto_400Regular,
    fontSize: 32,
    textAlign: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: 43,
    height: 56,
    backgroundColor: Colors.input.darkWhite,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.input.lightGrey,
    padding: Platform.OS === 'ios' ? 8 : 5,
    marginHorizontal: 7,
  },
  inputContainerFocused: {
    width: 43,
    height: 56,
    backgroundColor: Colors.input.darkWhite,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.input.pink,
  },
  inputsContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hiddenCodeInput: {
    height: 1, // not 0, 0 won't work on Android
    width: 1, // not 0, 0 won't work on Android
    opacity: 0,
  },
});
