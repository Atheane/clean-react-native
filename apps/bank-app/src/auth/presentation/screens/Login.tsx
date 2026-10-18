import { useState, useCallback } from 'react';
import { StyleSheet, View, Image, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Sentry from '@sentry/react-native';

import { Logger } from '@clean-rn/logger';
import {
  useSecure,
  useCleanErrorOnFocus,
  FormLogin,
  ILoginFormData,
  useAsyncStorage,
} from '@clean-rn/ui-mobile';

import { Email } from '@clean-rn/auth/domain';

import { RootState } from '../../../shared/application/state-management/root-reducer';
import { IAuthStackPages } from '../../../shared/presentation/types';
import { navigationRef } from '../../../shared/presentation/navigation/navigationRef';

import { Welcome } from '../assets/images';
import { fetchLoginRequest } from '../../application/commands/login';
import { IStoreKey } from '../../../shared/application/types';

export const Login = () => {
  // retrieve email, if any
  const { storedValue } = useAsyncStorage(IStoreKey.USER_EMAIL);

  // internal state
  const [filled, setFilled] = useState<boolean>(!!storedValue);
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
          email: filled && storedValue ? new Email(storedValue) : new Email(formData.email),
        };
        dispatch(fetchLoginRequest(payload));
      } catch (e: unknown) {
        Sentry.captureException(e);
        Logger.getInstance().error(e);
      }
    },
    [dispatch, storedValue, filled],
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
          email={storedValue ? new Email(storedValue).value : undefined}
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
