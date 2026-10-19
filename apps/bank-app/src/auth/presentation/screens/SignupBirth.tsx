import { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import { FormSignupBirth, ISignupBirthFormData, useCleanErrorOnFocus } from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { registerBirth } from '../../application/commands/signup';

export const SignupBirth = () => {
  /// translations
  const { t } = useTranslation();

  // api call
  const dispatch = useDispatch();

  const { user, error } = useSelector((state: IRootState) => state.auth.signup);
  const onSubmit = useCallback(
    (formData: ISignupBirthFormData) => {
      try {
        dispatch(registerBirth(formData));
      } catch (e: unknown) {
        dispatch(showUnknownError(e as Error));
      }
    },
    [dispatch],
  );

  // internal state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupBirthFormData>({
    defaultValues: {
      birthday: dayjs('1980-01-01'),
      birthCountry: user?.properties.phone?.countryCode,
      nationality: user?.properties.phone?.countryCode,
    },
  });

  // clean domainError onFocus
  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.form}>
          <FormSignupBirth
            control={control}
            errors={errors}
            error={domainError}
            onSubmit={handleSubmit(onSubmit)}
            onFocus={onFocus}
            defaultCountry={user?.properties.phone?.countryCode}
          />
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
  },
});
