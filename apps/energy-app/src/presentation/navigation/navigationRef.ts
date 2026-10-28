import { createNavigationContainerRef, NavigationContainerRef } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

import { IRoutes, IAuthStackPages } from '../types';

export const navigationRef: NavigationContainerRef<Record<string, any>> | undefined =
  createNavigationContainerRef();

let initRoute: IRoutes = IAuthStackPages.LOGIN;

export function navigate({ route, params }: { route: IRoutes; params?: Record<string, any> }) {
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

export function push({ route, params }: { route: IRoutes; params?: Record<string, any> }) {
  if (navigationRef && navigationRef.isReady()) {
    if (params) {
      navigationRef.dispatch(StackActions.push(route, params));
    } else {
      navigationRef.dispatch(StackActions.push(route));
    }
  }
}

export function pop() {
  if (navigationRef && navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop());
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
