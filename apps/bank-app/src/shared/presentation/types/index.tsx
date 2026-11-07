import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type HeaderTitleAlign = 'center' | 'left' | undefined;

export type IRootStackParamList = {
  MenuHome: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuAccount: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuTransaction: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuBeneficiary: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuCarbon: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuParameters: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuKyc: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuCard: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuEnergy: NavigatorScreenParams<IRootTabParamList> | undefined;
  ModalError: undefined;
  ModalWebView: undefined;
  Legal: undefined;
  Cgu: undefined;
  CguKycProvider: undefined;
};

export type IRootTabScreenProps<Screen extends keyof IRootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<IRootTabParamList, Screen>,
  NativeStackScreenProps<IRootStackParamList>
>;

export type IRootTabParamList = {
  MenuHome: undefined;
  MenuAccount: undefined;
  MenuTransaction: undefined;
  MenuBeneficiary: undefined;
  MenuFootprint: undefined;
  MenuParameters: undefined;
  MenuTransfer: undefined;
  MenuKyc: undefined;
  MenuCard: undefined;
  MenuEnergy: undefined;
};

export type ISharedStackParamList = {
  Home: undefined;
  Deeplink: undefined;
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
  SignupRevenues: undefined;
};

export type IAccountStackParamList = {
  MenuAccount: undefined;
  Accounts: undefined;
  RibPdf: undefined;
};

export type ITransactionStackParamList = {
  MenuTransaction: undefined;
  Transactions: undefined;
  AccountStatements: undefined;
  AccountStatementsPdf: undefined;
};

export type IFootprintStackParamList = {
  MenuFootprint: undefined;
  FootprintEstimation: undefined;
  HeaterFootprintEstimation: undefined;
  TransportFootprintEstimation: undefined;
  FoodFootprintEstimation: undefined;
  FlyFootprintEstimation: undefined;
  WarningFoodFootprintEstimation: undefined;
  MenuPrimeum: undefined;
  HeatersPrimeum: undefined;
  WorksPrimeum: undefined;
  TransportsPrimeum: undefined;
  HouseholdPrimeum: undefined;
};

export type IKycStackParamList = {
  MenuKyc: undefined;
  InitKyc: undefined;
  Kyc: undefined;
  KycDocumentsValidated: undefined;
  SuccessKyc: undefined;
  CardSent: undefined;
  IdList: undefined;
  UploadDocument: undefined;
  ResidenceProofOptions: undefined;
  ResidenceProofList: undefined;
  KycHost: undefined;
  HostIdList: undefined;
  HostResidenceProofList: undefined;
};

export type IBeneficiaryStackParamList = {
  MenuBeneficiary: undefined;
  BeneficiaryList: undefined;
  BeneficiaryAdd: undefined;
  ContactAdd: undefined;
  Transfer: undefined;
  TransferSuccess: undefined;
};

export type IParametersStackParamList = {
  MenuParameters: undefined;
  Parameters: undefined;
  NotificationSettings: undefined;
};

export type ICardStackParamLimit = {
  MenuCard: undefined;
  Card: undefined;
  KycMissing: undefined;
  WaitingCard: undefined;
  CardLimits: undefined;
  ChangePin: undefined;
  ChangePinSuccess: undefined;
  ShowPin: undefined;
  LockCard: undefined;
  LockCardSuccess: undefined;
};

export type IEnergyStackParamList = {
  MenuEnergy: undefined;
  HelpComfortPrice: undefined;
  WinGreenEuros: undefined;
  AdaptTemperature: undefined;
  RenovateMyHouse: undefined;
  MyEnergyConsumption: undefined;
};

export enum ISharedStackPages {
  HOME = 'Home',
  DEEPLINK = 'Deeplink',
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
  EMAIL_SENT = 'EmailSent',
  SIGNUP_PHONE = 'SignupPhone',
  SIGNUP_CONGRATS = 'SignupCongrats',
  SIGNUP_REVENUES = 'SignupRevenues',
}

export enum IParametersStackPages {
  MENU = 'MenuParameters',
  PARAMETERS = 'Parameters',
  PROFILE_IDENTITY = 'ProfileIdentity',
  PROFILE_ADDRESS = 'ProfileAddress',
  ACCOUNT_SETTINGS = 'AccountSettings',
  APPLICATION_SETTINGS = 'ApplicationSettings',
  NOTIFICATON_SETTINGS = 'NotificationSettings',
  BANK_COORDINATES = 'BankCoordinates',
  LANGUAGES = 'Languages',
  MANAGE_BENEFICIARIES = 'ManageBeneficiaries',
  DELETE_ACCOUNT = 'DeleteAccount',
  GOODBYE = 'GoodBye',
  LOGOUT = 'Logout',
}

