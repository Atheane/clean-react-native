import { useTranslation } from 'react-i18next';
import { useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';
import { IProfileStackPages, IProfileStackProps } from '../../../shared/presentation/types';

import { NotificationSettings } from '../screens';

const Stack = createNativeStackNavigator<IProfileStackProps>();

export const ProfileStack = () => {
  const { t } = useTranslation();
  const navigationStack = useNavigationState((state) => state?.routes ?? []);

  return (
    <Stack.Navigator>
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
