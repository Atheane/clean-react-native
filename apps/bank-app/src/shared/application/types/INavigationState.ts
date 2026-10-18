import { IRoutes } from './IRoutes';

export interface INavigationState {
  navToRoute: IRoutes | 'BACK' | null;
  navToParams: object | null;
  navFrom: IRoutes | 'BACK' | null;
}
