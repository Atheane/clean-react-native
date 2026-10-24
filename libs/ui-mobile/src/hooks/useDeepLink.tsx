import { useState, useEffect } from 'react';
import * as Linking from 'expo-linking';

export const useDeepLink = () => {
  const [data, setData] = useState<Linking.ParsedURL>();

  const handleDeeplink = ({ url }: { url: string }) => {
    const data = Linking.parse(url);
    setData(data);
  };

  useEffect(() => {
    const getInitialURL = async () => {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) setData(Linking.parse(initialURL));
    };

    getInitialURL();

    const subscription = Linking.addEventListener('url', handleDeeplink);

    return () => {
      subscription.remove();
    };
  }, []);

  return data;
};
