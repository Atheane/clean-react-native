import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { Email } from '@clean-rn/auth/domain';

import { firstLetterCapitalize } from '../../../utils';

import { SubmitButton } from '../../buttons/submit-button';
import { EmailInput } from '../../inputs/email-input';

type IProps = {
  email?: string;
  success: boolean | null;
  loading: boolean;
  onSubmit: () => void;
  control: Control<IResetPasswordFormData>;
  errors: FieldErrors<IResetPasswordFormData>;
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
          {props.email ? (
            <EmailInput email={props.email} filled />
          ) : (
            <View>
              <Controller
                control={props.control}
                name="email"
                rules={{ required: true, pattern: Email.pattern }}
                render={({ field: { onChange, value } }) => (
                  <EmailInput value={value} filled={false} onChange={onChange} />
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
                </View>
              )}
            </View>
          )}
        </View>
      </View>
      <View style={[theme.bank.container.centeredItem, styles.submitButtonContainer]}>
        {props.success ? (
          <View style={styles.textContainer}>
            <Text style={theme.bank.text.darkBlue}>{t('reset-password.success')}</Text>
          </View>
        ) : (
          <SubmitButton
            title={t('reset-password.reset')}
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
  errorContainer: {
    marginTop: 24,
  },
  submitButtonContainer: {
    marginTop: 64,
    marginBottom: 200,
  },
  textContainer: {
    width: '90%',
  },
});
