import { Pressable, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
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
  IRootTabScreenProps,
  IHomeStackPages,
  ITransferStackPages,
  ICarbonStackPages,
  IUserStackPages,
  IKycStackPages,
} from '../../types';

import { AccountStack } from '../../../../account/presentation/navigation';
import { CarbonStack } from '../../../../carbon/presentation/navigation';
// import { TransferStack } from '../../../../transfer/presentation/navigation'; //TODO
import { ProfileStack } from '../../../../user/presentation/navigation';
import { KycStack } from '../../../../kyc/presentation/navigation';
import { BeneficiaryStack } from '../../../../beneficiary/presentation/navigation';

const Tab = createBottomTabNavigator<IRootTabParamList>();

export const BottomTabNavigator = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName={IHomeStackPages.MENU}
      screenOptions={{
        tabBarActiveTintColor: Colors.bank.primary.white,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={IHomeStackPages.MENU}
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
        name={ITransferStackPages.MENU}
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
        name={IUserStackPages.MENU}
        component={ProfileStack}
        options={({ navigation }: IRootTabScreenProps<IUserStackPages.MENU>) => ({
          title: t('screens.profile.title'),
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            focused ? (
              <ProfileGradient style={{ color: Colors.bank.primary.lightGreen } as StyleProp<ViewStyle>} />
            ) : (
              <ProfileIcon style={{ color: Colors.bank.primary.grey } as StyleProp<ViewStyle>} />
            ),

          tabBarLabel: ({ focused }: { focused: boolean }) =>
            focused ? <Text style={styles.tab}> {t('screens.profile.tab')}</Text> : '',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome name="info-circle" size={25} color={Colors.bank.tab} style={{ marginRight: 15 }} />
            </Pressable>
          ),
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
