import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Input } from '@rneui/themed';

import { Colors, FontNames } from '../../../constants';

type IProps = {
  placeholder: string;
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
  return (
    <View>
      {props.label && (
        <Text style={[styles.inputLabelStyle, { color: props.labelColor ?? Colors.bank.secondary.pink }]}>
          {props.label}
        </Text>
      )}
      <View style={styles.inputContainer}>
        {props.lowerCase ? (
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
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
          />
        ) : (
          <Input
            autoCorrect={false}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
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
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: Colors.bank.primary.lightGrey,
    borderRadius: 8,
  },
  inputStyle: {
    color: Colors.bank.secondary.pink,
    fontFamily: FontNames.Roboto_400Regular,
    fontSize: 14,
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
    color: Colors.bank.primary.grey,
    lineHeight: 21,
    textAlign: 'left',
    marginBottom: 8,
  },
  leftIconContainer: {
    marginHorizontal: 10,
    borderBottomWidth: 0,
  },
});
