import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError, IInfraError } from '@clean-rn/ddd';
import { ICountry, COUNTRIES_AVAILABLE, AuthErrorCodes, AuthErrorMessage } from '@clean-rn/auth/domain';

import { firstLetterCapitalize } from '../../utils';
import { House } from '../../assets';
import { Colors } from '../../constants';

import { TextInput } from '../text-input';
import { SubmitButton } from '../submit-button';
import { ErrorMessage } from '../error-message';
import { CountryPicker } from '../country-picker';

import { MultipleOptionsCheckBox } from '../multiple-options-checkBox';

type IProps = {
  defaultCountry?: string;
  loading: boolean;
  control: Control<SignupStep5FormData>;
  errors: FieldErrors<SignupStep5FormData>;
  error: IDomainError<AuthErrorCodes, AuthErrorMessage> | IInfraError | null;
  onSubmit: () => void;
  onFocus: () => void;
};

export interface SignupStep5FormData {
  country: string;
  street: string;
  city: string;
  zip: string;
  specifiedUSPerson: string;
}

export const FormSignupStep5 = (props: IProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Controller
          control={props.control}
          name="street"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t('screens.signupstep5.street.label')}
              labelColor={Colors.text.lightGrey}
              value={value}
              icon={() => <House style={{ color: Colors.icon.lightGreenTransparent }} />}
              placeholder={t('screens.signupstep5.street.placeholder')}
              onChange={onChange}
            />
          )}
        />
      </View>
      {props.errors?.street && props.errors.street.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.errors}>{firstLetterCapitalize(t('screens.signupstep5.street.required'))}</Text>
        </View>
      )}
      <View style={styles.input}>
        <Controller
          control={props.control}
          name="city"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t('screens.signupstep5.city.label')}
              labelColor={Colors.text.lightGrey}
              value={value}
              icon={() => <House style={{ color: Colors.icon.lightGreenTransparent }} />}
              placeholder={t('screens.signupstep5.city.placeholder')}
              onChange={onChange}
            />
          )}
        />
      </View>
      {props.errors?.city && props.errors.city.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.errors}>{firstLetterCapitalize(t('screens.signupstep5.city.required'))}</Text>
        </View>
      )}
      <View style={styles.input}>
        <Controller
          control={props.control}
          name="zip"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t('screens.signupstep5.zip.label')}
              labelColor={Colors.text.lightGrey}
              value={value}
              icon={() => <House style={{ color: Colors.icon.lightGreenTransparent }} />}
              placeholder={t('screens.signupstep5.zip.placeholder')}
              onChange={onChange}
            />
          )}
        />
      </View>
      {props.errors?.zip && props.errors.zip.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.errors}>{firstLetterCapitalize(t('screens.signupstep5.zip.required'))}</Text>
        </View>
      )}
      <View style={styles.input}>
        <Controller
          control={props.control}
          name="country"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <CountryPicker
              label={t('screens.signupstep5.country.label')}
              value={value}
              onChange={onChange}
              defaultValue={props.defaultCountry}
              data={Object.values(COUNTRIES_AVAILABLE) as ICountry[]}
              sortBy={'name'}
            />
          )}
        />
        {props.errors?.country && props.errors.country.type === 'required' && (
          <View style={styles.errorContainer}>
            <Text style={theme.errors}>
              {firstLetterCapitalize(t('screens.signupstep5.country.required'))}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.input}>
        <Controller
          control={props.control}
          name="specifiedUSPerson"
          render={({ field: { onChange } }) => (
            <MultipleOptionsCheckBox
              label={t('screens.signupstep5.usperson.label')}
              subtitle={t('screens.signupstep5.usperson.subtitle')}
              optionsTitle={[t('screens.signupstep5.usperson.no'), t('screens.signupstep5.usperson.yes')]}
              optionsValues={['0', '1']}
              onChange={onChange}
            />
          )}
        />
      </View>
      <View style={styles.errorContainer}>
        <ErrorMessage error={props.error} />
      </View>
      <View style={styles.formSubmit}>
        <SubmitButton
          disabled={false}
          title={t('submitButton')}
          uppercase={false}
          onSubmit={props.onSubmit}
          loading={props.loading}
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
});
