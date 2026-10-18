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
  SignupEmail: undefined;
  // SignupStep2: undefined;
  // SignupStep3: undefined;
  // SignupStep4: undefined;
  // SignupStep5: undefined;
  // SignupStep6: undefined;
  // SignupStep7: undefined;
  // SignupStep8: undefined;
  // SignupStep9: undefined;
  Legal: undefined;
  Cgu: undefined;
};

export enum ISharedStackPages {
  MODAL = 'Modal',
  NOT_FOUND = 'NotFound',
}

export enum IAuthStackPages {
  LOGIN = 'Login',
  RESET_PASSWORD = 'ResetPassword',
  SIGNUP_EMAIL = 'SignupStep1',
  // SIGNUP_STEP2 = 'SignupStep2',
  // SIGNUP_STEP3 = 'SignupStep3',
  // SIGNUP_STEP4 = 'SignupStep4',
  // SIGNUP_STEP5 = 'SignupStep5',
  // SIGNUP_STEP6 = 'SignupStep6',
  // SIGNUP_STEP7 = 'SignupStep7',
  // SIGNUP_STEP8 = 'SignupStep8',
  // SIGNUP_STEP9 = 'SignupStep9',
  LEGAL = 'Legal',
  CGU = 'CGU',
}

export type IAuthStackProps = {
  [IAuthStackPages.LOGIN]: object;
  [IAuthStackPages.RESET_PASSWORD]: object;
  [IAuthStackPages.SIGNUP_EMAIL]: object;
  // [IAuthStackPages.SIGNUP_STEP2]: object;
  // [IAuthStackPages.SIGNUP_STEP3]: object;
  // [IAuthStackPages.SIGNUP_STEP4]: object;
  // [IAuthStackPages.SIGNUP_STEP5]: object;
  // [IAuthStackPages.SIGNUP_STEP6]: object;
  // [IAuthStackPages.SIGNUP_STEP7]: object;
  // [IAuthStackPages.SIGNUP_STEP8]: object;
  // [IAuthStackPages.SIGNUP_STEP9]: object;
  [IAuthStackPages.LEGAL]: object;
  [IAuthStackPages.CGU]: object;
};

export type IRoutes = IAuthStackPages.LOGIN | IAuthStackPages.RESET_PASSWORD | IAuthStackPages.SIGNUP_EMAIL;
// | IAuthStackPages.SIGNUP_STEP2
// | IAuthStackPages.SIGNUP_STEP3
// | IAuthStackPages.SIGNUP_STEP4
// | IAuthStackPages.SIGNUP_STEP5
// | IAuthStackPages.SIGNUP_STEP6
// | IAuthStackPages.SIGNUP_STEP7
// | IAuthStackPages.SIGNUP_STEP8
// | IAuthStackPages.SIGNUP_STEP9
// | IAuthStackPages.LEGAL
// | IAuthStackPages.CGU;
// | HOME_STACK_PAGES.MENU
// | HOME_STACK_PAGES.HOME
// | HOME_STACK_PAGES.HELP
// | HOME_STACK_PAGES.ACCOUNT
// | HOME_STACK_PAGES.RESTO_FLASH
// | HOME_STACK_PAGES.WEFLO
// | HOME_STACK_PAGES.ACCOUNT_STATEMENTS
// | HOME_STACK_PAGES.ACCOUNT_STATEMENTS_CURRENT_MONTH
// | HOME_STACK_PAGES.ACCOUNT_STATEMENTS_LAST_THREE_MONTHS
// | HOME_STACK_PAGES.ACCOUNT_STATEMENTS_ALL
// | HOME_STACK_PAGES.EXPORT_PDF_IBAN
// | TRANSFER_STACK_PAGES.MENU
// | TRANSFER_STACK_PAGES.TRANSFER
// | CARBON_STACK_PAGES.MENU
// | CARBON_STACK_PAGES.CARBON
// | CARBON_STACK_PAGES.HOUSE
// | CARBON_STACK_PAGES.TRANSPORT
// | CARBON_STACK_PAGES.FOOD
// | CARBON_STACK_PAGES.FLY
// | CARBON_STACK_PAGES.WARNING_FOOD
// | PROFILE_STACK_PAGES.PROFILE;
