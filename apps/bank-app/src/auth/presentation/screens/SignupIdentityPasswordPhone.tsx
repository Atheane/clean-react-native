import { useCallback } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getLocales } from 'expo-localization';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { IGender, Phone } from '@clean-rn/auth/domain';
import {
  useCleanErrorOnFocus,
  Colors,
  FormSignupIdentityPasswordPhone,
  LinkButton,
  LinkButtonColors,
  ISignupIdentityPasswordPhoneFormData,
  useSecure,
} from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IAuthStackPages } from '../../../shared/presentation/types';

import { registerIdentity, fetchCheckPhone, registerPassword } from '../../application/commands/signup';
import { useNavigation } from '@react-navigation/native';

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

  const { pending, error } = useSelector((state: IRootState) => state.auth.signup);

  const onSubmit = useCallback(
    (formData: ISignupIdentityPasswordPhoneFormData) => {
      dispatch(
        registerIdentity({
          gender: formData.title,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      );
      dispatch(registerPassword({ password: formData.password }));
      dispatch(fetchCheckPhone({ phone: new Phone(formData.phone, formData.countryCode) }));
    },
    [dispatch],
  );

  // navigation
  const navigation = useNavigation();

  const onPressLegal = useCallback(() => {
    navigation.navigate(IAuthStackPages.LEGAL as never);
  }, [navigation]);

  const onPressCgu = useCallback(() => {
    navigation.navigate(IAuthStackPages.CGU as never);
  }, [navigation]);

  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
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
            title={t('linkButton.legal')}
            arrow={false}
            colorOption={LinkButtonColors.BLUE}
            pressed={false}
            onPress={onPressLegal}
          />
          <LinkButton
            title={t('linkButton.cgu')}
            arrow={false}
            colorOption={LinkButtonColors.BLUE}
            pressed={false}
            onPress={onPressCgu}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bank.primary.white,
  },
  cgu: {
    marginTop: 36,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
