import { useState, useCallback } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Sentry from '@sentry/react-native';

import { Logger } from '@clean-rn/logger';
import { LinkButton, Colors, LinkButtonColors, firstLetterCapitalize } from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { AuthError, Email } from '@clean-rn/auth/domain';
import { fetchSearchEmailRequest } from '@auth/infrastructure/redux';
import { Welcome } from '../assets/images';
import { FormSignupStep1 } from '@auth/presentation/components';
import { useSecure, useCleanErrorOnFocus } from '@auth/presentation/hooks';
import { AUTH_STACK_PAGES } from '@auth/presentation/types';
import { SignupStep1FormData } from '../components/FormSignupStep1';

export const SignupStep1 = () => {
  // internal state
  const { t } = useTranslation();

  const { secured: securedPassword, onToggleSecurity: onToggleSecurityPassword } = useSecure(true);
  const { secured: securedConfirmPassword, onToggleSecurity: onToggleSecurityConfirmPassword } =
    useSecure(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupStep1FormData>();

  const [errorPasswordMismatch, setErrorPasswordMismatch] = useState<AuthError.InvalidPassword>();

  // api call
  const dispatch = useDispatch();

  const { pending, error } = useSelector((state: IRootState) => state.auth.signupStep1);

  const onSubmit = useCallback(
    (formData: SignupStep1FormData) => {
      if (formData.password !== formData.confirmPassword) {
        setErrorPasswordMismatch(
          new AuthError.InvalidPassword(firstLetterCapitalize(t('screens.signupstep1.error.auth'))),
        );
        return;
      } else {
        setErrorPasswordMismatch(undefined);
      }
      try {
        const payload = {
          email: new Email(formData.email),
          password: formData.password,
        };
        dispatch(fetchSearchEmailRequest(payload));
      } catch (e: unknown) {
        Sentry.captureException(e);
        Logger.getInstance().error(e);
      }
    },
    [dispatch, t],
  );

  // navigation
  const onPressLogin = useCallback(() => {
    dispatch(navigateTo({ route: AUTH_STACK_PAGES.LOGIN }));
  }, []);

  const onPressLegal = useCallback(() => {
    dispatch(navigateTo({ route: AUTH_STACK_PAGES.LEGAL }));
  }, []);

  const onPressCgu = useCallback(() => {
    dispatch(navigateTo({ route: AUTH_STACK_PAGES.CGU }));
  }, [dispatch]);

  // clean serverError onFocus
  const { domainError, onFocus } = useCleanErrorOnFocus(errorPasswordMismatch || error);

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.image}>
          <Image source={Welcome} width={108} height={108} />
        </View>

        <FormSignupStep1
          loading={pending}
          control={control}
          errors={errors}
          securedPassword={securedPassword}
          securedConfirmPassword={securedConfirmPassword}
          onToggleSecurityPassword={onToggleSecurityPassword}
          onToggleSecurityConfirmPassword={onToggleSecurityConfirmPassword}
          onSubmit={handleSubmit(onSubmit)}
          error={domainError}
          onFocus={onFocus}
        />
        <View style={styles.linkButton}>
          <LinkButton
            title={t('linkButton.login')}
            arrow
            colorOption={LinkButtonColors.GREEN}
            pressed={false}
            onPress={onPressLogin}
          />
        </View>
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
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.white,
  },
  image: {
    flex: 1,
  },
  linkButton: {
    marginTop: 24,
  },
  cgu: {
    marginTop: 36,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
