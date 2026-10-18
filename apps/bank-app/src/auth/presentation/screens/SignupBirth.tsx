import { useCallback } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import dayjs from 'dayjs';

import {
  LinkButton,
  LinkButtonColors,
  FormSignupBirth,
  ISignupBirthFormData,
  useCleanErrorOnFocus,
  Colors,
} from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IAuthStackPages } from '../../../shared/presentation/types';

import { registerBirth } from '../../application/commands/signup';

export const SignupBirth = () => {
  const { t } = useTranslation();

  // api call
  const dispatch = useDispatch();

  const { user, error } = useSelector((state: IRootState) => state.auth.signup);

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

  const onSubmit = useCallback(
    (formData: ISignupBirthFormData) => {
      dispatch(registerBirth(formData));
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

  const onPressCguKycProvider = useCallback(() => {
    navigation.navigate(IAuthStackPages.CGU_KYC_PROVIDER as never);
  }, [navigation]);

  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <FormSignupBirth
            control={control}
            errors={errors}
            error={domainError}
            onSubmit={handleSubmit(onSubmit)}
            onFocus={onFocus}
            defaultCountry={user?.properties.phone?.countryCode}
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
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  form: {
    marginTop: 30,
  },
});
