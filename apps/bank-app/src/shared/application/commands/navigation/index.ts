import { IRoutes } from '../../types';

export enum INavigationTypes {
  NAVIGATE_PASSWORD_TO_LOGIN = 'NAVIGATE_PASSWORD_TO_LOGIN',
  NAVIGATE_TO = 'NAVIGATE_TO',
  NAVIGATE_BACK = 'NAVIGATE_BACK',
}

type INavigatePasswordToLogin = {
  type: typeof INavigationTypes.NAVIGATE_PASSWORD_TO_LOGIN;
  payload: IRoutes;
};

type INavigateTo = {
  type: typeof INavigationTypes.NAVIGATE_TO;
  payload: { route: IRoutes; params?: object };
};

type INavigateBack = {
  type: typeof INavigationTypes.NAVIGATE_BACK;
};

export type INavigationActions = INavigatePasswordToLogin | INavigateTo | INavigateBack;

export const navigateTo = ({ route, params }: { route: IRoutes; params?: object }): INavigateTo => ({
  type: INavigationTypes.NAVIGATE_TO,
  payload: { route, params },
});

export const navigateBack = (): INavigateBack => ({
  type: INavigationTypes.NAVIGATE_BACK,
});
