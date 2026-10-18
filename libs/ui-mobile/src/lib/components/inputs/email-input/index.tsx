import React, { useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Input } from '@rneui/themed';

import { Mail, Edit } from '../../../assets';
import { Colors, FontNames } from '../../../constants';

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
          : styles.inputContainerStyle
      }
    >
      <Input
        autoCapitalize="none"
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        leftIcon={<Mail style={{ color: Colors.text.lightGreenTransparent }} />}
        leftIconContainerStyle={styles.leftIconContainer}
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
  inputContainerStyle: {
    width: Dimensions.get('window').width * 0.8,
    borderRadius: 8,
    borderBottomWidth: 0,
  },
  editIcon: {
    marginLeft: 12,
  },
  inputStyle: {
    color: Colors.input.pink,
    fontFamily: FontNames.Roboto_400Regular,
    fontSize: 14,
  },
  leftIconContainer: {
    marginHorizontal: 10,
    borderBottomWidth: 0,
  },
});
