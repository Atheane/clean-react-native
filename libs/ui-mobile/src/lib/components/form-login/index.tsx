import { View, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError, IInfraError } from '@clean-rn/ddd';
import { AuthErrorCodes, AuthErrorMessage, Email } from '@clean-rn/auth/domain';

import { LinkButtonColors } from '../../types';
import { firstLetterCapitalize } from '../../utils';
import { LinkButton } from '../link-button';

import { EmailInput } from '../email-input';
import { PasswordInput } from '../password-input';
import { SubmitButton } from '../submit-button';
import { ErrorMessage } from '../error-message';

type Props = {
  email?: string;
};

type State = {
  loading: boolean;
  onSubmit: () => void;
  filled: boolean;
  onEdit: () => void;
  onFocus: () => void;
  secured: boolean;
  onToggleSecurity: (event: GestureResponderEvent) => void;
  onPress: () => void;
  control: Control<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  error: IDomainError<AuthErrorCodes, AuthErrorMessage> | IInfraError | null;
};
export interface LoginFormData {
  email: string;
  password: string;
}

export const FormLogin = (props: Props & State) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
    <View>
      <View style={styles.formInputs}>
        <View style={styles.inputEmail}>
          {props.filled && props.email ? (
            <EmailInput
              email={props.email}
              filled={props.filled}
              onEdit={props.onEdit}
              onFocus={props.onFocus}
            />
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
                <View style={styles.container}>
                  <Text style={theme.errors}>{firstLetterCapitalize(t('errors.email.required'))}</Text>
                </View>
              )}
              {props.errors?.email && props.errors.email.type !== 'required' && (
                <View style={styles.container}>
                  <Text style={theme.errors}>{firstLetterCapitalize(t('errors.email.invalid'))}</Text>
                  <Text style={theme.errors}>{props.errors.email.ref?.value}</Text>
                </View>
              )}
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
                secured={props.secured}
                onToggleSecurity={props.onToggleSecurity}
                onFocus={props.onFocus}
              />
            )}
          />
          {props.errors?.password && props.errors.password.type === 'required' && (
            <View style={styles.container}>
              <Text style={theme.errors}>{firstLetterCapitalize(t('errors.password.required'))}</Text>
            </View>
          )}
          {props.errors?.password && props.errors.password.type === 'minLength' && (
            <View style={styles.container}>
              <Text style={theme.errors}>{firstLetterCapitalize(t('errors.password.minLength'))}</Text>
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
        <View style={styles.container}>
          <ErrorMessage error={props.error} />
        </View>
      </View>

      <View style={styles.formSubmit}>
        <SubmitButton
          submitted={false}
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
  formInputs: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputEmail: {
    marginTop: 30,
  },
  inputPassword: {
    marginTop: 30,
  },
  linkButton: {
    marginTop: 10,
  },
  formSubmit: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingTop: 8,
  },
});
