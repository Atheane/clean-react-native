import { useCallback } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSecure, useCleanErrorOnFocus, FormLogin, ILoginFormData } from '@clean-rn/ui-mobile';

import { Email, Password } from '@clean-rn/auth/domain';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IAuthStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';

import { Welcome } from '../assets/images';
import { fetchLogin } from '../../application/commands/login';

export const Login = () => {
  /// translations
  const { t } = useTranslation();

  // retrieve email, if any
  const { email } = useSelector((state: IRootState) => state.initialization);

  const { secured, onToggleSecurity } = useSecure(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  // api call
  const { pending, error } = useSelector((state: IRootState) => state.auth.login);

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (formData: ILoginFormData) => {
      try {
        const payload = {
          ...formData,
          email: email ? email : new Email(formData.email),
          password: new Password(formData.password),
        };
        dispatch(fetchLogin(payload));
      } catch (e: unknown) {
        dispatch(showUnknownError(e as Error));
      }
    },
    [dispatch, email],
  );

  // navigate to forgot_password
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate(IAuthStackPages.RESET_PASSWORD as never);
  }, [navigation]);

  // clean serverError onFocus
  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={Welcome} />
          </View>

          <FormLogin
            loading={pending}
            control={control}
            errors={errors}
            email={email?.value}
            secured={secured}
            onToggleSecurity={onToggleSecurity}
            onPress={onPress}
            onSubmit={handleSubmit(onSubmit)}
            error={domainError}
            onFocus={onFocus}
          />
        </>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 146,
    height: 146,
  },
});
