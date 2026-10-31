import { View, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError } from '@clean-rn/ddd';
import { firstLetterCapitalize } from '@clean-rn/utils';
import { IAuthErrorCodes, IAuthErrorMessage, Email } from '@clean-rn/auth/domain';

import { SubmitButton, EmailInput, PasswordInput, SimpleCheckBox } from '@clean-rn/ui-mobile';
import { ErrorMessage } from '../../components/error-message';

type IProps = {
  email?: string;
  rememberMe: boolean;
  onFocus: () => void;
  secured: boolean;
  onToggleSecurity: (event: GestureResponderEvent) => void;
  control: Control<ILoginFormData>;
  errors: FieldErrors<ILoginFormData>;
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | null;
  loading: boolean;
  onSubmit: () => void;
};

export type ILoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const FormLogin = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  console.log('props.control._defaultValues', props.control._defaultValues);
  return (
    <View style={[styles.container, theme.container.centeredItem]}>
      <View style={styles.inputContainer}>
        {props.email ? (
          <EmailInput
            label={t('email-input.label')}
            placeholder={t('email-input.placeholder')}
            email={props.email}
            filled
            onSubmitEditing={props.onSubmit}
          />
        ) : (
          <View>
            <Controller
              control={props.control}
              name="email"
              rules={{ required: true, pattern: Email.pattern }}
              render={({ field: { onChange, value } }) => (
                <EmailInput
                  label={t('email-input.label')}
                  placeholder={t('email-input.placeholder')}
                  value={value}
                  filled={false}
                  onChange={onChange}
                  onFocus={props.onFocus}
                  onSubmitEditing={props.onSubmit}
                />
              )}
            />
            {props.errors?.email && props.errors.email.type === 'required' && (
              <View style={styles.errorContainer}>
                <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.email.required'))}</Text>
              </View>
            )}
            {props.errors?.email && props.errors.email.type !== 'required' && (
              <View style={styles.errorContainer}>
                <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.email.invalid'))}</Text>
                <Text style={theme.text.errors}>{props.errors.email.ref?.value}</Text>
              </View>
            )}
          </View>
        )}
      </View>
      <View style={[styles.inputContainer, theme.container.centeredItem]}>
        <Controller
          control={props.control}
          name="password"
          rules={{ required: true, minLength: 6 }}
          render={({ field: { onChange, value } }) => (
            <PasswordInput
              label={t('password-input.label')}
              placeholder={t('password-input.placeholder')}
              value={value}
              onChange={onChange}
              secured={props.secured}
              onToggleSecurity={props.onToggleSecurity}
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
      <View style={styles.errorContainer}>
        <ErrorMessage
          error={props.error}
          errorMessage={t(`errors.domain-error.auth.${props.error?.code}`)}
          genericErrorMessage={t('errors.other')}
        />
      </View>
      <View style={[styles.inputContainer, theme.container.leftItems]}>
        <Controller
          control={props.control}
          name="rememberMe"
          defaultValue={props.rememberMe}
          render={({ field: { onChange, value } }) => (
            <SimpleCheckBox
              title={t('checkbox.remember-me')}
              checked={value as boolean}
              toggleCheckbox={onChange}
            />
          )}
        />
      </View>
      <View style={styles.formSubmit}>
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
    marginTop: 8,
  },
  inputContainer: {
    marginTop: 30,
  },
  errorContainer: {
    marginTop: 24,
    marginBottom: -24,
  },
  domainErrorContainer: {
    marginTop: 16,
  },
  formSubmit: {
    marginTop: '10%',
  },
  inputCheckbox: {
    marginTop: 20,
  },
});
