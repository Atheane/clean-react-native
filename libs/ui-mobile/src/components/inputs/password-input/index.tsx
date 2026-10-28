import { View, Text, StyleSheet, GestureResponderEvent } from 'react-native';

import { Input, InputProps, useTheme } from '@rneui/themed';

import { Lock, Eye, Blind } from '../../../assets';
import { Colors } from '../../../constants';

type State = {
  label: string;
  placeholder: string;
  secured: boolean;
  onChange: (text: string) => void;
  onToggleSecurity: (event: GestureResponderEvent) => void;
  onSubmitEditing: () => void;
};

export const PasswordInput = (props: InputProps & State) => {
  const { theme } = useTheme();
  return (
    <View>
      <Text style={[theme.text.label, { color: Colors.primary.grey }]}>{props.label}</Text>
      <View style={theme.container.input}>
        <Input
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={theme.text.input}
          secureTextEntry={props.secured}
          leftIcon={<Lock style={{ color: Colors.background.lightGreen }} />}
          leftIconContainerStyle={styles.leftIconContainer}
          onFocus={props.onFocus}
          onChangeText={props.onChange}
          value={props.value}
          placeholder={props.placeholder}
          onSubmitEditing={props.onSubmitEditing}
          returnKeyType="go"
          rightIcon={
            <View style={styles.eyeContainer} onTouchStart={props.onToggleSecurity}>
              {props.secured ? (
                <Eye {...styles.eyeIcon} style={{ color: Colors.secondary.pink }} />
              ) : (
                <Blind {...styles.blindIcon} style={{ color: Colors.secondary.pink }} />
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
    borderLeftColor: Colors.secondary.pink,
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
