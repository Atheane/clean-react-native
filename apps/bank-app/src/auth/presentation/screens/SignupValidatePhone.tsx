import { useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import {
  FontNames,
  Colors,
  useCleanErrorOnFocus,
  FormSignupValidatePhone,
  ISignupValidatePhoneFormData,
  Security,
} from '@clean-rn/ui-mobile';
import { PhoneOtp } from '@clean-rn/auth/domain';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { SafeScrollingView, ErrorBoundary } from '../../../shared/presentation/hoc';

import { fetchValidatePhone } from '../../../auth/application/commands/signup';

export const SignupValidatePhone = () => {
  /// translations
  const { t } = useTranslation();

  // internal state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupValidatePhoneFormData>();

  // api call
  const dispatch = useDispatch();
  const { phone, pending, error } = useSelector((state: IRootState) => state.auth.signup);

  const onSubmit = useCallback(
    (formData: ISignupValidatePhoneFormData) => {
      const { code } = formData;
      if (!phone) {
        throw new Error('Missing phone');
      }
      const payload = {
        phoneOtp: new PhoneOtp(code),
        phone,
      };
      dispatch(fetchValidatePhone(payload));
    },
    [dispatch, phone],
  );

  // clean domainError onFocus
  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <>
          <View style={styles.subContainer}>
            <Security />
            <View style={styles.textContainer}>
              <Text style={styles.instructionText}>{t('screens.signup-validate-phone.instruction')}</Text>
            </View>
          </View>
          <View style={styles.formContainer}>
            <FormSignupValidatePhone
              loading={pending}
              control={control}
              errors={errors}
              onSubmit={handleSubmit(onSubmit)}
              error={domainError}
              onFocus={onFocus}
            />
          </View>
        </>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    marginTop: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: '20%',
    width: '80%',
  },
  instructionText: {
    width: 290,
    fontSize: 16,
    lineHeight: 30,
    textAlign: 'center',
    fontFamily: FontNames.MartelSans_400Regular,
    color: Colors.bank.primary.grey,
  },
  formContainer: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
