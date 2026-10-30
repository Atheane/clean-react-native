/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Platform } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Select from 'react-select';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';

import { DropdownChevron } from '../../../assets';
import { Colors, FontNames } from '../../../constants';

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

const MobileDropdown = (props: IProps) => {
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
    <View style={props.short ? { width: props.shortWidth ?? 100 } : {}}>
      {props.label && (
        <View style={styles.labelContainer}>
          <Text style={[theme.text.label, { color: props.labelColor ?? Colors.secondary.pink }]}>
            {props.label.toLocaleUpperCase()}
          </Text>
        </View>
      )}
      <View style={theme.container.centeredItems}>
        {props.icon && (
          <View style={[styles.leftIconContainer, theme.container.centeredItem]}>
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
              ? { width: props.shortWidth ?? 100 }
              : props.icon
                ? { width: Dimensions.get('window').width * 0.65 }
                : { width: Dimensions.get('window').width * 0.85 },
          ]}
          rowTextForSelection={(item: IData) => item.value}
          buttonTextStyle={theme.text.input}
          rowTextStyle={styles.rowText}
          renderDropdownIcon={() => (
            <View style={styles.dropdownIcon}>
              <DropdownChevron />
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

const WebDropdown = (props: IProps) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option: any) => {
    setSelectedOption(option);
    props.onSelect({ key: option.key, value: option.value });
  };

  const options = props.data.map((item) => ({
    value: item.value,
    label: item.value,
    key: item.key,
  }));

  const customStyles = {
    control: (styles: any) => ({
      ...styles,
      borderRadius: 8,
      paddingVertical: 8,
      height: 55,
      width: props.short ? props.shortWidth : '100%',
      fontFamily: FontNames.Roboto_400Regular,
      fontSize: 14,
    }),
    option: (styles: any) => ({
      ...styles,
      textTransform: 'uppercase',
      fontFamily: FontNames.Roboto_400Regular,
      fontSize: 14,
    }),
    placeholder: (styles: any) => ({
      ...styles,
      color: Colors.secondary.pink,
      fontFamily: FontNames.Roboto_400Regular,
      fontSize: 14,
    }),
  };

  return (
    <div style={{ width: props.short ? props.shortWidth : '100%' }}>
      {props.label && (
        <div style={{ marginBottom: 16 }}>
          <span
            style={{
              color: props.labelColor || Colors.secondary.pink,
              textTransform: 'uppercase',
              fontFamily: FontNames.Roboto_700Bold,
              textAlign: 'left',
            }}
          >
            {props.label}
          </span>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {props.icon && (
          <div style={{ marginRight: 16 }}>
            <props.icon />
          </div>
        )}
        <Select
          options={options}
          value={selectedOption}
          onChange={handleSelect}
          placeholder={props.placeholder}
          styles={customStyles}
          components={{
            IndicatorSeparator: () => null,
            IndicatorsContainer: () => (
              <div style={{ marginRight: 16 }}>
                <DropdownChevron color={Colors.primary.lightGreen} />
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
};

export const Dropdown = (props: IProps) => {
  if (Platform.OS === 'web') {
    return <WebDropdown {...props} />;
  } else {
    return <MobileDropdown {...props} />;
  }
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
    color: Colors.secondary.pink,
    textAlign: 'left',
    flexWrap: 'wrap',
  },
});
