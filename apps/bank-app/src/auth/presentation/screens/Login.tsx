import { useState, useCallback } from 'react';
import { StyleSheet, View, Image, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Sentry from '@sentry/react-native';

import { Logger } from '@clean-rn/logger';
import { useSecure, useCleanErrorOnFocus, FormLogin, ILoginFormData } from '@clean-rn/ui-mobile';

import { Email } from '@clean-rn/auth/domain';

import { RootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IAuthStackPages } from '../../../shared/presentation/types';
import { navigationRef } from '../../../shared/presentation/navigation/navigationRef';

import { Welcome } from '../assets/images';
import { fetchLoginRequest } from '../../application/commands/login';

export const Login = () => {
  // retrieve email, if any
  const { email } = useSelector((state: RootState) => state.initialization);

  // internal state
  const [filled, setFilled] = useState<boolean>(!!email);
  const onEdit = useCallback(() => {
    setFilled(false);
  }, []);

  const { secured, onToggleSecurity } = useSecure(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  // api call
  const { pending, error } = useSelector((state: RootState) => state.auth.login);

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (formData: ILoginFormData) => {
      try {
        const payload = {
          ...formData,
          email: filled && email ? email : new Email(formData.email),
        };
        dispatch(fetchLoginRequest(payload));
      } catch (e: unknown) {
        Sentry.captureException(e);
        Logger.getInstance().error(e);
      }
    },
    [dispatch, email, filled],
  );

  // navigate to forgot_password
  const onPress = useCallback(() => {
    navigationRef.navigate(IAuthStackPages.RESET_PASSWORD as never);
  }, []);

  // clean serverError onFocus
  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.image}>
          <Image style={{ width: 146, height: 146 }} source={Welcome} />
        </View>

        <FormLogin
          loading={pending}
          control={control}
          errors={errors}
          email={email?.value}
          filled={filled}
          onEdit={onEdit}
          secured={secured}
          onToggleSecurity={onToggleSecurity}
          onPress={onPress}
          onSubmit={handleSubmit(onSubmit)}
          error={domainError}
          onFocus={onFocus}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
