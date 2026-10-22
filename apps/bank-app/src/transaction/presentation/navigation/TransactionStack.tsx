import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { goBack } from '../../../shared/presentation/navigation/navigationRef';
import { ITransactionStackPages, ITransactionStackProps } from '../../../shared/presentation/types';
import { Transactions, AccountStatements, AccountStatementsPdf } from '../screens';
import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';

const Stack = createNativeStackNavigator<ITransactionStackProps>();

export const TransactionStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ITransactionStackPages.TRANSACTIONS}
        component={Transactions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ITransactionStackPages.ACCOUNT_STATEMENTS}
        component={AccountStatements}
        options={{
          headerTitle: t('screens.account-statements.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={ITransactionStackPages.ACCOUNT_STATEMENTS_PDF}
        component={AccountStatementsPdf}
        options={{
          headerTitle: t('screens.account-statements-pdf.title'),
          ...headersOptions(goBack),
        }}
      />
    </Stack.Navigator>
  );
};