export enum IAccountStackPages {
  MENU = 'MenuAccount',
  ACCOUNTS = 'Accounts',
  RIB_PDF = 'RibPdf',
}

export enum ITransactionStackPages {
  MENU = 'MenuTransaction',
  TRANSACTIONS = 'Transactions',
  ACCOUNT_STATEMENTS = 'AccountStatements',
  ACCOUNT_STATEMENTS_PDF = 'AccountStatementsPdf',
}

export enum IBeneficiaryStackPages {
  MENU = 'MenuBeneficiary',
  BENEFICIARY_LIST = 'BeneficiaryList',
  BENEFICIARY_ADD = 'BeneficiaryAdd',
  CONTACT_ADD = 'ContactAdd',
  TRANSFER = 'Transfer',
  TRANSFER_SUCCESS = 'TransferSuccess',
}

export enum IFootprintStackPages {
  MENU = 'MenuFootprint',
  EVOLUTION_FOOTPRINT = 'EvolutionFootprint',
  FOOTPRINT_ESTIMATION = 'FootprintEstimation',
  HEATER_FOOTPRINT_ESTIMATION = 'HeaterFootprintEstimation',
  TRANSPORT_FOOTPRINT_ESTIMATION = 'TransportFootprintEstimation',
  FOOD_FOOTPRINT_ESTIMATION = 'FoodFootprintEstimation',
  FLY_FOOTPRINT_ESTIMATION = 'FlyFootprintEstimation',
  WARNING_FOOD_FOOTPRINT_ESTIMATION = 'WarningFoodFootprintEstimation',
  MENU_PRIMEUM = 'MenuPrimeum',
  HEATERS_SITUATION = 'HeatersSituation',
  WORKS_SITUATION = 'WorksSituation',
  TRANSPORT_SITUATION = 'TransportSituation',
  HOUSEHOLD_SITUATION = 'HouseholdSituation',
}

export enum IKycStackPages {
  MENU = 'MenuKyc',
  SHOW_KYC_STEPS = 'ShowKycSteps',
  INFORMATIONS = 'Informations',
  KYC = 'Kyc',
  SUCCESS = 'SuccessKyc',
  CARD_SENT = 'CardSent',
  UPLOAD_DOCUMENT = 'UploadDocument',
  ID_LIST = 'IdList',
  RESIDENCE_PROOF_OPTIONS = 'ResidenceProofOptions',
  RESIDENCE_PROOF_LIST = 'ResidenceProofList',
  KYC_HOST = 'KycHost',
  HOST_ID_LIST = 'HostIdList',
  HOST_RESIDENCE_PROOF_LIST = 'HostResidenceProofList',
  SCT_REQUIRED = 'SctRequired',
}

export enum ICardStackPages {
  MENU = 'MenuCard',
  CARD = 'Card',
  KYC_MISSING = 'KycMissing',
  WAITING_CARD = 'WaitingCard',
  CARD_LIMITS = 'CardLimits',
  CHANGE_PIN = 'ChangePin',
  CHANGE_PIN_SUCCESS = 'ChangePinSuccess',
  SHOW_PIN = 'ShowPin',
  LOCK_CARD = 'LockCard',
  LOCK_CARD_SUCCESS = 'LockCardSuccess',
}

export enum IEnergyStackPages {
  MENU = 'MenuEnergy',
  HELP_COMFORT_PRICE = 'HelpComfortPrice',
  WIN_GREEN_EUROS = 'WinGreenEuros',
  ADAPT_TEMPERATURE = 'AdaptTemperature',
  RENOVATE_MY_HOUSE = 'RenovateMyHouse',
  MY_ENERGY_CONSUMPTION = 'MyEnergyConsumption',
  MODAL_QUIZ = 'ModalQuiz',
}

export type ISharedStackProps = {
  [ISharedStackPages.HOME]: object;
  [ISharedStackPages.DEEPLINK]: object;
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
  [IUserStackPages.SIGNUP_REVENUES]: object;
};

export type IParametersStackProps = {
  [IParametersStackPages.MENU]: object;
  [IParametersStackPages.PARAMETERS]: object;
  [IParametersStackPages.PROFILE_IDENTITY]: object;
  [IParametersStackPages.PROFILE_ADDRESS]: object;
  [IParametersStackPages.ACCOUNT_SETTINGS]: object;
  [IParametersStackPages.APPLICATION_SETTINGS]: object;
  [IParametersStackPages.NOTIFICATON_SETTINGS]: object;
  [IParametersStackPages.MANAGE_BENEFICIARIES]: object;
  [IParametersStackPages.BANK_COORDINATES]: object;
  [IParametersStackPages.LANGUAGES]: object;
  [IParametersStackPages.DELETE_ACCOUNT]: object;
  [IParametersStackPages.LOGOUT]: object;
  [IParametersStackPages.GOODBYE]: object;
};

