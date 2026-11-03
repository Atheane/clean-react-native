import { useCallback, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  LinkButton,
  Colors,
  LinkButtonColors,
  useCleanErrorOnFocus,
  SubmitButton,
  NEEDS_SMALL_TEXT,
} from '@clean-rn/ui-mobile';
import { AuthError, Email } from '@clean-rn/auth/domain';

import { Welcome } from '../../../auth/presentation/assets/images';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ISharedStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary } from '../../../shared/presentation/hoc';

import { fetchSearchEmail } from '../../application/commands';
import { FormSignupEmail, ISignupEmailFormData } from '../forms';

const HEIGHT = Dimensions.get('window').height;

export const SignupEmail = () => {
  /// translations
  const { t } = useTranslation();
  const { theme } = useTheme();

  // internal state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupEmailFormData>();

  // api call
  const dispatch = useDispatch();
  const { pending, error } = useSelector((state: IRootState) => state.user);

  const [authError, setAuthError] = useState<AuthError.InvalidEmail>();
  const onSubmit = useCallback(
    (formData: ISignupEmailFormData) => {
      try {
        const payload = {
          email: new Email(formData.email),
        };
        dispatch(fetchSearchEmail(payload));
      } catch (e: unknown) {
        ///todo replace with a domainError
        if (e instanceof AuthError.InvalidEmail) {
          setAuthError(e);
          return;
        }
        throw e;
      }
    },
    [dispatch],
  );

  // navigation
  const navigation = useNavigation();

  const onPressLegal = useCallback(() => {
    navigation.navigate(ISharedStackPages.LEGAL as never);
  }, [navigation]);

  const onPressCgu = useCallback(() => {
    navigation.navigate(ISharedStackPages.CGU as never);
  }, [navigation]);

  const onPressCguKycProvider = useCallback(() => {
    navigation.navigate(ISharedStackPages.CGU_KYC_PROVIDER as never);
  }, [navigation]);

  // clean domainError onFocus
  const { domainError, onFocus } = useCleanErrorOnFocus(authError || error);

  return (
    <ErrorBoundary t={t}>
      <KeyboardAwareScrollView>
        <View style={[styles.container, theme.container.centeredItem]}>
          <Image style={styles.image} source={Welcome} />
          <View style={styles.textContainer}>
            <Text style={[theme.text.darkBlue, styles.text]}>{t('signup-email.text')}</Text>
          </View>
          <FormSignupEmail
            control={control}
            errors={errors}
            error={domainError}
            onFocus={onFocus}
            onSubmit={handleSubmit(onSubmit)}
          />
          <View style={styles.buttonContainer}>
            <SubmitButton
              title={t('button.submit')}
              uppercase={false}
              onSubmit={handleSubmit(onSubmit)}
              loading={pending}
            />
          </View>

          <View style={styles.cgu}>
            <LinkButton
              title={t('screens.legal')}
              arrow={false}
              colorOption={LinkButtonColors.BLUE}
              onPress={onPressLegal}
              inline={{ fontSize: NEEDS_SMALL_TEXT ? 12 : 15, color: Colors.primary.darkBlue }}
            />
            <LinkButton
              title={t('screens.cgu')}
              arrow={false}
              colorOption={LinkButtonColors.BLUE}
              onPress={onPressCgu}
              inline={{ fontSize: NEEDS_SMALL_TEXT ? 12 : 15, color: Colors.primary.darkBlue }}
            />
            <LinkButton
              title={t('screens.cgu-kyc-provider')}
              arrow={false}
              colorOption={LinkButtonColors.BLUE}
              onPress={onPressCguKycProvider}
              inline={{ fontSize: NEEDS_SMALL_TEXT ? 12 : 15, color: Colors.primary.darkBlue }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    marginTop: 100,
    marginBottom: 100,
  },
  textContainer: {
    marginTop: 16,
    width: '75%',
  },
  text: {
    textAlign: 'justify',
  },
  image: {
    width: HEIGHT * 0.25,
    height: HEIGHT * 0.25,
  },
  buttonContainer: {
    marginVertical: 40,
  },
  cgu: {
    marginBottom: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
