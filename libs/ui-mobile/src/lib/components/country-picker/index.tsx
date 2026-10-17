import { useTranslation } from 'react-i18next';
import { StyleProp, ViewStyle } from 'react-native';

import { ICountry } from '@clean-rn/auth/domain';

import { Location } from '../../assets';
import { Colors } from '../../constants';
import { Dropdown } from '../dropdown';

type IProps = {
  label: string;
  defaultValue?: string;
  data: ICountry[];
  sortBy: 'name' | 'code';
};

type IState = {
  value: string;
  onChange: (data: string) => void;
};

export const CountryPicker = (props: IProps & IState) => {
  const { t } = useTranslation();

  const getFlagAndName = (country: ICountry | undefined) => {
    if (!country) return '';
    return country.emoji + ' ' + country.name;
  };
  const sortedData = Object.values(props.data as ICountry[])
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
    ? Object.values(props.data as ICountry[]).find((country: ICountry) => country.code === props.defaultValue)
    : undefined;

  return (
    <Dropdown
      {...props}
      labelColor={Colors.text.lightGrey}
      data={sortedData}
      icon={() => <Location style={{ color: Colors.icon.lightGreenTransparent } as StyleProp<ViewStyle>} />}
      placeholder={t('countryPicker.placeholder')}
      onSelect={handleOnSelect}
      defaultValue={getFlagAndName(defaultValue)}
    />
  );
};
