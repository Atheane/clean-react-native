import { useCallback } from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import {
  LinkButton,
  Colors,
  LinkButtonColors,
  FormSignupEmail,
  ISignupEmailFormData,
  useCleanErrorOnFocus,
  SubmitButton,
} from '@clean-rn/ui-mobile';
import { Email } from '@clean-rn/auth/domain';

import { Welcome } from '../assets/images';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';
import { IAuthStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { fetchSearchEmail } from '../../application/commands/signup';

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
        <View style={[styles.container, theme.bank.container.centeredItem]}>
          <Image style={styles.image} source={Welcome} />
          <View style={styles.textContainer}>
            <Text style={[theme.bank.text.darkBlue, styles.text]}>{t('signup-email.text')}</Text>
          </View>
          <FormSignupEmail control={control} errors={errors} error={domainError} onFocus={onFocus} />
          <SubmitButton
            title={t('button.submit')}
            uppercase={false}
            onSubmit={handleSubmit(onSubmit)}
            loading={pending}
          />
          <View style={styles.cgu}>
            <LinkButton
              title={t('screens.legal')}
              arrow={false}
              colorOption={LinkButtonColors.BLUE}
              onPress={onPressLegal}
            />
            <LinkButton
              title={t('screens.cgu')}
              arrow={false}
              colorOption={LinkButtonColors.BLUE}
              onPress={onPressCgu}
            />
            <LinkButton
              title={t('screens.cgu-kyc-provider')}
              arrow={false}
              colorOption={LinkButtonColors.BLUE}
              onPress={onPressCguKycProvider}
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
    height: HEIGHT,
    backgroundColor: Colors.bank.primary.white,
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
  cgu: {
    marginBottom: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
