import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError } from '@clean-rn/ddd';
import { Email } from '@clean-rn/auth/domain';
import { IUserErrorCodes, IUserErrorMessage } from '@clean-rn/user/domain';

import { firstLetterCapitalize } from '@clean-rn/utils';

import { EmailInput } from '../../inputs/email-input';
import { ErrorMessage } from '../../texts/error-message';
import { SimpleCheckBox } from '../../checkboxes/simple-checkbox';

type IProps = {
  control: Control<ISignupEmailFormData>;
  errors: FieldErrors<ISignupEmailFormData>;
  error: IDomainError<IUserErrorCodes, IUserErrorMessage> | null;
  onFocus: () => void;
  onSubmit: () => void;
};

export type ISignupEmailFormData = {
  email: string;
  consent: boolean;
};

export const FormSignupEmail = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.form, theme.bank.container.centeredItem]}>
      <View style={styles.inputEmail}>
        <Controller
          control={props.control}
          name="email"
          rules={{ required: true, pattern: Email.pattern }}
          render={({ field: { onChange, value } }) => (
            <EmailInput
              value={value}
              onChange={onChange}
              onFocus={props.onFocus}
              onSubmitEditing={props.onSubmit}
            />
          )}
        />
        {props.errors?.email && props.errors.email.type === 'required' && (
          <View style={styles.errorContainer}>
            <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.email.required'))}</Text>
          </View>
        )}
        {props.errors?.email && props.errors.email.type === 'pattern' && (
          <View style={styles.errorContainer}>
            <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.email.invalid'))}</Text>
          </View>
        )}
        <View style={styles.domainErrorContainer}>
          <ErrorMessage error={props.error} />
        </View>
      </View>
      <View style={styles.inputCheckbox}>
        <Controller
          control={props.control}
          name="consent"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <SimpleCheckBox
              title={t('screens.signup-email.checkbox')}
              checked={value as boolean}
              toggleCheckbox={onChange}
            />
          )}
        />
        {props.errors?.consent && props.errors.consent.type === 'required' && (
          <Text style={[theme.bank.text.errors, styles.textError]}>
            {firstLetterCapitalize(t('errors.consent.required'))}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  textError: {
    marginTop: -16,
  },
  inputEmail: {
    marginVertical: 12,
  },
  inputCheckbox: {
    marginBottom: 10,
  },
  errorContainer: {
    marginTop: 24,
    marginBottom: -24,
  },
  domainErrorContainer: {
    marginTop: 16,
  },
});
