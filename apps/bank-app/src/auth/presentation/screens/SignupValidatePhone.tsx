import { useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import {
  LinkButton,
  LinkButtonColors,
  FontNames,
  Colors,
  useCleanErrorOnFocus,
  FormSignupValidatePhone,
  ISignupValidatePhoneFormData,
  Security,
} from '@clean-rn/ui-mobile';
import { PhoneOtp } from '@clean-rn/auth/domain';

import { fetchValidatePhone } from '../../../auth/application/commands/signup';
import { IAuthStackPages } from '../../../shared/presentation/types';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { SafeScrollingView } from '../../../shared/presentation/hoc';

export const SignupValidatePhone = () => {
  const { t } = useTranslation();

  // internal state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupValidatePhoneFormData>();

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

  // navigation
  const navigation = useNavigation();

  const onPressLegal = useCallback(() => {
    navigation.navigate(IAuthStackPages.LEGAL as never);
  }, [navigation]);

  const onPressCgu = useCallback(() => {
    navigation.navigate(IAuthStackPages.CGU as never);
  }, [navigation]);

  const onPressCguKycProvider = useCallback(() => {
    navigation.navigate(IAuthStackPages.CGU_KYC_PROVIDER as never);
  }, [navigation]);

  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
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
        <View style={styles.cgu}>
          <LinkButton
            title={t('screens.legal')}
            arrow={false}
            colorOption={LinkButtonColors.BLUE}
            pressed={false}
            onPress={onPressLegal}
          />
          <LinkButton
            title={t('screens.cgu')}
            arrow={false}
            colorOption={LinkButtonColors.BLUE}
            pressed={false}
            onPress={onPressCgu}
          />
          <LinkButton
            title={t('screens.cgu-kyc-provider')}
            arrow={false}
            colorOption={LinkButtonColors.BLUE}
            pressed={false}
            onPress={onPressCguKycProvider}
          />
        </View>
      </>
    </SafeScrollingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bank.primary.white,
  },
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
  cgu: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
