import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Login,
  ResetPassword,
  SignupEmail,
  SignupIdentityPasswordPhone,
  SignupValidatePhone,
  SignupBirth,
  SignupAddress,
  LegalScreen,
  CguScreen,
} from '../screens';
import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { IAuthStackPages, IAuthStackProps } from '../../../shared/presentation/types';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

const Stack = createNativeStackNavigator<IAuthStackProps>();

export const AuthStack = () => {
  const { t } = useTranslation();
  const { initRouteName } = useSelector((state: IRootState) => state.initialization);
  const navigationStack = useNavigationState((state) => state?.routes ?? []);
  return (
    <Stack.Navigator initialRouteName={initRouteName}>
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
          headerTitle: navigationStack.length > 1 ? t(`screens.signup-email.title`) : undefined,
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
          headerTitle: t(`screens.cgu`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IAuthStackPages.LEGAL}
        component={LegalScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.cguKycProvider`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
        name={IAuthStackPages.CGU}
        component={CguScreen}
      />
      {/*

      <Stack.Screen
        options={{
          headerTitle: t(`screens.signupstep4.title`),
          ...headersOptions(onPressBackButton(navigateBack)),
        }}
        name={IAuthStackPages.SIGNUP_STEP4}
        component={SignupStep4}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.signupstep5.title`),
          ...headersOptions(onPressBackButton(navigateBack)),
        }}
        name={IAuthStackPages.SIGNUP_STEP5}
        component={SignupStep5}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.signupstep6.title`),
          ...headersOptions(onPressBackButton(navigateBack)),
        }}
        name={IAuthStackPages.SIGNUP_STEP6}
        component={SignupStep6}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.signupstep7.title`),
          ...headersOptions(onPressBackButton(navigateBack)),
          headerTitleStyle: {
            ...headersOptions(onPressBackButton(navigateBack)).headerTitleStyle,
            fontSize: 18,
          },
        }}
        name={IAuthStackPages.SIGNUP_STEP7}
        component={SignupStep7}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.signupstep8.title`),
          ...headersOptions(onPressBackButton(navigateBack)),
        }}
        name={IAuthStackPages.SIGNUP_STEP8}
        component={SignupStep8}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.signupstep9.title`),
          ...headersOptions(onPressBackButton(navigateBack)),
        }}
        name={IAuthStackPages.SIGNUP_STEP9}
        component={SignupStep9}
      />
      */}
    </Stack.Navigator>
  );
};
