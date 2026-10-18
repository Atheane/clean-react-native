import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError, IInfraError } from '@clean-rn/ddd';
import { IAuthErrorCodes, IAuthErrorMessage } from '@clean-rn/auth/domain';

import { firstLetterCapitalize } from '../../../utils';
import { Colors, FontNames } from '../../../constants';

import { SubmitButton } from '../../buttons/submit-button';
import { PhoneValidationCodeInput } from '../../inputs/phone-validation-code-input';
import { ErrorMessage } from '../../texts/error-message';

type IProps = {
  loading: boolean;
  onSubmit: () => void;
  control: Control<ISignupStep3FormData>;
  errors: FieldErrors<ISignupStep3FormData>;
  error: IDomainError<IAuthErrorCodes, IAuthErrorMessage> | IInfraError | null;
  onFocus: () => void;
};

export type ISignupStep3FormData = {
  code: string;
};

export const FormSignupStep3 = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={theme.bank.container.centeredItem}>
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
          <Text style={theme.bank.text.errors}>
            {firstLetterCapitalize(t('screens.signupstep3.required'))}
          </Text>
        </View>
      )}
      <View style={styles.errorContainer}>
        <ErrorMessage error={props.error} />
      </View>
      <View style={[styles.formSubmit, theme.bank.container.centeredItem]}>
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
  formSubmit: {
    marginTop: 100,
  },
  errorContainer: {
    marginTop: 32,
  },
});
