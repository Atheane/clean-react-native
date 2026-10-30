import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigationState } from '@react-navigation/native';

import { IRootState } from '../../application/state-management/reducers/root-reducer';
import {
  IAuthStackPages,
  IAuthStackProps,
  ISharedStackPages,
  ISharedStackProps,
  IDashboardStackProps,
  IEpcStackProps,
  ISettingsStackProps,
} from '../../presentation/types';
import { initGlobalError } from '../../application/commands/manage-global-errors';
import { ScreenModalError, ScreenModalContent, ScreenModalHelp } from '../../presentation/screens';

import { Login } from '../screens';

import { BottomTabNavigator } from './BottomNavigator';

export const RootStack = () => {
  const { accessToken } = useSelector((state: IRootState) => state.auth.auth);
  return accessToken ? <HomeStack /> : <AuthStack />;
};

const Stack = createNativeStackNavigator<
  ISharedStackProps & IAuthStackProps & IDashboardStackProps & IEpcStackProps & ISettingsStackProps
>();

export const HomeStack = () => {
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
        name={ISharedStackPages.MODAL_CONTENT}
        component={ScreenModalContent}
      />
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerShown: false,
          headerBackVisible: false,
        }}
        name={ISharedStackPages.MODAL_HELP}
        component={ScreenModalHelp}
      />
    </Stack.Navigator>
  );
};

export const AuthStack = () => {
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
    <Stack.Navigator initialRouteName={IAuthStackPages.LOGIN}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={IAuthStackPages.LOGIN}
        component={Login}
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
        name={ISharedStackPages.MODAL_CONTENT}
        component={ScreenModalContent}
      />
    </Stack.Navigator>
  );
};
