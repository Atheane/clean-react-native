import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { Colors, FontNames } from '@clean-rn/ui-mobile';

import {
  IBeneficiaryStackPages,
  HeaderTitleAlign,
  ITransferStackPages,
  ITransferStackProps,
} from '../../../shared/presentation/types';
import { Transfer, TransferSuccess } from '../screens';
import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';

const Stack = createNativeStackNavigator<ITransferStackProps>();

export const TransferStack = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ITransferStackPages.TRANSFER}
        component={Transfer}
        options={{
          headerTitle: t('screens.transfer.title'),
          ...headersOptions(() => navigation.navigate(IBeneficiaryStackPages.MENU as never)),
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
