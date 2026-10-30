import type { Meta } from '@storybook/react';
import countryFlagEmoji from 'country-flag-emoji';

import { CountryPicker } from '../../src/components/dropdowns/country-picker';
import { ICountry } from '@clean-rn/user/domain';

import { WithCenterView } from '../../wrappers';

const countries = Object.values(countryFlagEmoji.data as ICountry[])
  .sort((a: ICountry, b: ICountry) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  })
  .map((country: ICountry) => country.code);

const meta = {
  title: 'Dropdowns/CountryPicker',
  component: CountryPicker,
  argTypes: {
    onChange: { action: 'onChange' },
    defaultValue: {
      options: countries,
      control: { type: 'select' }, // Automatically inferred when 'options' is defined
    },
  },
  args: {
    defaultValue: 'FR',
    placeholder: 'Choisir le pays',
  },
  decorators: [WithCenterView],
} satisfies Meta<typeof CountryPicker>;

export default meta;

export const Basic = {
  label: 'Pays',
  defaultValue: 'FR',
  sortBy: 'name',
  placeholder: 'Select country',
};
