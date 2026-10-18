import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { PrimaryButton, FontNames, Colors, ErrorMessage } from '@clean-rn/ui-mobile';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { Congrats } from '../../presentation/assets/images';
import { fetchLogin } from '../../../auth/application/commands/login';

export const SignupCongrats = () => {
  const { t } = useTranslation();

  const { user } = useSelector((state: IRootState) => state.auth.signup);

  // api call
  const { pending, error } = useSelector((state: IRootState) => state.auth.login);

  const dispatch = useDispatch();

  const onPress = useCallback(() => {
    if (!user || !user.properties.email || !user.properties.password) {
      throw new Error('Missing at least one field in this list: email, password');
    }

    const payload = {
      email: user.properties.email,
      password: user.properties.password,
    };

    dispatch(fetchLogin(payload));
  }, [dispatch, user]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <View style={styles.image}>
            <Image style={{ width: 250, height: 250 }} source={Congrats} />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>{t('screens.signup-congrats.congrats')}</Text>
          </View>
          <View style={styles.submit}>
            <PrimaryButton
              long
              title={t('screens.signup-congrats.button')}
              uppercase
              onPress={onPress}
              loading={pending}
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
  subContainer: {
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
  },
  text: {
    width: 290,
    fontSize: 16,
    lineHeight: 30,
    textAlign: 'center',
    fontFamily: FontNames.MartelSans_400Regular,
    color: Colors.bank.primary.grey,
  },
  submit: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    marginVertical: 10,
  },
});
