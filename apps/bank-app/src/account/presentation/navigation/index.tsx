import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';

import { IHomeStackPages, IHomeStackProps } from '../../../shared/presentation/types';
import {
  Accounts,
  Transactions,
  ScreenModalWebview,
  AccountStatements,
  AccountStatementsCurrentMonth,
  AccountStatementsLastThreeMonths,
  AccountStatementsAll,
  ExportPdfIban,
} from '../screens';

const Stack = createNativeStackNavigator<IHomeStackProps>();

export const HomeStack = () => {
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
        options={{
          presentation: 'modal',
          headerShown: false,
          headerBackVisible: false,
        }}
        name={IHomeStackPages.MODAL_WEBVIEW}
        component={ScreenModalWebview}
      />
      <Stack.Screen
        name={IHomeStackPages.ACCOUNT_STATEMENTS}
        component={AccountStatements}
        options={{
          headerTitle: t('screens.accountStatements.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={IHomeStackPages.ACCOUNT_STATEMENTS_CURRENT_MONTH}
        component={AccountStatementsCurrentMonth}
        options={{
          headerTitle: t('screens.accountStatementsCurrentMonth.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={IHomeStackPages.ACCOUNT_STATEMENTS_LAST_THREE_MONTHS}
        component={AccountStatementsLastThreeMonths}
        options={{
          headerTitle: t('screens.accountStatementsThreeLastMonths.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={IHomeStackPages.ACCOUNT_STATEMENTS_ALL}
        component={AccountStatementsAll}
        options={{
          headerTitle: t('screens.accountStatementsAll.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={IHomeStackPages.EXPORT_PDF_IBAN}
        component={ExportPdfIban}
        options={{
          headerTitle: t('screens.exportPdfIban.title'),
          ...headersOptions(goBack),
        }}
      />
    </Stack.Navigator>
  );
};
