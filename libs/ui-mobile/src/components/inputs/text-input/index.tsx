import { View, Text, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Input, useTheme } from '@rneui/themed';

import { Colors } from '../../../constants';

type IProps = {
  placeholder: string;
  numeric?: boolean;
  label?: string;
  labelColor?: string;
  icon?: React.FC<SvgProps>;
  lowerCase?: boolean;
  autoFocus?: boolean;
  clearTextOnFocus?: boolean;
  clearButtonMode?: 'always' | 'while-editing';
  value?: string;
  onChange?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const TextInput = (props: IProps) => {
  const { theme } = useTheme();
  return (
    <View>
      {props.label && (
        <Text style={[theme.bank.text.label, { color: props.labelColor ?? Colors.bank.secondary.pink }]}>
          {props.label}
        </Text>
      )}
      <View style={theme.bank.container.input}>
        {props.lowerCase ? (
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            inputContainerStyle={styles.inputContainer}
            inputStyle={theme.bank.text.input}
            leftIcon={props.icon ? <props.icon /> : undefined}
            leftIconContainerStyle={styles.leftIconContainer}
            onChangeText={props.onChange}
            placeholder={props.placeholder}
            value={props.value}
            clearButtonMode={props.clearButtonMode}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            autoFocus={props.autoFocus}
            clearTextOnFocus={props.clearTextOnFocus}
            keyboardType={props.numeric ? 'number-pad' : 'default'}
          />
        ) : (
          <Input
            autoCorrect={false}
            inputContainerStyle={styles.inputContainer}
            inputStyle={theme.bank.text.input}
            leftIcon={props.icon ? <props.icon /> : undefined}
            leftIconContainerStyle={styles.leftIconContainer}
            onChangeText={props.onChange}
            placeholder={props.placeholder}
            value={props.value}
            clearButtonMode={props.clearButtonMode}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            autoFocus={props.autoFocus}
            clearTextOnFocus
            keyboardType={props.numeric ? 'number-pad' : 'default'}
          />
        )}
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
    marginBottom: -15, // override of default input bottomMargin
    borderBottomWidth: 0,
  },
  leftIconContainer: {
    marginHorizontal: 10,
    borderBottomWidth: 0,
  },
});
