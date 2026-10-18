import { View, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError, IInfraError } from '@clean-rn/ddd';
import { IAuthErrorCodes, IAuthErrorMessage, Email } from '@clean-rn/auth/domain';

import { firstLetterCapitalize } from '../../../utils';

import { SubmitButton } from '../../buttons/submit-button';
import { EmailInput } from '../../inputs/email-input';
import { PasswordInput } from '../../inputs/password-input';
import { ErrorMessage } from '../../texts/error-message';

type IProps = {
  loading: boolean;
  onSubmit: () => void;
  securedPassword: boolean;
  securedConfirmPassword: boolean;
  onToggleSecurityPassword: (event: GestureResponderEvent) => void;
  onToggleSecurityConfirmPassword: (event: GestureResponderEvent) => void;
  control: Control<ISignupStep1FormData>;
  errors: FieldErrors<ISignupStep1FormData>;
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | IInfraError | null;
  onFocus: () => void;
};

export type ISignupStep1FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const FormSignupStep1 = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.form}>
      <View style={theme.bank.container.centeredItem}>
        <View style={styles.inputEmail}>
          <Controller
            control={props.control}
            name="email"
            rules={{ required: true, pattern: Email.pattern }}
            render={({ field: { onChange, value } }) => (
              <EmailInput value={value} onChange={onChange} onFocus={props.onFocus} />
            )}
          />
          {props.errors?.email && props.errors.email.type === 'required' && (
            <View style={styles.container}>
              <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.email.required'))}</Text>
            </View>
          )}
          {props.errors?.email && props.errors.email.type === 'pattern' && (
            <View style={styles.container}>
              <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.email.invalid'))}</Text>
              <Text style={theme.bank.text.errors}>{props.errors.email.ref?.value}</Text>
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
            <View style={styles.container}>
              <Text style={theme.bank.text.errors}>
                {firstLetterCapitalize(t('errors.password.required'))}
              </Text>
            </View>
          )}
          {props.errors?.password && props.errors.password.type === 'minLength' && (
            <View style={styles.container}>
              <Text style={theme.bank.text.errors}>
                {firstLetterCapitalize(t('errors.password.minLength'))}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.inputPassword}>
          <Controller
            control={props.control}
            name="confirmPassword"
            rules={{ required: true, minLength: 6 }}
            render={({ field: { onChange, value } }) => (
              <PasswordInput
                label={t('screens.signupstep1.confirmPassword')}
                value={value}
                onChange={onChange}
                secured={props.securedConfirmPassword}
                onToggleSecurity={props.onToggleSecurityConfirmPassword}
                onFocus={props.onFocus}
              />
            )}
          />
          {props.errors?.confirmPassword && props.errors.confirmPassword.type === 'required' && (
            <View style={styles.container}>
              <Text style={theme.bank.text.errors}>
                {firstLetterCapitalize(t('errors.password.required'))}
              </Text>
            </View>
          )}
          {props.errors?.confirmPassword && props.errors.confirmPassword.type === 'minLength' && (
            <View style={styles.container}>
              <Text style={theme.bank.text.errors}>
                {firstLetterCapitalize(t('errors.password.minLength'))}
              </Text>
            </View>
          )}
        </View>
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
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 4,
  },
  inputEmail: {
    marginTop: 30,
  },
  inputPassword: {
    marginTop: 30,
  },
  formSubmit: {
    marginTop: 36,
  },
  container: {
    paddingTop: 16,
  },
});
