import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { AuthStack } from '../../../auth/presentation/navigation';
import { KycStack } from '../../../kyc/presentation/navigation';

import { BottomTabNavigator } from './BottomNavigator';

export const RootStack = () => {
  const {
    auth: { accessToken },
  } = useSelector((state: IRootState) => state.auth.login);
  const { initRoute } = useSelector((state: IRootState) => state.kyc);

  const navigation = useNavigation();

  useEffect(() => {
    if (initRoute) {
      navigation.navigate(initRoute as never);
    }
  }, [initRoute, navigation]);

  return initRoute && accessToken ? <KycStack /> : accessToken ? <BottomTabNavigator /> : <AuthStack />;
};
