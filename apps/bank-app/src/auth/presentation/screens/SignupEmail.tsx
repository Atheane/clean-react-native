import { useCallback } from 'react';
import { View, Image, StyleSheet } from 'react-native';
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
import { Email } from '@clean-rn/auth/domain';

import { Welcome } from '../assets/images';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';
import { IAuthStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { fetchSearchEmail } from '../../application/commands/signup';

export const SignupEmail = () => {
  /// translations
  const { t } = useTranslation();

  // internal state
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
      try {
        const payload = {
          email: new Email(formData.email),
        };
        dispatch(fetchSearchEmail(payload));
      } catch (e: unknown) {
        dispatch(showUnknownError(e as Error));
      }
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

  // clean domainError onFocus
  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
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
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bank.primary.white,
  },
  modalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
