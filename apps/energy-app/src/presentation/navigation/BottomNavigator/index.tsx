import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { Icon } from '@rneui/themed';

import { Colors, Settings as SettingsIcon } from '@clean-rn/ui-mobile';
import {
  IRootTabParamList,
  IDashboardStackPages,
  IEpcStackPages,
  ISettingsStackPages,
  IHomeStackPages,
} from '../../types';
import { Home, Dashboard, Settings } from '../../screens';
import { EpcStack } from '../EpcStack';

const Tab = createBottomTabNavigator<IRootTabParamList>();

export const BottomTabNavigator = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName={IHomeStackPages.MENU}
      screenOptions={{
        tabBarActiveTintColor: Colors.primary.darkGrey, // Changez ceci pour une couleur qui contraste avec votre arrière-plan
        tabBarInactiveTintColor: Colors.primary.lightGrey, // Ajoutez ceci pour définir la couleur du texte inactif
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={IHomeStackPages.MENU}
        component={Home}
        options={() => ({
          title: t('screens.home.title'),
          tabBarLabel: t('screens.home.tab'),
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Icon
              type="feather"
              name="help-circle"
              color={focused ? Colors.primary.darkGrey : Colors.primary.lightGrey}
            />
          ),
        })}
      />
      <Tab.Screen
        name={IDashboardStackPages.MENU}
        component={Dashboard}
        options={() => ({
          title: t('screens.dashboard.title'),
          tabBarLabel: t('screens.dashboard.tab'),
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Icon
              type="feather"
              name="help-circle"
              color={focused ? Colors.primary.darkGrey : Colors.primary.lightGrey}
            />
          ),
        })}
      />
      <Tab.Screen
        name={IEpcStackPages.MENU}
        component={EpcStack}
        options={() => ({
          title: t('screens.epc.title'),
          tabBarLabel: t('screens.epc.tab'),
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Icon
              type="feather"
              name="help-circle"
              color={focused ? Colors.primary.darkGrey : Colors.primary.lightGrey}
            />
          ),
        })}
      />
      <Tab.Screen
        name={ISettingsStackPages.MENU}
        component={Settings}
        options={() => ({
          title: t('screens.settings.title'),
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <SettingsIcon
              color={focused ? Colors.primary.darkGrey : Colors.primary.lightGrey}
              width={24}
              height={24}
            />
          ),
          tabBarLabel: t('screens.settings.tab'),
        })}
      />
    </Tab.Navigator>
  );
};
