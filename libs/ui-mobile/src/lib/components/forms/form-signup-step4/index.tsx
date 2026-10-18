import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Dayjs } from 'dayjs';
import { useTheme } from '@rneui/themed';
import countryFlagEmoji from 'country-flag-emoji';

import { IDomainError, IInfraError } from '@clean-rn/ddd';
import { IAuthErrorCodes, IAuthErrorMessage, BirthDay } from '@clean-rn/auth/domain';
import { firstLetterCapitalize } from '../../../utils';

import { SubmitButton } from '../../buttons/submit-button';
import { CountryPicker } from '../../dropdowns/country-picker';
import { DateTimePicker } from '../../dropdowns/datetime-picker';

type IProps = {
  defaultCountry?: string;
  control: Control<ISignupStep4FormData>;
  errors: FieldErrors<ISignupStep4FormData>;
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | IInfraError | null;
  onSubmit: () => void;
  onFocus: () => void;
};

export type ISignupStep4FormData = {
  birthday: Dayjs;
  birthCountry: string;
  nationality: string;
};

export const FormSignupStep4 = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, theme.bank.container.centeredItem]}>
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="birthday"
          rules={{
            required: true,
            validate: (value) => {
              try {
                new BirthDay(value);
                return true;
              } catch (e: unknown) {
                return false;
              }
            },
          }}
          render={({ field: { onChange, value } }) => (
            <DateTimePicker
              label={t('screens.signupstep4.birthday.label')}
              value={value}
              format={'DD/MM/YYYY'}
              placeholder={t('screens.signupstep4.birthday.placeholder')}
              onChange={onChange}
            />
          )}
        />
      </View>
      {props.errors?.birthday && props.errors.birthday.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>
            {firstLetterCapitalize(t('screens.signupstep4.birthday.required'))}
          </Text>
        </View>
      )}
      {props.errors?.birthday && props.errors.birthday.type === 'validate' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>
            {firstLetterCapitalize(t('screens.signupstep4.birthday.validate'))}
          </Text>
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
              label={t('screens.signupstep4.birthCountry.label')}
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
              label={t('screens.signupstep4.nationality.label')}
              value={value}
              onChange={onChange}
              defaultValue={props.defaultCountry}
              data={countryFlagEmoji.data}
              sortBy={'name'}
            />
          )}
        />
      </View>
      <View style={styles.submitButtonContainer}>
        <SubmitButton title={t('submitButton')} uppercase={false} onSubmit={props.onSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: { marginTop: 30 },
  submitButtonContainer: {
    marginTop: 50,
  },
  errorContainer: {
    marginVertical: 10,
  },
});
