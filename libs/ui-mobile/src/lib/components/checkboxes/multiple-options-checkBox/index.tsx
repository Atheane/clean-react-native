import { useCallback, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, CheckBox } from '@rneui/themed';

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
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      {props.subtitle && <Text style={styles.text}>{props.subtitle}</Text>}
      <View style={styles.checkboxContainer}>
        {props.optionsValues.map((option: string, index: number) => {
          return (
            <View key={index} style={[styles.item, { marginRight: props.optionsTitle.length < 3 ? 50 : 0 }]}>
              <CheckBox
                checked={currentOption === option}
                onPress={() => handleOnPress(option)}
                title={props.optionsTitle[index]}
                titleProps={{ style: { ...styles.text, marginLeft: 8 } }}
                checkedIcon={<CheckedIcon style={{ color: Colors.bank.primary.lightGreen }} />}
                uncheckedIcon={<UncheckIcon style={{ color: Colors.bank.primary.lightGreen }} />}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    textTransform: 'uppercase',
    fontFamily: FontNames.Roboto_700Bold,
    fontSize: 16,
    color: Colors.bank.primary.grey,
    lineHeight: 21,
    textAlign: 'left',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 19,
    color: Colors.bank.primary.grey,
    fontFamily: FontNames.Roboto_400Regular,
  },
  checkboxContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.8,
  },
  item: {
    marginLeft: -20,
    justifyContent: 'space-between',
  },
});
