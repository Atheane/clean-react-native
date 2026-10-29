import { StyleProp, ViewStyle } from 'react-native';
import countryFlagEmoji from 'country-flag-emoji';

import { ICountry } from '@clean-rn/user/domain';

import { Dropdown } from '../../dropdowns/dropdown';

import { Location } from '../../../assets';
import { Colors } from '../../../constants';

type IProps = {
  label: string;
  placeholder: string;
  defaultValue?: string;
  sortBy: 'name' | 'code';
};

type IState = {
  value: string;
  onChange: (data: string) => void;
};

export const CountryPicker = (props: IProps & IState) => {
  const getFlagAndName = (country: ICountry | undefined) => {
    if (!country) return '';
    return country.emoji + ' ' + country.name;
  };
  const sortedData = Object.values(countryFlagEmoji.data as ICountry[])
    .sort((a: ICountry, b: ICountry) => {
      if (a[props.sortBy] < b[props.sortBy]) {
        return -1;
      }
      if (a[props.sortBy] > b[props.sortBy]) {
        return 1;
      }
      return 0;
    })
    .map((country: ICountry) => ({
      key: country.code,
      value: getFlagAndName(country),
    }));

  const handleOnSelect = ({ key }: { key: string; value: string }) => {
    props.onChange(key);
  };

  const defaultValue = props.defaultValue
    ? Object.values(countryFlagEmoji.data as ICountry[]).find(
        (country: ICountry) => country.code === props.defaultValue,
      )
    : undefined;

  return (
    <Dropdown
      {...props}
      labelColor={Colors.primary.grey}
      data={sortedData}
      icon={() => <Location style={{ color: Colors.primary.lightGreen } as StyleProp<ViewStyle>} />}
      placeholder={props.placeholder}
      onSelect={handleOnSelect}
      defaultValue={getFlagAndName(defaultValue)}
    />
  );
};
