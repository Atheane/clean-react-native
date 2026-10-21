import { useTranslation } from 'react-i18next';
import { useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';

import { IHomeStackPages, IHomeStackProps } from '../../../shared/presentation/types';

import { BeneficiaryAdd, BeneficiaryList } from '../screens';

const Stack = createNativeStackNavigator<IHomeStackProps>();

export const BeneficiaryStack = () => {
  const { t } = useTranslation();
  const navigationStack = useNavigationState((state) => state?.routes ?? []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={IHomeStackPages.BENEFICIARY_LIST}
        component={BeneficiaryList}
        options={{
          headerTitle: t('screens.beneficiary.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IHomeStackPages.BENEFICIARY_ADD}
        component={BeneficiaryAdd}
        options={{
          headerTitle: t('screens.beneficiary.new-beneficiary.title'),
          ...headersOptions(goBack),
        }}
      />
    </Stack.Navigator>
  );
};
