import { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';

export const useNotification = () => {
  const [notificationEnabled, setNotificationEnabled] = useState<boolean>();

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    setNotificationEnabled(enabled);
  };

  const [firebaseToken, setFirebaseToken] = useState<string>();

  useEffect(() => {
    requestUserPermission();
    if (notificationEnabled) {
      messaging()
        .getToken()
        .then((token: string) => {
          setFirebaseToken(token);
        });
    }
  }, [notificationEnabled]);

  return { firebaseToken, notificationEnabled };
};
