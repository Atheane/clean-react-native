import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { useTheme } from '@rneui/themed';
import countryFlagEmoji from 'country-flag-emoji';

import { IDomainError } from '@clean-rn/ddd';
import { IUserErrorCodes, IUserErrorMessage, BirthDay } from '@clean-rn/user/domain';
import { firstLetterCapitalize } from '@clean-rn/utils';

import { SubmitButton } from '../../buttons/submit-button';
import { CountryPicker } from '../../dropdowns/country-picker';
import { DateTimePicker } from '../../dropdowns/datetime-picker';

type IProps = {
  defaultCountry?: string;
  control: Control<ISignupBirthFormData>;
  errors: FieldErrors<ISignupBirthFormData>;
  error: IDomainError<IUserErrorCodes, IUserErrorMessage> | Error | null;
  onSubmit: () => void;
  onFocus: () => void;
};

export type ISignupBirthFormData = {
  birthday: Dayjs;
  birthCountry: string;
  nationality: string;
};

export const FormSignupBirth = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, theme.bank.container.centeredItem]}>
      <View style={[styles.inputContainer, { marginBottom: 16 }]}>
        <Controller
          control={props.control}
          name="birthday"
          rules={{
            validate: BirthDay.validate,
          }}
          render={({ field: { onChange, value } }) => (
            <DateTimePicker
              label={t('signup-birth.birthday.label')}
              value={value || dayjs('1980-01-01')}
              format={'DD/MM/YYYY'}
              placeholder={t('signup-birth.birthday.placeholder')}
              onChange={onChange}
              onSubmitEditing={props.onSubmit}
            />
          )}
        />
      </View>
      {props.errors?.birthday && props.errors.birthday.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.birthday.required'))}</Text>
        </View>
      )}
      {props.errors?.birthday && props.errors.birthday.type === 'validate' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.birthday.invalid'))}</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="birthCountry"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <CountryPicker
              label={t('signup-birth.birth-country.label')}
              value={value}
              onChange={onChange}
              defaultValue={props.defaultCountry}
              data={countryFlagEmoji.data}
              sortBy={'name'}
            />
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="nationality"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <CountryPicker
              label={t('signup-birth.nationality.label')}
              value={value}
              onChange={onChange}
              defaultValue={props.defaultCountry}
              data={countryFlagEmoji.data}
              sortBy={'name'}
            />
          )}
        />
      </View>
      <View style={styles.formSubmit}>
        <SubmitButton title={t('button.submit')} uppercase={false} onSubmit={props.onSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: { marginTop: 30 },
  datePickerContainer: { marginBottom: 16 },
  errorContainer: {
    marginTop: 16,
  },
  formSubmit: {
    marginTop: '30%',
  },
});
