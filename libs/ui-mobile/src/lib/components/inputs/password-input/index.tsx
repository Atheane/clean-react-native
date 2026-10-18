import { View, Text, StyleSheet, GestureResponderEvent, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Input, InputProps } from '@rneui/themed';

import { Lock, Eye, Blind } from '../../../assets';
import { Colors, FontNames } from '../../../constants';

type State = {
  label?: string;
  secured: boolean;
  onChange: (text: string) => void;
  onToggleSecurity: (event: GestureResponderEvent) => void;
};

export const PasswordInput = (props: InputProps & State) => {
  const { t } = useTranslation();
  return (
    <View>
      <Text style={styles.inputLabelStyle}>
        {props.label ? props.label : t('screens.login.password.label')}
      </Text>
      <View style={styles.inputContainer}>
        <Input
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          secureTextEntry={props.secured}
          leftIcon={<Lock style={{ color: Colors.background.lightGreen }} />}
          leftIconContainerStyle={styles.leftIconContainer}
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
  inputContainer: {
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: Colors.input.darkWhite,
    borderRadius: 8,
  },
  inputStyle: {
    color: Colors.input.pink,
    fontFamily: FontNames.Roboto_400Regular,
    fontSize: 14,
    textDecorationLine: 'none',
    textDecorationColor: 'transparent',
  },
  inputContainerStyle: {
    marginTop: 10,
    marginBottom: -15, // override of default input bottomMargin
    borderBottomWidth: 0,
  },
  inputLabelStyle: {
    textTransform: 'uppercase',
    fontFamily: FontNames.Roboto_700Bold,
    fontSize: 16,
    color: Colors.text.lightGrey,
    lineHeight: 21,
    textAlign: 'left',
    marginBottom: 8,
  },
  leftIconContainer: {
    marginHorizontal: 10,
    borderBottomWidth: 0,
  },
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
