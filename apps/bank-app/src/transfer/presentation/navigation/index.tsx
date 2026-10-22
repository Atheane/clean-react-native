import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Colors, FontNames } from '@clean-rn/ui-mobile';

import {
  HeaderTitleAlign,
  IBeneficiaryStackPages,
  ITransferStackPages,
  ITransferStackProps,
} from '../../../shared/presentation/types';
import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { Transfer, TransferSuccess } from '../screens';

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
