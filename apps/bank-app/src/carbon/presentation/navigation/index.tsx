import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { ICarbonStackProps, ICarbonStackPages, ISharedStackProps } from '../../../shared/presentation/types';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { Carbon, House, Transport, Food, WarningFood, Fly } from '../screens';

const Stack = createNativeStackNavigator<ICarbonStackProps & ISharedStackProps>();

export const CarbonStack = () => {
  const { t } = useTranslation();
  const { initRouteName } = useSelector((state: IRootState) => state.initialization);
  const navigationStack = useNavigationState((state) => state?.routes ?? []);

  return (
    <Stack.Navigator
      initialRouteName={initRouteName as keyof ICarbonStackProps | keyof ISharedStackProps | undefined}
    >
      <Stack.Screen
        name={ICarbonStackPages.CARBON}
        component={Carbon}
        options={{
          headerTitle: t('screens.carbon.title'),
          ...headersOptions(),
        }}
      />
      <Stack.Screen
        name={ICarbonStackPages.HOUSE}
        component={House}
        options={{
          headerTitle: t('screens.carbon-house.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={ICarbonStackPages.TRANSPORT}
        component={Transport}
        options={{
          headerTitle: t('screens.carbon-transport.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={ICarbonStackPages.FOOD}
        component={Food}
        options={{
          headerTitle: t('screens.carbon-food.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={ICarbonStackPages.WARNING_FOOD}
        component={WarningFood}
        options={{
          headerTitle: t('screens.carbon-food.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={ICarbonStackPages.FLY}
        component={Fly}
        options={{
          headerTitle: t('screens.carbon-fly.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
    </Stack.Navigator>
  );
};
