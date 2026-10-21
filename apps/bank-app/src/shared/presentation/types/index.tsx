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
  MenuKyc: undefined;
};

export type ISharedStackParamList = {
  ModalError: undefined;
  ModalWebView: undefined;
  Legal: undefined;
  Cgu: undefined;
  CguKycProvider: undefined;
};

export type IAuthStackParamList = {
  Login: undefined;
  ResetPassword: undefined;
};

export type IUserStackParamList = {
  SignupEmail: undefined;
  SignupIdentityPasswordPhone: undefined;
  SignupValidatePhone: undefined;
  SignupBirth: undefined;
  SignupAddress: undefined;
  SignupCongrats: undefined;
  EmailSent: undefined;
  SignupPhone: undefined;
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
  MenuKyc: undefined;
  InitKyc: undefined;
  Kyc: undefined;
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
  LEGAL = 'Legal',
  CGU = 'Cgu',
  CGU_KYC_PROVIDER = 'CguKycProvider',
}

export enum IAuthStackPages {
  LOGIN = 'Login',
  RESET_PASSWORD = 'ResetPassword',
}

export enum IUserStackPages {
  SIGNUP_EMAIL = 'SignupEmail',
  SIGNUP_IDENTITY_PASSWORD_PHONE = 'SignupIdentityPasswordPhone',
  SIGNUP_VALIDATE_PHONE = 'SignupValidatePhone',
  SIGNUP_BIRTH = 'SignupBirth',
  SIGNUP_ADDRESS = 'SignupAddress',
  SIGNUP_CONGRATS = 'SignupCongrats',
  EMAIL_SENT = 'EmailSent',
  SIGNUP_PHONE = 'SignupPhone',
}

export enum IHomeStackPages {
  MENU = 'MenuHome',
  HOME = 'Home',
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
  MENU = 'MenuKyc',
  INIT = 'InitKyc',
  KYC = 'Kyc',
  DOCUMENTS_VALIDATED = 'KycDocumentsValidated',
  SUCCESS = 'SuccessKyc',
  CARD_SENT = 'CardSent',
  UPLOAD_DOCUMENT = 'UploadDocument',
  ID_LIST = 'IdList',
  RESIDENCE_PROOF_OPTIONS = 'ResidenceProofOptions',
  RESIDENCE_PROOF_LIST = 'ResidenceProofList',
  KYC_HOST = 'KycHost',
  HOST_ID_LIST = 'HostIdList',
  HOST_RESIDENCE_PROOF_LIST = 'HostResidenceProofList',
}

export enum ITransferStackPages {
  MENU = 'MenuTransfer',
  TRANSFER = 'Transfer',
}

export enum IProfileStackPages {
  MENU = 'MenuProfile',
  PROFILE = 'Profile',
  NOTIFICATON_SETTINGS = 'NotificationSettings',
}

export type ISharedStackProps = {
  [ISharedStackPages.MODAL_ERROR]: object;
  [ISharedStackPages.MODAL_WEBVIEW]: object;
  [ISharedStackPages.LEGAL]: object;
  [ISharedStackPages.CGU]: object;
  [ISharedStackPages.CGU_KYC_PROVIDER]: object;
};

export type IAuthStackProps = {
  [IAuthStackPages.LOGIN]: object;
  [IAuthStackPages.RESET_PASSWORD]: object;
};

export type IUserStackProps = {
  [IUserStackPages.SIGNUP_EMAIL]: object;
  [IUserStackPages.SIGNUP_IDENTITY_PASSWORD_PHONE]: object;
  [IUserStackPages.SIGNUP_VALIDATE_PHONE]: object;
  [IUserStackPages.SIGNUP_BIRTH]: object;
  [IUserStackPages.SIGNUP_ADDRESS]: object;
  [IUserStackPages.SIGNUP_CONGRATS]: object;
  [IUserStackPages.EMAIL_SENT]: object;
  [IUserStackPages.SIGNUP_PHONE]: object;
};

export type IHomeStackProps = {
  [IHomeStackPages.HOME]: object;
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
  [IKycStackPages.MENU]: object;
  [IKycStackPages.INIT]: object;
  [IKycStackPages.KYC]: object;
  [IKycStackPages.DOCUMENTS_VALIDATED]: object;
  [IKycStackPages.SUCCESS]: object;
  [IKycStackPages.CARD_SENT]: object;
  [IKycStackPages.UPLOAD_DOCUMENT]: object;
  [IKycStackPages.ID_LIST]: object;
  [IKycStackPages.RESIDENCE_PROOF_OPTIONS]: object;
  [IKycStackPages.RESIDENCE_PROOF_LIST]: object;
  [IKycStackPages.KYC_HOST]: object;
  [IKycStackPages.HOST_ID_LIST]: object;
  [IKycStackPages.HOST_RESIDENCE_PROOF_LIST]: object;
};

export type ITransferStackProps = {
  [ITransferStackPages.MENU]: object;
  [ITransferStackPages.TRANSFER]: object;
};

export type IProfileStackProps = {
  [IProfileStackPages.MENU]: object;
  [IProfileStackPages.PROFILE]: object;
  [IProfileStackPages.NOTIFICATON_SETTINGS]: object;
};

export type IRoutes =
  | ISharedStackPages.MODAL_ERROR
  | ISharedStackPages.MODAL_WEBVIEW
  | ISharedStackPages.LEGAL
  | ISharedStackPages.CGU
  | ISharedStackPages.CGU_KYC_PROVIDER
  | IAuthStackPages.LOGIN
  | IAuthStackPages.RESET_PASSWORD
  | IUserStackPages.SIGNUP_EMAIL
  | IUserStackPages.SIGNUP_IDENTITY_PASSWORD_PHONE
  | IUserStackPages.SIGNUP_VALIDATE_PHONE
  | IUserStackPages.SIGNUP_BIRTH
  | IUserStackPages.SIGNUP_ADDRESS
  | IUserStackPages.SIGNUP_CONGRATS
  | IUserStackPages.EMAIL_SENT
  | IUserStackPages.SIGNUP_PHONE
  | IHomeStackPages.ACCOUNTS
  | IHomeStackPages.HOME
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
  | IKycStackPages.MENU
  | IKycStackPages.INIT
  | IKycStackPages.KYC
  | IKycStackPages.DOCUMENTS_VALIDATED
  | IKycStackPages.SUCCESS
  | IKycStackPages.CARD_SENT
  | IKycStackPages.UPLOAD_DOCUMENT
  | IKycStackPages.ID_LIST
  | IKycStackPages.RESIDENCE_PROOF_OPTIONS
  | IKycStackPages.RESIDENCE_PROOF_LIST
  | IKycStackPages.KYC_HOST
  | IKycStackPages.HOST_ID_LIST
  | IKycStackPages.HOST_RESIDENCE_PROOF_LIST
  | ITransferStackPages.TRANSFER
  | IProfileStackPages.MENU
  | IProfileStackPages.PROFILE
  | IProfileStackPages.NOTIFICATON_SETTINGS;
