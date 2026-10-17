import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError, IInfraError } from '@clean-rn/ddd';
import { AuthErrorCodes, AuthErrorMessage } from '@clean-rn/auth/domain';
import { firstLetterCapitalize } from '../../utils';

import { SubmitButton } from '../submit-button';
import { ErrorMessage } from '../error-message';
import { PhoneValidationCodeInput } from '../phone-validation-code-input';

type IProps = {
  loading: boolean;
  onSubmit: () => void;
  control: Control<SignupStep3FormData>;
  errors: FieldErrors<SignupStep3FormData>;
  error: IDomainError<AuthErrorCodes, AuthErrorMessage> | IInfraError | null;
  onFocus: () => void;
};

export interface SignupStep3FormData {
  code: string;
}

export const FormSignupStep3 = (props: IProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Controller
          control={props.control}
          name="code"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return <PhoneValidationCodeInput value={value} onChange={onChange} onFocus={props.onFocus} />;
          }}
        />
      </View>
      {props.errors?.code && props.errors.code.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.errors}>{firstLetterCapitalize(t('screens.signupstep3.required'))}</Text>
        </View>
      )}
      <View style={styles.errorContainer}>
        <ErrorMessage error={props.error} />
      </View>
      <View style={styles.formSubmit}>
        <SubmitButton
          title={t('screens.signupstep3.submitButton')}
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
    flex: 1,
  },
  input: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  formSubmit: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    marginTop: 32,
  },
});
