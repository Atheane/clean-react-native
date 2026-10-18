/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

// @ts-ignore
export function navigate({ route, params }: { route: string; params?: unknown }) {
  if (navigationRef.isReady()) {
    if (params) {
      // @ts-ignore
      navigationRef.navigate(route, params);
    } else {
      // @ts-ignore
      navigationRef.navigate(route);
    }
  }
}
