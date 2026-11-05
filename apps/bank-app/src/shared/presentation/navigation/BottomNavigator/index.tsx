import { StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { useFeatureFlag, User as ConfigCatUser } from 'configcat-react';
import { useSelector } from 'react-redux';

import {
  Colors,
  FontNames,
  Home as HomeIcon,
  Transfer as TransferIcon,
  Settings as SettingsIcon,
  LoaderSplashScreen,
  Carbon as CarbonIcon,
  Energy as EnergyIcon,
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
  IEnergyStackPages,
} from '../../types';

import { AccountStack } from '../../../../account/presentation/navigation';
import { FootprintStack } from '../../../../footprint/presentation/navigation';
import { ParametersStack } from '../../../../user/presentation/navigation';
import { KycStack } from '../../../../kyc/presentation/navigation';
import { BeneficiaryStack } from '../../../../beneficiary/presentation/navigation';
import { TransactionStack } from '../../../../transaction/presentation/navigation';
import { CardStack } from '../../../../card/presentation/navigation';
import { EnergyStack } from '../../../../energy/presentation/navigation';
import { IRootState } from '../../../application/state-management/reducers/root-reducer';
import { IUserType } from '@clean-rn/user/domain';
const Tab = createBottomTabNavigator<IRootTabParamList>();

export const BottomTabNavigator = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: IRootState) => state.user);
  return (
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
              <HomeIcon width={24} height={24} />
            ) : (
              <HomeIcon width={24} height={24} color={Colors.primary.grey} />
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
            focused ? <TransferIcon /> : <TransferIcon color={Colors.primary.grey} />,

          tabBarLabel: ({ focused }: { focused: boolean }) =>
            focused ? <Text style={styles.tab}> {t('screens.transfer.tab')}</Text> : '',
        })}
      />
      <Tab.Screen
        name={IFootprintStackPages.MENU}
        component={FootprintStack}
        options={() => ({
          title: t('screens.footprint-estimation.title'),
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            focused ? (
              <CarbonIcon
                color={Colors.primary.lightGreen}
                startColor={Colors.primary.grey}
                endColor={Colors.primary.grey}
              />
            ) : (
              <CarbonIcon />
            ),
          tabBarLabel: ({ focused }: { focused: boolean }) =>
            focused ? <Text style={styles.tab}> {t('screens.footprint-estimation.tab')}</Text> : '',
        })}
      />
      {user?.properties.userType === IUserType.ENERGY_APP_USER && (
        <Tab.Screen
          name={IEnergyStackPages.MENU}
          component={EnergyStack}
          options={() => ({
            title: t('screens.energy.title'),
            tabBarIcon: ({ focused }: { focused: boolean }) =>
              focused ? (
                <EnergyIcon width={26} height={26} />
              ) : (
                <EnergyIcon width={26} height={26} color={Colors.primary.grey} />
              ),
            tabBarLabel: ({ focused }: { focused: boolean }) =>
              focused ? <Text style={[styles.tab, { marginTop: 0 }]}> {t('screens.energy.tab')}</Text> : '',
          })}
        />
      )}
      <Tab.Screen
        name={IParametersStackPages.MENU}
        component={ParametersStack}
        options={() => ({
          title: t('screens.parameters.title'),
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            focused ? <SettingsIcon /> : <SettingsIcon color={Colors.primary.grey} />,
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
    textTransform: 'uppercase',
  },
});
