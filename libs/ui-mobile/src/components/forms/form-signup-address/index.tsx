import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError } from '@clean-rn/ddd';
import { ICountry, COUNTRIES_AVAILABLE, IAuthErrorCodes, IAuthErrorMessage } from '@clean-rn/auth/domain';

import { House } from '../../../assets';
import { Colors } from '../../../constants';
import { firstLetterCapitalize } from '../../../utils';

import { SubmitButton } from '../../buttons/submit-button';
import { MultipleOptionsCheckBox } from '../../checkboxes/multiple-options-checkBox';
import { CountryPicker } from '../../dropdowns/country-picker';
import { TextInput } from '../../inputs/text-input';
import { ErrorMessage } from '../../texts/error-message';

type IProps = {
  defaultCountry?: string;
  loading: boolean;
  control: Control<ISignupAddressFormData>;
  errors: FieldErrors<ISignupAddressFormData>;
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | null;
  onSubmit: () => void;
  onFocus: () => void;
};

export type ISignupAddressFormData = {
  country: string;
  street: string;
  city: string;
  zip: string;
  specifiedUSPerson: string;
};

export const FormSignupAddress = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, theme.bank.container.centeredItem]}>
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="street"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t('signup-address.street.label')}
              labelColor={Colors.bank.primary.grey}
              value={value}
              icon={() => <House style={{ color: Colors.bank.primary.lightGreen }} />}
              placeholder={t('signup-address.street.placeholder')}
              onChange={onChange}
            />
          )}
        />
      </View>
      {props.errors?.street && props.errors.street.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.street.required'))}</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="city"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t('signup-address.city.label')}
              labelColor={Colors.bank.primary.grey}
              value={value}
              icon={() => <House style={{ color: Colors.bank.primary.lightGreen }} />}
              placeholder={t('signup-address.city.placeholder')}
              onChange={onChange}
            />
          )}
        />
      </View>
      {props.errors?.city && props.errors.city.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.city.required'))}</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="zip"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t('signup-address.zip.label')}
              labelColor={Colors.bank.primary.grey}
              value={value}
              icon={() => <House style={{ color: Colors.bank.primary.lightGreen }} />}
              placeholder={t('signup-address.zip.placeholder')}
              onChange={onChange}
              numeric
            />
          )}
        />
      </View>
      {props.errors?.zip && props.errors.zip.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.zip.required'))}</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="country"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <CountryPicker
              label={t('signup-address.country.label')}
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
            <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.country.required'))}</Text>
          </View>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="specifiedUSPerson"
          render={({ field: { onChange } }) => (
            <MultipleOptionsCheckBox
              label={t('signup-address.usperson.label')}
              subtitle={t('signup-address.usperson.subtitle')}
              optionsTitle={[t('signup-address.usperson.no'), t('signup-address.usperson.yes')]}
              optionsValues={['0', '1']}
              onChange={onChange}
            />
          )}
        />
      </View>
      <View style={styles.domainErrorContainer}>
        <ErrorMessage error={props.error} />
      </View>
      <View style={styles.formSubmit}>
        <SubmitButton
          disabled={false}
          title={t('button.submit')}
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
  inputContainer: { marginTop: 30 },
  errorContainer: {
    marginTop: 24,
  },
  domainErrorContainer: {
    marginTop: 16,
  },
  formSubmit: {
    marginTop: 20,
    marginBottom: 100,
  },
});
