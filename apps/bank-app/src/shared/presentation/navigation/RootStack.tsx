import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { AuthStack } from '../../../auth/presentation/navigation';
import { KycStack } from '../../../kyc/presentation/navigation';

import { BottomTabNavigator } from './BottomNavigator';

import { IKycStackPages } from '../../../shared/presentation/types';

export const RootStack = () => {
  const {
    auth: { accessToken },
  } = useSelector((state: IRootState) => state.auth.login);
  // const { initRoute: initKycRoute } = useSelector((state: IRootState) => state.kyc);
  const initKycRoute = IKycStackPages.MENU;
  const navigation = useNavigation();

  useEffect(() => {
    if (initKycRoute) {
      navigation.navigate(initKycRoute as never);
    }
  }, [initKycRoute, navigation]);

  return initKycRoute && accessToken ? <KycStack /> : accessToken ? <BottomTabNavigator /> : <AuthStack />;
};
