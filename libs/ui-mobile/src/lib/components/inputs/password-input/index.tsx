import { View, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Input, InputProps, useTheme } from '@rneui/themed';

import { Lock, Eye, Blind } from '../../../assets';
import { Colors } from '../../../constants';

type State = {
  label?: string;
  secured: boolean;
  onChange: (text: string) => void;
  onToggleSecurity: (event: GestureResponderEvent) => void;
};

export const PasswordInput = (props: InputProps & State) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <View>
      <Text style={theme.input.label}>{props.label ? props.label : t('screens.login.password.label')}</Text>
      <View style={theme.input.container}>
        <Input
          inputContainerStyle={theme.input.subContainer}
          inputStyle={theme.input.text}
          secureTextEntry={props.secured}
          leftIcon={<Lock style={{ color: theme.linearGradient.start }} />}
          leftIconContainerStyle={theme.input.leftIconContainer}
          onFocus={props.onFocus}
          onChangeText={props.onChange}
          value={props.value ? props.value.toLowerCase() : props.value}
          placeholder={t('screens.login.password.placeholder')}
          rightIcon={
            <View style={styles.eyeContainer} onTouchStart={props.onToggleSecurity}>
              {props.secured ? (
                <Eye {...styles.eyeIcon} style={{ color: Colors.icon.pink }} />
              ) : (
                <Blind {...styles.blindIcon} style={{ color: Colors.icon.pink }} />
              )}
            </View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eyeContainer: {
    justifyContent: 'center',
    height: 30,
    borderLeftColor: Colors.input.pink,
    borderLeftWidth: 1,
    paddingLeft: 20,
    paddingRight: 10,
  },
  eyeIcon: {
    width: 22,
    height: 17,
  },
  blindIcon: {
    marginBottom: 5,
    width: 25,
    height: 25,
  },
});
