import { useCallback } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  LinkButton,
  Colors,
  LinkButtonColors,
  FormSignupEmail,
  ISignupEmailFormData,
  useCleanErrorOnFocus,
} from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { Welcome } from '../assets/images';

import { Email } from '@clean-rn/auth/domain';
import { fetchCheckEmailExists } from '../../application/commands/signup';
import { IAuthStackPages } from '../../../shared/presentation/types';
import { ScreenWrapper } from '../../../shared/presentation/hoc';

export const SignupEmail = () => {
  // internal state
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupEmailFormData>();

  // api call
  const dispatch = useDispatch();

  const { pending, error } = useSelector((state: IRootState) => state.auth.signup);

  const onSubmit = useCallback(
    (formData: ISignupEmailFormData) => {
      const payload = {
        email: new Email(formData.email),
      };
      dispatch(fetchCheckEmailExists(payload));
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

  // clean serverError onFocus
  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ScreenWrapper>
      <>
        <View style={styles.image}>
          <Image style={{ width: 200, height: 200 }} source={Welcome} />
        </View>

        <FormSignupEmail
          loading={pending}
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
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bank.primary.white,
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkButton: {
    marginTop: 8,
  },
  cgu: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
