import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Input, useTheme } from '@rneui/themed';

import { Mail, Edit } from '../../../assets';
import { Colors } from '../../../constants';

import { TextInput } from '../../inputs/text-input';

type Props = {
  email?: string;
};

type State = {
  value?: string;
  filled?: boolean;
  onEdit?: () => void;
  onFocus: () => void;
  onChange?: (text: string) => void;
};

export const EmailInput = (props: Props & State) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const handleOnChange = useCallback((text: string) => {
    const cleanEmail = text.trim();
    if (props.onChange) props.onChange(cleanEmail);
  }, []);

  return props.filled ? (
    <View
      style={
        props.filled
          ? {
              backgroundColor: 'transparent',
              flexDirection: 'row',
              width: 335,
            }
          : theme.input.container
      }
    >
      <Input
        autoCapitalize="none"
        inputContainerStyle={theme.input.subContainer}
        inputStyle={theme.input.text}
        leftIcon={<Mail style={{ color: Colors.text.lightGreenTransparent }} />}
        leftIconContainerStyle={theme.input.leftIconContainer}
        value={props.email?.trim()}
        rightIcon={
          <View style={styles.editIcon} onTouchStart={props.onEdit}>
            <Edit />
          </View>
        }
      />
    </View>
  ) : (
    <TextInput
      label={t('screens.login.email.label')}
      labelColor={Colors.text.lightGrey}
      icon={() => <Mail style={{ color: Colors.text.lightGreenTransparent }} />}
      value={props.value}
      lowerCase
      onChange={handleOnChange}
      onFocus={props.onFocus}
      placeholder={t('screens.login.email.placeholder')}
    />
  );
};

const styles = StyleSheet.create({
  editIcon: {
    marginLeft: 12,
  },
});
