import { useEffect } from 'react';
import messaging, { AuthorizationStatus, FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import { NavigationProp } from '@react-navigation/native';

type UseNotificationParams = {
  navigation: NavigationProp<any>; // Adjust this type according to your navigation structure
};

const useNotification = ({ navigation }: UseNotificationParams): void => {
  useEffect(() => {
    const requestUserPermission = async (): Promise<boolean> => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }

      return enabled;
    };

    const setupNotifications = async () => {
      if (await requestUserPermission()) {
        messaging()
          .getToken()
          .then((token: string) => console.log(token));
      }

      Notifications.setNotificationHandler({
        handleNotification: async (): Promise<Notifications.NotificationBehavior> => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

      const handleNotificationClick = async (response: Notifications.NotificationResponse): Promise<void> => {
        const screen = response.notification.request.content.data.screen as string | undefined;
        if (screen) {
          navigation.navigate(screen);
        }
      };

      const notificationClickSubscription =
        Notifications.addNotificationResponseReceivedListener(handleNotificationClick);

      messaging().onNotificationOpenedApp((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        if (remoteMessage?.data?.screen) {
          navigation.navigate(remoteMessage.data.screen as never);
        }
      });

      messaging()
        .getInitialNotification()
        .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => {
          if (remoteMessage && remoteMessage?.data?.screen) {
            navigation.navigate(remoteMessage.data.screen as never);
          }
        });

      messaging().setBackgroundMessageHandler(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: remoteMessage.notification?.title ?? '',
            body: remoteMessage.notification?.body ?? '',
            data: remoteMessage.data,
          },
          trigger: null,
        });
      });

      const handlePushNotification = async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: remoteMessage.notification?.title ?? '',
            body: remoteMessage.notification?.body ?? '',
            data: remoteMessage.data,
          },
          trigger: null,
        });
      };

      const unsubscribe = messaging().onMessage(handlePushNotification);

      return () => {
        unsubscribe();
        notificationClickSubscription.remove();
      };
    };

    setupNotifications();
  }, [navigation]);
};

export default useNotification;
