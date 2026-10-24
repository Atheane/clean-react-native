import { useCallback } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LinkButton, LinkButtonColors, OffBlueGradient } from '@clean-rn/ui-mobile';

import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import {
  ISharedStackProps,
  IParametersStackPages,
  IParametersStackProps,
} from '../../../shared/presentation/types';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';

import { fetchLogout } from '../../../auth/application/commands';

import {
  ApplicationSettings,
  NotificationSettings,
  Languages,
  DeleteAccount,
  GoodBye,
  Parameters,
  ProfileIdentity,
  ProfileAddress,
  AccountSettings,
  BankCoordinates,
  ManageBeneficiaries,
} from '../screens';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { KYC_REVIEW } from '@clean-rn/user/domain';

const Stack = createNativeStackNavigator<IParametersStackProps & ISharedStackProps>();

export const ParametersStack = () => {
  const { t } = useTranslation();

  const navigationStack = useNavigationState((state) => state?.routes ?? []);

  const dispatch = useDispatch();
  const onPressLogout = useCallback(() => {
    dispatch(fetchLogout());
  }, [dispatch]);

  const { customer } = useSelector((state: IRootState) => state.kyc.customer);

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: t('screens.parameters.menu.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
          headerRight: () => (
            <View style={{ position: 'relative', top: -6 }}>
              <LinkButton
                iconLeft={() => <OffBlueGradient width={28} height={28} />}
                colorOption={LinkButtonColors.BLUE}
                onPress={onPressLogout}
              />
            </View>
          ),
        }}
        name={IParametersStackPages.PARAMETERS}
        component={Parameters}
      />
      <Stack.Screen
        name={IParametersStackPages.ACCOUNT_SETTINGS}
        component={AccountSettings}
        options={{
          headerTitle: t('screens.account-settings.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IParametersStackPages.APPLICATION_SETTINGS}
        component={ApplicationSettings}
        options={{
          headerTitle: t('screens.application-settings.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IParametersStackPages.NOTIFICATON_SETTINGS}
        component={NotificationSettings}
        options={{
          headerTitle: t('screens.notifications.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IParametersStackPages.MANAGE_BENEFICIARIES}
        component={ManageBeneficiaries}
        options={{
          headerTitle: t('screens.manage-beneficiaries.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IParametersStackPages.BANK_COORDINATES}
        component={BankCoordinates}
        options={{
          headerTitle: t('screens.bank-coordinates.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IParametersStackPages.LANGUAGES}
        component={Languages}
        options={{
          headerTitle: t('screens.languages.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IParametersStackPages.PROFILE_IDENTITY}
        component={ProfileIdentity}
        options={{
          headerTitle:
            customer?.properties.status === KYC_REVIEW.VALIDATED
              ? t('screens.parameters.menu.profile')
              : t('screens.profile-identity.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IParametersStackPages.PROFILE_ADDRESS}
        component={ProfileAddress}
        options={{
          headerTitle: t('screens.profile-address.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IParametersStackPages.DELETE_ACCOUNT}
        component={DeleteAccount}
        options={{
          headerTitle: t('screens.parameters.delete-account.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IParametersStackPages.GOODBYE}
        component={GoodBye}
        options={{
          headerTitle: t('screens.parameters.delete-account.goodbye'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
    </Stack.Navigator>
  );
};
