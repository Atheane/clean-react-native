import { FC } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { useTheme } from '@rneui/themed';
import SelectDropdown from 'react-native-select-dropdown';
import { SvgProps } from 'react-native-svg';

import { DropDownChevron } from '../../assets';
import { Colors, FontNames } from '../../constants';

type IData = {
  key: any;
  value: string;
};

type IProps = {
  labelColor?: string;
  label: string;
  placeholder: string;
  data: IData[];
  icon: FC<SvgProps>;
  defaultValue?: string;
  value?: string;
  onSelect: ({ key, value }: { key: string; value: string }) => void;
};

export const Dropdown = (props: IProps) => {
  const { theme } = useTheme();

  const handleOnSelect = (value: string, index: number) => {
    props.onSelect(props.data[index]);
  };

  return (
    <View>
      <Text style={[styles.inputLabel, { color: props.labelColor ?? Colors.input.pink }]}>
        {props.label.toLocaleUpperCase()}
      </Text>

      <View style={styles.selectContainer}>
        <View style={styles.leftIconContainer}>
          <props.icon />
        </View>
        <SelectDropdown
          data={props.data}
          onSelect={handleOnSelect}
          buttonTextAfterSelection={(item: IData) => item.value}
          buttonStyle={styles.buttonContainer}
          rowTextForSelection={(item: IData) => item.value}
          buttonTextStyle={[theme.input.text, styles.inputText]}
          rowTextStyle={styles.rowText}
          renderDropdownIcon={() => (
            <View style={styles.dropdownIcon}>
              <DropDownChevron fill={theme.linearGradient.start} />
            </View>
          )}
          defaultButtonText={props.defaultValue ?? props.placeholder}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowText: {
    textTransform: 'uppercase',
  },
  inputText: {
    textAlign: 'center',
  },
  inputLabel: {
    color: Colors.input.pink,
    fontFamily: FontNames.Roboto_700Bold,
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 16,
  },
  selectContainer: {
    flexDirection: 'row',
  },
  leftIconContainer: {
    width: 30,
    marginLeft: 4,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    borderRadius: 8,
    paddingVertical: 8,
    width: Dimensions.get('window').width * 0.65,
    height: 55,
  },
  dropdownIcon: {
    marginRight: 16,
  },
  placeholderText: {
    fontFamily: FontNames.Roboto_400Regular,
    fontSize: 14,
    color: Colors.text.grey,
  },
});
