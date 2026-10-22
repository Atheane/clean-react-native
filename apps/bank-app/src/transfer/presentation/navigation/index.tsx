import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { goBack } from '../../../shared/presentation/navigation/navigationRef';
import {
  HeaderTitleAlign,
  ITransferStackPages,
  ITransferStackProps,
} from '../../../shared/presentation/types';
import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { Beneficiaries, Transfer, TransferSuccess } from '../screens';
import { Colors, FontNames } from '@clean-rn/ui-mobile';

const Stack = createNativeStackNavigator<ITransferStackProps>();

export const TransferStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ITransferStackPages.BENEFICIARIES}
        component={Beneficiaries}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ITransferStackPages.TRANSFER}
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
        name={ITransferStackPages.TRANSFER_SUCCESS}
        component={TransferSuccess}
      />
    </Stack.Navigator>
  );
};
