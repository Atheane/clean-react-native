import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigationState, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colors, FontNames } from '@clean-rn/ui-mobile';

import { initGlobalError } from '../../../shared/application/commands/manage-global-errors';
import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';
import {
  IKycStackPages,
  IKycStackProps,
  ISharedStackPages,
  ISharedStackProps,
  IAuthStackProps,
  IAuthStackPages,
  HeaderTitleAlign,
  IRoutes,
} from '../../../shared/presentation/types';
import { ScreenModalError } from '../../../shared/presentation/screens';

import { Login } from '../../../auth/presentation/screens';

import {
  InitKyc,
  Kyc,
  IdList,
  ResidenceProofOptions,
  ResidenceProofList,
  MenuKycHost,
  HostIdList,
  UploadDocument,
  SuccessKyc,
  CardSent,
  HostResidenceProofList,
} from '../screens';

const Stack = createNativeStackNavigator<IKycStackProps & ISharedStackProps & IAuthStackProps>();

export const KycStack = () => {
  const { t } = useTranslation();
  const navigationStack = useNavigationState((state) => state?.routes ?? []);
  const {
    params: { initRoute },
  } = useRoute() as {
    params: {
      initRoute: keyof IKycStackProps | keyof ISharedStackProps | keyof IAuthStackProps | undefined;
    };
  };

  return (
    <Stack.Navigator initialRouteName={initRoute}>
      <Stack.Screen
        name={IKycStackPages.INIT}
        component={InitKyc}
        options={{
          headerTitle: t('screens.kyc.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IKycStackPages.KYC}
        component={Kyc}
        options={{
          headerTitle: t('screens.kyc.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IKycStackPages.SUCCESS}
        component={SuccessKyc}
        options={{
          headerTitle: t('screens.kyc.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IKycStackPages.CARD_SENT}
        component={CardSent}
        options={{
          headerTitle: t('screens.kyc.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IKycStackPages.UPLOAD_DOCUMENT}
        component={UploadDocument}
        options={{
          headerTitle: t('screens.kyc.send-document'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={IKycStackPages.ID_LIST}
        component={IdList}
        options={{
          headerTitle: t('screens.kyc.first-id.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={IKycStackPages.RESIDENCE_PROOF_OPTIONS}
        component={ResidenceProofOptions}
        options={{
          headerTitle: t('screens.kyc.residence-proof-options.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={IKycStackPages.RESIDENCE_PROOF_LIST}
        component={ResidenceProofList}
        options={{
          headerTitle: t('screens.kyc.residence-proof-list.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={IKycStackPages.MENU_KYC_HOST}
        component={MenuKycHost}
        options={{
          headerTitle: t('screens.kyc.menu-kyc-host.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={IKycStackPages.HOST_ID_LIST}
        component={HostIdList}
        options={{
          headerTitle: t('screens.kyc.host-id-list.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={IKycStackPages.HOST_RESIDENCE_PROOF_LIST}
        component={HostResidenceProofList}
        options={{
          headerTitle: t('screens.kyc.host-residence-proof-list.title'),
          ...headersOptions(goBack),
        }}
      />
      {/* <Stack.Screen
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
      /> */}
    </Stack.Navigator>
  );
};
