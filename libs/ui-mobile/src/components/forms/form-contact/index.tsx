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

import { Country, ICountry, COUNTRIES_AVAILABLE } from '@clean-rn/user/domain';
import { IContactErrorCodes, Phone, IContactErrorMessage } from '@clean-rn/contact/domain';
import { ProfileGradient } from '../../../assets';
import { Colors } from '../../../constants';

import { SubmitButton } from '../../buttons/submit-button';
import { ErrorMessage } from '../../texts/error-message';
import { TextInput } from '../../inputs/text-input';

type IProps = {
  defaultCountry?: string;
  loading: boolean;
  onSubmit: () => void;
  control: Control<IContactFormData>;
  errors: FieldErrors<IContactFormData>;
  error: IDomainError<IContactErrorCodes, IContactErrorMessage> | null;
  onFocus: () => void;
};

export type IContactFormData = {
  firstname: string;
  lastname: string;
  countryCode: string;
  phone: string;
};

export const FormContact = (props: IProps) => {
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
    <View style={[styles.container, theme.bank.container.centeredItem]}>
      <View style={styles.input}>
        <Controller
          control={props.control}
          name="firstname"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t('signup-identity.first-name.label')}
              labelColor={Colors.bank.primary.grey}
              placeholder={firstLetterCapitalize(t('signup-identity.first-name.placeholder'))}
              IconLeft={ProfileGradient}
              value={value}
              onChange={onChange}
            />
          )}
        />
        {props.errors?.firstname && props.errors.firstname.type === 'required' && (
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
          name="lastname"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t('signup-identity.last-name.label')}
              labelColor={Colors.bank.primary.grey}
              placeholder={firstLetterCapitalize(t('signup-identity.last-name.placeholder'))}
              IconLeft={ProfileGradient}
              value={value}
              onChange={onChange}
            />
          )}
        />
        {props.errors?.lastname && props.errors.lastname.type === 'required' && (
          <View style={styles.errorContainer}>
            <Text style={theme.bank.text.errors}>
              {firstLetterCapitalize(t('errors.last-name.required'))}
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
  container: {
    marginTop: '20%',
  },
  input: {
    marginTop: 40,
  },
  errorPhoneContainer: {
    marginTop: 10,
  },
  errorContainer: {
    marginTop: 24,
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
  formSubmit: {
    marginTop: '30%',
  },
});
