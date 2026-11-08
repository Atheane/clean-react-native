import { useCallback } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { IDomainError } from '@clean-rn/ddd';
import { IUserErrorCodes, IUserErrorMessage } from '@clean-rn/user/domain';
import { Email } from '@clean-rn/auth/domain';
import { PrimaryButton, FontNames, Colors, NEEDS_SMALL_TEXT } from '@clean-rn/ui-mobile';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { ISharedStackPages } from '../../../shared/presentation/types';
import { applicationInitialized } from '../../../shared/application/commands/initialize-application';

import { Congrats } from '../../presentation/assets/images';
import { ErrorMessage } from '../../../shared/presentation/components/error-message';

const HEIGHT = Dimensions.get('window').height;

export const SignupCongrats = () => {
  const { t } = useTranslation();

  const { user, pending, error } = useSelector((state: IRootState) => state.user);

  const dispatch = useDispatch();

  const { navigate } = useNavigation();

  const onPress = useCallback(() => {
    dispatch(
      applicationInitialized({
        email: user?.properties.email as Email,
        initRouteName: ISharedStackPages.HOME,
        carbon: {
          house: {
            footprint: null,
            average: null,
          },
          transport: {
            footprint: null,
            average: null,
          },
          food: {
            footprint: null,
            average: null,
          },
          fly: {
            footprint: null,
            average: null,
          },
        },
      }),
    );
    navigate(ISharedStackPages.HOME as never);
  }, [dispatch, user, navigate]);

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
            <ErrorMessage
              error={error as IDomainError<IUserErrorCodes, IUserErrorMessage>}
              errorMessage={t(`errors.domain-error.user.${error?.code}`)}
              genericErrorMessage={t('errors.other')}
            />
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
    width: '75%',
    alignItems: 'center',
  },
  text: {
    width: 290,
    fontSize: NEEDS_SMALL_TEXT ? 14 : 16,
    lineHeight: 30,
    textAlign: 'center',
    fontFamily: FontNames.MartelSans_400Regular,
    color: Colors.primary.grey,
  },
  formSubmit: {
    marginTop: 100,
    marginBottom: 100,
  },
  errorContainer: {
    marginVertical: 10,
  },
});
