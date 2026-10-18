import { View, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError } from '@clean-rn/ddd';
import { IAuthErrorCodes, IAuthErrorMessage, Email } from '@clean-rn/auth/domain';

import { LinkButtonColors } from '../../../types';
import { firstLetterCapitalize } from '../../../utils';

import { LinkButton } from '../../buttons/link-button';
import { SubmitButton } from '../../buttons/submit-button';
import { EmailInput } from '../../inputs/email-input';
import { PasswordInput } from '../../inputs/password-input';
import { ErrorMessage } from '../../texts/error-message';

type IProps = {
  email?: string;
  loading: boolean;
  onSubmit: () => void;
  filled: boolean;
  onFocus: () => void;
  secured: boolean;
  onToggleSecurity: (event: GestureResponderEvent) => void;
  onPress: () => void;
  control: Control<ILoginFormData>;
  errors: FieldErrors<ILoginFormData>;
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | Error | null;
};

export type ILoginFormData = {
  email: string;
  password: string;
};

export const FormLogin = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={theme.bank.container.centeredItem}>
      <View>
        <View style={styles.inputContainer}>
          {props.filled && props.email ? (
            <EmailInput email={props.email} filled={props.filled} onFocus={props.onFocus} />
          ) : (
            <View>
              <Controller
                control={props.control}
                name="email"
                rules={{ required: true, pattern: Email.pattern }}
                render={({ field: { onChange, value } }) => (
                  <EmailInput value={value} filled={false} onChange={onChange} onFocus={props.onFocus} />
                )}
              />
              {props.errors?.email && props.errors.email.type === 'required' && (
                <View style={styles.errorContainer}>
                  <Text style={theme.bank.text.errors}>
                    {firstLetterCapitalize(t('errors.email.required'))}
                  </Text>
                </View>
              )}
              {props.errors?.email && props.errors.email.type !== 'required' && (
                <View style={styles.errorContainer}>
                  <Text style={theme.bank.text.errors}>
                    {firstLetterCapitalize(t('errors.email.invalid'))}
                  </Text>
                  <Text style={theme.bank.text.errors}>{props.errors.email.ref?.value}</Text>
                </View>
              )}
            </View>
          )}
        </View>
        <View style={[styles.inputContainer, theme.bank.container.centeredItem]}>
          <Controller
            control={props.control}
            name="password"
            rules={{ required: true, minLength: 6 }}
            render={({ field: { onChange, value } }) => (
              <PasswordInput
                value={value}
                onChange={onChange}
                secured={props.secured}
                onToggleSecurity={props.onToggleSecurity}
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
                {firstLetterCapitalize(t('errors.password.minLength'))}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.linkButton}>
          <LinkButton
            title={t('screens.login.forgottenPassword')}
            colorOption={LinkButtonColors.PINK}
            pressed={false}
            onPress={props.onPress}
          />
        </View>
        <ErrorMessage error={props.error} />
      </View>

      <View style={styles.submitButtonContainer}>
        <SubmitButton
          title={t('screens.login.submitButton')}
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
    marginTop: 8,
  },
  inputContainer: {
    marginTop: 30,
  },
  errorContainer: {
    marginTop: 16,
  },
  linkButton: {
    marginTop: 10,
  },
  submitButtonContainer: {
    marginTop: 50,
  },
});
