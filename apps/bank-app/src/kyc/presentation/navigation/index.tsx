import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';
import { IKycStackPages, IKycStackProps } from '../../../shared/presentation/types';

import { InitKyc, Kyc, IdList, UploadDocument, CardSent, SuccessKyc, SctRequired } from '../screens';

const Stack = createNativeStackNavigator<IKycStackProps>();

export const KycStack = () => {
  const { t } = useTranslation();
  const navigationStack = useNavigationState((state) => state?.routes ?? []);

  const { initRoute } = useSelector((state: IRootState) => state.kyc.customer);

  return (
    <Stack.Navigator initialRouteName={initRoute as IKycStackPages}>
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
        name={IKycStackPages.SCT_REQUIRED}
        component={SctRequired}
        options={{
          headerTitle: t('screens.kyc.sct-required.title'),
          ...headersOptions(goBack),
        }}
      />
    </Stack.Navigator>
  );
};
