import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import { useAsyncStorage } from '@clean-rn/ui-mobile';

import { RootState } from '../../../application/state-management/root-reducer';
import { AuthStack } from '../../../../auth/presentation/navigation';
import { IAuthStackPages } from '../../types';
import { IStoreKey } from '../../../application/types';

export const RootStack = () => {
  const { storedValue: email } = useAsyncStorage(IStoreKey.USER_EMAIL);

  const {
    auth: { accessToken },
  } = useSelector((state: RootState) => state.auth.login);

  return accessToken ? (
    <Text> HOME </Text>
  ) : (
    <AuthStack initRoute={email ? IAuthStackPages.LOGIN : IAuthStackPages.SIGNUP_STEP1} />
  );
};
