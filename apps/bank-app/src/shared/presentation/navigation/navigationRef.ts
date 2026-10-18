import { createNavigationContainerRef, NavigationContainerRef } from '@react-navigation/native';
import { IAuthStackPages } from '../../../shared/presentation/types';

export const navigationRef: NavigationContainerRef<Record<string, any>> | undefined =
  createNavigationContainerRef();

let initRoute = IAuthStackPages.SIGNUP_EMAIL;

export function navigate({ route, params }: { route: IAuthStackPages; params?: Record<string, any> }) {
  if (navigationRef && navigationRef.isReady()) {
    if (params) {
      navigationRef.navigate(route, params);
    } else {
      navigationRef.navigate(route);
    }
  } else {
    initRoute = route;
  }
}

export function goToInitRoute() {
  navigate({ route: initRoute });
}

export function goBack(): void {
  if (navigationRef && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}
