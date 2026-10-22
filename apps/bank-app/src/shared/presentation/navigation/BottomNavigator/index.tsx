import { StyleSheet, Text, StyleProp, ViewStyle } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import {
  Colors,
  FontNames,
  HomeGradient,
  Home as HomeIcon,
  Transfer as TransferIcon,
  TransferGradient,
  Carbon as CarbontIcon,
  CarbonGradient,
  Profile as ProfileIcon,
  ProfileGradient,
} from '@clean-rn/ui-mobile';
import {
  IRootTabParamList,
  IAccountStackPages,
  ICarbonStackPages,
  IKycStackPages,
  IBeneficiaryStackPages,
  ITransactionStackPages,
  IProfileStackPages,
  ITransferStackPages,
} from '../../types';

import { AccountStack } from '../../../../account/presentation/navigation';
import { CarbonStack } from '../../../../carbon/presentation/navigation';
import { ProfileStack } from '../../../../user/presentation/navigation';
import { KycStack } from '../../../../kyc/presentation/navigation';
import { BeneficiaryStack } from '../../../../beneficiary/presentation/navigation';
import { TransactionStack, TransferStack } from '../../../../transaction/presentation/navigation';

const Tab = createBottomTabNavigator<IRootTabParamList>();

export const BottomTabNavigator = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName={IAccountStackPages.MENU}
      screenOptions={{
        tabBarActiveTintColor: Colors.bank.primary.white,
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
              <HomeIcon style={{ color: Colors.bank.primary.grey } as StyleProp<ViewStyle>} />
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
        name={ITransferStackPages.MENU}
        component={TransferStack}
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
              <TransferGradient style={{ color: Colors.bank.primary.lightGreen } as StyleProp<ViewStyle>} />
            ) : (
              <TransferIcon style={{ color: Colors.bank.primary.grey } as StyleProp<ViewStyle>} />
            ),

          tabBarLabel: ({ focused }: { focused: boolean }) =>
            focused ? <Text style={styles.tab}> {t('screens.transfer.tab')}</Text> : '',
        })}
      />
      <Tab.Screen
        name={ICarbonStackPages.MENU}
        component={CarbonStack}
        options={() => ({
          title: t('screens.carbon.title'),
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            focused ? (
              <CarbonGradient style={{ color: Colors.bank.primary.lightGreen } as StyleProp<ViewStyle>} />
            ) : (
              <CarbontIcon style={{ color: Colors.bank.primary.grey } as StyleProp<ViewStyle>} />
            ),
          tabBarLabel: ({ focused }: { focused: boolean }) =>
            focused ? <Text style={styles.tab}> {t('screens.carbon.tab')}</Text> : '',
        })}
      />
      <Tab.Screen
        name={IProfileStackPages.MENU}
        component={ProfileStack}
        options={() => ({
          title: t('screens.profile.title'),
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            focused ? (
              <ProfileGradient style={{ color: Colors.bank.primary.lightGreen } as StyleProp<ViewStyle>} />
            ) : (
              <ProfileIcon style={{ color: Colors.bank.primary.grey } as StyleProp<ViewStyle>} />
            ),

          tabBarLabel: ({ focused }: { focused: boolean }) =>
            focused ? <Text style={styles.tab}> {t('screens.profile.tab')}</Text> : '',
        })}
      />
      <Tab.Screen
        name={IKycStackPages.MENU}
        component={KycStack}
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
    color: Colors.bank.primary.lightGreen,
  },
});
