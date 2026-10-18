import { createNavigationContainerRef, NavigationContainerRefWithCurrent } from '@react-navigation/native';

import { INavigation } from '@clean-rn/utils-mobile';
import { RootStackParamList, AuthStackParamList } from '../../../presentation/types';

export class Navigation implements INavigation<RootStackParamList | AuthStackParamList> {
  private static navigationRef: NavigationContainerRefWithCurrent<RootStackParamList | AuthStackParamList>;

  private constructor() {
    return;
  }

  public static getInstance(): NavigationContainerRefWithCurrent<RootStackParamList | AuthStackParamList> {
    if (!Navigation.navigationRef) {
      Navigation.navigationRef = createNavigationContainerRef<RootStackParamList | AuthStackParamList>();
    }
    return Navigation.navigationRef;
  }

  public navigate(routeName: never): void {
    if (Navigation.navigationRef.isReady()) {
      Navigation.navigationRef.navigate(routeName);
    }
  }

  public goBack(): void {
    if (Navigation.navigationRef.isReady()) {
      Navigation.navigationRef.goBack();
    }
  }
}
