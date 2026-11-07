import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
// import * as Device from 'expo-device';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const registerForPushNotificationsAsync = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // if (Device.isDevice) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    throw new Error('Permission non accordée pour obtenir le token de notification push!');
  }
  let projectId: string | undefined;
  try {
    projectId = Constants.expoConfig?.extra?.eas?.projectId;
    if (!projectId) {
      projectId = process.env.EXPO_PUBLIC_PROJECT_ID || process.env.EXPO_PUBLIC_EAS_PROJECT_ID;
    }

    console.log('Project ID utilisé:', projectId);
  } catch (error) {
    console.log('Erreur lors de la récupération du projectId:', error);
  }
  try {
    const pushTokenString = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;
    console.log('Token de notification push:', pushTokenString);
    return pushTokenString;
  } catch (e: unknown) {
    throw new Error(`${e}`);
  }
  // } else {
  //   throw new Error('Vous devez utiliser un appareil physique pour les notifications push');
  // }
};

export const useNotification = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
  const [notificationEnabled, setNotificationEnabled] = useState<boolean>();

  useEffect(() => {
    if (notificationEnabled === undefined) {
      registerForPushNotificationsAsync()
        .then((token) => {
          if (token) {
            setExpoPushToken(token);
            console.log('expoPushToken', token);
            setNotificationEnabled(true);
            console.log('notificationEnabled', notificationEnabled);
          }
        })
        .catch((error) => {
          console.log("Erreur lors de l'enregistrement des notifications push:", error);
          setNotificationEnabled(false);
          console.log('notificationEnabled', notificationEnabled);
        });
    }
  }, [notificationEnabled]);

  return {
    expoPushToken,
    notificationEnabled,
  };
};
