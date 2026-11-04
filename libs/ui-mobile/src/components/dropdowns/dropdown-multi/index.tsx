/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Platform, TouchableOpacity } from 'react-native';
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
  defaultValue?: IData[];
  value?: IData[];
  short?: boolean;
  shortWidth?: number;
  multiline?: boolean;
  onSelect: (selectedItems: IData[]) => void;
};

const Tag = ({ item, onRemove }: { item: IData; onRemove: (key: any) => void }) => (
  <View style={styles.tag}>
    <Text style={styles.tagText}>{item.value}</Text>
    <TouchableOpacity onPress={() => onRemove(item.key)} style={styles.tagRemoveButton}>
      <Text style={styles.tagRemoveText}>×</Text>
    </TouchableOpacity>
  </View>
);

const MobileDropdown = (props: IProps) => {
  const [selectedItems, setSelectedItems] = useState<IData[]>(props.defaultValue || []);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleOnSelect = (value: string, index: number) => {
    const selectedItem = props.data[index];
    const newSelectedItems = selectedItems.some((item) => item.key === selectedItem.key)
      ? selectedItems.filter((item) => item.key !== selectedItem.key)
      : [...selectedItems, selectedItem];

    setSelectedItems(newSelectedItems);
    props.onSelect(newSelectedItems);
  };

  const handleRemoveTag = (key: any) => {
    const newSelectedItems = selectedItems.filter((item) => item.key !== key);
    setSelectedItems(newSelectedItems);
    props.onSelect(newSelectedItems);
  };

  const { theme } = useTheme();

  return (
    <View style={props.short ? { width: props.shortWidth ?? 100 } : {}}>
      {props.label && (
        <View style={styles.labelContainer}>
          <Text style={[theme.text.label, { color: props.labelColor ?? Colors.secondary.pink }]}>
            {props.label.toLocaleUpperCase()}
          </Text>
        </View>
      )}

      {/* Tags Container */}
      {selectedItems.length > 0 && (
        <View style={styles.tagsContainer}>
          {selectedItems.map((item) => (
            <Tag key={item.key} item={item} onRemove={handleRemoveTag} />
          ))}
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
          buttonTextAfterSelection={() => props.placeholder}
          buttonStyle={[
            styles.buttonContainer,
            props.short
              ? { width: props.shortWidth ?? 100 }
              : props.icon
                ? { width: Dimensions.get('window').width * 0.65 }
                : { width: Dimensions.get('window').width * 0.75 },
          ]}
          rowTextForSelection={(item: IData) => item.value}
          buttonTextStyle={[theme.text.input, styles.buttonText]}
          rowTextStyle={styles.rowText}
          renderDropdownIcon={() => (
            <View style={styles.dropdownIcon}>
              <DropdownChevron />
            </View>
          )}
          renderCustomizedRowChild={(row: any) => (
            <View style={styles.rowContainer}>
              <Text style={styles.rowText}>{row.value}</Text>
              {selectedItems.some((item) => item.key === row.key) && (
                <View style={styles.checkmark}>
                  <Text>✓</Text>
                </View>
              )}
            </View>
          )}
          defaultButtonText={props.placeholder}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        />
      </View>
    </View>
  );
};

const WebDropdown = (props: IProps) => {
  const [selectedOptions, setSelectedOptions] = useState<any[]>(
    props.defaultValue?.map((item) => ({ value: item.value, label: item.value, key: item.key })) || [],
  );

  const handleSelect = (options: any) => {
    setSelectedOptions(options || []);
    const selectedItems = (options || []).map((option: any) => ({
      key: option.key,
      value: option.value,
    }));
    props.onSelect(selectedItems);
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
      height: 'auto',
      minHeight: 55,
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
    multiValue: (styles: any) => ({
      ...styles,
      backgroundColor: Colors.secondary.lightBlue,
      borderRadius: 4,
      margin: 2,
    }),
    multiValueLabel: (styles: any) => ({
      ...styles,
      color: Colors.primary.darkBlue,
      fontFamily: FontNames.Roboto_400Regular,
      padding: 4,
    }),
    multiValueRemove: (styles: any) => ({
      ...styles,
      color: Colors.primary.white,
      ':hover': {
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: Colors.primary.darkBlue,
      },
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
          isMulti
          options={options}
          value={selectedOptions}
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

export const DropdownMulti = (props: IProps) => {
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
    minHeight: 55,
  },
  dropdownIcon: {
    marginRight: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  checkmark: {
    marginLeft: 10,
  },
  buttonText: {
    textAlign: 'left',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    maxWidth: '75%',
  },
  tag: {
    backgroundColor: Colors.secondary.lightBlue,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    color: Colors.primary.darkBlue,
    fontSize: 14,
    marginRight: 4,
  },
  tagRemoveButton: {
    padding: 2,
  },
  tagRemoveText: {
    color: Colors.primary.darkBlue,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
