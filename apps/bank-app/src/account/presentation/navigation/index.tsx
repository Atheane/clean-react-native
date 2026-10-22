import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { goBack } from '../../../shared/presentation/navigation/navigationRef';
import { IAccountStackPages, IAccountStackProps } from '../../../shared/presentation/types';
import { RibPdf, Home } from '../screens';
import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';

const Stack = createNativeStackNavigator<IAccountStackProps>();

export const AccountStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen name={IAccountStackPages.ACCOUNTS} component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name={IAccountStackPages.RIB_PDF}
        component={RibPdf}
        options={{
          headerTitle: t('screens.rib-pdf.title'),
          ...headersOptions(goBack),
        }}
      />
    </Stack.Navigator>
  );
};
