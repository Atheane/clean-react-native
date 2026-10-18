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
      <Text style={[theme.bank.text.label, { color: Colors.bank.primary.grey }]}>
        {props.label ? props.label : t('screens.login.password.label')}
      </Text>
      <View style={theme.bank.container.input}>
        <Input
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={theme.bank.text.input}
          secureTextEntry={props.secured}
          leftIcon={<Lock style={{ color: Colors.bank.background.lightGreen }} />}
          leftIconContainerStyle={styles.leftIconContainer}
          onFocus={props.onFocus}
          onChangeText={props.onChange}
          value={props.value ? props.value.toLowerCase() : props.value}
          placeholder={t('screens.login.password.placeholder')}
          rightIcon={
            <View style={styles.eyeContainer} onTouchStart={props.onToggleSecurity}>
              {props.secured ? (
                <Eye {...styles.eyeIcon} style={{ color: Colors.bank.secondary.pink }} />
              ) : (
                <Blind {...styles.blindIcon} style={{ color: Colors.bank.secondary.pink }} />
              )}
            </View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    marginTop: 10,
    marginBottom: -15, // override of default input bottomMargin
    borderBottomWidth: 0,
  },
  leftIconContainer: {
    marginHorizontal: 10,
    borderBottomWidth: 0,
  },
  eyeContainer: {
    justifyContent: 'center',
    height: 30,
    borderLeftColor: Colors.bank.secondary.pink,
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
