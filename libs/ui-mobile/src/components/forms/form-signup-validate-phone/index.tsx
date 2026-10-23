import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError } from '@clean-rn/ddd';
import { IUserErrorCodes, IUserErrorMessage, PhoneOtp } from '@clean-rn/user/domain';

import { firstLetterCapitalize } from '@clean-rn/utils';

import { DigitsInput } from '../../inputs/digits-input';
import { ErrorMessage } from '../../texts/error-message';

type IProps = {
  loading: boolean;
  onSubmit: () => void;
  control: Control<ISignupValidatePhoneFormData>;
  errors: FieldErrors<ISignupValidatePhoneFormData>;
  error: IDomainError<IUserErrorCodes, IUserErrorMessage> | null;
  onFocus: () => void;
};

export type ISignupValidatePhoneFormData = {
  code: string;
};

export const FormSignupValidatePhone = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={theme.bank.container.centeredItem}>
        <Controller
          control={props.control}
          name="code"
          rules={{ required: true, pattern: PhoneOtp.pattern, minLength: 6 }}
          render={({ field: { onChange, value } }) => {
            return (
              <DigitsInput
                value={value}
                onChange={onChange}
                onFocus={props.onFocus}
                onFullfill={props.onSubmit}
                numberDigits={6}
              />
            );
          }}
        />
      </View>
      {props.errors?.code && props.errors.code.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.phone-otp.required'))}</Text>
        </View>
      )}
      {props.errors?.code && props.errors.code.type === 'pattern' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.phone-otp.invalid'))}</Text>
          <Text style={theme.bank.text.errors}>{props.errors.code.ref?.value}</Text>
        </View>
      )}
      {props.errors?.code && props.errors.code.type === 'minLength' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>
            {firstLetterCapitalize(t('errors.phone-otp.min-length'))}
          </Text>
        </View>
      )}
      <View style={styles.domainErrorContainer}>
        <ErrorMessage error={props.error} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  errorContainer: {
    marginTop: 24,
  },
  domainErrorContainer: {
    marginTop: 16,
  },
});
