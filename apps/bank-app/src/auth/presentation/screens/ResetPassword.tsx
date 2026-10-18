// todo: delete below once ForgotPassword is done
/* eslint-disable */
import { StyleSheet, View } from 'react-native';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as Sentry from '@sentry/react-native';

import { Logger } from '@clean-rn/logger';
import { Colors, FormResetPassword, IResetPasswordFormData } from '@clean-rn/ui-mobile';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { Email } from '@clean-rn/auth/domain';
import { fetchResetPassword } from '../../application/commands/reset-password';

export const ResetPassword = () => {
  // retrieve email, if any
  const { email } = useSelector((state: IRootState) => state.initialization);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordFormData>();

  // api call
  const { pending, success } = useSelector((state: IRootState) => state.auth.resetPassword);

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (formData: IResetPasswordFormData) => {
      try {
        const payload = {
          ...formData,
          email: email ? email : new Email(formData.email),
        };
        dispatch(fetchResetPassword(payload));
      } catch (e: unknown) {
        Sentry.captureException(e);
        Logger.getInstance().error(e);
      }
    },
    [dispatch, email],
  );

  return (
    <View style={styles.container}>
      <FormResetPassword
        loading={pending}
        control={control}
        errors={errors}
        email={email?.value}
        onSubmit={handleSubmit(onSubmit)}
        success={success}
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
