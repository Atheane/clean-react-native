import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type HeaderTitleAlign = 'center' | 'left' | undefined;

export type IRootStackParamList = {
  MenuHome: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuAccount: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuTransaction: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuCarbon: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuParameters: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuKyc: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuCard: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuEnergy: NavigatorScreenParams<IRootTabParamList> | undefined;
  ModalError: undefined;
  ModalWebView: undefined;
  Legal: undefined;
  Cgu: undefined;
};

export type IRootTabScreenProps<Screen extends keyof IRootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<IRootTabParamList, Screen>,
  NativeStackScreenProps<IRootStackParamList>
>;

export type IRootTabParamList = {
  MenuHome: undefined;
  MenuAccount: undefined;
  MenuTransaction: undefined;
  MenuFootprint: undefined;
  MenuParameters: undefined;
  MenuEnergy: undefined;
};

export type ISharedStackParamList = {
  Home: undefined;
  Deeplink: undefined;
  ModalError: undefined;
  ModalWebView: undefined;
  Legal: undefined;
  Cgu: undefined;
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
};

export type ITransactionStackParamList = {
  MenuTransaction: undefined;
  Transactions: undefined;
  AccountStatements: undefined;
  AccountStatementsPdf: undefined;
  RibRegistered: undefined;
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
  APPLICATION_SETTINGS = 'ApplicationSettings',
  NOTIFICATON_SETTINGS = 'NotificationSettings',
  LANGUAGES = 'Languages',
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
  RIB_REGISTERED = 'RibRegistered',
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

export enum IEnergyStackPages {
  MENU = 'MenuEnergy',
  HELP_COMFORT_PRICE = 'HelpComfortPrice',
  WIN_GREEN_EUROS = 'WinGreenEuros',
  ADAPT_TEMPERATURE = 'AdaptTemperature',
  MY_ENERGY_CONSUMPTION = 'MyEnergyConsumption',
  RENOVATE = 'Renovate',
  SAVINGS_AFTER_RENOVATION = 'SavingsAfterRenovation',
  MODAL_QUIZ = 'ModalQuiz',
}

export type ISharedStackProps = {
  [ISharedStackPages.HOME]: object;
  [ISharedStackPages.DEEPLINK]: object;
  [ISharedStackPages.MODAL_ERROR]: object;
  [ISharedStackPages.MODAL_WEBVIEW]: object;
  [ISharedStackPages.LEGAL]: object;
  [ISharedStackPages.CGU]: object;
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
  [IParametersStackPages.APPLICATION_SETTINGS]: object;
  [IParametersStackPages.NOTIFICATON_SETTINGS]: object;
  [IParametersStackPages.LANGUAGES]: object;
  [IParametersStackPages.DELETE_ACCOUNT]: object;
  [IParametersStackPages.LOGOUT]: object;
  [IParametersStackPages.GOODBYE]: object;
};

export type IAccountStackProps = {
  [IAccountStackPages.MENU]: object;
  [IAccountStackPages.ACCOUNTS]: object;
};

export type ITransactionStackProps = {
  [ITransactionStackPages.MENU]: object;
  [ITransactionStackPages.TRANSACTIONS]: object;
  [ITransactionStackPages.ACCOUNT_STATEMENTS]: object;
  [ITransactionStackPages.ACCOUNT_STATEMENTS_PDF]: object;
  [ITransactionStackPages.RIB_REGISTERED]: object;
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

export type IEnergyStackProps = {
  [IEnergyStackPages.MENU]: object;
  [IEnergyStackPages.HELP_COMFORT_PRICE]: object;
  [IEnergyStackPages.WIN_GREEN_EUROS]: object;
  [IEnergyStackPages.ADAPT_TEMPERATURE]: object;
  [IEnergyStackPages.MY_ENERGY_CONSUMPTION]: object;
  [IEnergyStackPages.RENOVATE]: object;
  [IEnergyStackPages.SAVINGS_AFTER_RENOVATION]: object;
  [IEnergyStackPages.MODAL_QUIZ]: object;
};

export type IRoutes =
  | ISharedStackPages.HOME
  | ISharedStackPages.MODAL_ERROR
  | ISharedStackPages.MODAL_WEBVIEW
  | ISharedStackPages.LEGAL
  | ISharedStackPages.CGU
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
  | IParametersStackPages.APPLICATION_SETTINGS
  | IParametersStackPages.NOTIFICATON_SETTINGS
  | IParametersStackPages.LANGUAGES
  | IParametersStackPages.DELETE_ACCOUNT
  | IParametersStackPages.LOGOUT
  | IParametersStackPages.GOODBYE
  | IAccountStackPages.MENU
  | IAccountStackPages.ACCOUNTS
  | ITransactionStackPages.MENU
  | ITransactionStackPages.TRANSACTIONS
  | ITransactionStackPages.ACCOUNT_STATEMENTS
  | ITransactionStackPages.ACCOUNT_STATEMENTS_PDF
  | ITransactionStackPages.RIB_REGISTERED
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
  | IEnergyStackPages.MENU
  | IEnergyStackPages.HELP_COMFORT_PRICE
  | IEnergyStackPages.WIN_GREEN_EUROS
  | IEnergyStackPages.ADAPT_TEMPERATURE
  | IEnergyStackPages.MY_ENERGY_CONSUMPTION
  | IEnergyStackPages.RENOVATE
  | IEnergyStackPages.SAVINGS_AFTER_RENOVATION
  | IEnergyStackPages.MODAL_QUIZ;
