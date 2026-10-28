import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type HeaderTitleAlign = 'center' | 'left' | undefined;

export type IRootStackParamList = {
  MenuHome: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuDashboard: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuEpc: NavigatorScreenParams<IRootTabParamList> | undefined;
  MenuSettings: NavigatorScreenParams<IRootTabParamList> | undefined;
  ModalError: undefined;
  ModalWebView: undefined;
};

export type IRootTabScreenProps<Screen extends keyof IRootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<IRootTabParamList, Screen>,
  NativeStackScreenProps<IRootStackParamList>
>;

export type IRootTabParamList = {
  MenuHome: undefined;
  MenuDashboard: undefined;
  MenuEpc: undefined;
  MenuSettings: undefined;
};

export type IAuthStackParamList = {
  Login: undefined;
};

export type IHomeStackParamList = {
  MenuHome: undefined;
};

export type IDashboardStackParamList = {
  MenuDashboard: undefined;
  Dashboard: undefined;
};

export type IEpcStackParamList = {
  MenuEpc: undefined;
  Epc: undefined;
};

export type ISettingsStackParamList = {
  MenuSettings: undefined;
  Settings: undefined;
};

export enum ISharedStackPages {
  HOME = 'Home',
  MODAL_ERROR = 'ModalError',
  MODAL_CONTENT = 'ModalContent',
}

export enum IAuthStackPages {
  LOGIN = 'Login',
}

export enum IHomeStackPages {
  MENU = 'MenuHome',
}

export enum IDashboardStackPages {
  MENU = 'MenuDashboard',
  DASHBOARD = 'Dashboard',
}

export enum IEpcStackPages {
  MENU = 'MenuEpc',
  CURRENT_SITUATION = 'CurrentSituation',
  AFTER_RENOVATION = 'AfterRenovation',
  EXPLANATION_COMFORT_PRICE = 'ExplanationComfortPrice',
  RECOMMENDED_INDOOR_TEMPERATURE = 'RecommendedIndoorTemperature',
  EPC_CONTRACT = 'EpcContract',
}

export enum ISettingsStackPages {
  MENU = 'MenuSettings',
  SETTINGS = 'Settings',
  LOGOUT = 'Logout',
}

export type ISharedStackProps = {
  [ISharedStackPages.HOME]: object;
  [ISharedStackPages.MODAL_ERROR]: object;
  [ISharedStackPages.MODAL_CONTENT]: object;
};

export type IAuthStackProps = {
  [IAuthStackPages.LOGIN]: object;
};

export type IHomeStackProps = {
  [IHomeStackPages.MENU]: object;
};

export type IDashboardStackProps = {
  [IDashboardStackPages.MENU]: object;
  [IDashboardStackPages.DASHBOARD]: object;
};

export type IEpcStackProps = {
  [IEpcStackPages.MENU]: object;
  [IEpcStackPages.CURRENT_SITUATION]: object;
  [IEpcStackPages.AFTER_RENOVATION]: object;
  [IEpcStackPages.EXPLANATION_COMFORT_PRICE]: object;
  [IEpcStackPages.RECOMMENDED_INDOOR_TEMPERATURE]: object;
  [IEpcStackPages.EPC_CONTRACT]: object;
};

export type ISettingsStackProps = {
  [ISettingsStackPages.MENU]: object;
  [ISettingsStackPages.SETTINGS]: object;
  [ISettingsStackPages.LOGOUT]: object;
};

export type IRoutes =
  | ISharedStackPages.HOME
  | ISharedStackPages.MODAL_ERROR
  | ISharedStackPages.MODAL_CONTENT
  | IHomeStackPages.MENU
  | IAuthStackPages.LOGIN
  | IDashboardStackPages.MENU
  | IDashboardStackPages.DASHBOARD
  | IEpcStackPages.MENU
  | IEpcStackPages.CURRENT_SITUATION
  | IEpcStackPages.AFTER_RENOVATION
  | IEpcStackPages.EXPLANATION_COMFORT_PRICE
  | IEpcStackPages.RECOMMENDED_INDOOR_TEMPERATURE
  | IEpcStackPages.EPC_CONTRACT
  | ISettingsStackPages.MENU
  | ISettingsStackPages.SETTINGS
  | ISettingsStackPages.LOGOUT;
