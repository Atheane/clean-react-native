import { useCallback } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { Email, Password } from '@clean-rn/auth/domain';

import { Colors, useSecure, useCleanErrorOnFocus } from '@clean-rn/ui-mobile';
import { FormLogin, ILoginFormData } from '../forms';

import { IRootState } from '../../application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../presentation/hoc';
import { showUnknownError } from '../../application/commands/manage-global-errors';

import { Logo } from '../assets/images';
import { fetchLogin } from '../../application/commands/login';

const HEIGHT = Dimensions.get('window').height;

export const Login = () => {
  /// translations
  const { t } = useTranslation();
  const { theme } = useTheme();

  // retrieve email, if any
  const { email } = useSelector((state: IRootState) => state.initialization);

  const { secured, onToggleSecurity } = useSecure(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>({
    defaultValues: { rememberMe: email?.value ? true : false, email: email?.value },
  });

  // api call
  const { pending, error } = useSelector((state: IRootState) => state.auth);

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

  // clean serverError onFocus
  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.container.centeredItem]}>
          <Image style={styles.image} source={Logo} />
          <FormLogin
            control={control}
            errors={errors}
            email={email?.value}
            secured={secured}
            onToggleSecurity={onToggleSecurity}
            error={domainError}
            onFocus={onFocus}
            loading={pending}
            onSubmit={handleSubmit(onSubmit)}
          />
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    height: HEIGHT,
    marginTop: 50,
  },
  image: {
    width: 207,
    height: 120,
  },
});
