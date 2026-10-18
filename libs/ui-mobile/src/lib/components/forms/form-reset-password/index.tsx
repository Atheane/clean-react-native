import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError, IInfraError } from '@clean-rn/ddd';
import { IAuthErrorCodes, IAuthErrorMessage, Email } from '@clean-rn/auth/domain';

import { firstLetterCapitalize } from '../../../utils';

import { SubmitButton } from '../../buttons/submit-button';
import { EmailInput } from '../../inputs/email-input';
import { ErrorMessage } from '../../texts/error-message';

type IProps = {
  email?: string;
  success: boolean;
  loading: boolean;
  onSubmit: () => void;
  filled: boolean;
  onEdit: () => void;
  onFocus: () => void;
  control: Control<IResetPasswordFormData>;
  errors: FieldErrors<IResetPasswordFormData>;
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | IInfraError | null;
};

export type IResetPasswordFormData = {
  email: string;
};

export const FormResetPassword = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <View>
      <View style={theme.bank.container.centeredItem}>
        <View>
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
                  <Text style={theme.bank.text.errors}>
                    {firstLetterCapitalize(t('errors.email.required'))}
                  </Text>
                </View>
              )}
              {props.errors?.email && props.errors.email.type !== 'required' && (
                <View style={styles.container}>
                  <Text style={theme.bank.text.errors}>
                    {firstLetterCapitalize(t('errors.email.invalid'))}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
        <View style={styles.container}>
          <ErrorMessage error={props.error} />
        </View>
      </View>
      <View style={theme.bank.container.centeredItem}>
        {props.success ? (
          <Text style={theme.bank.text.darkBlue}>{t('screens.resetPassword.success')}</Text>
        ) : (
          <SubmitButton
            title={t('screens.resetPassword.submitButton')}
            uppercase
            onSubmit={props.onSubmit}
            loading={props.loading}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
});
