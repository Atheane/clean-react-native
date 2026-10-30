import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { CheckBox, useTheme } from '@rneui/themed';

import { Checkbox as CheckedIcon, Uncheckedbox as UncheckIcon } from '../../../assets';
import { Colors } from '../../../constants';

type IProps = {
  label?: string;
  subtitle?: string;
  optionsTitle: string[];
  optionsValues: string[];
  onChange: (option: string) => void;
  vertical?: boolean;
  defaultValue?: string;
  setDisabled?: (disabled: boolean) => void;
};

export const MultipleOptionsCheckBox = (props: IProps) => {
  const [currentOption, setCurrentOption] = useState<string>(props.defaultValue || props.optionsValues[0]);

  const handleOnPress = useCallback(
    (option: string) => {
      setCurrentOption(option);
      if (props.setDisabled) props.setDisabled(false);
      props.onChange(option);
    },
    [props],
  );

  const { theme } = useTheme();

  return (
    <View>
      {props.label && <Text style={[theme.text.label, { color: Colors.primary.grey }]}>{props.label}</Text>}
      {props.subtitle && <Text style={theme.text.grey}>{props.subtitle}</Text>}
      <View style={props.vertical ? styles.checkboxContainerVertical : styles.checkboxContainer}>
        {props.optionsValues.map((option: string, index: number) => {
          return (
            <View
              key={index}
              style={[
                theme.container.justifiedItems,
                styles.item,
                { marginRight: props.optionsTitle.length < 3 ? 50 : 0 },
              ]}
            >
              <CheckBox
                checked={currentOption === option}
                onPress={() => handleOnPress(option)}
                title={props.optionsTitle[index]}
                titleProps={{ style: [theme.text.grey, { marginLeft: 8 }] }}
                checkedIcon={<CheckedIcon color={Colors.primary.lightGreen} />}
                uncheckedIcon={<UncheckIcon color={Colors.primary.grey} />}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainerVertical: {
    width: Dimensions.get('window').width * 0.8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.75,
  },
  item: {
    marginLeft: -20,
  },
});
