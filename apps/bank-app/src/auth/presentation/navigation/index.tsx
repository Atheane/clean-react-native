import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getLocales } from 'expo-localization';

import { ModalError, WebViewer } from '@clean-rn/ui-mobile';

import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import {
  IAuthStackPages,
  IAuthStackProps,
  ISharedStackPages,
  ISharedStackProps,
} from '../../../shared/presentation/types';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { initGlobalError } from '../../../shared/application/commands/manage-global-errors';
import { ScreenModalError } from '../../../shared/presentation/screens';

import { pdfUrls } from '../constants';
import {
  Login,
  ResetPassword,
  SignupEmail,
  SignupIdentityPasswordPhone,
  SignupValidatePhone,
  SignupBirth,
  SignupAddress,
  SignupCongrats,
  EmailSent,
  SignupPhone,
} from '../screens';

const locales = getLocales();

const Stack = createNativeStackNavigator<IAuthStackProps & ISharedStackProps>();

export const AuthStack = () => {
  const { t } = useTranslation();
  const { initRouteName } = useSelector((state: IRootState) => state.initialization);
  const navigationStack = useNavigationState((state) => state?.routes ?? []);

  const [unknownError, setUnknownError] = useState<Error>();

  const handleError = (error: unknown) => {
    setUnknownError(error as Error);
  };

  const lng = locales[0]?.languageCode ?? 'en';

  const ScreenLegal = () => <WebViewer uri={pdfUrls(lng).legal} handleError={handleError} />;
  const ScreenCgu = () => <WebViewer uri={pdfUrls(lng).cgu} handleError={handleError} />;
  const ScreenCguKycProvider = () => <WebViewer uri={pdfUrls(lng).cguKycProvider} handleError={handleError} />;

  const dispatch = useDispatch();
  useEffect(() => {
    const isModalErrorInStack = navigationStack.find((route) => route.name === ISharedStackPages.MODAL_ERROR);
    if (!isModalErrorInStack) {
      dispatch(initGlobalError());
    }
  }, [navigationStack, dispatch]);

  return (
    <Stack.Navigator initialRouteName={initRouteName as keyof IAuthStackProps}>
      <Stack.Screen
        options={{
          headerTitle: t(`screens.login.title`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IAuthStackPages.LOGIN}
        component={Login}
      />
      <Stack.Screen
        options={{
          headerTitle: t('screens.reset-password.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IAuthStackPages.RESET_PASSWORD}
        component={ResetPassword}
      />
      <Stack.Screen
        options={{
          headerTitle: navigationStack.length > 1 ? t(`screens.signup-email.title`) : '',
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IAuthStackPages.SIGNUP_EMAIL}
        component={SignupEmail}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.signup-identity.title`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IAuthStackPages.SIGNUP_IDENTITY_PASSWORD_PHONE}
        component={SignupIdentityPasswordPhone}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.signup-validate-phone.title`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IAuthStackPages.SIGNUP_VALIDATE_PHONE}
        component={SignupValidatePhone}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.signup-birth.title`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IAuthStackPages.SIGNUP_BIRTH}
        component={SignupBirth}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.signup-address.title`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IAuthStackPages.SIGNUP_ADDRESS}
        component={SignupAddress}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.signup-congrats.title`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IAuthStackPages.SIGNUP_CONGRATS}
        component={SignupCongrats}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.email-sent.title`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IAuthStackPages.EMAIL_SENT}
        component={EmailSent}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.signup-phone.title`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IAuthStackPages.SIGNUP_PHONE}
        component={SignupPhone}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.legal`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IAuthStackPages.LEGAL}
        component={unknownError ? () => <ModalError error={unknownError} /> : ScreenLegal}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.cgu`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IAuthStackPages.CGU}
        component={unknownError ? () => <ModalError error={unknownError} /> : ScreenCgu}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.cgu-kyc-provider`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IAuthStackPages.CGU_KYC_PROVIDER}
        component={unknownError ? () => <ModalError error={unknownError} /> : ScreenCguKycProvider}
      />
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerShown: false,
          headerBackVisible: false,
        }}
        name={ISharedStackPages.MODAL_ERROR}
        component={ScreenModalError}
      />
    </Stack.Navigator>
  );
};
