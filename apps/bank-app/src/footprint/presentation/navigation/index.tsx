import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFeatureFlag, User as ConfigCatUser } from 'configcat-react';

import { LoaderSplashScreen } from '@clean-rn/ui-mobile';
import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import {
  IFootprintStackProps,
  IFootprintStackPages,
  ISharedStackProps,
} from '../../../shared/presentation/types';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import {
  FootprintEstimation,
  HeaterFootprintEstimation,
  MenuFootprint,
  MenuPrimeum,
  WorksSituation,
  TransportSituation,
  HouseholdSituation,
  EvolutionFootprint,
  TransportFootprintEstimation,
  WarningFoodFootprintEstimation,
  FoodFootprintEstimation,
  FlyFootprintEstimation,
  HeatersSituation,
} from '../screens';

const Stack = createNativeStackNavigator<IFootprintStackProps & ISharedStackProps>();

export const FootprintStack = () => {
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
    <Stack.Navigator initialRouteName={IFootprintStackPages.MENU}>
      <Stack.Screen
        name={IFootprintStackPages.MENU}
        component={featureTagLegacy ? MenuFootprint : FootprintEstimation}
        options={{
          headerTitle: t('screens.menu-footprint.title'),
          ...headersOptions(),
        }}
      />
      {featureTagLegacy && (
        <Stack.Screen
          name={IFootprintStackPages.EVOLUTION_FOOTPRINT}
          component={EvolutionFootprint}
          options={{
            headerTitle: t('screens.evolution.title'),
            ...headersOptions(),
            ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
          }}
        />
      )}
      {featureTagLegacy && (
        <Stack.Screen
          name={IFootprintStackPages.FOOTPRINT_ESTIMATION}
          component={FootprintEstimation}
          options={{
            headerTitle: t('screens.footprint-estimation.title'),
            ...headersOptions(),
            ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
          }}
        />
      )}
      <Stack.Screen
        name={IFootprintStackPages.HEATER_FOOTPRINT_ESTIMATION}
        component={HeaterFootprintEstimation}
        options={{
          headerTitle: t('screens.footprint-estimation-house.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IFootprintStackPages.TRANSPORT_FOOTPRINT_ESTIMATION}
        component={TransportFootprintEstimation}
        options={{
          headerTitle: t('screens.footprint-estimation-transport.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IFootprintStackPages.FOOD_FOOTPRINT_ESTIMATION}
        component={FoodFootprintEstimation}
        options={{
          headerTitle: t('screens.footprint-estimation-food.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IFootprintStackPages.WARNING_FOOD_FOOTPRINT_ESTIMATION}
        component={WarningFoodFootprintEstimation}
        options={{
          headerTitle: t('screens.warning-food.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IFootprintStackPages.FLY_FOOTPRINT_ESTIMATION}
        component={FlyFootprintEstimation}
        options={{
          headerTitle: t('screens.footprint-estimation-fly.title'),
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      {featureTagLegacy && (
        <Stack.Screen
          name={IFootprintStackPages.MENU_PRIMEUM}
          component={MenuPrimeum}
          options={{
            headerTitle: t('screens.menu-primeum.title'),
            ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
          }}
        />
      )}
      {featureTagLegacy && (
        <Stack.Screen
          name={IFootprintStackPages.HEATERS_SITUATION}
          component={HeatersSituation}
          options={{
            headerTitle: t('screens.heaters-situation.title'),
            ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
          }}
        />
      )}
      {featureTagLegacy && (
        <Stack.Screen
          name={IFootprintStackPages.WORKS_SITUATION}
          component={WorksSituation}
          options={{
            headerTitle: t('screens.works-situation.title'),
            ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
          }}
        />
      )}
      {featureTagLegacy && (
        <Stack.Screen
          name={IFootprintStackPages.TRANSPORT_SITUATION}
          component={TransportSituation}
          options={{
            headerTitle: t('screens.transport-situation.title'),
            ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
          }}
        />
      )}
      {featureTagLegacy && (
        <Stack.Screen
          name={IFootprintStackPages.HOUSEHOLD_SITUATION}
          component={HouseholdSituation}
          options={{
            headerTitle: t('screens.household-situation.title'),
            ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
          }}
        />
      )}
    </Stack.Navigator>
  );
};
