import { useTranslation } from 'react-i18next';
import { useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';

import { IHomeStackPages, IHomeStackProps } from '../../../shared/presentation/types';
import {
  // Help,
  Accounts,
  Transactions,
  // RestoFlash,
  // Weflo,
  // AccountStatements,
  // AccountStatementsCurrentMonth,
  // AccountStatementsLastThreeMonths,
  // AccountStatementsAll,
  // ExportPdfIban,
} from '../screens';

const Stack = createNativeStackNavigator<IHomeStackProps>();

export const HomeStack = () => {
  const { t } = useTranslation();
  const navigationStack = useNavigationState((state) => state?.routes ?? []);

  return (
    <Stack.Navigator>
      <Stack.Screen name={IHomeStackPages.ACCOUNTS} component={Accounts} options={{ headerShown: false }} />
      <Stack.Screen
        name={IHomeStackPages.TRANSACTIONS}
        component={Transactions}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name={IHomeStackPages.HELP} component={Help} options={{ headerShown: false }} />
      <Stack.Screen
        name={IHomeStackPages.ACCOUNT_STATEMENTS}
        component={AccountStatements}
        options={{
          headerTitle: t('screens.accountStatements.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IHomeStackPages.ACCOUNT_STATEMENTS_CURRENT_MONTH}
        component={AccountStatementsCurrentMonth}
        options={{
          headerTitle: t('screens.accountStatementsCurrentMonth.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IHomeStackPages.ACCOUNT_STATEMENTS_LAST_THREE_MONTHS}
        component={AccountStatementsLastThreeMonths}
        options={{
          headerTitle: t('screens.accountStatementsThreeLastMonths.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IHomeStackPages.ACCOUNT_STATEMENTS_ALL}
        component={AccountStatementsAll}
        options={{
          headerTitle: t('screens.accountStatementsAll.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IHomeStackPages.EXPORT_PDF_IBAN}
        component={ExportPdfIban}
        options={{
          headerTitle: t('screens.exportPdfIban.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen name={IHomeStackPages.ACCOUNT} component={Account} options={{ headerShown: false }} />
      <Stack.Screen
        name={IHomeStackPages.RESTO_FLASH}
        component={RestoFlash}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={IHomeStackPages.WEFLO} component={Weflo} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
  );
};
