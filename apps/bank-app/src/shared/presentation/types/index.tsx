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
  ModalWebView: undefined;
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
  AccountStatementsPdf: undefined;
  RibPdf: undefined;
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

export type IKycStackParamList = {
  InitKyc: undefined;
  MenuKyc: undefined;
  SuccessKyc: undefined;
  CardSent: undefined;
};

export type ITransferStackParamList = {
  MenuTransfer: undefined;
  Transfer: undefined;
};

export type IProfileStackParamList = {
  MenuProfile: undefined;
  Profile: undefined;
};

export enum ISharedStackPages {
  MODAL_ERROR = 'ModalError',
  MODAL_WEBVIEW = 'ModalWebview',
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
  ACCOUNT_STATEMENTS_PDF = 'AccountStatementsPdf',
  RIB_PDF = 'RibPdf',
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

export enum IKycStackPages {
  INIT = 'InitKyc',
  MENU = 'MenuKyc',
  SUCCESS = 'SuccessKyc',
  CARD_SENT = 'CardSent',
  UPLOAD_DOCUMENT = 'UploadDocument',
  FIRST_ID_LIST = 'FirstIdList',
  SECOND_ID_LIST = 'SecondIdList',
  RESIDENCE_PROOF_OPTIONS = 'ResidenceProofOptions',
  RESIDENCE_PROOF_LIST = 'ResidenceProofList',
  HOSTED_LIST = 'HostedList',
}

export enum ITransferStackPages {
  MENU = 'MenuTransfer',
  TRANSFER = 'Transfer',
}

export enum IProfileStackPage {
  MENU = 'MenuProfile',
  PROFILE = 'Profile',
}

export type ISharedStackProps = {
  [ISharedStackPages.MODAL_ERROR]: object;
  [ISharedStackPages.MODAL_WEBVIEW]: object;
};

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
  [IHomeStackPages.ACCOUNT_STATEMENTS_PDF]: object;
  [IHomeStackPages.RIB_PDF]: object;
  [IHomeStackPages.RESTO_FLASH]: object;
  [IHomeStackPages.WEFLO]: object;
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

export type IKycStackProps = {
  [IKycStackPages.INIT]: object;
  [IKycStackPages.MENU]: object;
  [IKycStackPages.SUCCESS]: object;
  [IKycStackPages.CARD_SENT]: object;
  [IKycStackPages.UPLOAD_DOCUMENT]: object;
  [IKycStackPages.FIRST_ID_LIST]: object;
  [IKycStackPages.SECOND_ID_LIST]: object;
  [IKycStackPages.RESIDENCE_PROOF_OPTIONS]: object;
  [IKycStackPages.RESIDENCE_PROOF_LIST]: object;
  [IKycStackPages.HOSTED_LIST]: object;
};

export type ITransferStackProps = {
  [ITransferStackPages.MENU]: object;
  [ITransferStackPages.TRANSFER]: object;
};

export type IProfileStackProps = {
  [IProfileStackPage.MENU]: object;
  [IProfileStackPage.PROFILE]: object;
};

export type IRoutes =
  | ISharedStackPages.MODAL_ERROR
  | ISharedStackPages.MODAL_WEBVIEW
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
  | IHomeStackPages.ACCOUNT_STATEMENTS
  | IHomeStackPages.ACCOUNT_STATEMENTS_PDF
  | IHomeStackPages.RIB_PDF
  | ICarbonStackPages.MENU
  | ICarbonStackPages.CARBON
  | ICarbonStackPages.HOUSE
  | ICarbonStackPages.TRANSPORT
  | ICarbonStackPages.FOOD
  | ICarbonStackPages.FLY
  | ICarbonStackPages.WARNING_FOOD
  | IKycStackPages.INIT
  | IKycStackPages.MENU
  | IKycStackPages.SUCCESS
  | IKycStackPages.CARD_SENT
  | IKycStackPages.UPLOAD_DOCUMENT
  | IKycStackPages.FIRST_ID_LIST
  | IKycStackPages.SECOND_ID_LIST
  | IKycStackPages.RESIDENCE_PROOF_OPTIONS
  | IKycStackPages.RESIDENCE_PROOF_LIST
  | IKycStackPages.HOSTED_LIST
  | ITransferStackPages.TRANSFER
  | IProfileStackPage.PROFILE;
