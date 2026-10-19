import { NavigationContainerRefWithCurrent } from '@react-navigation/native';

export interface INavigation<T extends object> {
  navigate(routeName: string): void;
  goBack(): void;
}

export interface INavigationStatic<T extends object> {
  new (): INavigation<T>;
  getInstance(): NavigationContainerRefWithCurrent<T>;
}
