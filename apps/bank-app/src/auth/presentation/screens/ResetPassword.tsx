// todo: delete below once ForgotPassword is done
/* eslint-disable */
import { StyleSheet, View } from 'react-native';
import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as Sentry from '@sentry/react-native';

import { Logger } from '@clean-rn/logger';
import { Colors, useCleanErrorOnFocus, FormResetPassword, IResetPasswordFormData } from '@clean-rn/ui-mobile';
import { RootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { Email } from '@clean-rn/auth/domain';
import { fetchResetPassword } from '../../application/commands/reset-password';

export const ResetPassword = () => {
  // retrieve email, if any
  const { email } = useSelector((state: RootState) => state.initialization);

  // internal state
  const [filled, setFilled] = useState<boolean>(true);

  const onEdit = useCallback(() => {
    setFilled(false);
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordFormData>();

  // api call
  const { pending, success, error } = useSelector((state: RootState) => state.auth.resetPassword);

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (formData: IResetPasswordFormData) => {
      try {
        const payload = {
          ...formData,
          email: filled && email ? email : new Email(formData.email),
        };
        dispatch(fetchResetPassword(payload));
      } catch (e: unknown) {
        Sentry.captureException(e);
        Logger.getInstance().error(e);
      }
    },
    [dispatch, email, filled],
  );

  // clean serverError onFocus
  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <View style={styles.container}>
      <FormResetPassword
        loading={pending}
        control={control}
        errors={errors}
        email={email?.value}
        filled={filled}
        onEdit={onEdit}
        onSubmit={handleSubmit(onSubmit)}
        error={domainError}
        success={success}
        onFocus={onFocus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bank.primary.white,
  },
});
