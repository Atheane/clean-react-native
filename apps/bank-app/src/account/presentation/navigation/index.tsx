import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useTranslation } from 'react-i18next';

import { IHomeStackPages, IHomeStackProps } from '../../../shared/presentation/types';

import { Accounts, Transactions } from '../screens';
// import { AccountStatements, AccountStatementsPdf, RibPdf } from '../../../account/presentation/screens';

// import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
// import { goBack } from '../../../shared/presentation/navigation/navigationRef';

const Stack = createNativeStackNavigator<IHomeStackProps>();

export const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={IHomeStackPages.ACCOUNTS} component={Accounts} options={{ headerShown: false }} />
      <Stack.Screen
        name={IHomeStackPages.TRANSACTIONS}
        component={Transactions}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
