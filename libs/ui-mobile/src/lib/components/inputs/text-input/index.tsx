import { View, Text } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Input, useTheme } from '@rneui/themed';

import { Colors } from '../../../constants';

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
  const { theme } = useTheme();

  return (
    <View>
      {props.label && (
        <Text style={[theme.input.label, { color: props.labelColor ?? Colors.input.pink }]}>
          {props.label}
        </Text>
      )}
      <View style={theme.input.container}>
        {props.lowerCase ? (
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            inputContainerStyle={theme.input.subContainer}
            inputStyle={theme.input.text}
            leftIcon={props.icon ? <props.icon /> : undefined}
            leftIconContainerStyle={theme.input.leftIconContainer}
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
            inputContainerStyle={theme.input.subContainer}
            inputStyle={theme.input.text}
            leftIcon={props.icon ? <props.icon /> : undefined}
            leftIconContainerStyle={theme.input.leftIconContainer}
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
