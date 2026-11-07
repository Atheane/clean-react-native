import { useTranslation } from 'react-i18next';
import { useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';
import { IKycStackPages, IKycStackProps } from '../../../shared/presentation/types';

import {
  ShowKycSteps,
  IdList,
  UploadDocument,
  CardSent,
  SuccessKyc,
  SctRequired,
  Informations,
  Kyc,
} from '../screens';
const Stack = createNativeStackNavigator<IKycStackProps>();

export const KycStack = () => {
  const { t } = useTranslation();
  const navigationStack = useNavigationState((state) => state?.routes ?? []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={IKycStackPages.SHOW_KYC_STEPS}
        component={ShowKycSteps}
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
        name={IKycStackPages.INFORMATIONS}
        component={Informations}
        options={{
          headerTitle: t('screens.kyc.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IKycStackPages.SCT_REQUIRED}
        component={SctRequired}
        options={{
          headerTitle: t('screens.kyc.sct-required.title'),
          ...headersOptions(goBack),
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
    </Stack.Navigator>
  );
};
