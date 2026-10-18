import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Input, useTheme } from '@rneui/themed';
import SelectDropdown from 'react-native-select-dropdown';
import { PhoneNumberUtil } from 'google-libphonenumber';

import { Logger, IDomainError, IInfraError } from '@clean-rn/ddd';

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
import { Colors, FontNames } from '../../../constants';
import { firstLetterCapitalize } from '../../../utils';

import { SubmitButton } from '../../buttons/submit-button';
import { MultipleOptionsCheckBox } from '../../checkboxes/multiple-options-checkBox';
import { ErrorMessage } from '../../texts/error-message';
import { TextInput } from '../../inputs/text-input';

type IProps = {
  defaultCountry?: string;
  loading: boolean;
  onSubmit: () => void;
  control: Control<ISignupStep2FormData>;
  errors: FieldErrors<ISignupStep2FormData>;
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | IInfraError | null;
  onFocus: () => void;
};

export type ISignupStep2FormData = {
  title: IGender;
  firstName: string;
  lastName: string;
  phone: string;
  countryCode: string;
};

export const FormSignupStep2 = (props: IProps) => {
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
                label={t('screens.signupstep2.gender.label')}
                optionsTitle={[
                  t('screens.signupstep2.gender.man'),
                  t('screens.signupstep2.gender.woman'),
                  t('screens.signupstep2.gender.neutral'),
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
                label={t('screens.signupstep2.firstName.label')}
                labelColor={Colors.bank.primary.grey}
                placeholder={firstLetterCapitalize(t('screens.signupstep2.firstName.placeholder'))}
                icon={() => <Person style={{ color: Colors.bank.primary.lightGreen }} />}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {props.errors?.firstName && props.errors.firstName.type === 'required' && (
            <View style={styles.container}>
              <Text style={theme.bank.text.errors}>
                {firstLetterCapitalize(t('screens.signupstep2.firstName.required'))}
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
                label={t('screens.signupstep2.lastName.label')}
                labelColor={Colors.bank.primary.grey}
                placeholder={firstLetterCapitalize(t('screens.signupstep2.lastName.placeholder'))}
                icon={() => <Person style={{ color: Colors.bank.primary.lightGreen }} />}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {props.errors?.lastName && props.errors.lastName.type === 'required' && (
            <View style={styles.container}>
              <Text style={theme.bank.text.errors}>
                {firstLetterCapitalize(t('screens.signupstep2.lastName.required'))}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.input}>
          <Text style={[theme.bank.text.greyLabel, { marginBottom: 0 }]}>
            {t('screens.signupstep2.phone.label')}
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
                    onFocus={props.onFocus}
                    placeholder={firstLetterCapitalize(t('screens.signupstep2.phone.placeholder'))}
                    keyboardType={'phone-pad'}
                  />
                )}
              />
            </View>
          </View>
          {props.errors?.countryCode && props.errors.countryCode.type === 'required' && (
            <View style={styles.container}>
              <Text style={theme.bank.text.errors}>
                {firstLetterCapitalize(t('screens.signupstep2.countryCode.required'))}
              </Text>
            </View>
          )}
          {props.errors?.phone && props.errors.phone.type === 'required' && (
            <View style={styles.container}>
              <Text style={theme.bank.text.errors}>
                {firstLetterCapitalize(t('screens.signupstep2.phone.required'))}
              </Text>
            </View>
          )}
          {props.errors?.phone && props.errors.phone.type === 'validate' && (
            <View style={styles.container}>
              <Text style={theme.bank.text.errors}>
                {firstLetterCapitalize(t('screens.signupstep2.phone.invalid'))}
              </Text>
            </View>
          )}
          <View style={styles.container}>
            <ErrorMessage error={props.error} />
          </View>
        </View>

        <View style={[theme.bank.container.centeredItem, styles.formSubmit]}>
          <SubmitButton
            title={t('submitButton')}
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
  container: {
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
