import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { Colors, FormResetPassword, IResetPasswordFormData } from '@clean-rn/ui-mobile';
import { Email } from '@clean-rn/auth/domain';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { SafeScrollingView } from '../../../shared/presentation/hoc';
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
      const payload = {
        ...formData,
        email: email ? email : new Email(formData.email),
      };
      dispatch(fetchResetPassword(payload));
    },
    [dispatch, email],
  );

  return (
    <SafeScrollingView>
      <View style={styles.form}>
        <FormResetPassword
          loading={pending}
          control={control}
          errors={errors}
          email={email?.value}
          onSubmit={handleSubmit(onSubmit)}
          success={success}
        />
      </View>
    </SafeScrollingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bank.primary.white,
  },
  form: {
    marginTop: '40%',
  },
});
