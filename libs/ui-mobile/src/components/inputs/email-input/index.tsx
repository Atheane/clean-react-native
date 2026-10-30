import { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import { Input, useTheme } from '@rneui/themed';

import { Email } from '../../../assets';
import { Colors } from '../../../constants';

import { TextInput } from '../../inputs/text-input';

type Props = {
  email?: string;
};

type State = {
  label: string;
  placeholder: string;
  value?: string;
  filled?: boolean;
  onFocus?: () => void;
  onChange?: (text: string) => void;
  onSubmitEditing: () => void;
};

export const EmailInput = (props: Props & State) => {
  const { theme } = useTheme();

  const handleOnChange = useCallback(
    (text: string) => {
      const cleanEmail = text.trim();
      if (props.onChange) props.onChange(cleanEmail);
    },
    [props],
  );

  return props.filled ? (
    <Input
      autoCapitalize="none"
      inputContainerStyle={[theme.container.input, styles.inputContainer]}
      inputStyle={[theme.text.input, styles.input]}
      leftIcon={<Email startColor={Colors.primary.lightGreen} endColor={Colors.primary.green} />}
      leftIconContainerStyle={styles.leftIconContainer}
      value={props.email?.trim()}
      caretHidden={true}
    />
  ) : (
    <TextInput
      label={props.label}
      placeholder={props.placeholder}
      labelColor={Colors.primary.grey}
      IconLeft={() => <Email startColor={Colors.primary.lightGreen} endColor={Colors.primary.green} />}
      value={props.value}
      lowerCase
      onChange={handleOnChange}
      onFocus={props.onFocus}
      onSubmitEditing={props.onSubmitEditing}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: 'transparent',
  },
  input: {
    textAlign: 'left',
  },
  editIcon: {
    marginLeft: 12,
  },
  leftIconContainer: {
    marginHorizontal: 10,
    borderBottomWidth: 0,
  },
});
