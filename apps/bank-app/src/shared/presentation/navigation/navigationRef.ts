import { createNavigationContainerRef, NavigationContainerRef } from '@react-navigation/native';
import { IAuthStackPages } from '../../../shared/presentation/types';

export const navigationRef: NavigationContainerRef<Record<string, any>> | undefined =
  createNavigationContainerRef();

export function navigate({ route, params }: { route: IAuthStackPages; params?: Record<string, any> }) {
  if (navigationRef && navigationRef.isReady()) {
    if (params) {
      navigationRef.navigate(route, params);
    } else {
      navigationRef.navigate(route);
    }
  }
}
