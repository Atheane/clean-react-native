import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';
import { Dayjs } from 'dayjs';
import countryFlagEmoji from 'country-flag-emoji';

import { IDomainError, IInfraError } from '@clean-rn/ddd';
import { AuthErrorCodes, AuthErrorMessage, BirthDay } from '@clean-rn/auth/domain';
import { firstLetterCapitalize } from '../../utils';

import { CountryPicker } from '../country-picker';
import { SubmitButton } from '../submit-button';
import { ErrorMessage } from '../error-message';
import { DateTimePicker } from '../datetime-picker';

type IProps = {
  defaultCountry?: string;
  control: Control<SignupStep4FormData>;
  errors: FieldErrors<SignupStep4FormData>;
  error: IDomainError<AuthErrorCodes, AuthErrorMessage> | IInfraError | null;
  onSubmit: () => void;
  onFocus: () => void;
};

export interface SignupStep4FormData {
  birthday: Dayjs;
  birthCountry: string;
  nationality: string;
}

export const FormSignupStep4 = (props: IProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.input}>
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
          <Text style={theme.errors}>
            {firstLetterCapitalize(t('screens.signupstep4.birthday.required'))}
          </Text>
        </View>
      )}
      {props.errors?.birthday && props.errors.birthday.type === 'validate' && (
        <View style={styles.errorContainer}>
          <Text style={theme.errors}>
            {firstLetterCapitalize(t('screens.signupstep4.birthday.validate'))}
          </Text>
        </View>
      )}
      <View style={styles.input}>
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
      {props.errors?.birthCountry && props.errors.birthCountry.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.errors}>
            {firstLetterCapitalize(t('screens.signupstep4.birthCountry.required'))}
          </Text>
        </View>
      )}
      <View style={styles.input}>
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
      {props.errors?.nationality && props.errors.nationality.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.errors}>
            {firstLetterCapitalize(t('screens.signupstep4.nationality.required'))}
          </Text>
        </View>
      )}
      <View style={styles.errorContainer}>
        <ErrorMessage error={props.error} />
      </View>
      <View style={styles.formSubmit}>
        <SubmitButton
          disabled={false}
          title={t('submitButton')}
          uppercase={false}
          onSubmit={props.onSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 30 },
  formSubmit: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  errorContainer: {
    marginVertical: 10,
  },
  cgu: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
