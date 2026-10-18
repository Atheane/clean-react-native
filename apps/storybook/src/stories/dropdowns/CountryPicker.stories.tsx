import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import countryFlagEmoji from 'country-flag-emoji';
import { useTranslation } from 'react-i18next';
import { getLocales } from 'expo-localization';

import { CountryPicker } from '@clean-rn/ui-mobile';
import { ICountry } from '@clean-rn/auth/domain';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

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
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default CountryPickerMeta;

export const Dynamic: ComponentStory<typeof CountryPicker> = (args) => {
  const { t } = useTranslation();
  const { regionCode } = getLocales()[0] as { regionCode: string };
  return (
    <CountryPicker {...args} label={t('screens.signupstep4.birthCountry.label')} defaultValue={regionCode} />
  );
};
