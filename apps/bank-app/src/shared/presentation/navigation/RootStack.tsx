import { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { getLocales } from 'expo-localization';

import { LinkButton, LinkButtonColors, OffBlueGradient, WebViewer } from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import {
  IAuthStackPages,
  IAuthStackProps,
  ISharedStackPages,
  ISharedStackProps,
  IUserStackPages,
  IUserStackProps,
} from '../../../shared/presentation/types';
import { initGlobalError, showUnknownError } from '../../../shared/application/commands/manage-global-errors';
import { ScreenModalError, ScreenModalWebview } from '../../../shared/presentation/screens';
import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';

import { Login, ResetPassword } from '../../../auth/presentation/screens';

import { BottomTabNavigator } from './BottomNavigator';
import {
  SignupEmail,
  SignupIdentityPasswordPhone,
  SignupValidatePhone,
  SignupBirth,
  SignupAddress,
  EmailSent,
  SignupPhone,
  SignupCongrats,
} from '../../../user/presentation/screens';
import { CguPdf } from '../../../shared/presentation/screens';

import { SUPPORTED_LANGUAGES_WEBSITE, pdfUrls } from '../../../shared/presentation/constants';
import { IStoreKey } from '../../../shared/application/types';

const locales = getLocales();

export const RootStack = () => {
  const {
    auth: { accessToken },
  } = useSelector((state: IRootState) => state.auth);
  return accessToken ? <HomeStack /> : <AuthStack />;
};

const Stack = createNativeStackNavigator<ISharedStackProps & IAuthStackProps & IUserStackProps>();

export const HomeStack = () => {
  const navigationStack = useNavigationState((state) => state?.routes ?? []);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  useEffect(() => {
    const isModalErrorInStack = navigationStack.find((route) => route.name === ISharedStackPages.MODAL_ERROR);
    if (!isModalErrorInStack) {
      dispatch(initGlobalError());
    }
  }, [navigationStack, dispatch]);

  const handleError = (error: unknown) => {
    dispatch(showUnknownError(error as Error));
  };

  let lng = locales[0]?.languageCode ?? 'fr';
  if (!SUPPORTED_LANGUAGES_WEBSITE.includes(lng)) {
    lng = 'fr';
  }

  const ScreenLegal = () => <WebViewer uri={pdfUrls(lng).legal} handleError={handleError} />;
  const ScreenCguKycProvider = () => <WebViewer uri={pdfUrls(lng).cguKycProvider} handleError={handleError} />;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={IUserStackPages.SIGNUP_CONGRATS}
        component={SignupCongrats}
        options={{
          headerTitle: t(`screens.signup-congrats.title`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={ISharedStackPages.HOME}
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{
          headerTitle: t('screens.login.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IAuthStackPages.LOGIN}
        component={Login}
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
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerShown: false,
          headerBackVisible: false,
        }}
        name={ISharedStackPages.MODAL_WEBVIEW}
        component={ScreenModalWebview}
      />
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerTitle: t(`screens.legal`),
          ...headersOptions(),
        }}
        name={ISharedStackPages.LEGAL}
        component={ScreenLegal}
      />
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerTitle: t(`screens.cgu`),
          ...headersOptions(),
        }}
        name={ISharedStackPages.CGU}
        component={CguPdf}
      />
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerTitle: t(`screens.cgu-kyc-provider`),
          ...headersOptions(),
        }}
        name={ISharedStackPages.CGU_KYC_PROVIDER}
        component={ScreenCguKycProvider}
      />
    </Stack.Navigator>
  );
};

export const AuthStack = () => {
  const navigationStack = useNavigationState((state) => state?.routes ?? []);
  const { t } = useTranslation();
  const { initRouteName } = useSelector((state: IRootState) => state.initialization);

  const dispatch = useDispatch();
  useEffect(() => {
    const isModalErrorInStack = navigationStack.find((route) => route.name === ISharedStackPages.MODAL_ERROR);
    if (!isModalErrorInStack) {
      dispatch(initGlobalError());
    }
  }, [navigationStack, dispatch]);

  const handleError = (error: unknown) => {
    dispatch(showUnknownError(error as Error));
  };

  let lng = locales[0]?.languageCode ?? 'fr';
  if (!SUPPORTED_LANGUAGES_WEBSITE.includes(lng)) {
    lng = 'fr';
  }

  const ScreenLegal = () => <WebViewer uri={pdfUrls(lng).legal} handleError={handleError} />;
  const ScreenCguKycProvider = () => <WebViewer uri={pdfUrls(lng).cguKycProvider} handleError={handleError} />;

  const navigation = useNavigation();
  const onPressEmptyStorage = () => {
    AsyncStorage.multiRemove([
      IStoreKey.USER_EMAIL,
      IStoreKey.DEVICE_ID,
      IStoreKey.HOUSE_EMISSION,
      IStoreKey.AVERAGE_HOUSE_EMISSION,
      IStoreKey.TRANSPORT_EMISSION,
      IStoreKey.AVERAGE_TRANSPORT_EMISSION,
      IStoreKey.FOOD_EMISSION,
      IStoreKey.AVERAGE_FOOD_EMISSION,
      IStoreKey.FLY_EMISSION,
      IStoreKey.AVERAGE_FLY_EMISSION,
      IStoreKey.CUSTOMER_STATUS,
    ]);
    navigation.navigate(IUserStackPages.SIGNUP_EMAIL as never);
  };

  return (
    <Stack.Navigator
      initialRouteName={initRouteName as keyof IUserStackProps | keyof ISharedStackProps | undefined}
    >
      <Stack.Screen
        options={
          process.env.EXPO_PUBLIC_NODE_ENV === 'development'
            ? {
                headerTitle: t('screens.login.title'),
                ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
                headerRight: () => (
                  <View style={{ position: 'relative', top: -6 }}>
                    <LinkButton
                      iconLeft={() => <OffBlueGradient width={28} height={28} />}
                      colorOption={LinkButtonColors.BLUE}
                      onPress={onPressEmptyStorage}
                    />
                  </View>
                ),
              }
            : {
                headerTitle: t('screens.login.title'),
                ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
              }
        }
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
        name={IUserStackPages.SIGNUP_EMAIL}
        component={SignupEmail}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.signup-identity.title`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IUserStackPages.SIGNUP_IDENTITY_PASSWORD_PHONE}
        component={SignupIdentityPasswordPhone}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.signup-validate-phone.title`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IUserStackPages.SIGNUP_VALIDATE_PHONE}
        component={SignupValidatePhone}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.signup-birth.title`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IUserStackPages.SIGNUP_BIRTH}
        component={SignupBirth}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.signup-address.title`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IUserStackPages.SIGNUP_ADDRESS}
        component={SignupAddress}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.email-sent.title`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IUserStackPages.EMAIL_SENT}
        component={EmailSent}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.signup-phone.title`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IUserStackPages.SIGNUP_PHONE}
        component={SignupPhone}
      />
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerTitle: t(`screens.legal`),
          ...headersOptions(),
        }}
        name={ISharedStackPages.LEGAL}
        component={ScreenLegal}
      />
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerTitle: t(`screens.cgu`),
          ...headersOptions(),
        }}
        name={ISharedStackPages.CGU}
        component={CguPdf}
      />
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerTitle: t(`screens.cgu-kyc-provider`),
          ...headersOptions(),
        }}
        name={ISharedStackPages.CGU_KYC_PROVIDER}
        component={ScreenCguKycProvider}
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