export type IAccountStackProps = {
  [IAccountStackPages.MENU]: object;
  [IAccountStackPages.ACCOUNTS]: object;
  [IAccountStackPages.RIB_PDF]: object;
};

export type ITransactionStackProps = {
  [ITransactionStackPages.MENU]: object;
  [ITransactionStackPages.TRANSACTIONS]: object;
  [ITransactionStackPages.ACCOUNT_STATEMENTS]: object;
  [ITransactionStackPages.ACCOUNT_STATEMENTS_PDF]: object;
};

export type IFootprintStackProps = {
  [IFootprintStackPages.MENU]: object;
  [IFootprintStackPages.EVOLUTION_FOOTPRINT]: object;
  [IFootprintStackPages.FOOTPRINT_ESTIMATION]: object;
  [IFootprintStackPages.HEATER_FOOTPRINT_ESTIMATION]: object;
  [IFootprintStackPages.TRANSPORT_FOOTPRINT_ESTIMATION]: object;
  [IFootprintStackPages.FOOD_FOOTPRINT_ESTIMATION]: object;
  [IFootprintStackPages.FLY_FOOTPRINT_ESTIMATION]: object;
  [IFootprintStackPages.WARNING_FOOD_FOOTPRINT_ESTIMATION]: object;
  [IFootprintStackPages.MENU_PRIMEUM]: object;
  [IFootprintStackPages.HEATERS_SITUATION]: object;
  [IFootprintStackPages.WORKS_SITUATION]: object;
  [IFootprintStackPages.TRANSPORT_SITUATION]: object;
  [IFootprintStackPages.HOUSEHOLD_SITUATION]: object;
};

export type IKycStackProps = {
  [IKycStackPages.MENU]: object;
  [IKycStackPages.SHOW_KYC_STEPS]: object;
  [IKycStackPages.KYC]: object;
  [IKycStackPages.INFORMATIONS]: object;
  [IKycStackPages.SUCCESS]: object;
  [IKycStackPages.CARD_SENT]: object;
  [IKycStackPages.UPLOAD_DOCUMENT]: object;
  [IKycStackPages.ID_LIST]: object;
  [IKycStackPages.RESIDENCE_PROOF_OPTIONS]: object;
  [IKycStackPages.RESIDENCE_PROOF_LIST]: object;
  [IKycStackPages.KYC_HOST]: object;
  [IKycStackPages.HOST_ID_LIST]: object;
  [IKycStackPages.HOST_RESIDENCE_PROOF_LIST]: object;
  [IKycStackPages.SCT_REQUIRED]: object;
};

export type IBeneficiaryStackProps = {
  [IBeneficiaryStackPages.MENU]: object;
  [IBeneficiaryStackPages.BENEFICIARY_LIST]: object;
  [IBeneficiaryStackPages.BENEFICIARY_ADD]: object;
  [IBeneficiaryStackPages.CONTACT_ADD]: object;
  [IBeneficiaryStackPages.TRANSFER]: object;
  [IBeneficiaryStackPages.TRANSFER_SUCCESS]: object;
};

export type ICardStackProps = {
  [ICardStackPages.MENU]: object;
  [ICardStackPages.CARD]: object;
  [ICardStackPages.KYC_MISSING]: object;
  [ICardStackPages.WAITING_CARD]: object;
  [ICardStackPages.CARD_LIMITS]: object;
  [ICardStackPages.CHANGE_PIN]: object;
  [ICardStackPages.CHANGE_PIN_SUCCESS]: object;
  [ICardStackPages.SHOW_PIN]: object;
  [ICardStackPages.LOCK_CARD]: object;
  [ICardStackPages.LOCK_CARD_SUCCESS]: object;
};

export type IEnergyStackProps = {
  [IEnergyStackPages.MENU]: object;
  [IEnergyStackPages.HELP_COMFORT_PRICE]: object;
  [IEnergyStackPages.WIN_GREEN_EUROS]: object;
  [IEnergyStackPages.ADAPT_TEMPERATURE]: object;
  [IEnergyStackPages.RENOVATE_MY_HOUSE]: object;
  [IEnergyStackPages.MY_ENERGY_CONSUMPTION]: object;
  [IEnergyStackPages.MODAL_QUIZ]: object;
};

