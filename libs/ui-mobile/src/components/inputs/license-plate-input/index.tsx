import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';

import { TextInput, IProps } from '../text-input';

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Formats a string to match a license plate pattern.
 *
 * This function removes all whitespace, converts the string to uppercase,
 * and formats it to follow the pattern 'AA-123-BB' where 'AA' and 'BB' are
 * two letters and '123' is a sequence of three digits.
 *
 * @param value - The input string representing a license plate.
 * @returns The formatted license plate string.
 */
/******  48771ac2-86ff-4e6f-8809-fa9a702f74d0  *******/ const formatLicensePlate = (
  value: string,
): string => {
  return value
    .replace(/\s+/g, '') // Supprime tous les espaces
    .toUpperCase() // Met en majuscules
    .replace(/(\w{2})(\d{3})(\w{2})/, '$1$2$3') // Ajoute les espaces selon le format AA 123 BB
    .trim();
};

export const LicensePlateInput: React.FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();
  const [value, setValue] = useState<string>('');

  const handleChange = useCallback(
    (text: string) => {
      // Filtre les caractères invalides
      const formattedText = formatLicensePlate(text);

      setValue(formattedText);
      if (props.onChange) {
        props.onChange(formattedText);
      }
    },
    [props],
  );

  // Réinitialization
  useEffect(() => {
    if (props.value === '') {
      setValue('');
    }
  }, [props.value]);

  return (
    <TextInput
      {...props}
      value={value ?? props.value}
      onChange={handleChange}
      numeric={false}
      customInputStyle={[theme.text.input, styles.customTextStyle]}
    />
  );
};

const styles = StyleSheet.create({
  customTextStyle: {
    marginLeft: 10,
    fontSize: 18,
    letterSpacing: 1, // Améliore la lisibilité
  },
});
