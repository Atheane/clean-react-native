import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';

import { IBeneficiaryStackPages, IBeneficiaryStackProps } from '../../../shared/presentation/types';

import { BeneficiaryAdd, BeneficiaryList, ContactAdd } from '../screens';

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
    </Stack.Navigator>
  );
};
