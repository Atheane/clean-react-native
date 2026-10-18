import { createNavigationContainerRef, NavigationContainerRefWithCurrent } from '@react-navigation/native';

import { INavigationService } from '@clean-rn/services-mobile';
import { RootStackParamList, AuthStackParamList } from '../../types';

export class NavigationService implements INavigationService<RootStackParamList | AuthStackParamList> {
  private static navigationRef: NavigationContainerRefWithCurrent<RootStackParamList | AuthStackParamList>;

  private constructor() {
    return;
  }

  public static getInstance(): NavigationContainerRefWithCurrent<RootStackParamList | AuthStackParamList> {
    if (!NavigationService.navigationRef) {
      NavigationService.navigationRef = createNavigationContainerRef<
        RootStackParamList | AuthStackParamList
      >();
    }
    return NavigationService.navigationRef;
  }

  public navigate(routeName: never): void {
    if (NavigationService.navigationRef.isReady()) {
      NavigationService.navigationRef.navigate(routeName);
    }
  }

  public goBack(): void {
    if (NavigationService.navigationRef.isReady()) {
      NavigationService.navigationRef.goBack();
    }
  }
}
