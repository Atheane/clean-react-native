import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigationState } from '@react-navigation/native';

import { ISettingsStackPages, ISettingsStackProps } from '../types';
import { goBack } from './navigationRef';

import { ApplicationSettings, Languages, Notifications, Settings } from '../screens';
import { headersOptions } from './headersOptions';

const Stack = createNativeStackNavigator<ISettingsStackProps>();

export const SettingsStack = () => {
  const navigationStack = useNavigationState((state) => state?.routes ?? []).filter((nav: { name: string }) =>
    nav.name.includes('Settings'),
  );

  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name={ISettingsStackPages.SETTINGS}
        component={Settings}
        options={{
          headerTitle: 'Help & Settings',
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={ISettingsStackPages.APPLICATION_SETTINGS}
        component={ApplicationSettings}
        options={{
          headerTitle: 'Application settings',
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={ISettingsStackPages.NOTIFICATIONS}
        component={Notifications}
        options={{
          headerTitle: 'Notifications',
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={ISettingsStackPages.LANGUAGES}
        component={Languages}
        options={{
          headerTitle: 'Languages',
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
    </Stack.Navigator>
  );
};
