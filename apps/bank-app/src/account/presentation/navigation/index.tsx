import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { IHomeStackPages, IHomeStackProps } from '../../../shared/presentation/types';

import { Home, Transactions } from '../screens';

const Stack = createNativeStackNavigator<IHomeStackProps>();

export const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={IHomeStackPages.ACCOUNTS} component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name={IHomeStackPages.TRANSACTIONS}
        component={Transactions}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
