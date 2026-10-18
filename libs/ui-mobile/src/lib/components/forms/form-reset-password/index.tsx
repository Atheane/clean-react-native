import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';

import { IDomainError, IInfraError } from '@clean-rn/ddd';
import { IAuthErrorCodes, IAuthErrorMessage, Email } from '@clean-rn/auth/domain';

import { FontNames, Colors } from '../../../constants';
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
  const { t } = useTranslation();
  return (
    <View>
      <View style={styles.formInputs}>
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
                  <Text style={styles.errors}>{firstLetterCapitalize(t('errors.email.required'))}</Text>
                </View>
              )}
              {props.errors?.email && props.errors.email.type !== 'required' && (
                <View style={styles.container}>
                  <Text style={styles.errors}>{firstLetterCapitalize(t('errors.email.invalid'))}</Text>
                </View>
              )}
            </View>
          )}
        </View>
        <View style={styles.container}>
          <ErrorMessage error={props.error} />
        </View>
      </View>
      <View style={styles.formSubmit}>
        {props.success ? (
          <Text style={styles.instructionText}>{t('screens.resetPassword.success')}</Text>
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
  formInputs: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formSubmit: {
    flex: 2,
    alignItems: 'center',
  },
  container: {
    paddingTop: 8,
  },
  errors: {
    color: Colors.text.salmon,
    fontFamily: FontNames.Roboto_700Bold,
    fontSize: 12,
    textAlign: 'center',
  },
  instructionText: {
    width: '80%',
    fontSize: 16,
    lineHeight: 30,
    textAlign: 'center',
    fontFamily: FontNames.Roboto_400Regular,
    color: Colors.text.grey,
  },
});
