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
  ISharedStackPages,
  ISharedStackProps,
  HeaderTitleAlign,
  IUserStackPages,
  IUserStackProps,
} from '../../../shared/presentation/types';
import { initGlobalError } from '../../../shared/application/commands/manage-global-errors';
import { ScreenModalError, ScreenModalWebview } from '../../../shared/presentation/screens';
import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';

import { Login } from '../../../auth/presentation/screens';
import { AuthStack } from '../../../auth/presentation/navigation';

import { BottomTabNavigator } from './BottomNavigator';
import { UserStack } from '../../../user/presentation/navigation';
import { SignupCongrats } from '../../../user/presentation/screens';
export const RootStack = () => {
  const {
    auth: { accessToken },
  } = useSelector((state: IRootState) => state.auth);
  const { email } = useSelector((state: IRootState) => state.initialization);
  return accessToken ? <HomeStack /> : email ? <AuthStack /> : <UserStack />;
};

const Stack = createNativeStackNavigator<ISharedStackProps & IAuthStackProps & IUserStackProps>();

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
        name={IUserStackPages.SIGNUP_CONGRATS}
        component={SignupCongrats}
        options={{
          headerTitle: t(`screens.signup-congrats.title`),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={ISharedStackPages.HOME}
        component={BottomTabNavigator}
        options={{ headerShown: false }}
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
