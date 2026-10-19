import { useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { ILoginCommand } from '@clean-rn/auth/domain';

import { PrimaryButton, FontNames, Colors, ErrorMessage } from '@clean-rn/ui-mobile';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';

import { fetchLogin, resetError } from '../../../auth/application/commands/login';
import { Congrats } from '../../presentation/assets/images';

const HEIGHT = Dimensions.get('window').height;

export const SignupCongrats = () => {
  const { t } = useTranslation();

  const { user } = useSelector((state: IRootState) => state.auth.signup);
  const { email, password } = useSelector((state: IRootState) => state.auth.login);

  // api call
  const { pending, error } = useSelector((state: IRootState) => state.auth.login);

  const dispatch = useDispatch();

  const onPress = useCallback(() => {
    try {
      const payload = {
        email: user ? user.properties.email : email,
        password: user ? user.properties.password : password,
      };
      dispatch(fetchLogin(payload as ILoginCommand));
    } catch (e: unknown) {
      dispatch(showUnknownError(e as Error));
    }
  }, [dispatch, user, email, password]);

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <View style={styles.image}>
            <Image style={{ width: 250, height: 250 }} source={Congrats} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{t('screens.signup-congrats.congrats')}</Text>
          </View>
          <View style={styles.errorContainer}>
            <ErrorMessage error={error} />
          </View>
          <View style={styles.formSubmit}>
            <PrimaryButton
              long
              title={t('screens.signup-congrats.button')}
              uppercase
              onPress={onPress}
              loading={pending}
            />
          </View>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 80,
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 24,
    width: '80%',
    alignItems: 'center',
  },
  text: {
    width: 290,
    fontSize: 16,
    lineHeight: 30,
    textAlign: 'center',
    fontFamily: FontNames.MartelSans_400Regular,
    color: Colors.bank.primary.grey,
  },
  formSubmit: {
    marginTop: 100,
    marginBottom: 100,
  },
  errorContainer: {
    marginVertical: 10,
  },
});
