import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getLocales } from 'expo-localization';

import { IGender, Phone } from '@clean-rn/auth/domain';
import {
  useCleanErrorOnFocus,
  FormSignupIdentityPasswordPhone,
  LinkButton,
  LinkButtonColors,
  ISignupIdentityPasswordPhoneFormData,
  useSecure,
} from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IAuthStackPages } from '../../../shared/presentation/types';
import { SafeScrollingView } from '../../../shared/presentation/hoc';

import { registerIdentity, fetchCheckPhone, registerPassword } from '../../application/commands/signup';

const locales = getLocales();

export const SignupIdentityPasswordPhone = () => {
  const { t } = useTranslation();

  // internal state
  const defaultCountry = locales[0]?.regionCode || undefined;
  const { secured, onToggleSecurity } = useSecure(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupIdentityPasswordPhoneFormData>({
    defaultValues: {
      title: IGender.MAN,
      firstName: '',
      lastName: '',
      countryCode: defaultCountry,
      phone: undefined,
    },
  });

  // api call
  const dispatch = useDispatch();

  const { pending, error, email } = useSelector((state: IRootState) => state.auth.signup);

  const onSubmit = useCallback(
    (formData: ISignupIdentityPasswordPhoneFormData) => {
      if (!email) {
        throw new Error('email is missing');
      }
      dispatch(
        registerIdentity({
          gender: formData.title,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email,
        }),
      );
      dispatch(registerPassword({ password: formData.password }));
      dispatch(fetchCheckPhone({ phone: new Phone(formData.phone, formData.countryCode) }));
    },
    [dispatch, email],
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
        <FormSignupIdentityPasswordPhone
          defaultCountry={defaultCountry}
          loading={pending}
          securedPassword={secured}
          onToggleSecurityPassword={onToggleSecurity}
          control={control}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          error={domainError}
          onFocus={onFocus}
        />
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
  cgu: {
    marginTop: 36,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
