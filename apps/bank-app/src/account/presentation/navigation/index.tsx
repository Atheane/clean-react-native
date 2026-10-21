import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';

import { IHomeStackPages, IHomeStackProps } from '../../../shared/presentation/types';

import { Accounts, Transactions, AccountStatements, AccountStatementsPdf, RibPdf } from '../screens';

const Stack = createNativeStackNavigator<IHomeStackProps>();

export const AccountStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen name={IHomeStackPages.ACCOUNTS} component={Accounts} options={{ headerShown: false }} />
      <Stack.Screen
        name={IHomeStackPages.TRANSACTIONS}
        component={Transactions}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={IHomeStackPages.ACCOUNT_STATEMENTS}
        component={AccountStatements}
        options={{
          headerTitle: t('screens.account-statements.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={IHomeStackPages.ACCOUNT_STATEMENTS_PDF}
        component={AccountStatementsPdf}
        options={{
          headerTitle: t('screens.account-statements-pdf.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={IHomeStackPages.RIB_PDF}
        component={RibPdf}
        options={{
          headerTitle: t('screens.rib-pdf.title'),
          ...headersOptions(goBack),
        }}
      />
    </Stack.Navigator>
  );
};
