import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export const useHideBottomBar = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation]);
};
