/* eslint-disable @typescript-eslint/no-explicit-any */
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
  label?: string;
  placeholder: string;
  data: IData[];
  icon?: FC<SvgProps>;
  defaultValue?: string;
  value?: string;
  short?: boolean;
  shortWidth?: number;
  multiline?: boolean;
  onSelect: ({ key, value }: { key: string; value: string }) => void;
};

export const Dropdown = (props: IProps) => {
  const handleOnSelect = (value: string, index: number) => {
    props.onSelect(props.data[index]);
  };

  const { theme } = useTheme();

  // Custom function to render the selected item
  const renderSelectedItem = (value: string) => {
    return (
      <View style={styles.selectedItemContainer}>
        <Text style={styles.selectedItemText}>{value}</Text>
      </View>
    );
  };

  return (
    <View style={props.short ? { width: props.shortWidth ?? Dimensions.get('window').width * 0.5 } : {}}>
      {props.label && (
        <View style={styles.labelContainer}>
          <Text style={[theme.bank.text.label, { color: props.labelColor ?? Colors.bank.secondary.pink }]}>
            {props.label.toLocaleUpperCase()}
          </Text>
        </View>
      )}
      <View style={theme.bank.container.centeredItems}>
        {props.icon && (
          <View style={[styles.leftIconContainer, theme.bank.container.centeredItem]}>
            <props.icon />
          </View>
        )}
        <SelectDropdown
          data={props.data}
          onSelect={handleOnSelect}
          buttonTextAfterSelection={
            props.multiline ? (item: IData) => renderSelectedItem(item.value) : (item: IData) => item.value
          }
          buttonStyle={[
            styles.buttonContainer,
            props.short
              ? { width: props.shortWidth ?? Dimensions.get('window').width * 0.5 }
              : { width: Dimensions.get('window').width * 0.65 },
          ]}
          rowTextForSelection={(item: IData) => item.value}
          buttonTextStyle={theme.bank.text.input}
          rowTextStyle={styles.rowText}
          renderDropdownIcon={() => (
            <View style={styles.dropdownIcon}>
              <DropDownChevron style={{ color: Colors.bank.primary.lightGreen }} />
            </View>
          )}
          renderCustomizedRowChild={(row: any) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
              <Text style={styles.rowText}>{row.value}</Text>
            </View>
          )}
          defaultButtonText={
            props.defaultValue
              ? props.multiline
                ? (renderSelectedItem(props.defaultValue) as string)
                : props.defaultValue
              : props.placeholder
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    marginBottom: 16,
  },
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
    height: 55,
  },
  dropdownIcon: {
    marginRight: 16,
  },
  selectedItemContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 4,
    paddingLeft: 4,
  },
  selectedItemText: {
    color: Colors.bank.secondary.pink,
    textAlign: 'left',
    flexWrap: 'wrap',
  },
});
