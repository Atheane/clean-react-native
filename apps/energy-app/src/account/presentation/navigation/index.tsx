import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { IAccountStackPages, IAccountStackProps } from '../../../shared/presentation/types';
import { Home } from '../screens';

const Stack = createNativeStackNavigator<IAccountStackProps>();

export const AccountStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen name={IAccountStackPages.ACCOUNTS} component={Home} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
