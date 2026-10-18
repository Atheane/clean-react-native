import { View, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';

import { IDomainError, IInfraError } from '@clean-rn/ddd';
import { IAuthErrorCodes, IAuthErrorMessage, Email } from '@clean-rn/auth/domain';

import { Colors, FontNames } from '../../../constants';
import { LinkButtonColors } from '../../../types';
import { firstLetterCapitalize } from '../../../utils';

import { LinkButton } from '../../buttons/link-button';
import { SubmitButton } from '../../buttons/submit-button';
import { EmailInput } from '../../inputs/email-input';
import { PasswordInput } from '../../inputs/password-input';
import { ErrorMessage } from '../../texts/error-message';

type IProps = {
  email?: string;
  loading: boolean;
  onSubmit: () => void;
  filled: boolean;
  onEdit: () => void;
  onFocus: () => void;
  secured: boolean;
  onToggleSecurity: (event: GestureResponderEvent) => void;
  onPress: () => void;
  control: Control<ILoginFormData>;
  errors: FieldErrors<ILoginFormData>;
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | IInfraError | null;
};

export type ILoginFormData = {
  email: string;
  password: string;
};

export const FormLogin = (props: IProps) => {
  const { t } = useTranslation();
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
                  <Text style={styles.errors}>{firstLetterCapitalize(t('errors.email.required'))}</Text>
                </View>
              )}
              {props.errors?.email && props.errors.email.type !== 'required' && (
                <View style={styles.container}>
                  <Text style={styles.errors}>{firstLetterCapitalize(t('errors.email.invalid'))}</Text>
                  <Text style={styles.errors}>{props.errors.email.ref?.value}</Text>
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
              <Text style={styles.errors}>{firstLetterCapitalize(t('errors.password.required'))}</Text>
            </View>
          )}
          {props.errors?.password && props.errors.password.type === 'minLength' && (
            <View style={styles.container}>
              <Text style={styles.errors}>{firstLetterCapitalize(t('errors.password.minLength'))}</Text>
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
  errors: {
    color: Colors.bank.secondary.salmon,
    fontFamily: FontNames.Roboto_700Bold,
    fontSize: 12,
    textAlign: 'center',
  },
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
