import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { Email } from '@clean-rn/auth/domain';

import { firstLetterCapitalize } from '@clean-rn/utils';

import { SubmitButton, EmailInput } from '@clean-rn/ui-mobile';

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
      <View style={theme.container.centeredItem}>
        <View>
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
                </View>
              )}
            </View>
          )}
        </View>
      </View>
      <View style={[theme.container.centeredItem, styles.submitButtonContainer]}>
        {props.success ? (
          <View style={styles.textContainer}>
            <Text style={theme.text.darkBlue}>{t('reset-password.success')}</Text>
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
