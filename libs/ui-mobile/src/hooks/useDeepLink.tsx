import { useState, useEffect } from 'react';
import * as Linking from 'expo-linking';

export const useDeepLink = () => {
  const [data, setData] = useState<Linking.ParsedURL>();

  const handleDeeplink = ({ url }: { url: string }) => {
    const data = Linking.parse(url);
    setData(data);
  };

  useEffect(() => {
    async function getInitialURL() {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) {
        setData(Linking.parse(initialURL));
      }
    }
    // only work if app is open in the background
    Linking.addEventListener('url', handleDeeplink);
    if (!data) {
      getInitialURL();
    }
  });

  return data;
};
