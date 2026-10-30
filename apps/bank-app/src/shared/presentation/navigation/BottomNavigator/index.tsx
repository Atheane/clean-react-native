import { StyleSheet, Text, StyleProp, ViewStyle } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { useFeatureFlag, User as ConfigCatUser } from 'configcat-react';
import { useSelector } from 'react-redux';

import {
  Colors,
  FontNames,
  HomeGradient,
  Home as HomeIcon,
  Transfer as TransferIcon,
  TransferGradient,
  ParametersGradient,
  ParametersIcon,
  CarbonRewardGrey,
  CarbonRewardGreen,
  LoaderSplashScreen,
  CarbonGradient,
  Carbon as CarbonIcon,
} from '@clean-rn/ui-mobile';
import {
  IRootTabParamList,
  IAccountStackPages,
  IFootprintStackPages,
  IKycStackPages,
  IBeneficiaryStackPages,
  ITransactionStackPages,
  IParametersStackPages,
  ICardStackPages,
} from '../../types';

import { AccountStack } from '../../../../account/presentation/navigation';
import { FootprintStack } from '../../../../footprint/presentation/navigation';
import { ParametersStack } from '../../../../user/presentation/navigation';
import { KycStack } from '../../../../kyc/presentation/navigation';
import { BeneficiaryStack } from '../../../../beneficiary/presentation/navigation';
import { TransactionStack } from '../../../../transaction/presentation/navigation';
import { CardStack } from '../../../../card/presentation/navigation';
import { IRootState } from '../../../application/state-management/reducers/root-reducer';

const Tab = createBottomTabNavigator<IRootTabParamList>();

export const BottomTabNavigator = () => {
  const { t } = useTranslation();
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
    <Tab.Navigator
      initialRouteName={IAccountStackPages.MENU}
      screenOptions={{
        tabBarActiveTintColor: Colors.primary.white,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={IAccountStackPages.MENU}
        component={AccountStack}
        options={() => ({
          title: t('screens.home.title'),
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            focused ? (
              <HomeGradient />
            ) : (
              <HomeIcon style={{ color: Colors.primary.grey } as StyleProp<ViewStyle>} />
            ),
          tabBarLabel: ({ focused }: { focused: boolean }) =>
            focused ? <Text style={styles.tab}> {t('screens.home.tab')}</Text> : '',
        })}
      />
      <Tab.Screen
        name={ITransactionStackPages.MENU}
        component={TransactionStack}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name={IBeneficiaryStackPages.MENU}
        component={BeneficiaryStack}
        options={() => ({
          title: t('screens.transfer.title'),
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            focused ? (
              <TransferGradient style={{ color: Colors.primary.lightGreen } as StyleProp<ViewStyle>} />
            ) : (
              <TransferIcon style={{ color: Colors.primary.grey } as StyleProp<ViewStyle>} />
            ),

          tabBarLabel: ({ focused }: { focused: boolean }) =>
            focused ? <Text style={styles.tab}> {t('screens.transfer.tab')}</Text> : '',
        })}
      />
      <Tab.Screen
        name={IFootprintStackPages.MENU}
        component={FootprintStack}
        options={() => ({
          title: t('screens.carbon.title'),
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            featureTagLegacy ? (
              focused ? (
                <CarbonRewardGreen />
              ) : (
                <CarbonRewardGrey />
              )
            ) : focused ? (
              <CarbonGradient />
            ) : (
              <CarbonIcon />
            ),
          tabBarLabel: ({ focused }: { focused: boolean }) =>
            focused ? <Text style={styles.tab}> {t('screens.carbon.tab')}</Text> : '',
        })}
      />
      <Tab.Screen
        name={IParametersStackPages.MENU}
        component={ParametersStack}
        options={() => ({
          title: t('screens.parameters.title'),
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            focused ? <ParametersGradient /> : <ParametersIcon />,
          tabBarLabel: ({ focused }: { focused: boolean }) =>
            focused ? <Text style={styles.tab}> {t('screens.parameters.menu.tab')}</Text> : '',
        })}
      />
      <Tab.Screen
        name={IKycStackPages.MENU}
        component={KycStack}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name={ICardStackPages.MENU}
        component={CardStack}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tab: {
    fontSize: 9,
    fontFamily: FontNames.MartelSans_600SemiBold,
    color: Colors.primary.lightGreen,
  },
});
