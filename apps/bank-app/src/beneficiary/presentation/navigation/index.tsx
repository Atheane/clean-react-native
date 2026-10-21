import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { IHomeStackPages, IHomeStackProps } from '../../../shared/presentation/types';

import { BeneficiaryList } from '../screens';

const Stack = createNativeStackNavigator<IHomeStackProps>();

export const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={IHomeStackPages.BENEFICIARY}
        component={BeneficiaryList}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
