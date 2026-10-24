import { useCallback } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LinkButton, LinkButtonColors, OffBlueGradient } from '@clean-rn/ui-mobile';

import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import {
  ISharedStackProps,
  IProfileStackPages,
  IProfileStackProps,
} from '../../../shared/presentation/types';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';

import { fetchLogout } from '../../../auth/application/commands';

import {
  ApplicationSettings,
  NotificationSettings,
  Profile,
  Languages,
  DeleteAccount,
  GoodBye,
} from '../screens';

const Stack = createNativeStackNavigator<IProfileStackProps & ISharedStackProps>();

export const ProfileStack = () => {
  const { t } = useTranslation();

  const navigationStack = useNavigationState((state) => state?.routes ?? []);

  const dispatch = useDispatch();
  const onPressLogout = useCallback(() => {
    dispatch(fetchLogout());
  }, [dispatch]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: t('screens.profile.menu.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
          headerRight: () => (
            <View style={{ position: 'relative', top: -6 }}>
              <LinkButton
                iconLeft={() => <OffBlueGradient width={28} height={28} />}
                colorOption={LinkButtonColors.BLUE}
                onPress={onPressLogout}
              />
            </View>
          ),
        }}
        name={IProfileStackPages.PROFILE}
        component={Profile}
      />
      <Stack.Screen
        name={IProfileStackPages.APPLICATION_SETTINGS}
        component={ApplicationSettings}
        options={{
          headerTitle: t('screens.application-settings.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IProfileStackPages.NOTIFICATON_SETTINGS}
        component={NotificationSettings}
        options={{
          headerTitle: t('screens.notifications.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IProfileStackPages.LANGUAGES}
        component={Languages}
        options={{
          headerTitle: t('screens.languages.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IProfileStackPages.DELETE_ACCOUNT}
        component={DeleteAccount}
        options={{
          headerTitle: t('screens.profile.delete-account.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IProfileStackPages.GOODBYE}
        component={GoodBye}
        options={{
          headerTitle: t('screens.profile.delete-account.goodbye'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
    </Stack.Navigator>
  );
};
