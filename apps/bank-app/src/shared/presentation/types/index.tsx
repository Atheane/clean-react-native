import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type HeaderTitleAlign = 'center' | 'left' | undefined;

export type IRootStackParamList = {
  MenuHome: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuTransfer: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuCarbon: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuProfile: NavigatorScreenParams<IRootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type IRootTabScreenProps<Screen extends keyof IRootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<IRootTabParamList, Screen>,
  NativeStackScreenProps<IRootStackParamList>
>;

export type IRootTabParamList = {
  MenuHome: undefined;
  MenuTransfer: undefined;
  MenuCarbon: undefined;
  MenuProfile: undefined;
};

export type ISharedStackParamList = {
  ModalError: undefined;
};

export type IAuthStackParamList = {
  Login: undefined;
  ResetPassword: undefined;
  SignupEmail: undefined;
  SignupIdentityPasswordPhone: undefined;
  SignupValidatePhone: undefined;
  SignupBirth: undefined;
  SignupAddress: undefined;
  SignupCongrats: undefined;
  EmailSent: undefined;
  SignupPhone: undefined;
  Legal: undefined;
  Cgu: undefined;
  CguKycProvider: undefined;
  ModalError: undefined;
};

export type IHomeStackParamList = {
  MenuHome: undefined;
  Accounts: undefined;
  Help: undefined;
  Transactions: undefined;
  RestoFlash: undefined;
  Weflo: undefined;
  AccountStatements: undefined;
  AccountStatementsCurrentMonth: undefined;
  AccountStatementsLastThreeMonths: undefined;
  AccountStatementsAll: undefined;
  ExportPdfIban: undefined;
  ModalWebView: undefined;
};

export type ITransferStackParamList = {
  MenuTransfer: undefined;
  Transfer: undefined;
};

export type ICarbonStackParamList = {
  MenuCarbon: undefined;
  Carbon: undefined;
  House: undefined;
  Transport: undefined;
  Food: undefined;
  Fly: undefined;
  WarningFood: undefined;
};

export type IProfileStackParamList = {
  MenuProfile: undefined;
  Profile: undefined;
};

export enum ISharedStackPages {
  MODAL_ERROR = 'ModalError',
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
  SIGNUP_PHONE = 'SignupPhone',
  LEGAL = 'Legal',
  CGU = 'Cgu',
  CGU_KYC_PROVIDER = 'CguKycProvider',
  MODAL_ERROR = 'ModalError',
}

export enum IHomeStackPages {
  MENU = 'MenuHome',
  ACCOUNTS = 'Accounts',
  HELP = 'Help',
  TRANSACTIONS = 'Transactions',
  RESTO_FLASH = 'RestoFlash',
  WEFLO = 'Weflo',
  ACCOUNT_STATEMENTS = 'AccountStatements',
  ACCOUNT_STATEMENTS_CURRENT_MONTH = 'AccountStatementsCurrentMonth',
  ACCOUNT_STATEMENTS_LAST_THREE_MONTHS = 'AccountStatementsLastThreeMonths',
  ACCOUNT_STATEMENTS_ALL = 'AccountStatementsAll',
  EXPORT_PDF_IBAN = 'ExportPdfIban',
  MODAL_WEBVIEW = 'ModalWebview',
}

export enum ITransferStackPages {
  MENU = 'MenuTransfer',
  TRANSFER = 'Transfer',
}

export enum ICarbonStackPages {
  MENU = 'MenuCarbon',
  CARBON = 'Carbon',
  HOUSE = 'House',
  TRANSPORT = 'Transport',
  FOOD = 'Food',
  FLY = 'Fly',
  WARNING_FOOD = 'WarningFood',
}

export enum IProfileStackPage {
  MENU = 'MenuProfile',
  PROFILE = 'Profile',
}

export type ISharedStackProps = { [ISharedStackPages.MODAL_ERROR]: object };

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
  [IAuthStackPages.SIGNUP_PHONE]: object;
  [IAuthStackPages.LEGAL]: object;
  [IAuthStackPages.CGU]: object;
  [IAuthStackPages.CGU_KYC_PROVIDER]: object;
};

