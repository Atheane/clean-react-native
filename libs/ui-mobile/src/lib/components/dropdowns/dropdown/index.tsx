import { FC } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';

import { DropDownChevron } from '../../../assets';
import { Colors } from '../../../constants';

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
  const handleOnSelect = (value: string, index: number) => {
    props.onSelect(props.data[index]);
  };

  const { theme } = useTheme();

  return (
    <View>
      <Text style={[theme.bank.text.pinkLabel, { color: props.labelColor ?? Colors.bank.secondary.pink }]}>
        {props.label.toLocaleUpperCase()}
      </Text>

      <View style={theme.bank.container.centeredItems}>
        <View style={[styles.leftIconContainer, theme.bank.container.centeredItem]}>
          <props.icon />
        </View>
        <SelectDropdown
          data={props.data}
          onSelect={handleOnSelect}
          buttonTextAfterSelection={(item: IData) => item.value}
          buttonStyle={styles.buttonContainer}
          rowTextForSelection={(item: IData) => item.value}
          buttonTextStyle={theme.bank.text.input}
          rowTextStyle={styles.rowText}
          renderDropdownIcon={() => (
            <View style={styles.dropdownIcon}>
              <DropDownChevron style={{ color: Colors.bank.primary.lightGreen }} />
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
  leftIconContainer: {
    width: 30,
    marginLeft: 4,
    marginRight: 16,
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
});
