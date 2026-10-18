import { NavigationContainerRefWithCurrent } from '@react-navigation/native';

export interface INavigationService<T extends object> {
  navigate(routeName: string): void;
  goBack(): void;
}

export interface INavigationServiceStatic<T extends object> {
  new (): INavigationService<T>;
  getInstance(): NavigationContainerRefWithCurrent<T>;
}
