import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFeatureFlag, User as ConfigCatUser } from 'configcat-react';

import { LoaderSplashScreen } from '@clean-rn/ui-mobile';
import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { IEnergyStackProps, IEnergyStackPages, ISharedStackProps } from '../../../shared/presentation/types';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { MenuEnergy } from '../screens';

const Stack = createNativeStackNavigator<IEnergyStackProps & ISharedStackProps>();

export const EnergyStack = () => {
  const { t } = useTranslation();
  const navigationStack = useNavigationState((state) => state?.routes ?? []);

  const { email } = useSelector((state: IRootState) => state.auth);

  let userConfigCat: ConfigCatUser | undefined;
  if (!email) {
    userConfigCat = undefined;
  } else {
    userConfigCat = new ConfigCatUser(email.value, email.value);
  }

  const { value: featureEnergy, loading: loadingEnergy } = useFeatureFlag('energy-app', false, userConfigCat);
  return loadingEnergy ? (
    <LoaderSplashScreen />
  ) : (
    <Stack.Navigator initialRouteName={IEnergyStackPages.MENU}>
      <Stack.Screen
        name={IEnergyStackPages.MENU}
        component={MenuEnergy}
        options={{
          headerTitle: t('screens.energy.menu.title'),
          ...headersOptions(),
        }}
      />
    </Stack.Navigator>
  );
};
