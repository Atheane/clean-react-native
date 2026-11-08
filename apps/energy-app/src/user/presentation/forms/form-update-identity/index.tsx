import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';
import { Dayjs } from 'dayjs';

import { firstLetterCapitalize } from '@clean-rn/utils';

import { IDomainError } from '@clean-rn/ddd';
import { IUserErrorCodes, IUserErrorMessage, Name, BirthDay } from '@clean-rn/user/domain';

import {
  Profile,
  Colors,
  SubmitButton,
  TextInput,
  CountryPicker,
  DateTimePicker,
} from '@clean-rn/ui-mobile';

import { ErrorMessage } from '../../../../shared/presentation/components/error-message';

type IProps = {
  loading: boolean;
  control: Control<IUpdateIdentityFormData>;
  errors: FieldErrors<IUpdateIdentityFormData>;
  error: IDomainError<IUserErrorCodes, IUserErrorMessage> | null;
  onSubmit: () => void;
  onFocus: () => void;
};

export type IUpdateIdentityFormData = {
  firstName: string;
  lastName: string;
  birthday: Dayjs;
  birthCountry: string;
  nationality: string;
};

export const FormUpdateIdentity = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.form, theme.container.centeredItem]}>
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="firstName"
          rules={{ required: true, validate: Name.validate }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t('signup-identity.first-name.label')}
              labelColor={Colors.primary.grey}
              placeholder={firstLetterCapitalize(t('signup-identity.first-name.placeholder'))}
              IconLeft={() => <Profile />}
              value={value}
              onChange={onChange}
              onSubmitEditing={props.onSubmit}
            />
          )}
        />
        {props.errors?.firstName && props.errors.firstName.type === 'required' && (
          <View style={styles.errorContainer}>
            <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.first-name.required'))}</Text>
          </View>
        )}
        {props.errors?.firstName && props.errors.firstName.type === 'validate' && (
          <View style={styles.errorContainer}>
            <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.first-name.invalid'))}</Text>
          </View>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="lastName"
          rules={{ required: true, validate: Name.validate }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t('signup-identity.last-name.label')}
              labelColor={Colors.primary.grey}
              placeholder={firstLetterCapitalize(t('signup-identity.last-name.placeholder'))}
              IconLeft={() => <Profile />}
              value={value}
              onChange={onChange}
              onSubmitEditing={props.onSubmit}
            />
          )}
        />
        {props.errors?.lastName && props.errors.lastName.type === 'required' && (
          <View style={styles.errorContainer}>
            <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.last-name.required'))}</Text>
          </View>
        )}
        {props.errors?.lastName && props.errors.lastName.type === 'validate' && (
          <View style={styles.errorContainer}>
            <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.last-name.invalid'))}</Text>
          </View>
        )}
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
                value={value}
                format={'DD/MM/YYYY'}
                placeholder={t('signup-birth.birthday.placeholder')}
                onChange={onChange}
                defaultValue={props.control._defaultValues?.birthday as Dayjs | undefined}
                onSubmitEditing={props.onSubmit}
              />
            )}
          />
        </View>
        {props.errors?.birthday && props.errors.birthday.type === 'required' && (
          <View style={styles.errorContainer}>
            <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.birthday.required'))}</Text>
          </View>
        )}
        {props.errors?.birthday && props.errors.birthday.type === 'validate' && (
          <View style={styles.errorContainer}>
            <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.birthday.invalid'))}</Text>
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
                placeholder={t('signup-birth.birth-country.placeholder')}
                label={t('signup-birth.birth-country.label')}
                value={value}
                onChange={onChange}
                defaultValue={props.control._defaultValues.birthCountry}
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
                placeholder={t('signup-birth.nationality.placeholder')}
                label={t('signup-birth.nationality.label')}
                value={value}
                onChange={onChange}
                defaultValue={props.control._defaultValues.nationality}
                sortBy={'name'}
              />
            )}
          />
        </View>
        <View style={styles.domainErrorContainer}>
          <ErrorMessage
            error={props.error}
            errorMessage={t(`errors.domain-error.user.${props.error?.code}`)}
            genericErrorMessage={t('errors.other')}
          />
        </View>
      </View>

      <View style={[theme.container.centeredItem, styles.formSubmit]}>
        <SubmitButton
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
  form: {
    flex: 1,
  },
  inputContainer: {
    marginTop: 40,
  },
  errorContainer: {
    marginTop: 24,
    marginBottom: -24,
  },
  errorPhoneContainer: {
    marginTop: 10,
  },
  domainErrorContainer: {
    marginTop: 16,
  },
  iconContainer: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectContainer: {
    marginRight: -30,
  },
  selectButton: {
    width: 100,
    alignItems: 'center',
  },
  inputPassword: {
    marginTop: 30,
  },
  formSubmit: {
    marginVertical: '10%',
  },
});
