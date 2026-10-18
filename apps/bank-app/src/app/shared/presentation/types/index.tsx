import { NavigatorScreenParams } from '@react-navigation/native';

export type HeaderTitleAlign = 'center' | 'left' | undefined;

export type RootStackParamList = {
  MenuHome: NavigatorScreenParams<RootTabParamList> | undefined;
  MenuTransfer: NavigatorScreenParams<RootTabParamList> | undefined;
  MenuCarbon: NavigatorScreenParams<RootTabParamList> | undefined;
  MenuProfile: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootTabParamList = {
  MenuHome: undefined;
  MenuTransfer: undefined;
  MenuCarbon: undefined;
  MenuProfile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  ResetPassword: undefined;
  SignupStep1: undefined;
  SignupStep2: undefined;
  SignupStep3: undefined;
  SignupStep4: undefined;
  SignupStep5: undefined;
  SignupStep6: undefined;
  SignupStep7: undefined;
  SignupStep8: undefined;
  SignupStep9: undefined;
  Legal: undefined;
  Cgu: undefined;
};

export enum SHARED_STACK_PAGES {
  MODAL = 'Modal',
  NOT_FOUND = 'NotFound',
}

export enum AUTH_STACK_PAGES {
  LOGIN = 'Login',
  RESET_PASSWORD = 'ResetPassword',
  SIGNUP_STEP1 = 'SignupStep1',
  SIGNUP_STEP2 = 'SignupStep2',
  SIGNUP_STEP3 = 'SignupStep3',
  SIGNUP_STEP4 = 'SignupStep4',
  SIGNUP_STEP5 = 'SignupStep5',
  SIGNUP_STEP6 = 'SignupStep6',
  SIGNUP_STEP7 = 'SignupStep7',
  SIGNUP_STEP8 = 'SignupStep8',
  SIGNUP_STEP9 = 'SignupStep9',
  LEGAL = 'Legal',
  CGU = 'CGU',
}

export type AuthStackProps = {
  [AUTH_STACK_PAGES.LOGIN]: object;
  [AUTH_STACK_PAGES.RESET_PASSWORD]: object;
  [AUTH_STACK_PAGES.SIGNUP_STEP1]: object;
  [AUTH_STACK_PAGES.SIGNUP_STEP2]: object;
  [AUTH_STACK_PAGES.SIGNUP_STEP3]: object;
  [AUTH_STACK_PAGES.SIGNUP_STEP4]: object;
  [AUTH_STACK_PAGES.SIGNUP_STEP5]: object;
  [AUTH_STACK_PAGES.SIGNUP_STEP6]: object;
  [AUTH_STACK_PAGES.SIGNUP_STEP7]: object;
  [AUTH_STACK_PAGES.SIGNUP_STEP8]: object;
  [AUTH_STACK_PAGES.SIGNUP_STEP9]: object;
  [AUTH_STACK_PAGES.LEGAL]: object;
  [AUTH_STACK_PAGES.CGU]: object;
};

export type Routes = SHARED_STACK_PAGES.MODAL | SHARED_STACK_PAGES.NOT_FOUND;
