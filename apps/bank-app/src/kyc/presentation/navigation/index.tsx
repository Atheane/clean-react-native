import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';

import {
  IKycStackPages,
  IKycStackProps,
  ISharedStackPages,
  ISharedStackProps,
} from '../../../shared/presentation/types';
import { initGlobalError } from '../../../shared/application/commands/manage-global-errors';
import { ScreenModalError } from '../../../shared/presentation/screens';

import {
  InitKyc,
  MenuKyc,
  FirstIdList,
  SecondIdList,
  ResidenceProofOptions,
  ResidenceProofList,
  MenuKycHost,
  HostIdList,
  UploadDocument,
  SuccessKyc,
  CardSent,
  HostResidenceProofList,
} from '../screens';
import { kycRouteInitialized } from '../../application/commands/customer';

const Stack = createNativeStackNavigator<IKycStackProps & ISharedStackProps>();

export const KycStack = () => {
  const { t } = useTranslation();
  const navigationStack = useNavigationState((state) => state?.routes ?? []);

  const dispatch = useDispatch();
  useEffect(() => {
    const isModalErrorInStack = navigationStack.find((route) => route.name === ISharedStackPages.MODAL_ERROR);
    if (!isModalErrorInStack) {
      dispatch(initGlobalError());
    }
  }, [navigationStack, dispatch]);

  const goHome = useCallback(() => {
    dispatch(kycRouteInitialized({ initRoute: null }));
  }, [dispatch]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={IKycStackPages.INIT}
        component={InitKyc}
        options={{
          headerTitle: t('screens.kyc.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : goHome),
        }}
      />
      <Stack.Screen
        name={IKycStackPages.MENU}
        component={MenuKyc}
        options={{
          headerTitle: t('screens.kyc.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : goHome),
        }}
      />
      <Stack.Screen
        name={IKycStackPages.SUCCESS}
        component={SuccessKyc}
        options={{
          headerTitle: t('screens.kyc.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : goHome),
        }}
      />
      <Stack.Screen
        name={IKycStackPages.CARD_SENT}
        component={CardSent}
        options={{
          headerTitle: t('screens.kyc.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : goHome),
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
        name={IKycStackPages.FIRST_ID_LIST}
        component={FirstIdList}
        options={{
          headerTitle: t('screens.kyc.first-id.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={IKycStackPages.SECOND_ID_LIST}
        component={SecondIdList}
        options={{
          headerTitle: t('screens.kyc.second-id.title'),
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
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerShown: false,
          headerBackVisible: false,
        }}
        name={ISharedStackPages.MODAL_ERROR}
        component={ScreenModalError}
      />
    </Stack.Navigator>
  );
};
