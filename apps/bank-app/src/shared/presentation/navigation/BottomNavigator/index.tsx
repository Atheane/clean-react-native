import { Pressable, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { Colors, FontNames } from '@shared/presentation/constants';
import { useColorScheme } from '@shared/presentation/hooks';
import { RootTabParamList, RootTabScreenProps } from '@shared/presentation/types';

import { Home as HomeIcon, Transfer as TransferIcon } from '@account/presentation/assets';
import { HomeStack } from '@account/presentation/navigation';
import { Transfer } from '@account/presentation/screens';

import { Carbon as CarbontIcon } from '@carbon/presentation/assets';
import { CarbonStack } from '@carbon/presentation/navigation';

import { Profile as ProfileIcon } from '@profile/presentation/assets';
import { Profile } from '@profile/presentation/screens';
import { HOME_STACK_PAGES, TRANSFER_STACK_PAGES } from '@account/presentation/types';
import { CARBON_STACK_PAGES } from '@carbon/presentation/types';
import { PROFILE_STACK_PAGES } from '@profile/presentation/types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName={HOME_STACK_PAGES.MENU}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={HOME_STACK_PAGES.MENU}
        component={HomeStack}
        options={() => ({
          title: t('screens.home.title'),
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            focused ? <HomeIcon fill={Colors.icon.lightGreen} /> : <HomeIcon fill={Colors.icon.grey} />,
          tabBarLabel: ({ focused }: { focused: boolean }) =>
            focused ? <Text style={styles.tab}> {t('screens.home.tab')}</Text> : '',
        })}
      />
      <Tab.Screen
        name={TRANSFER_STACK_PAGES.MENU}
        component={Transfer}
        options={({ navigation }: RootTabScreenProps<TRANSFER_STACK_PAGES.MENU>) => ({
          title: t('screens.transfer.title'),
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            focused ? (
              <TransferIcon fill={Colors.icon.lightGreen} />
            ) : (
              <TransferIcon fill={Colors.icon.grey} />
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
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].tab}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <Tab.Screen
        name={CARBON_STACK_PAGES.MENU}
        component={CarbonStack}
        options={({ navigation }: RootTabScreenProps<CARBON_STACK_PAGES.MENU>) => ({
          title: t('screens.carbon.title'),
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            focused ? <CarbontIcon fill={Colors.icon.lightGreen} /> : <CarbontIcon fill={Colors.icon.grey} />,
          tabBarLabel: ({ focused }: { focused: boolean }) =>
            focused ? <Text style={styles.tab}> {t('screens.carbon.tab')}</Text> : '',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].tab}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <Tab.Screen
        name={PROFILE_STACK_PAGES.MENU}
        component={Profile}
        options={({ navigation }: RootTabScreenProps<PROFILE_STACK_PAGES.MENU>) => ({
          title: t('screens.profile.title'),
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            focused ? <ProfileIcon fill={Colors.icon.lightGreen} /> : <ProfileIcon fill={Colors.icon.grey} />,

          tabBarLabel: ({ focused }: { focused: boolean }) =>
            focused ? <Text style={styles.tab}> {t('screens.profile.tab')}</Text> : '',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].tab}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tab: {
    fontSize: 9,
    fontName: FontNames.MartelSans_600SemiBold,
    color: Colors.text.lightGreen,
  },
});
