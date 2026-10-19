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
  SignupBirth: undefined;
  SignupAddress: undefined;
  SignupCongrats: undefined;
  EmailSent: undefined;
  ValidatePhone: undefined;
  Legal: undefined;
  Cgu: undefined;
  CguKycProvider: undefined;
  ModalError: undefined;
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
  SIGNUP_BIRTH = 'SignupBirth',
  SIGNUP_ADDRESS = 'SignupAddress',
  SIGNUP_CONGRATS = 'SignupCongrats',
  EMAIL_SENT = 'EmailSent',
  VALIDATE_PHONE = 'ValidatePhone',
  LEGAL = 'Legal',
  CGU = 'Cgu',
  CGU_KYC_PROVIDER = 'CguKycProvider',
  MODAL_ERROR = 'ModalError',
}

export enum IHomeStackPages {
  HOME = 'Home',
}

export type IAuthStackProps = {
  [IAuthStackPages.LOGIN]: object;
  [IAuthStackPages.RESET_PASSWORD]: object;
  [IAuthStackPages.SIGNUP_EMAIL]: object;
  [IAuthStackPages.SIGNUP_IDENTITY_PASSWORD_PHONE]: object;
  [IAuthStackPages.SIGNUP_VALIDATE_PHONE]: object;
  [IAuthStackPages.SIGNUP_BIRTH]: object;
  [IAuthStackPages.SIGNUP_ADDRESS]: object;
  [IAuthStackPages.SIGNUP_CONGRATS]: object;
  [IAuthStackPages.EMAIL_SENT]: object;
  [IAuthStackPages.VALIDATE_PHONE]: object;
  [IAuthStackPages.LEGAL]: object;
  [IAuthStackPages.CGU]: object;
  [IAuthStackPages.CGU_KYC_PROVIDER]: object;
  [IAuthStackPages.MODAL_ERROR]: object;
};

export type IHomeStackProps = {
  [IHomeStackPages.HOME]: object;
};

export type IRoutes =
  | IAuthStackPages.LOGIN
  | IAuthStackPages.RESET_PASSWORD
  | IAuthStackPages.SIGNUP_EMAIL
  | IAuthStackPages.SIGNUP_IDENTITY_PASSWORD_PHONE
  | IAuthStackPages.SIGNUP_VALIDATE_PHONE
  | IAuthStackPages.SIGNUP_BIRTH
  | IAuthStackPages.SIGNUP_ADDRESS
  | IAuthStackPages.SIGNUP_CONGRATS
  | IAuthStackPages.EMAIL_SENT
  | IAuthStackPages.VALIDATE_PHONE
  | IAuthStackPages.LEGAL
  | IAuthStackPages.CGU
  | IAuthStackPages.CGU_KYC_PROVIDER
  | IAuthStackPages.MODAL_ERROR
  | IHomeStackPages.HOME;
// | HOME_STACK_PAGES.MENU
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
