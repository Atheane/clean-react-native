import { useTranslation } from 'react-i18next';
import { useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import {
  ISharedStackProps,
  IProfileStackPages,
  IProfileStackProps,
} from '../../../shared/presentation/types';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';

import { NotificationSettings, Profile } from '../screens';

const Stack = createNativeStackNavigator<IProfileStackProps & ISharedStackProps>();

export const ProfileStack = () => {
  const { t } = useTranslation();

  const navigationStack = useNavigationState((state) => state?.routes ?? []);

  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name={IProfileStackPages.PROFILE} component={Profile} />
      <Stack.Screen
        name={IProfileStackPages.NOTIFICATON_SETTINGS}
        component={NotificationSettings}
        options={{
          headerTitle: t('screens.notifications.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
    </Stack.Navigator>
  );
};
