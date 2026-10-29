import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFeatureFlag, User as ConfigCatUser } from 'configcat-react';

import { LoaderSplashScreen } from '@clean-rn/ui-mobile';
import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { ICarbonStackProps, ICarbonStackPages, ISharedStackProps } from '../../../shared/presentation/types';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import {
  Carbon,
  House,
  Transport,
  Food,
  WarningFood,
  Fly,
  Evolution,
  MenuCarbon,
  MenuPrimeum,
  HeatersForm,
  WorksPrimeum,
  TransportPrimeum,
  HouseholdPrimeum,
} from '../screens';

const Stack = createNativeStackNavigator<ICarbonStackProps & ISharedStackProps>();

export const CarbonStack = () => {
  const { t } = useTranslation();
  const navigationStack = useNavigationState((state) => state?.routes ?? []);

  const { email } = useSelector((state: IRootState) => state.auth);

  let userConfigCat: ConfigCatUser | undefined;
  if (!email) {
    userConfigCat = undefined;
  } else {
    userConfigCat = new ConfigCatUser(email.value, email.value);
  }

  const { value: featureTagLegacy, loading: loadingLegacy } = useFeatureFlag(
    'bank-legacy',
    false,
    userConfigCat,
  );
  return loadingLegacy ? (
    <LoaderSplashScreen />
  ) : (
    <Stack.Navigator initialRouteName={ICarbonStackPages.MENU}>
      <Stack.Screen
        name={ICarbonStackPages.MENU}
        component={featureTagLegacy ? MenuCarbon : Carbon}
        options={{
          headerTitle: t('screens.menu-carbon.title'),
          ...headersOptions(),
        }}
      />
      {featureTagLegacy && (
        <Stack.Screen
          name={ICarbonStackPages.EVOLUTION}
          component={Evolution}
          options={{
            headerTitle: t('screens.evolution.title'),
            ...headersOptions(),
            ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
          }}
        />
      )}
      {featureTagLegacy && (
        <Stack.Screen
          name={ICarbonStackPages.CARBON}
          component={Carbon}
          options={{
            headerTitle: t('screens.carbon.title'),
            ...headersOptions(),
            ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
          }}
        />
      )}
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
      {featureTagLegacy && (
        <Stack.Screen
          name={ICarbonStackPages.MENU_PRIMEUM}
          component={MenuPrimeum}
          options={{
            headerTitle: t('screens.menu-primeum.title'),
            ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
          }}
        />
      )}
      {featureTagLegacy && (
        <Stack.Screen
          name={ICarbonStackPages.HEATERS_FORM}
          component={HeatersForm}
          options={{
            headerTitle: t('screens.heat-primeum.title'),
            ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
          }}
        />
      )}
      {featureTagLegacy && (
        <Stack.Screen
          name={ICarbonStackPages.WORKS_FORM}
          component={WorksPrimeum}
          options={{
            headerTitle: t('screens.heat-primeum.title'),
            ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
          }}
        />
      )}
      {featureTagLegacy && (
        <Stack.Screen
          name={ICarbonStackPages.TRANSPORTS_FORM}
          component={TransportPrimeum}
          options={{
            headerTitle: t('screens.heat-primeum.title'),
            ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
          }}
        />
      )}
      {featureTagLegacy && (
        <Stack.Screen
          name={ICarbonStackPages.HOUSEHOLD_FORM}
          component={HouseholdPrimeum}
          options={{
            headerTitle: t('screens.heat-primeum.title'),
            ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
          }}
        />
      )}
    </Stack.Navigator>
  );
};
