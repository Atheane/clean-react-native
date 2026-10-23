import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';

import { ICardStackPages, ICardStackProps, IProfileStackPages } from '../../../shared/presentation/types';

import {
  CardMenu,
  CardLimits,
  ToggleLockCard,
  ChangePin,
  ChangePinSuccess,
  ShowPin,
  ToggleLockCardSuccess,
  KycMissing,
  WaitingCard,
} from '../screens';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';

const Stack = createNativeStackNavigator<ICardStackProps>();

export const CardStack = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ICardStackPages.CARD}
        component={CardMenu}
        options={{
          headerTitle: t('screens.card.menu.title'),
          ...headersOptions(() => navigation.navigate(IProfileStackPages.MENU as never)),
        }}
      />
      <Stack.Screen
        name={ICardStackPages.KYC_MISSING}
        component={KycMissing}
        options={{
          headerTitle: t('screens.card.kyc-missing.title'),
          ...headersOptions(() => navigation.navigate(IProfileStackPages.MENU as never)),
        }}
      />
      <Stack.Screen
        name={ICardStackPages.WAITING_CARD}
        component={WaitingCard}
        options={{
          headerTitle: t('screens.card.waiting-card.title'),
          ...headersOptions(() => navigation.navigate(IProfileStackPages.MENU as never)),
        }}
      />
      <Stack.Screen
        name={ICardStackPages.CARD_LIMITS}
        component={CardLimits}
        options={{
          headerTitle: t('screens.card.limits.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={ICardStackPages.LOCK_CARD}
        component={ToggleLockCard}
        options={{
          headerTitle: t('screens.card.toggle-lock.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={ICardStackPages.LOCK_CARD_SUCCESS}
        component={ToggleLockCardSuccess}
        options={{
          headerTitle: t('screens.card.toggle-lock-success.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={ICardStackPages.CHANGE_PIN}
        component={ChangePin}
        options={{
          headerTitle: t('screens.card.change-pin.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={ICardStackPages.CHANGE_PIN_SUCCESS}
        component={ChangePinSuccess}
        options={{
          headerTitle: t('screens.card.change-pin-success.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={ICardStackPages.SHOW_PIN}
        component={ShowPin}
        options={{
          headerTitle: t('screens.card.show-pin.title'),
          ...headersOptions(goBack),
        }}
      />
    </Stack.Navigator>
  );
};
