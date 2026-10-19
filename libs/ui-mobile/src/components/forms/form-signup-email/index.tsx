import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError } from '@clean-rn/ddd';
import { IAuthErrorCodes, IAuthErrorMessage, Email } from '@clean-rn/auth/domain';

import { firstLetterCapitalize } from '../../../utils';

import { SubmitButton } from '../../buttons/submit-button';
import { EmailInput } from '../../inputs/email-input';
import { ErrorMessage } from '../../texts/error-message';
import { SimpleCheckBox } from '../../checkboxes/simple-checkbox';

type IProps = {
  loading: boolean;
  onSubmit: () => void;
  control: Control<ISignupEmailFormData>;
  errors: FieldErrors<ISignupEmailFormData>;
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | null;
  onFocus: () => void;
};

export type ISignupEmailFormData = {
  email: string;
  consent: boolean;
};

export const FormSignupEmail = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.form}>
      <View style={theme.bank.container.centeredItem}>
        <View style={styles.textContainer}>
          <Text style={[theme.bank.text.darkBlue, styles.text]}>{t('signup-email.text')}</Text>
        </View>
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

const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 24,
    width: '80%',
  },
  text: {
    textAlign: 'justify',
  },
  textError: {
    marginTop: -8,
  },
  inputEmail: {
    marginVertical: 30,
  },
  inputCheckbox: {
    marginTop: 12,
    marginBottom: -10,
  },
  formSubmit: {
    position: 'absolute',
    bottom: 12,
  },
  errorContainer: {
    marginTop: 24,
    marginBottom: -20,
  },
  domainErrorContainer: {
    marginTop: 24,
    marginBottom: -40,
  },
});
