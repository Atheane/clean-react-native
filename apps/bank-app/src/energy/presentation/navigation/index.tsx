import { View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFeatureFlag, User as ConfigCatUser } from 'configcat-react';

import { LoaderSplashScreen, Colors, FontNames, GreenCloseButton } from '@clean-rn/ui-mobile';
import { IEnergyStackProps, IEnergyStackPages, ISharedStackProps } from '../../../shared/presentation/types';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';
import { HeaderTitleAlign } from '../../../shared/presentation/types';
import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { MenuEnergy, ModalQuiz, WinGreenEuros, AdaptTemperature, MyEnergyConsumption } from '../screens';
import { EnergyAppLogo } from '../assets/images';

const Stack = createNativeStackNavigator<IEnergyStackProps & ISharedStackProps>();

const headersOptionsModal = (onPressBackButton?: () => void) =>
  onPressBackButton
    ? {
        headerLeft(): JSX.Element {
          return <GreenCloseButton onPress={onPressBackButton} />;
        },
        headerTitleAlign: 'center' as HeaderTitleAlign,
        headerTitleStyle: {
          color: Colors.primary.darkBlue,
          fontSize: 16,
          fontFamily: FontNames.MartelSans_600SemiBold,
        },
      }
    : {
        headerTitleAlign: 'center' as HeaderTitleAlign,
        headerTitleStyle: {
          color: Colors.primary.darkBlue,
          fontSize: 16,
          fontFamily: FontNames.MartelSans_600SemiBold,
        },
      };

export const EnergyStack = () => {
  const { t } = useTranslation();

  const { email } = useSelector((state: IRootState) => state.auth);

  let userConfigCat: ConfigCatUser | undefined;
  if (!email) {
    userConfigCat = undefined;
  } else {
    userConfigCat = new ConfigCatUser(email.value, email.value);
  }

  const { loading: loadingEnergy } = useFeatureFlag('energy-app', false, userConfigCat);
  return loadingEnergy ? (
    <LoaderSplashScreen />
  ) : (
    <Stack.Navigator initialRouteName={IEnergyStackPages.MENU}>
      <Stack.Screen
        name={IEnergyStackPages.MENU}
        component={MenuEnergy}
        options={{
          headerTitle: t('screens.energy.menu.title'),
          headerRight: () => (
            <View>
              <Image source={EnergyAppLogo} style={{ width: 131, height: 22, marginRight: 20 }} />
            </View>
          ),
          headerTitleStyle: {
            color: Colors.primary.darkBlue,
            fontSize: 16,
            fontFamily: FontNames.MartelSans_600SemiBold,
          },
        }}
      />
      <Stack.Screen
        name={IEnergyStackPages.WIN_GREEN_EUROS}
        component={WinGreenEuros}
        options={{
          headerTitle: t('screens.energy.win-green-euros.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerShown: true,
          headerBackVisible: true,
          headerTitle: t('screens.energy.quiz.title'),
          ...headersOptionsModal(goBack),
        }}
        name={IEnergyStackPages.MODAL_QUIZ}
        component={ModalQuiz}
      />
      <Stack.Screen
        name={IEnergyStackPages.ADAPT_TEMPERATURE}
        component={AdaptTemperature}
        options={{
          headerTitle: t('screens.energy.adapt-temperature.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={IEnergyStackPages.MY_ENERGY_CONSUMPTION}
        component={MyEnergyConsumption}
        options={{
          headerTitle: t('screens.energy.my-energy-consumption.title'),
          ...headersOptions(goBack),
        }}
      />
    </Stack.Navigator>
  );
};
