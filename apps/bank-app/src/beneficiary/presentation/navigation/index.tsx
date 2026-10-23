import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';

import {
  HeaderTitleAlign,
  IBeneficiaryStackPages,
  IBeneficiaryStackProps,
} from '../../../shared/presentation/types';

import { BeneficiaryAdd, BeneficiaryList, ContactAdd, Transfer, TransferSuccess } from '../screens';
import { Colors, FontNames } from '@clean-rn/ui-mobile';

const Stack = createNativeStackNavigator<IBeneficiaryStackProps>();

export const BeneficiaryStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={IBeneficiaryStackPages.BENEFICIARY_LIST}
        component={BeneficiaryList}
        options={{
          headerTitle: t('screens.transfer.title'),
          ...headersOptions(),
        }}
      />
      <Stack.Screen
        name={IBeneficiaryStackPages.BENEFICIARY_ADD}
        component={BeneficiaryAdd}
        options={{
          headerTitle: t('screens.beneficiary.new-beneficiary.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={IBeneficiaryStackPages.CONTACT_ADD}
        component={ContactAdd}
        options={{
          headerTitle: t('screens.beneficiary.new-contact.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={IBeneficiaryStackPages.TRANSFER}
        component={Transfer}
        options={{
          headerTitle: t('screens.transfer.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerTitle: t('screens.transfer.title'),
          headerTitleAlign: 'center' as HeaderTitleAlign,
          headerTitleStyle: {
            color: Colors.bank.primary.darkBlue,
            fontSize: 19,
            fontFamily: FontNames.MartelSans_600SemiBold,
          },
          headerBackVisible: false,
        }}
        name={IBeneficiaryStackPages.TRANSFER_SUCCESS}
        component={TransferSuccess}
      />
    </Stack.Navigator>
  );
};
