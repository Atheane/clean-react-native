import { FC } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';

import { Colors, FontNames } from '../../../constants';

type IProps = {
  label: string;
  icon?: FC<SvgProps>;
  horizontal?: boolean;
  value: number;
  onChange: (value: number) => void;
};

export const SelectNumber = (props: IProps) => {
  const { theme } = useTheme();
  return props.horizontal ? (
    <View style={styles.selectContainer}>
      <Text style={[theme.bank.text.label, { color: Colors.bank.secondary.pink }]}>
        {props.label.toLocaleUpperCase()}
      </Text>
      <View style={styles.inputContainer}>
        <NumericInput
          step={1}
          minValue={0}
          valueType="integer"
          rounded={true}
          borderColor={Colors.bank.transparent}
          rightButtonBackgroundColor={Colors.bank.primary.lightGreen}
          leftButtonBackgroundColor={Colors.bank.primary.lightGreen}
          value={props.value}
          onChange={props.onChange}
        />
      </View>
    </View>
  ) : (
    <View>
      <Text style={[theme.bank.text.label, { color: Colors.bank.secondary.pink }]}>
        {props.label.toLocaleUpperCase()}
      </Text>
      <View style={styles.selectContainer}>
        {props.icon && (
          <View style={styles.leftIconContainer}>
            <props.icon />
          </View>
        )}

        <NumericInput
          step={1}
          minValue={0}
          valueType="integer"
          rounded={true}
          borderColor={Colors.bank.transparent}
          rightButtonBackgroundColor={Colors.bank.primary.lightGreen}
          leftButtonBackgroundColor={Colors.bank.primary.lightGreen}
          value={props.value}
          onChange={props.onChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    color: Colors.bank.secondary.pink,
    fontFamily: FontNames.Roboto_700Bold,
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 16,
  },
  selectContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.75,
    marginVertical: 16,
  },
  leftIconContainer: {
    marginLeft: 8,
    marginRight: 14,
    justifyContent: 'center',
  },
  inputContainer: {
    margin: 16,
  },
});
