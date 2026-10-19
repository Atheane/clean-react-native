import { Pressable, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import {
  Colors,
  FontNames,
  Home as HomeIcon,
  Transfer as TransferIcon,
  Carbon as CarbontIcon,
  Profile as ProfileIcon,
} from '@clean-rn/ui-mobile';
import {
  IRootTabParamList,
  IRootTabScreenProps,
  IHomeStackPages,
  ITransferStackPages,
  ICarbonStackPages,
  IProfileStackPage,
} from '../../types';

import { HomeStack } from '../../../../account/presentation/navigation';
// import { CarbonStack } from '../../../../carbon/presentation/navigation';

// import { Transfer } from '../../../../transfer/presentation/screens';
// import { Profile } from '../../../../profile/presentation/screens';

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
        component={HomeStack}
        options={() => ({
          title: t('screens.home.title'),
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            focused ? (
              <HomeIcon fill={Colors.bank.primary.lightGreen} />
            ) : (
              <HomeIcon fill={Colors.bank.primary.grey} />
            ),
          tabBarLabel: ({ focused }: { focused: boolean }) =>
            focused ? <Text style={styles.tab}> {t('screens.home.tab')}</Text> : '',
        })}
      />
      {/* <Tab.Screen
        name={ITransferStackPages.MENU}
        component={Transfer}
        options={({ navigation }: IRootTabScreenProps<ITransferStackPages.MENU>) => ({
          title: t('screens.transfer.title'),
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            focused ? (
              <TransferIcon fill={Colors.bank.primary.lightGreen} />
            ) : (
              <TransferIcon fill={Colors.bank.primary.grey} />
            ),

          tabBarLabel: ({ focused }: { focused: boolean }) =>
            focused ? <Text style={styles.tab}> {t('screens.transfer.tab')}</Text> : '',
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
        name={ICarbonStackPages.MENU}
        component={CarbonStack}
        options={({ navigation }: IRootTabScreenProps<ICarbonStackPages.MENU>) => ({
          title: t('screens.carbon.title'),
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            focused ? (
              <CarbontIcon fill={Colors.bank.primary.lightGreen} />
            ) : (
              <CarbontIcon fill={Colors.bank.primary.grey} />
            ),
          tabBarLabel: ({ focused }: { focused: boolean }) =>
            focused ? <Text style={styles.tab}> {t('screens.carbon.tab')}</Text> : '',
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
        name={IProfileStackPage.MENU}
        component={Profile}
        options={({ navigation }: IRootTabScreenProps<IProfileStackPage.MENU>) => ({
          title: t('screens.profile.title'),
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            focused ? (
              <ProfileIcon fill={Colors.bank.primary.lightGreen} />
            ) : (
              <ProfileIcon fill={Colors.bank.primary.grey} />
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
      /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tab: {
    fontSize: 9,
    fontName: FontNames.MartelSans_600SemiBold,
    color: Colors.bank.primary.lightGreen,
  },
});
