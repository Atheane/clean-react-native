import { NavigatorScreenParams } from '@react-navigation/native';
import { IAuthStackPages } from '../../application/types';

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

export type IAuthStackProps = {
  [IAuthStackPages.LOGIN]: object;
  [IAuthStackPages.RESET_PASSWORD]: object;
  [IAuthStackPages.SIGNUP_STEP1]: object;
  [IAuthStackPages.SIGNUP_STEP2]: object;
  [IAuthStackPages.SIGNUP_STEP3]: object;
  [IAuthStackPages.SIGNUP_STEP4]: object;
  [IAuthStackPages.SIGNUP_STEP5]: object;
  [IAuthStackPages.SIGNUP_STEP6]: object;
  [IAuthStackPages.SIGNUP_STEP7]: object;
  [IAuthStackPages.SIGNUP_STEP8]: object;
  [IAuthStackPages.SIGNUP_STEP9]: object;
  [IAuthStackPages.LEGAL]: object;
  [IAuthStackPages.CGU]: object;
};
