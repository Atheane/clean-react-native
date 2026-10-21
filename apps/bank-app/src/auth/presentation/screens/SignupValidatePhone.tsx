import { useCallback } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { getUniqueId, getDeviceId, getBrand, getBaseOs, getBuildNumber } from 'react-native-device-info';

import {
  FontNames,
  Colors,
  useCleanErrorOnFocus,
  FormSignupValidatePhone,
  ISignupValidatePhoneFormData,
  Security,
  useNotification,
} from '@clean-rn/ui-mobile';
import { PhoneOtp, Device } from '@clean-rn/auth/domain';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { SafeScrollingView, ErrorBoundary } from '../../../shared/presentation/hoc';

import { fetchValidatePhone } from '../../../auth/application/commands/signup';

import { selectUserFromLogin } from '../../../kyc/application/state-management/selectors';

const HEIGHT = Dimensions.get('window').height;

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

  // registerPhone with a saga here
  const { firebaseToken, notificationEnabled } = useNotification();
  if (firebaseToken && notificationEnabled) {
    // registerDevice
    // const { id: userId } = yield select(selectUserFromLogin);
    // const deviceId: string = yield call(getUniqueId);
    // const device = Device.Create({
    //   deviceId,
    //   userId,
    // });
    // const brand = getBrand();
    // const model = getDeviceId();
    // const os = yield call(getBaseOs);
    // const osVersion = getBuildNumber();
    // device.registerDeviceProperties({
    //   brand,
    //   model,
    //   os,
    //   osVersion,
    // });
    // device.connectToNotifications(firebaseToken);
    // dispatch(registerDevice());
  }

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
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
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bank.primary.white,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: '20%',
    width: '75%',
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
    alignItems: 'center',
  },
});