export type IRoutes =
  | ISharedStackPages.HOME
  | ISharedStackPages.MODAL_ERROR
  | ISharedStackPages.MODAL_WEBVIEW
  | ISharedStackPages.LEGAL
  | ISharedStackPages.CGU
  | ISharedStackPages.CGU_KYC_PROVIDER
  | ISharedStackPages.DEEPLINK
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
  | IUserStackPages.SIGNUP_REVENUES
  | IParametersStackPages.MENU
  | IParametersStackPages.PARAMETERS
  | IParametersStackPages.PROFILE_IDENTITY
  | IParametersStackPages.PROFILE_ADDRESS
  | IParametersStackPages.ACCOUNT_SETTINGS
  | IParametersStackPages.APPLICATION_SETTINGS
  | IParametersStackPages.NOTIFICATON_SETTINGS
  | IParametersStackPages.BANK_COORDINATES
  | IParametersStackPages.MANAGE_BENEFICIARIES
  | IParametersStackPages.LANGUAGES
  | IParametersStackPages.DELETE_ACCOUNT
  | IParametersStackPages.LOGOUT
  | IParametersStackPages.GOODBYE
  | IAccountStackPages.MENU
  | IAccountStackPages.ACCOUNTS
  | IAccountStackPages.RIB_PDF
  | ITransactionStackPages.MENU
  | ITransactionStackPages.TRANSACTIONS
  | ITransactionStackPages.ACCOUNT_STATEMENTS
  | ITransactionStackPages.ACCOUNT_STATEMENTS_PDF
  | IFootprintStackPages.MENU
  | IFootprintStackPages.EVOLUTION_FOOTPRINT
  | IFootprintStackPages.FOOTPRINT_ESTIMATION
  | IFootprintStackPages.HEATER_FOOTPRINT_ESTIMATION
  | IFootprintStackPages.TRANSPORT_FOOTPRINT_ESTIMATION
  | IFootprintStackPages.FOOD_FOOTPRINT_ESTIMATION
  | IFootprintStackPages.FLY_FOOTPRINT_ESTIMATION
  | IFootprintStackPages.WARNING_FOOD_FOOTPRINT_ESTIMATION
  | IFootprintStackPages.MENU_PRIMEUM
  | IFootprintStackPages.HEATERS_SITUATION
  | IFootprintStackPages.WORKS_SITUATION
  | IFootprintStackPages.TRANSPORT_SITUATION
  | IFootprintStackPages.HOUSEHOLD_SITUATION
  | IKycStackPages.MENU
  | IKycStackPages.SHOW_KYC_STEPS
  | IKycStackPages.KYC
  | IKycStackPages.INFORMATIONS
  | IKycStackPages.SUCCESS
  | IKycStackPages.CARD_SENT
  | IKycStackPages.UPLOAD_DOCUMENT
  | IKycStackPages.ID_LIST
  | IKycStackPages.RESIDENCE_PROOF_OPTIONS
  | IKycStackPages.RESIDENCE_PROOF_LIST
  | IKycStackPages.KYC_HOST
  | IKycStackPages.HOST_ID_LIST
  | IKycStackPages.HOST_RESIDENCE_PROOF_LIST
  | IKycStackPages.SCT_REQUIRED
  | IBeneficiaryStackPages.MENU
  | IBeneficiaryStackPages.BENEFICIARY_LIST
  | IBeneficiaryStackPages.BENEFICIARY_ADD
  | IBeneficiaryStackPages.CONTACT_ADD
  | IBeneficiaryStackPages.TRANSFER
  | IBeneficiaryStackPages.TRANSFER_SUCCESS
  | ICardStackPages.MENU
  | ICardStackPages.CARD
  | ICardStackPages.KYC_MISSING
  | ICardStackPages.WAITING_CARD
  | ICardStackPages.CARD_LIMITS
  | ICardStackPages.CHANGE_PIN
  | ICardStackPages.CHANGE_PIN_SUCCESS
  | ICardStackPages.SHOW_PIN
  | ICardStackPages.LOCK_CARD
  | ICardStackPages.LOCK_CARD_SUCCESS
  | IEnergyStackPages.MENU
  | IEnergyStackPages.HELP_COMFORT_PRICE
  | IEnergyStackPages.WIN_GREEN_EUROS
  | IEnergyStackPages.ADAPT_TEMPERATURE
  | IEnergyStackPages.RENOVATE_MY_HOUSE
  | IEnergyStackPages.MY_ENERGY_CONSUMPTION
  | IEnergyStackPages.MODAL_QUIZ;
