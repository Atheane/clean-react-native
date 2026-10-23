import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Input, useTheme } from '@rneui/themed';
import SelectDropdown from 'react-native-select-dropdown';
import { PhoneNumberUtil } from 'google-libphonenumber';

import { firstLetterCapitalize } from '@clean-rn/utils';

import { IDomainError } from '@clean-rn/ddd';
import { Logger } from '@clean-rn/logger';

import { Phone } from '@clean-rn/contact/domain';
import { Country, ICountry, IUserErrorCodes, IUserErrorMessage } from '@clean-rn/user/domain';
import { COUNTRIES_AVAILABLE } from '@clean-rn/utils';
import { Phone as PhoneIcon } from '../../../assets';
import { Colors } from '../../../constants';

import { SubmitButton } from '../../buttons/submit-button';
import { ErrorMessage } from '../../texts/error-message';

type IProps = {
  defaultCountry?: string;
  loading: boolean;
  onSubmit: () => void;
  control: Control<ISignupPhoneFormData>;
  errors: FieldErrors<ISignupPhoneFormData>;
  error: IDomainError<IUserErrorCodes, IUserErrorMessage> | null;
  onFocus: () => void;
};

export type ISignupPhoneFormData = {
  phone: string;
  countryCode: string;
};

export const FormSignupPhone = (props: IProps) => {
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
    <View style={theme.bank.container.centeredItem}>
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
  input: {
    marginTop: 30,
  },
  formSubmit: {
    marginTop: 80,
    marginBottom: 120,
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
});
