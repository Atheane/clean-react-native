import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Input, useTheme } from '@rneui/themed';

import { Mail } from '../../../assets';
import { Colors } from '../../../constants';

import { TextInput } from '../../inputs/text-input';

type Props = {
  email?: string;
};

type State = {
  value?: string;
  filled?: boolean;
  onFocus?: () => void;
  onChange?: (text: string) => void;
};

export const EmailInput = (props: Props & State) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

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
      inputContainerStyle={[theme.bank.container.input, styles.inputContainer]}
      inputStyle={[theme.bank.text.input, styles.input]}
      leftIcon={<Mail style={{ color: Colors.bank.primary.lightGreen }} />}
      leftIconContainerStyle={styles.leftIconContainer}
      value={props.email?.trim()}
      caretHidden={true}
    />
  ) : (
    <TextInput
      label={t('screens.login.email.label')}
      labelColor={Colors.bank.primary.grey}
      icon={() => <Mail style={{ color: Colors.bank.primary.lightGreen }} />}
      value={props.value}
      lowerCase
      onChange={handleOnChange}
      onFocus={props.onFocus}
      placeholder={t('screens.login.email.placeholder')}
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
