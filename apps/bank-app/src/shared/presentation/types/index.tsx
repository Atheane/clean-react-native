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
  SignupIdentityPasswordPhone: undefined;
  SignupValidatePhone: undefined;
  SignupRegisterBirth: undefined;
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
  SIGNUP_EMAIL = 'SignupEmail',
  SIGNUP_IDENTITY_PASSWORD_PHONE = 'SignupIdentityPasswordPhone',
  SIGNUP_VALIDATE_PHONE = 'SignupValidatePhone',
  SIGNUP_REGISTER_BIRTH = 'SignupRegisterBirth',
  LEGAL = 'Legal',
  CGU = 'CGU',
}

export type IAuthStackProps = {
  [IAuthStackPages.LOGIN]: object;
  [IAuthStackPages.RESET_PASSWORD]: object;
  [IAuthStackPages.SIGNUP_EMAIL]: object;
  [IAuthStackPages.SIGNUP_IDENTITY_PASSWORD_PHONE]: object;
  [IAuthStackPages.SIGNUP_VALIDATE_PHONE]: object;
  [IAuthStackPages.SIGNUP_REGISTER_BIRTH]: object;
  [IAuthStackPages.LEGAL]: object;
  [IAuthStackPages.CGU]: object;
};

export type IRoutes =
  | IAuthStackPages.LOGIN
  | IAuthStackPages.RESET_PASSWORD
  | IAuthStackPages.SIGNUP_EMAIL
  | IAuthStackPages.SIGNUP_IDENTITY_PASSWORD_PHONE
  | IAuthStackPages.SIGNUP_VALIDATE_PHONE
  | IAuthStackPages.SIGNUP_REGISTER_BIRTH
  | IAuthStackPages.LEGAL
  | IAuthStackPages.CGU;
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
