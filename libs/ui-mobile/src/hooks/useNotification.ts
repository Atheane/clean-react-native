import { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Logger } from '@clean-rn/logger';

export const useNotification = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    setNotificationEnabled(enabled);
  };

  const [firebaseToken, setFirebaseToken] = useState('');

  useEffect(() => {
    requestUserPermission();
    if (notificationEnabled) {
      messaging()
        .getToken()
        .then((token: string) => {
          Logger.getInstance().info('>>>>>>>>>> Firebase device id >>>>>>>>>>>>>>>>>>>>>>', token);
          setFirebaseToken(token);
        });
    }
  }, [notificationEnabled]);

  return { firebaseToken, notificationEnabled, setFirebaseToken };
};
