import { useTranslation } from 'react-i18next';
import { useNavigationState, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';
import { IKycStackPages, IKycStackProps } from '../../../shared/presentation/types';

import {
  InitKyc,
  Kyc,
  IdList,
  ResidenceProofOptions,
  ResidenceProofList,
  KycHost,
  HostIdList,
  UploadDocument,
  KycDocumentsCompleted,
  CardSent,
  HostResidenceProofList,
  SuccessKyc,
} from '../screens';

const Stack = createNativeStackNavigator<IKycStackProps>();

export const KycStack = () => {
  const { t } = useTranslation();
  const navigationStack = useNavigationState((state) => state?.routes ?? []);
  const { params } = useRoute() as {
    params: {
      initRoute: keyof IKycStackProps | undefined;
    };
  };
  return (
    <Stack.Navigator initialRouteName={params?.initRoute || IKycStackPages.INIT}>
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
        name={IKycStackPages.KYC_DOCUMENTS_COMPLETED}
        component={KycDocumentsCompleted}
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
        name={IKycStackPages.KYC_HOST}
        component={KycHost}
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
    </Stack.Navigator>
  );
};
