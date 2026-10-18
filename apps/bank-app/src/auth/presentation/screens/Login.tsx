import { useCallback } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

import { useSecure, useCleanErrorOnFocus, FormLogin, ILoginFormData } from '@clean-rn/ui-mobile';

import { Email, Password } from '@clean-rn/auth/domain';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IAuthStackPages } from '../../../shared/presentation/types';
import { ScreenWrapper } from '../../../shared/presentation/hoc';

import { Welcome } from '../assets/images';
import { fetchLogin } from '../../application/commands/login';

export const Login = () => {
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
      const payload = {
        ...formData,
        email: email ? email : new Email(formData.email),
        password: new Password(formData.password),
      };
      dispatch(fetchLogin(payload));
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
    <ScreenWrapper>
      <>
        <View style={styles.image}>
          <Image style={{ width: 146, height: 146 }} source={Welcome} />
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
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
