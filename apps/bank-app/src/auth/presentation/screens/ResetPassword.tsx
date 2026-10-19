import { useCallback } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormResetPassword, IResetPasswordFormData } from '@clean-rn/ui-mobile';
import { Email } from '@clean-rn/auth/domain';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';

import { fetchResetPassword } from '../../application/commands/reset-password';

export const ResetPassword = () => {
  /// translations
  const { t } = useTranslation();

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
        dispatch(showUnknownError(e as Error));
      }
    },
    [dispatch, email],
  );

  return (
    <ErrorBoundary t={t}>
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
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    height: Dimensions.get('window').height,
    marginTop: '40%',
  },
});
