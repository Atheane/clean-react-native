import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { Icon } from '@rneui/themed';

import { Colors } from '@clean-rn/ui-mobile';
import { IEpcStackPages, IEpcStackProps } from '../types';
import { goBack } from './navigationRef';

import {
  EpcAfterRenovation,
  EpcContract,
  EpcCurrentSituation,
  EpcExplanationComfortPrice,
  EpcRecommendedIndoorTemperature,
} from '../screens';
import { headersOptions } from './headersOptions';

const Stack = createNativeStackNavigator<IEpcStackProps>();

export const EpcStack = () => {
  const navigationStack = useNavigationState((state) => state?.routes ?? []).filter((nav: { name: string }) =>
    nav.name.includes('Epc'),
  );

  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name={IEpcStackPages.CURRENT_SITUATION}
        component={EpcCurrentSituation}
        options={{
          headerTitle: 'Current comfort price',
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate(IEpcStackPages.EXPLANATION_COMFORT_PRICE)}>
              <Icon type="feather" name="help-circle" color={Colors.primary.darkGrey} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name={IEpcStackPages.AFTER_RENOVATION}
        component={EpcAfterRenovation}
        options={{
          headerTitle: 'Target comfort price',
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate(IEpcStackPages.EXPLANATION_COMFORT_PRICE)}>
              <Icon type="feather" name="help-circle" color={Colors.primary.darkGrey} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name={IEpcStackPages.RECOMMENDED_INDOOR_TEMPERATURE}
        component={EpcRecommendedIndoorTemperature}
        options={{
          headerTitle: 'Target indoor temperature',
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IEpcStackPages.EPC_CONTRACT}
        component={EpcContract}
        options={{
          headerTitle: 'EPC contract',
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
      <Stack.Screen
        name={IEpcStackPages.EXPLANATION_COMFORT_PRICE}
        component={EpcExplanationComfortPrice}
        options={{
          headerTitle: 'What is comfort price?',
          ...headersOptions(navigationStack.length > 1 ? goBack : undefined),
        }}
      />
    </Stack.Navigator>
  );
};
