import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { getUniqueId, getDeviceId, getBrand, getBaseOs, getSystemVersion } from 'react-native-device-info';

export const useDevice = () => {
  const [deviceId, setDeviceId] = useState<string>('');
  const [deviceOS, setOS] = useState<string>('');
  const brand = getBrand();
  const model = getDeviceId();
  const osVersion = getSystemVersion();

  useEffect(() => {
    // register device
    getUniqueId().then((id: string) => setDeviceId(id));
    getBaseOs().then((os: string) => {
      setOS(os ? os : Platform.OS);
    });
  }, []);

  return {
    deviceId,
    brand,
    model,
    os: deviceOS,
    osVersion,
  };
};
