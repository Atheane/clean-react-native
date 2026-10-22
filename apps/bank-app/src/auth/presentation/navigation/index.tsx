import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getLocales } from 'expo-localization';
import Constants from 'expo-constants';

import { WebViewer } from '@clean-rn/ui-mobile';

import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import {
  IAuthStackPages,
  IAuthStackProps,
  ISharedStackPages,
  ISharedStackProps,
} from '../../../shared/presentation/types';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';
import { pdfUrls } from '../../../shared/presentation/constants';

import { Login, ResetPassword } from '../screens';

const locales = getLocales();

const Stack = createNativeStackNavigator<IAuthStackProps & ISharedStackProps>();

export const AuthStack = () => {
  const { t } = useTranslation();
  const navigationStack = useNavigationState((state) => state?.routes ?? []);

  const dispatch = useDispatch();

  const handleError = (error: unknown) => {
    dispatch(showUnknownError(error as Error));
  };

  let lng = locales[0]?.languageCode ?? 'fr';
  if (!Constants.expoConfig?.extra?.SUPPORTED_LANGUAGES_WEBSITE.includes(lng)) {
    lng = 'fr';
  }

  const ScreenLegal = () => <WebViewer uri={pdfUrls(lng).legal} handleError={handleError} />;
  const ScreenCgu = () => <WebViewer uri={pdfUrls(lng).cgu} handleError={handleError} />;
  const ScreenCguKycProvider = () => <WebViewer uri={pdfUrls(lng).cguKycProvider} handleError={handleError} />;

  return (
    <Stack.Navigator>
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
          headerTitle: t('screens.reset-password.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IAuthStackPages.RESET_PASSWORD}
        component={ResetPassword}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.legal`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={ISharedStackPages.LEGAL}
        component={ScreenLegal}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.cgu`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={ISharedStackPages.CGU}
        component={ScreenCgu}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.cgu-kyc-provider`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={ISharedStackPages.CGU_KYC_PROVIDER}
        component={ScreenCguKycProvider}
      />
    </Stack.Navigator>
  );
};
