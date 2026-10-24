import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, TextStyle, StyleProp } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Input, useTheme, Theme } from '@rneui/themed';

import { Colors } from '../../../constants';

export type IProps = {
  placeholder: string;
  numeric?: boolean;
  label?: string;
  labelColor?: string;
  IconLeft?: React.FC<SvgProps>;
  IconRight?: React.FC<SvgProps>;
  lowerCase?: boolean;
  autoFocus?: boolean;
  clearTextOnFocus?: boolean;
  clearButtonMode?: 'always' | 'while-editing';
  value?: string;
  onChange?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  short?: boolean;
  customInputStyle?: StyleProp<TextStyle>;
};

const Label = React.memo(
  ({ label, labelColor, theme }: { label?: string; labelColor?: string; theme: Theme }) =>
    label ? (
      <Text style={[theme.bank.text.label, { color: labelColor ?? Colors.bank.secondary.pink }]}>
        {label}
      </Text>
    ) : null,
);

export const TextInput = ({
  placeholder,
  numeric,
  label,
  labelColor,
  IconLeft,
  IconRight,
  lowerCase,
  autoFocus,
  clearTextOnFocus,
  clearButtonMode,
  value,
  onChange,
  onFocus,
  onBlur,
  short,
  customInputStyle,
}: IProps) => {
  const { theme } = useTheme();

  const inputStyle = useMemo(
    () => ({
      autoCapitalize: lowerCase ? 'none' : undefined,
      autoCorrect: false,
      keyboardType: numeric ? 'numeric' : 'default',
      placeholderTextColor: Colors.bank.primary.grey,
    }),
    [lowerCase, numeric],
  );

  return (
    <View>
      <Label label={label} labelColor={labelColor} theme={theme} />
      <View
        style={
          short
            ? [theme.bank.container.input, { width: Dimensions.get('window').width * 0.5 }]
            : theme.bank.container.input
        }
      >
        <Input
          {...inputStyle}
          inputContainerStyle={styles.inputContainer}
          inputStyle={customInputStyle ?? theme.bank.text.input}
          leftIcon={IconLeft ? <IconLeft /> : undefined}
          leftIconContainerStyle={styles.leftIconContainer}
          rightIcon={IconRight ? <IconRight /> : undefined}
          onChangeText={onChange}
          placeholder={placeholder}
          value={value}
          clearButtonMode={clearButtonMode}
          onFocus={onFocus}
          onBlur={onBlur}
          autoFocus={autoFocus}
          clearTextOnFocus={clearTextOnFocus}
          multiline={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editIcon: {
    marginLeft: 12,
  },
  inputContainer: {
    marginTop: 10,
    marginLeft: 20,
    marginBottom: -15, // override of default input bottomMargin
    borderBottomWidth: 0,
  },
  leftIconContainer: {
    marginLeft: -10,
    marginRight: 10,
    borderBottomWidth: 0,
  },
});
