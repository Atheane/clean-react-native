// useNotificationHandler.ts
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IStoreKey } from '../../application/types';

const handleDeepLink = async (deeplink: string) => {
  if (deeplink && deeplink.startsWith('com.example.bankapp://')) {
    try {
      await Linking.openURL(deeplink);
      await AsyncStorage.setItem(IStoreKey.PENDING_DEEPLINK, deeplink);
    } catch (error: unknown) {
      console.error('Erreur de traitement du deeplink:', error);
    }
  }
};

export const useDeeplink = () => {
  useEffect(() => {
    // Écouteur pour les notifications foreground

    const listenerForeground = Notifications.addNotificationReceivedListener(async (notification) => {
      const deeplink = notification.request.content.data?.deeplink || '';
      await handleDeepLink(deeplink);
      Toast.show({
        type: 'info',
        text1: notification.request.content.title ?? undefined,
        text2: notification.request.content.body ?? undefined,
        position: 'top',
        visibilityTime: 4000,
        onPress: () => handleDeepLink(deeplink),
      });
    });

    // Écouteur pour les clics sur notifications (background/killed)
    const listenerBackground = Notifications.addNotificationResponseReceivedListener(async (response) => {
      const deeplink = response.notification.request.content.data?.deeplink || '';
      await handleDeepLink(deeplink);
    });

    return () => {
      Notifications.removeNotificationSubscription(listenerForeground);
      Notifications.removeNotificationSubscription(listenerBackground);
    };
  }, []);
};
