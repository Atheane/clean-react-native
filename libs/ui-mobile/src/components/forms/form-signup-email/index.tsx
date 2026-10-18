import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError } from '@clean-rn/ddd';
import { IAuthErrorCodes, IAuthErrorMessage, Email } from '@clean-rn/auth/domain';

import { firstLetterCapitalize } from '../../../utils';

import { SubmitButton } from '../../buttons/submit-button';
import { EmailInput } from '../../inputs/email-input';
import { ErrorMessage } from '../../texts/error-message';

type IProps = {
  loading: boolean;
  onSubmit: () => void;
  control: Control<ISignupEmailFormData>;
  errors: FieldErrors<ISignupEmailFormData>;
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | Error | null;
  onFocus: () => void;
};

export type ISignupEmailFormData = {
  email: string;
};

export const FormSignupEmail = (props: IProps) => {
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
        <View style={styles.container}>
          <ErrorMessage error={props.error} />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={[theme.bank.text.darkBlue, styles.text]}>{t('screens.signup-email.text')}</Text>
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
    flex: 1,
    alignItems: 'center',
  },
  inputEmail: {
    marginVertical: 30,
  },
  formSubmit: {
    marginTop: 36,
  },
  container: {
    paddingTop: 16,
  },
  textContainer: {
    width: '80%',
  },
  text: {
    textAlign: 'justify',
  },
});
