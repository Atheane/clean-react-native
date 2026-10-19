import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';

import {
  IAuthStackPages,
  IAuthStackProps,
  IHomeStackPages,
  IHomeStackProps,
  ISharedStackPages,
  ISharedStackProps,
} from '../../../shared/presentation/types';
import { initGlobalError } from '../../../shared/application/commands/manage-global-errors';
import { ScreenModalError, ScreenModalWebview } from '../../../shared/presentation/screens';
import { Login } from '../../../auth/presentation/screens';

import { Accounts, Transactions, AccountStatements, AccountStatementsPdf, RibPdf } from '../screens';

const Stack = createNativeStackNavigator<IHomeStackProps & ISharedStackProps & IAuthStackProps>();

export const HomeStack = () => {
  const { t } = useTranslation();

  const navigationStack = useNavigationState((state) => state?.routes ?? []);

  const dispatch = useDispatch();
  useEffect(() => {
    const isModalErrorInStack = navigationStack.find((route) => route.name === ISharedStackPages.MODAL_ERROR);
    if (!isModalErrorInStack) {
      dispatch(initGlobalError());
    }
  }, [navigationStack, dispatch]);

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
        name={ISharedStackPages.MODAL_WEBVIEW}
        component={ScreenModalWebview}
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
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerShown: false,
          headerBackVisible: false,
        }}
        name={ISharedStackPages.MODAL_ERROR}
        component={ScreenModalError}
      />
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerTitle: t('modal.login.title'),
          headerBackVisible: false,
        }}
        name={IAuthStackPages.LOGIN}
        component={Login}
      />
    </Stack.Navigator>
  );
};
