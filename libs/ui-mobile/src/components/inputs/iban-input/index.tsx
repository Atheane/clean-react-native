import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';

import { TextInput, IProps } from '../text-input';

const formatIban = (value: string): string => {
  return value
    .replace(/\s+/g, '')
    .toUpperCase()
    .replace(/(.{4})/g, '$1 ')
    .trim();
};

export const IbanInput: React.FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();
  const [value, setValue] = useState<string>('');

  const handleChange = useCallback(
    (text: string) => {
      const formattedText = formatIban(text);
      setValue(formattedText);
      if (props.onChange) {
        props.onChange(formattedText);
      }
    },
    [props],
  );

  return (
    <TextInput
      {...props}
      value={value}
      onChange={handleChange}
      numeric={false}
      customInputStyle={[theme.text.input, styles.customTextStyle]}
    />
  );
};

const styles = StyleSheet.create({
  customTextStyle: {
    fontSize: 13,
  },
});
