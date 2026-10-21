import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigationState } from '@react-navigation/native';

import { Colors, FontNames } from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import {
  IAuthStackPages,
  IAuthStackProps,
  IHomeStackPages,
  IHomeStackProps,
  ISharedStackPages,
  ISharedStackProps,
  IKycStackPages,
  IKycStackProps,
  HeaderTitleAlign,
  ICarbonStackPages,
  ICarbonStackProps,
} from '../../../shared/presentation/types';
import { initGlobalError } from '../../../shared/application/commands/manage-global-errors';
import { ScreenModalError, ScreenModalWebview } from '../../../shared/presentation/screens';

import { Login } from '../../../auth/presentation/screens';
import { AuthStack } from '../../../auth/presentation/navigation';

import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';

import { KycStack } from '../../../kyc/presentation/navigation';
import { Carbon, House, Transport, Food, WarningFood, Fly } from '../../../carbon/presentation/screens';
import { AccountStatements, AccountStatementsPdf, RibPdf } from '../../../account/presentation/screens';

import { BottomTabNavigator } from './BottomNavigator';

export const RootStack = () => {
  const {
    auth: { accessToken },
  } = useSelector((state: IRootState) => state.auth.login);

  return accessToken ? <HomeStack /> : <AuthStack />;
};

const Stack = createNativeStackNavigator<
  IHomeStackProps & ISharedStackProps & IAuthStackProps & IKycStackProps & ICarbonStackProps
>();

export const HomeStack = () => {
  const navigationStack = useNavigationState((state) => state?.routes ?? []);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  useEffect(() => {
    const isModalErrorInStack = navigationStack.find((route) => route.name === ISharedStackPages.MODAL_ERROR);
    if (!isModalErrorInStack) {
      dispatch(initGlobalError());
    }
  }, [navigationStack, dispatch]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={IHomeStackPages.ACCOUNTS}
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={IHomeStackPages.BENEFICIARY}
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={IKycStackPages.MENU} component={KycStack} options={{ headerShown: false }} />
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
        name={ICarbonStackPages.CARBON}
        component={Carbon}
        options={{
          headerTitle: t('screens.carbon.title'),
          ...headersOptions(),
        }}
      />
      <Stack.Screen
        name={ICarbonStackPages.HOUSE}
        component={House}
        options={{
          headerTitle: t('screens.carbon-house.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={ICarbonStackPages.TRANSPORT}
        component={Transport}
        options={{
          headerTitle: t('screens.carbon-transport.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={ICarbonStackPages.FOOD}
        component={Food}
        options={{
          headerTitle: t('screens.carbon-food.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={ICarbonStackPages.WARNING_FOOD}
        component={WarningFood}
        options={{
          headerTitle: t('screens.carbon-food.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={ICarbonStackPages.FLY}
        component={Fly}
        options={{
          headerTitle: t('screens.carbon-fly.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
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
          headerShown: false,
          headerBackVisible: false,
        }}
        name={ISharedStackPages.MODAL_WEBVIEW}
        component={ScreenModalWebview}
      />
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerTitle: t('modal.login.title'),
          headerTitleAlign: 'center' as HeaderTitleAlign,
          headerTitleStyle: {
            color: Colors.bank.primary.darkBlue,
            fontSize: 19,
            fontFamily: FontNames.MartelSans_600SemiBold,
          },
          headerBackVisible: false,
        }}
        name={IAuthStackPages.LOGIN}
        component={Login}
      />
    </Stack.Navigator>
  );
};
