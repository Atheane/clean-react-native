import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import countryFlagEmoji from 'country-flag-emoji';

import { CountryPicker } from '@clean-rn/ui-mobile';
import { ICountry } from '@clean-rn/auth/domain';

import { WithSwitch, ValidationStatus } from '../wrappers';

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

const CountryPickerMeta: ComponentMeta<typeof CountryPicker> = {
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
    label: 'Pays',
    defaultValue: 'FR',
    data: countryFlagEmoji.data,
    sortBy: 'name',
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED)],
};

export default CountryPickerMeta;

export const Dynamic: ComponentStory<typeof CountryPicker> = (args) => <CountryPicker {...args} />;
