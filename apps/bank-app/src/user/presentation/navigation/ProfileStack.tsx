import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { IUserStackPages, IUserStackProps, ISharedStackProps } from '../../../shared/presentation/types';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { NotificationSettings, Profile } from '../screens';

const Stack = createNativeStackNavigator<IUserStackProps & ISharedStackProps>();

export const ProfileStack = () => {
  const { t } = useTranslation();
  const { initRouteName } = useSelector((state: IRootState) => state.initialization);
  const navigationStack = useNavigationState((state) => state?.routes ?? []);

  return (
    <Stack.Navigator
      initialRouteName={initRouteName as keyof IUserStackProps | keyof ISharedStackProps | undefined}
    >
      <Stack.Screen options={{ headerShown: false }} name={IUserStackPages.PROFILE} component={Profile} />
      <Stack.Screen
        name={IUserStackPages.NOTIFICATON_SETTINGS}
        component={NotificationSettings}
        options={{
          headerTitle: t('screens.notifications.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
    </Stack.Navigator>
  );
};
