// import { useCallback } from 'react';
// import { useDispatch } from 'react-redux';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Login,
  ResetPassword,
  SignupEmail,
  // SignupStep2,
  // SignupStep3,
  // SignupStep4,
  // SignupStep5,
  // SignupStep6,
  // SignupStep7,
  // SignupStep8,
  // SignupStep9,
  LegalScreen,
  CguScreen,
} from '../screens';
import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { IAuthStackPages, IAuthStackProps } from '../../../shared/presentation/types';
import { navigate } from '../../../shared/presentation/navigation/navigationRef';

const Stack = createNativeStackNavigator<IAuthStackProps>();

type Props = {
  initRoute: IAuthStackPages;
};

export const AuthStack = (props: Props) => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator initialRouteName={props.initRoute}>
      <Stack.Screen
        options={{
          headerTitle: t(`screens.login.title`),
          ...headersOptions(),
        }}
        name={IAuthStackPages.LOGIN}
        component={Login}
      />
      <Stack.Screen
        options={{
          headerTitle: t('screens.resetPassword.title'),
          ...headersOptions(() => navigate({ route: IAuthStackPages.LOGIN })),
        }}
        name={IAuthStackPages.RESET_PASSWORD}
        component={ResetPassword}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.signup-email.title`),
          ...headersOptions(),
        }}
        name={IAuthStackPages.SIGNUP_EMAIL}
        component={SignupEmail}
      />
      {/* <Stack.Screen
        options={{
          headerTitle: t(`screens.signupstep2.title`),
          ...headersOptions(onPressBackButton(navigateBack)),
        }}
        name={IAuthStackPages.SIGNUP_STEP2}
        component={SignupStep2}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.signupstep3.title`),
          ...headersOptions(onPressBackButton(navigateBack)),
        }}
        name={IAuthStackPages.SIGNUP_STEP3}
        component={SignupStep3}
      />
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
      <Stack.Screen
        options={{
          headerTitle: t(`screens.cgu`),
          ...headersOptions(onPressBackButton(navigateBack)),
        }}
        name={IAuthStackPages.LEGAL}
        component={LegalScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: t(`screens.cguKycProvider`),
          ...headersOptions(onPressBackButton(navigateBack)),
        }}
        name={IAuthStackPages.CGU}
        component={CguScreen}
      /> */}
    </Stack.Navigator>
  );
};
