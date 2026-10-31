import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Input, useTheme } from '@rneui/themed';
import SelectDropdown from 'react-native-select-dropdown';
import { PhoneNumberUtil } from 'google-libphonenumber';

import { firstLetterCapitalize } from '@clean-rn/utils';

import { IDomainError } from '@clean-rn/ddd';
import { Phone } from '@clean-rn/contact/domain';
import {
  Country,
  ICountry,
  IGender,
  IUserErrorCodes,
  IUserErrorMessage,
  Name,
} from '@clean-rn/user/domain';
import { COUNTRIES_AVAILABLE } from '@clean-rn/contact/domain';
import {
  Profile,
  Phone as PhoneIcon,
  Colors,
  PasswordInput,
  SubmitButton,
  MultipleOptionsCheckBox,
  TextInput,
} from '@clean-rn/ui-mobile';

import { ErrorMessage } from '../../../../shared/presentation/components/error-message';

type IProps = {
  defaultCountry?: string;
  loading: boolean;
  onSubmit: () => void;
  securedPassword: boolean;
  onToggleSecurityPassword: (event: GestureResponderEvent) => void;
  control: Control<ISignupIdentityPasswordPhoneFormData>;
  errors: FieldErrors<ISignupIdentityPasswordPhoneFormData>;
  error: IDomainError<IUserErrorCodes, IUserErrorMessage> | null;
  onFocus: () => void;
};

export type ISignupIdentityPasswordPhoneFormData = {
  title: IGender;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  countryCode: string;
};

export const FormSignupIdentityPasswordPhone = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [countryCode, setCountryCode] = useState<string>();

  useEffect(() => {
    try {
      if (props.defaultCountry) setCountryCode(new Country(props.defaultCountry).value);
    } catch (error) {
      console.log(error);
    }
  }, [props.defaultCountry]);

  const availableCountriesSortedByExtension = Object.values(COUNTRIES_AVAILABLE).sort(
    (a: ICountry, b: ICountry) =>
      PhoneNumberUtil.getInstance().getCountryCodeForRegion(a.code) -
      PhoneNumberUtil.getInstance().getCountryCodeForRegion(b.code),
  );

  return (
    <View style={[styles.form, theme.container.centeredItem]}>
      <View style={styles.input}>
        <Controller
          control={props.control}
          name="title"
          render={({ field: { onChange } }) => (
            <MultipleOptionsCheckBox
              label={t('signup-identity.gender.label')}
              optionsTitle={[
                t('signup-identity.gender.man'),
                t('signup-identity.gender.woman'),
                t('signup-identity.gender.neutral'),
              ]}
              optionsValues={[IGender.MAN, IGender.WOMAN, IGender.NEUTRAL]}
              onChange={onChange}
            />
          )}
        />
      </View>
      <View style={styles.input}>
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
      <View style={styles.input}>
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
      </View>
      <View style={styles.inputPassword}>
        <Controller
          control={props.control}
          name="password"
          rules={{ required: true, minLength: 6 }}
          render={({ field: { onChange, value } }) => (
            <PasswordInput
              label={t('password-input.label')}
              placeholder={firstLetterCapitalize(t('password-input.placeholder'))}
              value={value}
              onChange={onChange}
              secured={props.securedPassword}
              onToggleSecurity={props.onToggleSecurityPassword}
              onFocus={props.onFocus}
              onSubmitEditing={props.onSubmit}
            />
          )}
        />
        {props.errors?.password && props.errors.password.type === 'required' && (
          <View style={styles.errorContainer}>
            <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.password.required'))}</Text>
          </View>
        )}
        {props.errors?.password && props.errors.password.type === 'minLength' && (
          <View style={styles.errorContainer}>
            <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.password.min-length'))}</Text>
          </View>
        )}
      </View>
      <View style={styles.input}>
        <Text style={[theme.text.label, { marginBottom: 0, color: Colors.primary.grey }]}>
          {t('signup-phone.phone.label')}
        </Text>
        <View style={[theme.container.input, { marginBottom: 0 }]}>
          <View style={styles.subContainer}>
            <View style={styles.iconContainer}>
              <PhoneIcon style={{ color: Colors.primary.lightGreen }} />
            </View>
            <View style={[styles.selectContainer, theme.container.centeredItem]}>
              <Controller
                control={props.control}
                name="countryCode"
                rules={{ required: true }}
                render={({ field: { onChange } }) => (
                  <SelectDropdown
                    data={availableCountriesSortedByExtension.map(
                      (country: ICountry) =>
                        `${country.emoji} +${PhoneNumberUtil.getInstance().getCountryCodeForRegion(
                          country.code,
                        )}`,
                    )}
                    onSelect={(text: string, index: number) => {
                      props.onFocus();
                      const countryCode = availableCountriesSortedByExtension.map(
                        (country: ICountry) => country.code,
                      )[index];
                      setCountryCode(countryCode);
                      onChange(countryCode);
                    }}
                    buttonStyle={styles.selectButton}
                    buttonTextStyle={theme.text.inputPicker}
                    searchPlaceHolder=""
                    defaultValue={countryCode ? new Country(countryCode).valueFlagAndExtension : undefined}
                  />
                )}
              />
            </View>
            <Controller
              control={props.control}
              name="phone"
              rules={{
                required: true,
                validate: (value: string) => {
                  try {
                    if (!countryCode) return false;
                    new Phone(value, countryCode);
                    return true;
                  } catch (e) {
                    return false;
                  }
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  inputContainerStyle={[theme.container.input, { width: '50%', paddingTop: 3 }]}
                  inputStyle={theme.text.input}
                  onChangeText={onChange}
                  value={value}
                  placeholder={t('signup-phone.phone.placeholder')}
                  onFocus={props.onFocus}
                  keyboardType="phone-pad"
                />
              )}
            />
          </View>
        </View>
        {props.errors?.countryCode && props.errors.countryCode.type === 'required' && (
          <View style={styles.errorPhoneContainer}>
            <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.country-code.required'))}</Text>
          </View>
        )}
        {props.errors?.phone && props.errors.phone.type === 'required' && (
          <View style={styles.errorPhoneContainer}>
            <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.phone.required'))}</Text>
          </View>
        )}
        {props.errors?.phone && props.errors.phone.type === 'validate' && (
          <View style={styles.errorPhoneContainer}>
            <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.phone.invalid'))}</Text>
          </View>
        )}
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
  input: {
    marginTop: 30,
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