export type IHomeStackProps = {
  [IHomeStackPages.MENU]: object;
  [IHomeStackPages.ACCOUNTS]: object;
  [IHomeStackPages.HELP]: object;
  [IHomeStackPages.TRANSACTIONS]: object;
  [IHomeStackPages.ACCOUNT_STATEMENTS]: object;
  [IHomeStackPages.ACCOUNT_STATEMENTS_CURRENT_MONTH]: object;
  [IHomeStackPages.ACCOUNT_STATEMENTS_LAST_THREE_MONTHS]: object;
  [IHomeStackPages.ACCOUNT_STATEMENTS_ALL]: object;
  [IHomeStackPages.EXPORT_PDF_IBAN]: object;
  [IHomeStackPages.RESTO_FLASH]: object;
  [IHomeStackPages.WEFLO]: object;
  [IHomeStackPages.MODAL_WEBVIEW]: object;
};

export type ITransferStackProps = {
  [ITransferStackPages.MENU]: object;
  [ITransferStackPages.TRANSFER]: object;
};

export type ICarbonStackProps = {
  [ICarbonStackPages.MENU]: object;
  [ICarbonStackPages.CARBON]: object;
  [ICarbonStackPages.HOUSE]: object;
  [ICarbonStackPages.TRANSPORT]: object;
  [ICarbonStackPages.FOOD]: object;
  [ICarbonStackPages.FLY]: object;
  [ICarbonStackPages.WARNING_FOOD]: object;
};

export type IProfileStackProps = {
  [IProfileStackPage.MENU]: object;
  [IProfileStackPage.PROFILE]: object;
};

export type IRoutes =
  | ISharedStackPages.MODAL_ERROR
  | IAuthStackPages.LOGIN
  | IAuthStackPages.RESET_PASSWORD
  | IAuthStackPages.SIGNUP_EMAIL
  | IAuthStackPages.SIGNUP_IDENTITY_PASSWORD_PHONE
  | IAuthStackPages.SIGNUP_VALIDATE_PHONE
  | IAuthStackPages.SIGNUP_BIRTH
  | IAuthStackPages.SIGNUP_ADDRESS
  | IAuthStackPages.SIGNUP_CONGRATS
  | IAuthStackPages.EMAIL_SENT
  | IAuthStackPages.SIGNUP_PHONE
  | IAuthStackPages.LEGAL
  | IAuthStackPages.CGU
  | IAuthStackPages.CGU_KYC_PROVIDER
  | IHomeStackPages.ACCOUNTS
  | IHomeStackPages.MENU
  | IHomeStackPages.HELP
  | IHomeStackPages.TRANSACTIONS
  | IHomeStackPages.RESTO_FLASH
  | IHomeStackPages.WEFLO
  | IHomeStackPages.MODAL_WEBVIEW
  | IHomeStackPages.ACCOUNT_STATEMENTS
  | IHomeStackPages.ACCOUNT_STATEMENTS_CURRENT_MONTH
  | IHomeStackPages.ACCOUNT_STATEMENTS_LAST_THREE_MONTHS
  | IHomeStackPages.ACCOUNT_STATEMENTS_ALL
  | IHomeStackPages.EXPORT_PDF_IBAN
  | ITransferStackPages.MENU
  | ITransferStackPages.TRANSFER
  | ICarbonStackPages.MENU
  | ICarbonStackPages.CARBON
  | ICarbonStackPages.HOUSE
  | ICarbonStackPages.TRANSPORT
  | ICarbonStackPages.FOOD
  | ICarbonStackPages.FLY
  | ICarbonStackPages.WARNING_FOOD
  | IProfileStackPage.PROFILE;
