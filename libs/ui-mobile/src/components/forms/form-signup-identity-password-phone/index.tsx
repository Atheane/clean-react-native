import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Input, useTheme } from '@rneui/themed';
import SelectDropdown from 'react-native-select-dropdown';
import { PhoneNumberUtil } from 'google-libphonenumber';

import { IDomainError } from '@clean-rn/ddd';
import { Logger } from '@clean-rn/logger';

import {
  Country,
  Phone,
  ICountry,
  IGender,
  COUNTRIES_AVAILABLE,
  IAuthErrorCodes,
  IAuthErrorMessage,
} from '@clean-rn/auth/domain';
import { Person, Phone as PhoneIcon } from '../../../assets';
import { Colors } from '../../../constants';
import { firstLetterCapitalize } from '../../../utils';

import { PasswordInput } from '../../inputs/password-input';
import { SubmitButton } from '../../buttons/submit-button';
import { MultipleOptionsCheckBox } from '../../checkboxes/multiple-options-checkBox';
import { ErrorMessage } from '../../texts/error-message';
import { TextInput } from '../../inputs/text-input';

type IProps = {
  defaultCountry?: string;
  loading: boolean;
  onSubmit: () => void;
  securedPassword: boolean;
  onToggleSecurityPassword: (event: GestureResponderEvent) => void;
  control: Control<ISignupIdentityPasswordPhoneFormData>;
  errors: FieldErrors<ISignupIdentityPasswordPhoneFormData>;
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | null;
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
      Logger.getInstance().error(error);
    }
  }, [props.defaultCountry]);

  const availableCountriesSortedByExtension = Object.values(COUNTRIES_AVAILABLE).sort(
    (a: ICountry, b: ICountry) =>
      PhoneNumberUtil.getInstance().getCountryCodeForRegion(a.code) -
      PhoneNumberUtil.getInstance().getCountryCodeForRegion(b.code),
  );

  return (
    <View>
      <View style={theme.bank.container.centeredItem}>
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
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label={t('signup-identity.first-name.label')}
                labelColor={Colors.bank.primary.grey}
                placeholder={firstLetterCapitalize(t('signup-identity.first-name.placeholder'))}
                icon={() => <Person style={{ color: Colors.bank.primary.lightGreen }} />}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {props.errors?.firstName && props.errors.firstName.type === 'required' && (
            <View style={styles.errorContainer}>
              <Text style={theme.bank.text.errors}>
                {firstLetterCapitalize(t('errors.first-name.required'))}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.input}>
          <Controller
            control={props.control}
            name="lastName"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label={t('signup-identity.last-name.label')}
                labelColor={Colors.bank.primary.grey}
                placeholder={firstLetterCapitalize(t('signup-identity.last-name.placeholder'))}
                icon={() => <Person style={{ color: Colors.bank.primary.lightGreen }} />}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {props.errors?.lastName && props.errors.lastName.type === 'required' && (
            <View style={styles.errorContainer}>
              <Text style={theme.bank.text.errors}>
                {firstLetterCapitalize(t('errors.last-name.required'))}
              </Text>
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
                value={value}
                onChange={onChange}
                secured={props.securedPassword}
                onToggleSecurity={props.onToggleSecurityPassword}
                onFocus={props.onFocus}
              />
            )}
          />
          {props.errors?.password && props.errors.password.type === 'required' && (
            <View style={styles.errorContainer}>
              <Text style={theme.bank.text.errors}>
                {firstLetterCapitalize(t('errors.password.required'))}
              </Text>
            </View>
          )}
          {props.errors?.password && props.errors.password.type === 'minLength' && (
            <View style={styles.errorContainer}>
              <Text style={theme.bank.text.errors}>
                {firstLetterCapitalize(t('errors.password.min-length'))}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.input}>
          <Text style={[theme.bank.text.label, { marginBottom: 0, color: Colors.bank.primary.grey }]}>
            {t('signup-phone.phone.label')}
          </Text>
          <View style={[theme.bank.container.input, { marginBottom: 0 }]}>
            <View style={styles.subContainer}>
              <View style={styles.iconContainer}>
                <PhoneIcon style={{ color: Colors.bank.primary.lightGreen }} />
              </View>
              <View style={[styles.selectContainer, theme.bank.container.centeredItem]}>
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
                      buttonTextStyle={theme.bank.text.input}
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
                    inputContainerStyle={[theme.bank.container.input, { width: '50%' }]}
                    inputStyle={theme.bank.text.input}
                    onChangeText={onChange}
                    value={value}
                    placeholder={t('signup-phone.phone.placeholder')}
                    onFocus={props.onFocus}
                    keyboardType={'phone-pad'}
                  />
                )}
              />
            </View>
          </View>
          {props.errors?.countryCode && props.errors.countryCode.type === 'required' && (
            <View style={styles.errorPhoneContainer}>
              <Text style={theme.bank.text.errors}>
                {firstLetterCapitalize(t('errors.country-code.required'))}
              </Text>
            </View>
          )}
          {props.errors?.phone && props.errors.phone.type === 'required' && (
            <View style={styles.errorPhoneContainer}>
              <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.phone.required'))}</Text>
            </View>
          )}
          {props.errors?.phone && props.errors.phone.type === 'validate' && (
            <View style={styles.errorPhoneContainer}>
              <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.phone.invalid'))}</Text>
            </View>
          )}
          <View style={styles.domainErrorContainer}>
            <ErrorMessage error={props.error} />
          </View>
        </View>

        <View style={[theme.bank.container.centeredItem, styles.formSubmit]}>
          <SubmitButton
            title={t('submit-button')}
            uppercase={false}
            onSubmit={props.onSubmit}
            loading={props.loading}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 30,
  },
  formSubmit: {
    marginTop: 36,
  },
  errorContainer: {
    marginTop: 24,
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
});
