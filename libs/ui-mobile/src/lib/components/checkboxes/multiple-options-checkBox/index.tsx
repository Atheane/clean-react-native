import { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, CheckBox } from '@rneui/themed';

import { CheckBox as CheckedIcon, UncheckBox as UncheckIcon } from '../../../assets';
import { Colors, FontNames } from '../../../constants';

type IProps = {
  label?: string;
  subtitle?: string;
  optionsTitle: string[];
  optionsValues: string[];
  onChange: (option: string) => void;
};

export const MultipleOptionsCheckBox = (props: IProps) => {
  const { theme } = useTheme();

  const [currentOption, setCurrentOption] = useState<string>(props.optionsValues[0]);

  const handleOnPress = useCallback(
    (option: string) => {
      setCurrentOption(option);
      props.onChange(option);
    },
    [props.onChange],
  );

  return (
    <View>
      {props.label && <Text style={theme.input.label}>{props.label}</Text>}
      {props.subtitle && <Text style={styles(props).text}>{props.subtitle}</Text>}
      <View style={styles(props).checkboxContainer}>
        {props.optionsValues.map((option: string, index: number) => {
          return (
            <View key={index} style={styles(props).item}>
              <CheckBox
                checked={currentOption === option}
                onPress={() => handleOnPress(option)}
                title={props.optionsTitle[index]}
                titleProps={{ style: { ...styles(props).text, marginLeft: 8 } }}
                checkedIcon={<CheckedIcon style={{ color: Colors.icon.lightGreenTransparent }} />}
                uncheckedIcon={<UncheckIcon style={{ color: Colors.icon.lightGreenTransparent }} />}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = (props: IProps) =>
  StyleSheet.create({
    text: {
      fontSize: 14,
      lineHeight: 19,
      color: Colors.text.grey,
      fontFamily: FontNames.Roboto_400Regular,
    },
    checkboxContainer: {
      flexDirection: 'row',
      width: 309,
    },
    item: {
      marginLeft: -20,
      marginRight: props.optionsTitle.length < 3 ? 50 : 0,
      justifyContent: 'space-between',
    },
  });
